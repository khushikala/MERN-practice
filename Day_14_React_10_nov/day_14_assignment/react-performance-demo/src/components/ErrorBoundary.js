import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red" }}>
          <h3>Something went wrong!</h3>
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
