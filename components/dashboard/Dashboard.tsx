'use client';

import { useUIStore, type DashboardTab } from '@/stores/useUIStore';
import { useAIStore } from '@/stores/useAIStore';

const DASHBOARD_TABS: DashboardTab[] = [
  'Overview',
  'Users',
  'Data',
  'Analytics',
  'Domains',
  'Security',
  'Code',
  'Agents',
  'Logs',
  'API',
  'Settings',
];

export function Dashboard() {
  const { dashboardTab, setDashboardTab } = useUIStore();
  const { projects, messages, currentStep, currentRequirements } = useAIStore();

  // Get current project
  const currentProject = projects.length > 0 ? projects[0] : null;

  // Calculate statistics from current project
  const projectStatus = currentProject ? (currentProject.error ? 'Failed' : 'Success') : 'None';
  const codeLines = currentProject ? currentProject.code.split('\n').length : 0;
  const codeSize = currentProject ? (currentProject.code.length / 1024).toFixed(2) : '0';
  const bundledSize = currentProject?.bundledCode 
    ? (currentProject.bundledCode.length / 1024).toFixed(2) 
    : '0';
  
  const totalMessages = messages.length;
  const userMessages = messages.filter(m => m.role === 'user').length;
  const assistantMessages = messages.filter(m => m.role === 'assistant').length;

  const renderContent = () => {
    switch (dashboardTab) {
      case 'Overview':
        return (
          <div className="dashboard-section">
            {currentProject ? (
              <>
                <div className="dashboard-stats-grid">
                  <div className="dashboard-stat-card">
                    <div className="stat-label">Project Status</div>
                    <div className="stat-value" style={{ 
                      color: projectStatus === 'Success' ? '#10b981' : projectStatus === 'Failed' ? '#ef4444' : '#6b7280' 
                    }}>
                      {projectStatus}
                    </div>
                    <div className="stat-description">Generation result</div>
                  </div>
                  <div className="dashboard-stat-card">
                    <div className="stat-label">Lines of Code</div>
                    <div className="stat-value">{codeLines.toLocaleString()}</div>
                    <div className="stat-description">Generated code lines</div>
                  </div>
                  <div className="dashboard-stat-card">
                    <div className="stat-label">Code Size</div>
                    <div className="stat-value">{codeSize} KB</div>
                    <div className="stat-description">Source code size</div>
                  </div>
                  <div className="dashboard-stat-card">
                    <div className="stat-label">Bundled Size</div>
                    <div className="stat-value">{bundledSize} KB</div>
                    <div className="stat-description">Compiled size</div>
                  </div>
                </div>

                <div className="dashboard-section-content">
                  <h3>Current Project Details</h3>
                  <div className="status-info">
                    {currentProject.requirements.title && (
                      <div className="status-row">
                        <span className="status-label">Title:</span>
                        <span className="status-value">{currentProject.requirements.title}</span>
                      </div>
                    )}
                    {currentProject.requirements.type && (
                      <div className="status-row">
                        <span className="status-label">Type:</span>
                        <span className="status-value">{currentProject.requirements.type}</span>
                      </div>
                    )}
                    {currentProject.requirements.description && (
                      <div className="status-row">
                        <span className="status-label">Description:</span>
                        <span className="status-value">{currentProject.requirements.description}</span>
                      </div>
                    )}
                    {currentProject.requirements.isDynamic !== undefined && (
                      <div className="status-row">
                        <span className="status-label">Mode:</span>
                        <span className="status-value">{currentProject.requirements.isDynamic ? 'Dynamic' : 'Static'}</span>
                      </div>
                    )}
                    <div className="status-row">
                      <span className="status-label">Created:</span>
                      <span className="status-value">
                        {new Date(currentProject.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {currentProject.error && (
                      <div className="status-row" style={{ color: '#ef4444' }}>
                        <span className="status-label">Error:</span>
                        <span className="status-value">{currentProject.error}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="dashboard-section-content">
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  color: '#6b7280'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>📦</div>
                  <h3 style={{ marginBottom: '10px', color: '#374151' }}>No Project Yet</h3>
                  <p>Start a conversation to generate your first project!</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'Users':
        return (
          <div className="dashboard-section">
            <div className="dashboard-section-content">
              <h3>Conversation Activity</h3>
              <div className="activity-stats">
                <div className="activity-item">
                  <div className="activity-icon">💬</div>
                  <div className="activity-details">
                    <div className="activity-label">User Messages</div>
                    <div className="activity-value">{userMessages}</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">🤖</div>
                  <div className="activity-details">
                    <div className="activity-label">AI Responses</div>
                    <div className="activity-value">{assistantMessages}</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📊</div>
                  <div className="activity-details">
                    <div className="activity-label">Total Interactions</div>
                    <div className="activity-value">{totalMessages}</div>
                  </div>
                </div>
              </div>

              <h3 style={{ marginTop: '2rem' }}>Recent Messages</h3>
              <div className="messages-list">
                {messages.slice(-5).reverse().map(msg => (
                  <div key={msg.id} className="message-item">
                    <div className="message-header">
                      <span className={`message-role ${msg.role}`}>{msg.role}</span>
                      <span className="message-time">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="message-content">
                      {msg.content.length > 150 
                        ? msg.content.substring(0, 150) + '...' 
                        : msg.content}
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="empty-state">No messages yet</div>
                )}
              </div>
            </div>
          </div>
        );

      case 'Data':
        return (
          <div className="dashboard-section">
            <div className="dashboard-section-content">
              <h3>Current Project Data</h3>
              <div className="projects-table">
                {currentProject ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Lines</th>
                        <th>Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{currentProject.requirements.title || 'Untitled'}</td>
                        <td>{currentProject.requirements.type || 'N/A'}</td>
                        <td>
                          <span className={`status-badge ${currentProject.error ? 'error' : 'success'}`}>
                            {currentProject.error ? 'Failed' : 'Success'}
                          </span>
                        </td>
                        <td>{new Date(currentProject.createdAt).toLocaleDateString()}</td>
                        <td>{currentProject.code.split('\n').length.toLocaleString()}</td>
                        <td>{(currentProject.code.length / 1024).toFixed(2)} KB</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-state">No project generated yet</div>
                )}
              </div>

              <h3 style={{ marginTop: '2rem' }}>Project Requirements</h3>
              <div className="requirements-data">
                {currentProject ? (
                  <div className="data-grid">
                    {currentProject.requirements.type && (
                      <div className="data-item">
                        <div className="data-label">Type</div>
                        <div className="data-value">{currentProject.requirements.type}</div>
                      </div>
                    )}
                    {currentProject.requirements.title && (
                      <div className="data-item">
                        <div className="data-label">Title</div>
                        <div className="data-value">{currentProject.requirements.title}</div>
                      </div>
                    )}
                    {currentProject.requirements.description && (
                      <div className="data-item">
                        <div className="data-label">Description</div>
                        <div className="data-value">{currentProject.requirements.description}</div>
                      </div>
                    )}
                    {currentProject.requirements.isDynamic !== undefined && (
                      <div className="data-item">
                        <div className="data-label">Mode</div>
                        <div className="data-value">{currentProject.requirements.isDynamic ? 'Dynamic' : 'Static'}</div>
                      </div>
                    )}
                    {currentProject.requirements.features && currentProject.requirements.features.length > 0 && (
                      <div className="data-item">
                        <div className="data-label">Features</div>
                        <div className="data-value">{currentProject.requirements.features.join(', ')}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="empty-state">No requirements data yet</div>
                )}
              </div>
            </div>
          </div>
        );

      case 'Analytics':
        return (
          <div className="dashboard-section">
            <div className="dashboard-section-content">
              <h3>Current Project Analytics</h3>
              {currentProject ? (
                <>
                  <div className="analytics-grid">
                    <div className="analytics-card">
                      <div className="analytics-title">Generation Status</div>
                      <div className="analytics-value" style={{ 
                        color: currentProject.error ? '#ef4444' : '#10b981',
                        fontSize: '20px'
                      }}>
                        {currentProject.error ? '✗ Failed' : '✓ Success'}
                      </div>
                      <div className="analytics-subtitle">
                        {currentProject.error ? 'Error occurred' : 'Generated successfully'}
                      </div>
                    </div>
                    <div className="analytics-card">
                      <div className="analytics-title">Code Lines</div>
                      <div className="analytics-value">
                        {currentProject.code.split('\n').length.toLocaleString()}
                      </div>
                      <div className="analytics-subtitle">lines of code</div>
                    </div>
                    <div className="analytics-card">
                      <div className="analytics-title">Code Size</div>
                      <div className="analytics-value">
                        {(currentProject.code.length / 1024).toFixed(2)} KB
                      </div>
                      <div className="analytics-subtitle">source code size</div>
                    </div>
                    <div className="analytics-card">
                      <div className="analytics-title">Messages Used</div>
                      <div className="analytics-value">
                        {totalMessages}
                      </div>
                      <div className="analytics-subtitle">
                        {userMessages} user, {assistantMessages} AI
                      </div>
                    </div>
                  </div>

                  <h3 style={{ marginTop: '2rem' }}>Code Metrics</h3>
                  <div className="distribution-list">
                    <div className="distribution-item">
                      <div className="distribution-label">Raw Code</div>
                      <div className="distribution-bar">
                        <div 
                          className="distribution-fill" 
                          style={{ 
                            width: '100%',
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                          }}
                        />
                      </div>
                      <div className="distribution-value">
                        {(currentProject.code.length / 1024).toFixed(2)} KB
                      </div>
                    </div>
                    {currentProject.bundledCode && (
                      <div className="distribution-item">
                        <div className="distribution-label">Bundled Code</div>
                        <div className="distribution-bar">
                          <div 
                            className="distribution-fill" 
                            style={{ 
                              width: `${(currentProject.bundledCode.length / currentProject.code.length) * 100}%`,
                              background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                            }}
                          />
                        </div>
                        <div className="distribution-value">
                          {(currentProject.bundledCode.length / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    )}
                    <div className="distribution-item">
                      <div className="distribution-label">Compression Ratio</div>
                      <div className="distribution-bar">
                        <div 
                          className="distribution-fill" 
                          style={{ 
                            width: currentProject.bundledCode 
                              ? `${(1 - (currentProject.bundledCode.length / currentProject.code.length)) * 100}%`
                              : '0%',
                            background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
                          }}
                        />
                      </div>
                      <div className="distribution-value">
                        {currentProject.bundledCode
                          ? `${((1 - (currentProject.bundledCode.length / currentProject.code.length)) * 100).toFixed(1)}%`
                          : 'N/A'}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state" style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  color: '#6b7280'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
                  <p>No project analytics available yet</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <p className="dashboard-placeholder">
            {dashboardTab} content will be displayed here
          </p>
        );
    }
  };

  return (
    <div className="dashboard">
      {/* Side Panel with Tabs */}
      <aside className="dashboard-sidebar">
        <nav className="dashboard-nav">
          {DASHBOARD_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setDashboardTab(tab)}
              className={`dashboard-nav-item ${
                dashboardTab === tab ? 'active' : ''
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>{dashboardTab}</h2>
        </div>
        <div className="dashboard-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
