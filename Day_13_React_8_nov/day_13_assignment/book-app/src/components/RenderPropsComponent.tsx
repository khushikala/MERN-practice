import React from 'react';

interface RenderPropsComponentProps {
  render: (data: { message: string }) => React.ReactNode;
}

const RenderPropsComponent: React.FC<RenderPropsComponentProps> = ({ render }) => {
  const data = { message: "Welcome to BookVerse!" };
  return <>{render(data)}</>;
};

export default RenderPropsComponent;
