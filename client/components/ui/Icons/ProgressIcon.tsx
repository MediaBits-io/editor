import React from 'react';

function ProgressIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" d="M0 5v6h16v-6h-16zM15 10h-14v-4h14v4z" />
      <path fill="currentColor" d="M2 7h7v2h-7v-2z" />
    </svg>
  );
}

export default ProgressIcon;
