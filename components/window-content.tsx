"use client";

import { Search, Chrome, Monitor, Wifi, Volume2, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ThisPC } from "@/components/this-pc";
import { RecycleBin } from "@/components/recycle-bin";
import { InternetExplorer } from "@/components/internet-explorer";
import { Personalization } from "@/components/personalization";
import type { DeletedItemType } from "@/app/page";

interface WindowContentProps {
  id: string;
  deletedItems: DeletedItemType[];
  changeWallpaper: (wallpaper: string) => void;
}

export function WindowContent({
  id,
  deletedItems,
  changeWallpaper,
}: WindowContentProps) {
  switch (id) {
    case "settings":
      return (
        <div className="p-6 h-full">
          <Tabs defaultValue="system" className="h-full">
            <div className="flex h-full">
              <div className="w-64 pr-6 border-r">
                <Input
                  placeholder="Find a setting"
                  className="mb-4"
                  // prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <TabsList className="flex flex-col items-start h-auto bg-transparent space-y-1">
                  <TabsTrigger
                    value="system"
                    className="w-full justify-start px-3"
                  >
                    <Monitor className="h-5 w-5 mr-2" />
                    System
                  </TabsTrigger>
                  <TabsTrigger
                    value="personalization"
                    className="w-full justify-start px-3"
                  >
                    <Palette className="h-5 w-5 mr-2" />
                    Personalization
                  </TabsTrigger>
                  <TabsTrigger
                    value="network"
                    className="w-full justify-start px-3"
                  >
                    <Wifi className="h-5 w-5 mr-2" />
                    Network & Internet
                  </TabsTrigger>
                  <TabsTrigger
                    value="sound"
                    className="w-full justify-start px-3"
                  >
                    <Volume2 className="h-5 w-5 mr-2" />
                    Sound
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 pl-6">
                <TabsContent value="system" className="mt-0 h-full">
                  <h2 className="text-2xl font-semibold mb-6">System</h2>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Display</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Night light</h4>
                          <p className="text-sm text-muted-foreground">
                            Reduce blue light emission
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Brightness</h4>
                        <Slider defaultValue={[75]} max={100} step={1} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Power & battery</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Power mode</h4>
                          <p className="text-sm text-muted-foreground">
                            Balanced
                          </p>
                        </div>
                        <Button variant="outline">Change</Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">About</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Device name
                          </span>
                          <span>DESKTOP-WIN11</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Windows version
                          </span>
                          <span>Windows 11 Pro</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Processor
                          </span>
                          <span>Intel Core i7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="personalization" className="mt-0 h-full">
                  <Personalization changeWallpaper={changeWallpaper} />
                </TabsContent>

                <TabsContent value="network" className="mt-0 h-full">
                  <h2 className="text-2xl font-semibold mb-6">
                    Network & Internet
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Wi-Fi</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Wi-Fi</h4>
                          <p className="text-sm text-muted-foreground">
                            Connected
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Home Network</h4>
                            <p className="text-sm text-muted-foreground">
                              Connected
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Properties
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sound" className="mt-0 h-full">
                  <h2 className="text-2xl font-semibold mb-6">Sound</h2>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Volume</h3>
                      <div className="space-y-2">
                        <h4 className="font-medium">Master volume</h4>
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-5 w-5 text-muted-foreground" />
                          <Slider
                            defaultValue={[65]}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Output</h3>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Speakers</h4>
                            <p className="text-sm text-muted-foreground">
                              Default device
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      );
    case "this-pc":
      return <ThisPC />;
    case "recycle-bin":
      return <RecycleBin deletedItems={deletedItems} />;
    case "explorer":
      return <InternetExplorer />;
    case "edge":
      return (
        <div className="flex flex-col h-full">
          <div className="flex items-center bg-gray-100 p-2 border-b">
            <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-1 flex-1 mx-2">
              <Search className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400 text-sm">
                Search or enter web address
              </span>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 flex items-center justify-center">
            <div className="text-center">
              <Chrome className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Microsoft Edge</h2>
              <p className="text-gray-500">Welcome to the new Microsoft Edge</p>
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <h3 className="font-medium">New tab</h3>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <h3 className="font-medium">New window</h3>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <h3 className="font-medium">New private window</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "personalization":
      return <Personalization changeWallpaper={changeWallpaper} />;
    default:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-semibold">{id}</h2>
            <p className="text-gray-500 mt-2">Window content for {id}</p>
          </div>
        </div>
      );
  }
}
