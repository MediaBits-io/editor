import React from 'react';

function SubtitlesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <g clipPath="url(#clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm-6-4h8v2h-8v-2z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" transform="translate(2 4)" d="M0 0h20v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SubtitlesIcon;
