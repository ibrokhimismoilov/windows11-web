"use client";

import {
  Folder,
  HardDrive,
  Monitor,
  Cpu,
  Database,
  Network,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ThisPC() {
  const drives = [
    {
      name: "Local Disk (C:)",
      icon: <HardDrive className="h-10 w-10 text-blue-500" />,
      total: "256 GB",
      free: "120.5 GB",
    },
    {
      name: "Local Disk (D:)",
      icon: <HardDrive className="h-10 w-10 text-blue-500" />,
      total: "512 GB",
      free: "350.2 GB",
    },
  ];

  const folders = [
    { name: "Desktop", icon: <Folder className="h-10 w-10 text-yellow-500" /> },
    {
      name: "Documents",
      icon: <Folder className="h-10 w-10 text-yellow-500" />,
    },
    {
      name: "Downloads",
      icon: <Folder className="h-10 w-10 text-yellow-500" />,
    },
    { name: "Music", icon: <Folder className="h-10 w-10 text-yellow-500" /> },
    {
      name: "Pictures",
      icon: <Folder className="h-10 w-10 text-yellow-500" />,
    },
    { name: "Videos", icon: <Folder className="h-10 w-10 text-yellow-500" /> },
  ];

  const devices = [
    {
      name: "Processor",
      icon: <Cpu className="h-10 w-10 text-gray-500" />,
      info: "Intel Core i7",
    },
    {
      name: "Memory",
      icon: <Database className="h-10 w-10 text-gray-500" />,
      info: "16 GB RAM",
    },
    {
      name: "Network",
      icon: <Network className="h-10 w-10 text-gray-500" />,
      info: "Connected",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-100 p-3 border-b flex items-center">
        <div className="flex items-center">
          <Monitor className="h-5 w-5 mr-2 text-blue-500" />
          <span className="font-medium">This PC</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Devices and drives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drives.map((drive) => (
                <div
                  key={drive.name}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start">
                    {drive.icon}
                    <div className="ml-3">
                      <h4 className="font-medium">{drive.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1 mb-1">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${
                                (Number.parseFloat(drive.free) /
                                  Number.parseFloat(drive.total)) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span>
                          {drive.free} free of {drive.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Folders</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {folders.map((folder) => (
                <div
                  key={folder.name}
                  className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  {folder.icon}
                  <span className="mt-2 text-sm text-center">
                    {folder.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">System devices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {devices.map((device) => (
                <div
                  key={device.name}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    {device.icon}
                    <div className="ml-3">
                      <h4 className="font-medium">{device.name}</h4>
                      <p className="text-sm text-gray-500">{device.info}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
