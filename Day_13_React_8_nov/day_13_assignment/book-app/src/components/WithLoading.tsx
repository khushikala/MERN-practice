import React from 'react';

interface WithLoadingProps {
  isLoading: boolean;
}

const WithLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P & WithLoadingProps) => {
    const { isLoading, ...restProps } = props;
    if (isLoading) {
      return <div className="text-center">Loading...</div>;
    }
    return <WrappedComponent {...(restProps as P)} />;
  };
};

export default WithLoading;
