/**
 * Conversation Flow - Multi-step AI conversation state machine
 * Handles the flow from welcome → project-details → complexity-choice → generating → complete
 */

import { useAIStore, ConversationStep, ProjectRequirements, AI_MODELS } from '@/stores/useAIStore';
import { GitHubAIClient, SYSTEM_PROMPTS } from './github-client';
import { processAIGeneratedCode, validateCode, extractCodeMetadata } from '../skeleton';

export class ConversationFlow {
  private store: ReturnType<typeof useAIStore.getState>;
  private aiClient: GitHubAIClient | null = null;

  constructor() {
    this.store = useAIStore.getState();
  }

  /**
   * Initialize AI client with API key from environment and selected model
   */
  private initAIClient(): boolean {
    const { selectedModel } = this.store;
    const apiKey = process.env.NEXT_PUBLIC_GITHUB_AI_API_KEY || '';
    
    if (!apiKey || apiKey === 'your_github_token_here') {
      console.error('❌ GitHub AI API key not configured');
      this.store.setError('API key not configured. Please add NEXT_PUBLIC_GITHUB_AI_API_KEY to your .env.local file');
      return false;
    }
    
    try {
      const modelInfo = AI_MODELS[selectedModel];
      this.aiClient = new GitHubAIClient(apiKey, modelInfo.githubModel);
      console.log(`✓ AI Client initialized with model: ${modelInfo.name} (${modelInfo.githubModel})`);
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize AI client:', error);
      this.store.setError('Failed to initialize AI client');
      return false;
    }
  }

  /**
   * Main handler for user input based on current step
   */
  async handleUserInput(input: string): Promise<void> {
    // Get fresh state every time
    const state = useAIStore.getState();
    this.store = state;
    const { currentStep } = state;

    console.log('=== Conversation Flow ===');
    console.log('Current step:', currentStep);
    console.log('User input:', input);
    console.log('Current requirements:', state.currentRequirements);

    switch (currentStep) {
      case 'welcome':
        await this.handleWelcome(input);
        break;
      case 'project-type':
        await this.handleProjectType(input);
        break;
      case 'project-details':
        await this.handleProjectDetails(input);
        break;
      case 'complexity-choice':
        await this.handleComplexityChoice(input);
        break;
      case 'generating':
        // Ignore input while generating
        break;
      case 'complete':
        await this.handleComplete(input);
        break;
      case 'error':
        await this.handleError(input);
        break;
      default:
        break;
    }
  }

  /**
   * Handle welcome state - user describes what they want to build
   */
  private async handleWelcome(input: string): Promise<void> {
    const state = useAIStore.getState();
    const { setStep, updateRequirements, addMessage } = state;

    // Parse intent from user input
    const lowerInput = input.toLowerCase();
    let projectType = 'custom';

    if (lowerInput.includes('blockchain') || lowerInput.includes('web3') || lowerInput.includes('wallet')) {
      projectType = 'blockchain';
    } else if (lowerInput.includes('landing') || lowerInput.includes('homepage')) {
      projectType = 'landing';
    } else if (lowerInput.includes('dashboard') || lowerInput.includes('analytics')) {
      projectType = 'dashboard';
    }

    console.log('Welcome handler - setting type:', projectType);
    updateRequirements({ type: projectType });

    // Ask for project title
    addMessage({
      role: 'assistant',
      content: `Great! Let's build a ${projectType} project. What would you like to name it?`,
    });

    setStep('project-details');
    console.log('Welcome handler - set step to project-details');
  }

  /**
   * Handle project type selection
   */
  private async handleProjectType(input: string): Promise<void> {
    const { setStep, updateRequirements, addMessage } = this.store;

    updateRequirements({ type: input });

    addMessage({
      role: 'assistant',
      content: `Perfect! What would you like to name your ${input} project?`,
    });

    setStep('project-details');
  }

