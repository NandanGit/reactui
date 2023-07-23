import React from 'react';
import background from './assets/background.svg';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hideCard?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  style = {},
  horizontal = false,
  hideCard = false,
}) => {
  return (
    <div
      className={`h-[95vh] w-full flex items-center justify-center bg-[url(./assets/background.svg)]`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        ...style,
      }}
    >
      <div
        className={`${className} ${!hideCard ? 'glass' : ''} flex ${
          horizontal ? 'flex-row space-x-2' : 'flex-col space-y-2'
        } justify-center items-center h-2/3 w-2/3`}
      >
        {children}
      </div>
    </div>
  );
};
