import React from "react";
class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
