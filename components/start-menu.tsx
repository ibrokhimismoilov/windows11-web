"use client";

import {
  Search,
  Settings,
  Power,
  User,
  FileText,
  ImageIcon,
  Folder,
  Mail,
  Calendar,
  Store,
  Chrome,
  Monitor,
  Trash2,
  LogOut,
  Lock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface StartMenuProps {
  openWindow: (id: string, title: string, icon: string) => void;
  toggleStartMenu: () => void;
}

export function StartMenu({ openWindow, toggleStartMenu }: StartMenuProps) {
  const pinnedApps = [
    {
      id: "edge",
      title: "Edge",
      icon: <Chrome className="h-6 w-6 text-blue-500" />,
    },
    {
      id: "word",
      title: "Word",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
    },
    {
      id: "excel",
      title: "Excel",
      icon: (
        <div className="h-6 w-6 flex items-center justify-center bg-green-600 text-white rounded-sm">
          X
        </div>
      ),
    },
    {
      id: "powerpoint",
      title: "PowerPoint",
      icon: (
        <div className="h-6 w-6 flex items-center justify-center bg-orange-600 text-white rounded-sm">
          P
        </div>
      ),
    },
    {
      id: "mail",
      title: "Mail",
      icon: <Mail className="h-6 w-6 text-blue-400" />,
    },
    {
      id: "photos",
      title: "Photos",
      icon: <ImageIcon className="h-6 w-6 text-blue-400" />,
    },
    {
      id: "settings",
      title: "Settings",
      icon: <Settings className="h-6 w-6 text-gray-600" />,
    },
    {
      id: "calendar",
      title: "Calendar",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
    },
    {
      id: "store",
      title: "Store",
      icon: <Store className="h-6 w-6 text-blue-500" />,
    },
    {
      id: "this-pc",
      title: "This PC",
      icon: <Monitor className="h-6 w-6 text-blue-500" />,
    },
    {
      id: "explorer",
      title: "Explorer",
      icon: (
        <div className="h-6 w-6 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold">
          e
        </div>
      ),
    },
    {
      id: "recycle-bin",
      title: "Recycle Bin",
      icon: <Trash2 className="h-6 w-6 text-gray-600" />,
    },
  ];

  const recommendedItems = [
    {
      id: "documents",
      title: "Documents",
      icon: <FileText className="h-5 w-5 text-blue-400" />,
      lastOpened: "11:20 AM",
    },
    {
      id: "downloads",
      title: "Downloads",
      icon: <Folder className="h-5 w-5 text-blue-500" />,
      lastOpened: "Yesterday",
    },
    {
      id: "pictures",
      title: "Pictures",
      icon: <ImageIcon className="h-5 w-5 text-blue-400" />,
      lastOpened: "Monday",
    },
    {
      id: "personalization",
      title: "Personalization",
      icon: (
        <div className="h-5 w-5 flex items-center justify-center bg-purple-500 rounded-md text-white">
          🎨
        </div>
      ),
      lastOpened: "Tuesday",
    },
  ];

  const handleAppClick = (id: string, title: string) => {
    openWindow(id, title, id);
    toggleStartMenu();
  };

  return (
    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[650px] h-[600px] bg-black/30 backdrop-blur-xl rounded-lg p-4 text-white shadow-lg border border-white/20">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <Input
            placeholder="Type here to search"
            className="bg-black/20 border-white/10 text-white placeholder:text-white/50"
            // prefix={<Search className="h-4 w-4 text-white/50 mr-2" />}
          />
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Pinned</h3>
          <div className="grid grid-cols-6 gap-2">
            {pinnedApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => handleAppClick(app.id, app.title)}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-black/20 mb-1">
                  {app.icon}
                </div>
                <span className="text-xs text-center">{app.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Recommended</h3>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              More
            </Button>
          </div>
          <ScrollArea className="h-32">
            <div className="space-y-1">
              {recommendedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                  onClick={() => handleAppClick(item.id, item.title)}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-md bg-black/20 mr-3">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm">{item.title}</span>
                    <div className="text-xs text-white/60">
                      {item.lastOpened}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="mt-auto">
          <div className="flex items-center p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 mr-3">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm">User</span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-white/80"
            >
              <Power className="h-4 w-4" />
              <span>Shut down</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-white/80"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-white/80"
            >
              <Lock className="h-4 w-4" />
              <span>Lock</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
