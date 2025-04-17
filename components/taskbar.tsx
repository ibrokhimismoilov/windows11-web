"use client";

import {
  Search,
  Home,
  Chrome,
  FileText,
  Folder,
  Settings,
  Store,
  Monitor,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { WindowType } from "@/app/page";

interface TaskbarProps {
  toggleStartMenu: () => void;
  isStartMenuOpen: boolean;
  openWindows: WindowType[];
  openWindow: (id: string, title: string, icon: string) => void;
  activeWindowId: string | null;
}

export function Taskbar({
  toggleStartMenu,
  isStartMenuOpen,
  openWindows,
  openWindow,
  activeWindowId,
}: TaskbarProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Computer":
        return <Monitor className="h-5 w-5" />;
      case "Folder":
        return <Folder className="h-5 w-5" />;
      case "Trash":
        return <Trash2 className="h-5 w-5" />;
      case "FileText":
        return <FileText className="h-5 w-5" />;
      case "Settings":
        return <Settings className="h-5 w-5" />;
      case "Chrome":
        return <Chrome className="h-5 w-5" />;
      case "Explorer":
        return (
          <div className="h-5 w-5 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-xs">
            e
          </div>
        );
      case "Store":
        return <Store className="h-5 w-5" />;
      default:
        return <Folder className="h-5 w-5" />;
    }
  };

  const taskbarApps = [
    { id: "search", icon: <Search className="h-5 w-5" />, title: "Search" },
    {
      id: "edge",
      icon: <Chrome className="h-5 w-5" />,
      title: "Microsoft Edge",
    },
    {
      id: "explorer",
      icon: (
        <div className="h-5 w-5 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-xs">
          e
        </div>
      ),
      title: "Internet Explorer",
    },
    { id: "this-pc", icon: <Monitor className="h-5 w-5" />, title: "This PC" },
    {
      id: "settings",
      icon: <Settings className="h-5 w-5" />,
      title: "Settings",
    },
    {
      id: "store",
      icon: <Store className="h-5 w-5" />,
      title: "Microsoft Store",
    },
  ];

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/10 backdrop-blur-md flex items-center px-2 border-t border-white/20">
      <div className="flex-1 flex items-center justify-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-md ${isStartMenuOpen ? "bg-white/20" : ""}`}
                onClick={toggleStartMenu}
              >
                <Home className="h-5 w-5 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Start</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {taskbarApps.map((app) => (
          <TooltipProvider key={app.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-md ${
                    openWindows.some((w) => w.id === app.id && !w.minimized)
                      ? "bg-white/20"
                      : ""
                  } ${
                    activeWindowId === app.id ? "border-b-2 border-white" : ""
                  }`}
                  onClick={() => openWindow(app.id, app.title, app.id)}
                >
                  {app.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{app.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {/* Task bar window indicators */}
        {openWindows
          .filter((window) => !taskbarApps.some((app) => app.id === window.id))
          .map((window) => (
            <TooltipProvider key={window.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-md ${
                      !window.minimized ? "bg-white/20" : ""
                    } ${
                      activeWindowId === window.id
                        ? "border-b-2 border-white"
                        : ""
                    }`}
                    onClick={() =>
                      openWindow(window.id, window.title, window.icon)
                    }
                  >
                    {getIconComponent(window.icon)}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{window.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
      </div>

      <div className="flex flex-col items-center text-white text-xs mr-2">
        <span>{currentTime}</span>
        <span>{currentDate}</span>
      </div>
    </div>
  );
}
