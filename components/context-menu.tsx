"use client";

import {
  View,
  RefreshCw,
  Folder,
  FileText,
  Settings,
  Palette,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContextMenuProps {
  x: number;
  y: number;
  openWindow: (id: string, title: string, icon: string) => void;
  changeWallpaper: (wallpaper: string) => void;
}

export function ContextMenu({
  x,
  y,
  openWindow,
  changeWallpaper,
}: ContextMenuProps) {
  const handleItemClick = (action: string) => {
    switch (action) {
      case "view":
        // Handle view action
        break;
      case "refresh":
        window.location.reload();
        break;
      case "new-folder":
        // Handle new folder action
        break;
      case "personalize":
        openWindow("personalization", "Personalization", "Personalize");
        break;
      case "settings":
        openWindow("settings", "Settings", "Settings");
        break;
      case "this-pc":
        openWindow("this-pc", "This PC", "Computer");
        break;
      case "recycle-bin":
        openWindow("recycle-bin", "Recycle Bin", "Trash");
        break;
      case "wallpaper1":
        changeWallpaper(
          "/placeholder.svg?height=1080&width=1920&text=Wallpaper+1"
        );
        break;
      case "wallpaper2":
        changeWallpaper(
          "/placeholder.svg?height=1080&width=1920&text=Wallpaper+2"
        );
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="absolute bg-white shadow-lg rounded-md border overflow-hidden z-50 w-64"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        maxWidth: "calc(100vw - 20px)",
        maxHeight: "calc(100vh - 20px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("view")}
        >
          <View className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("refresh")}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="border-t py-1">
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("new-folder")}
        >
          <Folder className="h-4 w-4 mr-2" />
          New folder
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("new-file")}
        >
          <FileText className="h-4 w-4 mr-2" />
          New text document
        </Button>
      </div>

      <div className="border-t py-1">
        <div className="px-3 py-1 text-xs text-gray-500">Change wallpaper</div>
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("wallpaper1")}
        >
          Wallpaper 1
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("wallpaper2")}
        >
          Wallpaper 2
        </Button>
      </div>

      <div className="border-t py-1">
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("personalize")}
        >
          <Palette className="h-4 w-4 mr-2" />
          Personalize
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("settings")}
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="border-t py-1">
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("this-pc")}
        >
          <Folder className="h-4 w-4 mr-2" />
          This PC
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 h-9 text-sm"
          onClick={() => handleItemClick("recycle-bin")}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Recycle Bin
        </Button>
      </div>
    </div>
  );
}
