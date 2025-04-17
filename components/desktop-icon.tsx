"use client";

import type React from "react";

import { useState } from "react";
import type { ReactNode } from "react";

interface DesktopIconProps {
  id: string;
  title: string;
  icon: ReactNode;
  onClick: () => void;
  onDelete: () => void;
}

export function DesktopIcon({
  id,
  title,
  icon,
  onClick,
  onDelete,
}: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    // Deselect after a short delay for visual feedback
    setTimeout(() => setIsSelected(false), 300);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Context menu logic could be added here
  };

  return (
    <div
      className={`flex flex-col items-center w-20 cursor-pointer group`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <div
        className={`p-2 rounded-lg ${
          isSelected ? "bg-white/30" : "group-hover:bg-white/20"
        } transition-colors`}
      >
        {icon}
      </div>
      <span
        className={`mt-1 text-xs text-white font-medium text-center px-1 py-0.5 rounded ${
          isSelected ? "bg-blue-500/70" : ""
        } w-full`}
      >
        {title}
      </span>
    </div>
  );
}
