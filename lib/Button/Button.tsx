import React from 'react';

export interface LoadingScreenProps {
  text?: string;
  spinner?: boolean;
  spinnerSize?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const Button: React.FC<LoadingScreenProps> = ({
  text = "Loading...",
  spinner = true,
  spinnerSize = 30,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
  textColor = '#fff',
}) => {


  return (
    <button>asdasd: {text}</button>
  );
};