"use client";

import { useState } from "react";
import { DesktopIcon } from "@/components/desktop-icon";
import {
  Folder,
  FileText,
  Settings,
  Chrome,
  Store,
  Trash2,
  Monitor,
} from "lucide-react";

interface DesktopProps {
  openWindow: (id: string, title: string, icon: string) => void;
  deleteItem: (id: string, name: string, type: string, icon: string) => void;
}

export function Desktop({ openWindow, deleteItem }: DesktopProps) {
  const [icons] = useState([
    { id: "this-pc", title: "This PC", icon: "Computer" },
    { id: "recycle-bin", title: "Recycle Bin", icon: "Trash" },
    { id: "documents", title: "Documents", icon: "FileText" },
    { id: "settings", title: "Settings", icon: "Settings" },
    { id: "edge", title: "Microsoft Edge", icon: "Chrome" },
    { id: "explorer", title: "Internet Explorer", icon: "Explorer" },
    { id: "store", title: "Microsoft Store", icon: "Store" },
    { id: "personalization", title: "Personalization", icon: "Personalize" },
  ]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Computer":
        return <Monitor className="h-10 w-10 text-blue-500" />;
      case "Trash":
        return <Trash2 className="h-10 w-10 text-gray-600" />;
      case "FileText":
        return <FileText className="h-10 w-10 text-blue-400" />;
      case "Settings":
        return <Settings className="h-10 w-10 text-gray-600" />;
      case "Chrome":
        return <Chrome className="h-10 w-10 text-blue-600" />;
      case "Explorer":
        return (
          <div className="h-10 w-10 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold">
            e
          </div>
        );
      case "Store":
        return <Store className="h-10 w-10 text-blue-500" />;
      case "Personalize":
        return (
          <div className="h-10 w-10 flex items-center justify-center bg-purple-500 rounded-md text-white">
            🎨
          </div>
        );
      default:
        return <Folder className="h-10 w-10 text-blue-500" />;
    }
  };

  return (
    <div className="absolute top-0 left-0 p-4 grid grid-cols-1 gap-6">
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          title={icon.title}
          icon={getIconComponent(icon.icon)}
          onClick={() => openWindow(icon.id, icon.title, icon.icon)}
          onDelete={() => deleteItem(icon.id, icon.title, "folder", icon.icon)}
        />
      ))}
    </div>
  );
}
