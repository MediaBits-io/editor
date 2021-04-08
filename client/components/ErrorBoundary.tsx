import { EmojiSadIcon } from '@heroicons/react/outline';
import React from 'react';
import MainArea from './layout/MainArea';
import Button from './ui/Button';
import ExternalLink from './ui/ExternalLink';

class ErrorBoundary extends React.Component {
  state = {
    error: '',
  };

  componentDidCatch(message: any, stack: any) {
    this.setState({
      error: JSON.stringify(
        {
          message: message.toString(),
          stack,
        },
        null,
        2
      ).replaceAll('\\n', '\n'),
    });
  }

  handleClickRefresh = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <MainArea className="h-screen">
        <div className="m-auto max-w-md text-center">
          <img
            src="/images/firefighter.svg"
            alt="Error"
            className="w-32 mx-auto mb-4"
          />
          <h1 className="flex items-center justify-center text-lg leading-6 font-medium text-gray-900 mb-2">
            Something went extremely wrong <EmojiSadIcon className="ml-1 w-5" />
          </h1>
          <div>
            Contact support via
            <ExternalLink
              className="mx-1"
              newTab
              to="mailto:support@mediabits.io"
            >
              support@mediabits.io
            </ExternalLink>
            for assistance, describing what you were doing and pasting this
            message:
            <pre className="text-left overflow-auto h-52 bg-gray-50 mt-2 p-2 rounded">
              {this.state.error}
            </pre>
            <div className="mt-4">
              You can refresh the page to clear this error.
            </div>
            <Button className="mt-2" onClick={this.handleClickRefresh}>
              Refresh
            </Button>
          </div>
        </div>
      </MainArea>
    );
  }
}

export default ErrorBoundary;
