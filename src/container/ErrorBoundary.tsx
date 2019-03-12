import * as React from "react";
interface State {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}
export class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      info: undefined,
    };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true });
    console.error(`[ErrorBoundary] message: ${error.message}, info: ${info}`);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>エラーが発生しました</h1>
          {this.state.error && (
            <>
              <p>error name: {this.state.error.name}</p>
              <p>error message: {this.state.error.message}</p>
            </>
          )}
          {this.state.info && (
            <>
              <p>info: {this.state.info}</p>
            </>
          )}
        </>
      );
    }
    return this.props.children;
  }
}