  /**
   * Handle project details - collect title and description
   */
  private async handleProjectDetails(input: string): Promise<void> {
    // Get fresh state
    const state = useAIStore.getState();
    const { currentRequirements, setStep, updateRequirements, addMessage } = state;

    console.log('Project details - current requirements:', currentRequirements);
    console.log('User input:', input);

    // If no title yet, this input is the title
    if (!currentRequirements.title) {
      console.log('Setting title:', input);
      updateRequirements({ title: input });

      addMessage({
        role: 'assistant',
        content: `"${input}" - I like it! Now, can you describe what features you want? Be as detailed as you'd like.`,
      });
      return;
    }

    // If we have title but no description, this is the description
    if (!currentRequirements.description) {
      console.log('Setting description:', input);
      updateRequirements({ description: input });

      addMessage({
        role: 'assistant',
        content: `Perfect! Now, do you want a static or dynamic project?\n\n• Static - Simple HTML/CSS with basic interactivity (~500-1000 tokens)\n• Dynamic - Full React with state management and effects (~1500-3000 tokens)\n\nDynamic projects cost 3x more tokens but offer richer functionality.\n\nReply with "static" or "dynamic"`,
      });

      setStep('complexity-choice');
      return;
    }
  }

  /**
   * Handle complexity choice - static vs dynamic
   */
  private async handleComplexityChoice(input: string): Promise<void> {
    const { setStep, updateRequirements, addMessage } = this.store;

    const lowerInput = input.toLowerCase();
    const isDynamic = lowerInput.includes('dynamic') || lowerInput.includes('yes');

    updateRequirements({ isDynamic });

    addMessage({
      role: 'assistant',
      content: `Got it! Generating your ${isDynamic ? 'dynamic' : 'static'} project now...`,
    });

    setStep('generating');

    // Start generation
    await this.generateProject();
  }

