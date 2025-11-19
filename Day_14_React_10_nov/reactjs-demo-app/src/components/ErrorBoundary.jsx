import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isLoading: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  handleRetry = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ hasError: false, isLoading: false });
    }, 2000);
  };

  render() {
    const { hasError, isLoading } = this.state;
    const loaderUrl = "https://i.gifer.com/ZZ5H.gif"; 

    if (hasError) {
      if (isLoading) {
        return (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <img src={loaderUrl} alt="Loading..." width="80" height="80" />
            <p>Recovering component... please wait</p>
          </div>
        );
      }

      return (
        <div style={{ border: "2px solid red", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h3> Oops! Something went wrong.</h3>
          <p>This part of the app crashed. You can try again below.</p>
          <button onClick={this.handleRetry} style={{ padding: "8px 16px", background: "#ff4747", color: "#fff", border: "none", borderRadius: "4px" }}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
