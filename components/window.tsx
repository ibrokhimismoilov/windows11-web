"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Minus,
  Folder,
  FileText,
  Settings,
  Chrome,
  Store,
  Monitor,
  Trash2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WindowContent } from "@/components/window-content";
import type { WindowType, DeletedItemType } from "@/app/page";

interface WindowProps {
  window: WindowType;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onActivate: () => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  deletedItems: DeletedItemType[];
  changeWallpaper: (wallpaper: string) => void;
}

export function Window({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onActivate,
  updatePosition,
  updateSize,
  deletedItems,
  changeWallpaper,
}: WindowProps) {
  const { id, title, icon, position, size, isMaximized, zIndex } = window;

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({
    width: 0,
    height: 0,
  });

  const windowRef = useRef<HTMLDivElement>(null);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Computer":
        return <Monitor className="h-5 w-5 text-blue-500" />;
      case "Folder":
        return <Folder className="h-5 w-5 text-blue-500" />;
      case "Trash":
        return <Trash2 className="h-5 w-5 text-gray-600" />;
      case "FileText":
        return <FileText className="h-5 w-5 text-blue-400" />;
      case "Settings":
        return <Settings className="h-5 w-5 text-gray-600" />;
      case "Chrome":
        return <Chrome className="h-5 w-5 text-blue-600" />;
      case "Explorer":
        return (
          <div className="h-5 w-5 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-xs">
            e
          </div>
        );
      case "Store":
        return <Store className="h-5 w-5 text-blue-500" />;
      default:
        return <Folder className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;

    onActivate();
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updatePosition(id, {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    } else if (isResizing && resizeDirection) {
      e.preventDefault();

      const deltaX = e.clientX - resizeStartPos.x;
      const deltaY = e.clientY - resizeStartPos.y;

      let newWidth = resizeStartSize.width;
      let newHeight = resizeStartSize.height;
      let newX = position.x;
      let newY = position.y;

      if (resizeDirection.includes("e")) {
        newWidth = Math.max(300, resizeStartSize.width + deltaX);
      }
      if (resizeDirection.includes("s")) {
        newHeight = Math.max(200, resizeStartSize.height + deltaY);
      }
      if (resizeDirection.includes("w")) {
        newWidth = Math.max(300, resizeStartSize.width - deltaX);
        newX =
          resizeStartSize.width - deltaX < 300
            ? position.x
            : position.x + deltaX;
      }
      if (resizeDirection.includes("n")) {
        newHeight = Math.max(200, resizeStartSize.height - deltaY);
        newY =
          resizeStartSize.height - deltaY < 200
            ? position.y
            : position.y + deltaY;
      }

      updateSize(id, { width: newWidth, height: newHeight });
      if (resizeDirection.includes("w") || resizeDirection.includes("n")) {
        updatePosition(id, { x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };

  const startResize = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;

    e.preventDefault();
    e.stopPropagation();

    onActivate();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
    setResizeStartSize({ width: size.width, height: size.height });
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      global.window.addEventListener("mousemove", handleMouseMove);

      global.window.addEventListener("mouseup", handleMouseUp);
    } else {
      global.window.removeEventListener("mousemove", handleMouseMove);

      global.window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      global.window.removeEventListener("mousemove", handleMouseMove);
      global.window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDirection]);

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute bg-white rounded-lg shadow-xl overflow-hidden flex flex-col",
        isActive ? "ring-1 ring-blue-500" : "ring-1 ring-gray-300",
        isMaximized ? "top-0 left-0 right-0 bottom-12" : ""
      )}
      style={
        isMaximized
          ? { width: "100%", height: "calc(100% - 48px)", zIndex }
          : {
              width: `${size.width}px`,
              height: `${size.height}px`,
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex,
            }
      }
      onClick={onActivate}
    >
      <div
        className={`h-10 ${
          isActive ? "bg-gray-100" : "bg-gray-200"
        } flex items-center px-3 cursor-move`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {getIconComponent(icon)}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="ml-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onMinimize}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onMaximize}
          >
            {isMaximized ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-red-500 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto relative">
        <WindowContent
          id={id}
          deletedItems={deletedItems}
          changeWallpaper={changeWallpaper}
        />
      </div>

      {/* Resize handles */}
      {!isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-50"
            onMouseDown={(e) => startResize(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-50"
            onMouseDown={(e) => startResize(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50"
            onMouseDown={(e) => startResize(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50"
            onMouseDown={(e) => startResize(e, "se")}
          />
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize z-50"
            onMouseDown={(e) => startResize(e, "n")}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize z-50"
            onMouseDown={(e) => startResize(e, "s")}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize z-50"
            onMouseDown={(e) => startResize(e, "w")}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize z-50"
            onMouseDown={(e) => startResize(e, "e")}
          />
        </>
      )}
    </div>
  );
}