  /**
   * Handle complete state - project is done, can start new one
   */
  private async handleComplete(input: string): Promise<void> {
    const { addMessage, setStep } = this.store;

    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('new') || lowerInput.includes('another') || lowerInput.includes('start')) {
      addMessage({
        role: 'assistant',
        content: 'Great! What would you like to build next?',
      });
      setStep('welcome');
    } else {
      addMessage({
        role: 'assistant',
        content: 'Your project is complete! Type "new project" to start another one, or ask me to modify the current project.',
      });
    }
  }

  /**
   * Handle error state - allow retry
   */
  private async handleError(input: string): Promise<void> {
    const { addMessage, setStep, resetRetry } = this.store;

    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('retry') || lowerInput.includes('try again')) {
      addMessage({
        role: 'assistant',
        content: 'Okay, let\'s try again! Regenerating your project...',
      });
      resetRetry();
      setStep('generating');
      await this.generateProject();
    } else if (lowerInput.includes('start over') || lowerInput.includes('new')) {
      addMessage({
        role: 'assistant',
        content: 'No problem! Let\'s start fresh. What would you like to build?',
      });
      resetRetry();
      setStep('welcome');
    } else {
      addMessage({
        role: 'assistant',
        content: 'I encountered an error. You can:\n• Type "retry" to try generating again\n• Type "start over" to begin a new project',
      });
    }
  }

  /**
   * Generate project code based on requirements
   */
  private async generateProject(): Promise<void> {
    const { 
      currentRequirements, 
      setStreaming, 
      appendStreamingContent,
      createProject, 
      updateProject,
      setStep,
      addMessage,
      incrementRetry,
      retryCount
    } = this.store;

    console.log('Starting project generation...');
    setStreaming(true);

    try {
      // Initialize AI client
      if (!this.initAIClient()) {
        throw new Error('Failed to initialize AI client. Please check your API key.');
      }

      // Build the generation prompt
      const prompt = this.buildGenerationPrompt(currentRequirements);
      console.log('Generation prompt:', prompt);

      // Use real AI API with streaming
      let fullCode = '';
      
      await this.aiClient!.generateStream(
        prompt,
        SYSTEM_PROMPTS.codeGeneration,
        {
          onToken: (token: string) => {
            fullCode += token;
            appendStreamingContent(token);
          },
          onComplete: async (response: string) => {
            console.log('✓ Generation complete, processing code...');
            setStreaming(false);

            // Process the AI-generated code
            const processedCode = processAIGeneratedCode(response, currentRequirements.title?.replace(/\s+/g, ''));

            // Validate the code
            const validation = validateCode(processedCode);
            if (!validation.valid) {
              console.warn('Code validation warnings:', validation.errors);
            }

            // Extract metadata
            const metadata = extractCodeMetadata(processedCode);
            console.log('Code metadata:', metadata);

            // Create project with the processed code
            const projectId = createProject(processedCode);
            console.log('Project created with ID:', projectId);

            // Update project with metadata
            updateProject(projectId, {
              bundledCode: processedCode,
            });

            // Try to bundle and detect errors
            try {
              const { bundleCode } = await import('@/lib/bundler');
              const bundleResult = await bundleCode(processedCode);
              
              if (bundleResult.error) {
                console.error('❌ Bundler error detected:', bundleResult.error);
                
                // Check if we can retry
                const { retryCount, incrementRetry, deleteProject } = useAIStore.getState();
                const canRetry = retryCount < 2;
                
                if (canRetry) {
                  incrementRetry();
                  console.log(`🔄 Auto-retry attempt ${retryCount + 1}/2`);
                  
                  addMessage({
                    role: 'assistant',
                    content: `⚠️ Code had syntax errors. Auto-fixing and regenerating... (Attempt ${retryCount + 1}/2)`,
                  });
                  
                  // Delete the failed project
                  deleteProject(projectId);
                  
                  // Wait a bit then retry
                  setTimeout(() => {
                    this.generateProject();
                  }, 1000);
                  
                  return;
                }
              } else {
                // Bundle successful, update project
                updateProject(projectId, {
                  bundledCode: bundleResult.code,
                });
              }
            } catch (bundleError) {
              console.error('Bundler check failed:', bundleError);
              // Continue anyway, let the Preview component handle it
            }

            addMessage({
              role: 'assistant',
              content: `Your project "${currentRequirements.title}" is ready!\n\nStats:\n• Lines: ${metadata.lineCount}\n• Complexity: ${metadata.estimatedComplexity}\n• Has hooks: ${metadata.hasHooks ? 'Yes' : 'No'}\n\nCheck the preview to see it in action! Type "new project" to build something else.`,
            });

            setStep('complete');
            
            // Reset retry count on success
            const { resetRetry } = useAIStore.getState();
            resetRetry();
            
            console.log('Generation complete!');
          },
          onError: (error: Error) => {
            console.error('Stream error:', error);
            throw error;
          }
        },
        {
          temperature: currentRequirements.isDynamic ? 0.8 : 0.7,
          maxTokens: currentRequirements.isDynamic ? 3000 : 2000,
        }
      );

    } catch (error) {
      setStreaming(false);
      
      const canRetryMore = retryCount < 3;
      incrementRetry();

      console.error('Generation error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      addMessage({
        role: 'assistant',
        content: `Generation failed: ${errorMessage}\n\n${
          canRetryMore 
            ? 'Type "retry" to try again or "start over" for a new project.' 
            : 'Maximum retries reached. Type "start over" to begin a new project.'
        }`,
      });

      setStep('error');
    }
  }

  /**
   * Build generation prompt from requirements
   */
  private buildGenerationPrompt(requirements: ProjectRequirements): string {
    const { type, title, description, isDynamic } = requirements;

    return `
Create a ${isDynamic ? 'dynamic React' : 'static'} ${type} project.

Project Name: ${title}
Description: ${description}

Requirements:
- ${isDynamic ? 'Use React functional components with hooks' : 'Use vanilla JavaScript'}
- Modern, clean design with good UX
- Responsive layout
- ${type === 'blockchain' ? 'Include wallet connection UI (placeholder)' : ''}
- Include inline styles or CSS
- Make it production-ready

Return ONLY the code, no explanations.
    `.trim();
  }

  /**
   * Use actual AI client for generation (when API key is available)
   */
  private async generateWithAI(prompt: string): Promise<string> {
    if (!this.initAIClient() || !this.aiClient) {
      throw new Error('AI client not initialized. Please check your API key configuration.');
    }

    const { setStreaming, appendStreamingContent } = this.store;

    return new Promise((resolve, reject) => {
      let fullCode = '';

      this.aiClient!.generateStream(
        prompt,
        SYSTEM_PROMPTS.codeGeneration,
        {
          onToken: (token: string) => {
            fullCode += token;
            appendStreamingContent(token);
          },
          onComplete: (code: string) => {
            setStreaming(false);
            resolve(code);
          },
          onError: (error: Error) => {
            setStreaming(false);
            reject(error);
          },
        },
        {
          temperature: 0.7,
          maxTokens: 2000,
        }
      );
    });
  }
}

// Create singleton instance
let flowInstance: ConversationFlow | null = null;

export function getConversationFlow(): ConversationFlow {
  if (!flowInstance) {
    flowInstance = new ConversationFlow();
  }
  return flowInstance;
}

// Helper to reset the flow instance (useful for testing)
export function resetConversationFlow(): void {
  flowInstance = null;
}
