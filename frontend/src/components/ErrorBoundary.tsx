import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react'

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can log the error to an external service:
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Please try refreshing the page, or Login Again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
