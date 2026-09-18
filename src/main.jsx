import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '30px',
          background: '#fee2e2',
          color: '#991b1b',
          border: '2px solid #f87171',
          borderRadius: '12px',
          margin: '40px',
          fontFamily: 'monospace',
          position: 'relative',
          zIndex: 99999
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>React Runtime Error</h2>
          <p style={{ fontWeight: 'semibold' }}>{this.state.error?.toString()}</p>
          <pre style={{ marginTop: '15px', whiteSpace: 'pre-wrap', fontSize: '12px', background: '#fca5a5', padding: '15px', borderRadius: '6px' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
