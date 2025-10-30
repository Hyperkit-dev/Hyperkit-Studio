/**
 * GitHub AI Models Client
 * Handles streaming communication with GitHub's AI API
 */

export interface StreamCallbacks {
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export class GitHubAIClient {
  private apiKey: string;
  private baseURL: string;
  private model: string;

  constructor(apiKey: string, model: string = 'grok-3') {
    this.apiKey = apiKey;
    // GitHub Models API endpoint
    this.baseURL = 'https://models.inference.ai.azure.com';
    this.model = model;
  }

  /**
   * Update the model
   */
  setModel(model: string): void {
    this.model = model;
  }

  /**
   * Generate code with streaming response
   */
  async generateStream(
    prompt: string,
    systemPrompt: string,
    callbacks: StreamCallbacks,
    options: GenerateOptions = {}
  ): Promise<void> {
    const { temperature = 0.7, maxTokens = 16000 } = options;

    try {
      // Check if API key is available
      if (!this.apiKey || this.apiKey === 'your_github_token_here') {
        throw new Error('GitHub AI API key not configured. Please add NEXT_PUBLIC_GITHUB_AI_API_KEY to your .env.local file');
      }

      console.log('Making API request to:', `${this.baseURL}/chat/completions`);
      console.log('Using model:', this.model);

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'api-key': this.apiKey, // Azure also accepts this header
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          model: this.model,
          temperature,
          max_tokens: maxTokens,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        // Provide helpful error messages
        if (response.status === 401) {
          throw new Error(`Authentication failed. Please check:\n1. Your GitHub token is valid\n2. Token has access to GitHub Models\n3. You've restarted the dev server after updating .env.local`);
        } else if (response.status === 403) {
          throw new Error(`Access denied. Your GitHub account may not have access to GitHub Models yet. Visit https://github.com/marketplace/models to request access.`);
        } else if (response.status === 404) {
          throw new Error(`Model "${this.model}" not found. Try using "gpt-4o" instead.`);
        }
        
        throw new Error(`API request failed (${response.status}): ${errorText || response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              callbacks.onComplete?.(fullResponse);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              
              if (content) {
                fullResponse += content;
                callbacks.onToken?.(content);
              }
            } catch (e) {
              // Skip invalid JSON chunks
              console.warn('Failed to parse chunk:', e);
            }
          }
        }
      }

      // Ensure completion is called even if [DONE] wasn't received
      if (fullResponse) {
        callbacks.onComplete?.(fullResponse);
      }
    } catch (error) {
      console.error('Stream generation error:', error);
      callbacks.onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }

  /**
   * Generate code without streaming (fallback)
   */
  async generate(
    prompt: string,
    systemPrompt: string,
    options: GenerateOptions = {}
  ): Promise<string> {
    const { temperature = 0.7, maxTokens = 16000 } = options;

    try {
      // Check if API key is available
      if (!this.apiKey || this.apiKey === 'your_github_token_here') {
        throw new Error('GitHub AI API key not configured. Please add NEXT_PUBLIC_GITHUB_AI_API_KEY to your .env.local file');
      }

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'api-key': this.apiKey, // Azure also accepts this header
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          model: this.model,
          temperature,
          max_tokens: maxTokens,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        // Provide helpful error messages
        if (response.status === 401) {
          throw new Error(`Authentication failed. Please check:\n1. Your GitHub token is valid\n2. Token has access to GitHub Models\n3. You've restarted the dev server after updating .env.local`);
        } else if (response.status === 403) {
          throw new Error(`Access denied. Your GitHub account may not have access to GitHub Models yet. Visit https://github.com/marketplace/models to request access.`);
        } else if (response.status === 404) {
          throw new Error(`Model "${this.model}" not found. Try using "gpt-4o" instead.`);
        }
        
        throw new Error(`API request failed (${response.status}): ${errorText || response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    } catch (error) {
      console.error('Generation error:', error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}

// ============================================================================
// System Prompts for different scenarios
// ============================================================================

export const SYSTEM_PROMPTS = {
  codeGeneration: `CODE ONLY. NO EXPLANATIONS. NO MARKDOWN.

🚨 FIRST WORD MUST BE: import

Rules:
1. Start with: import React, { useState } from 'react';
2. Function format: function Name() { (NOT: function Name() return)
3. Hooks format: const [x, setX] = useState(0); (NOT: const [x, setX] useState)
4. Styles: style={{ prop: 'value' }} (strings with units, properly closed)
5. End with EXACTLY:
   const root = document.getElementById('root');
   if (root) {
     const rootInstance = window.ReactDOM.createRoot(root);
     rootInstance.render(window.React.createElement(ComponentName));
   }

CRITICAL: Use window.React and window.ReactDOM (they are globals).

NO text before "import". NO markdown blocks. NO explanations. Just code.`,

  projectPlanning: `You are a software architect helping plan web projects. Analyze the requirements and provide:
1. Project structure
2. Key features to implement
3. Technology recommendations
4. Potential challenges

Be concise and practical.`,

  requirementsGathering: `You are a requirements analyst. Help gather detailed project requirements by asking relevant questions about:
- Core functionality
- User interactions
- Data requirements
- Design preferences
- Technical constraints

Ask one clear question at a time.`,
};
