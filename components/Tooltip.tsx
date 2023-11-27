"use client";
import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <span className="px-2 py-1 rounded-md z-50 w-40 absolute top-0 left-8 text-[12px] bg-[#eff7ff] text-[#768fb8]">
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
