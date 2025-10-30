'use client';

/**
 * StreamingIndicator - Shows animated loading state during AI responses
 */
export function StreamingIndicator() {
  return (
    <div className="streaming-indicator">
      <div className="streaming-dots">
        <span className="streaming-dot" style={{ animationDelay: '0ms' }}></span>
        <span className="streaming-dot" style={{ animationDelay: '150ms' }}></span>
        <span className="streaming-dot" style={{ animationDelay: '300ms' }}></span>
      </div>
      <span className="streaming-text">AI is thinking...</span>
    </div>
  );
}
