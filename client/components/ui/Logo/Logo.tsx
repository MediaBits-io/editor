import React from 'react';
import classNames from '../../../utils/classNames';
import ExternalLink from '../ExternalLink';

interface Props {
  className?: string;
}

function Logo({ className }: Props) {
  return (
    <ExternalLink
      className={classNames(
        'relative flex py-3.5 border-transparent border-t-2 border-b px-2 justify-center bg-gray-900',
        className
      )}
      to="https://app.mediabits.io"
      newTab
    >
      <svg className="h-6" viewBox="0 0 150 88" fill="none">
        <path
          d="M56.1 27.7C50.3 27.7 45.5 29.9 42 35C39.3 30.2 34.8 27.7 29.5 27.7C24.5 27.7 20.1 29.7 17 34.2V31.3C17 29.8 16.2 29 14.7 29H8.4C7 29 6.2 29.8 6.2 31.3V76.8C6.2 78.2 7 79 8.4 79H14.7C16.2 79 17 78.2 17 76.8V48.3C17 40.2 22 37.8 26 37.8C30 37.8 33.5 40 33.5 46V76.8C33.5 78.2 34.3 79 35.8 79H42.1C43.5 79 44.3 78.2 44.3 76.8V48.3C44.3 40.2 49.3 37.8 53.3 37.8C57.4 37.8 60.9 40 60.9 46V76.8C60.9 78.2 61.7 79 63.1 79H69.4C70.9 79 71.7 78.2 71.7 76.8V45.3C71.7 33.8 65.1 27.7 56 27.7H56.1Z"
          fill="white"
        />
        <path
          d="M114.95 27.5622C107.05 27.5622 101.15 30.8622 97.35 36.0622V11.1622C97.35 9.66218 96.55 8.86218 95.15 8.86218H88.85C87.35 8.86218 86.55 9.66218 86.55 11.1622V76.6622C86.55 78.0622 87.35 78.8622 88.85 78.8622H95.15C96.55 78.8622 97.35 78.0622 97.35 76.6622V71.7622C101.15 76.9622 107.05 80.1622 114.95 80.1622C128.55 80.1622 139.75 68.7622 139.75 53.8622C139.75 39.0622 128.55 27.5622 114.95 27.5622ZM113.15 69.8622C104.15 69.8622 97.35 63.1622 97.35 53.8622C97.35 44.5622 104.15 37.8622 113.15 37.8622C122.15 37.8622 128.95 44.5622 128.95 53.8622C128.95 63.1622 122.15 69.8622 113.15 69.8622Z"
          fill="#A4CAFE"
        />
      </svg>
    </ExternalLink>
  );
}

export default Logo;
