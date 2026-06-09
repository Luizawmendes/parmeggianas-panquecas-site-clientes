import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  id?: string;
}

export function Logo({ className = '', size = 80, id }: LogoProps) {
  return (
    <svg 
      id={id}
      width={size} 
      height={size} 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer red thin circle */}
      <circle cx="250" cy="250" r="235" stroke="#E22020" strokeWidth="20" fill="white" />
      
      {/* Chef Hat Shape */}
      {/* Central lobe */}
      <circle cx="250" cy="205" r="105" fill="#E22020" />
      {/* Left lobe */}
      <circle cx="168" cy="260" r="82" fill="#E22020" />
      {/* Right lobe */}
      <circle cx="332" cy="260" r="82" fill="#E22020" />
      {/* Main middle body/base */}
      <rect x="136" y="260" width="228" height="135" rx="12" fill="#E22020" />
      {/* Detached bottom capsule line */}
      <rect x="140" y="405" width="220" height="23" rx="11.5" fill="#E22020" />
      
      {/* White text "P" on left */}
      <text 
        x="195" 
        y="320" 
        fill="white" 
        fontWeight="900" 
        fontSize="130" 
        fontFamily="sans-serif" 
        textAnchor="middle"
      >
        P
      </text>
      
      {/* White text "P" on right */}
      <text 
        x="305" 
        y="320" 
        fill="white" 
        fontWeight="900" 
        fontSize="130" 
        fontFamily="sans-serif" 
        textAnchor="middle"
      >
        P
      </text>
      
      {/* White circle background for ampersand in the middle */}
      <circle cx="250" cy="255" r="32" fill="white" />
      
      {/* Red ampersand "&" in the middle */}
      <text 
        x="249" 
        y="268" 
        fill="#E22020" 
        fontWeight="900" 
        fontSize="48" 
        fontFamily="sans-serif" 
        textAnchor="middle"
      >
        &amp;
      </text>
    </svg>
  );
}
