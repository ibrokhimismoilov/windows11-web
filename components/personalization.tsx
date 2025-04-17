"use client";

import { useState } from "react";
import { ImageIcon, Palette, Monitor, MousePointer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PersonalizationProps {
  changeWallpaper: (wallpaper: string) => void;
}

export function Personalization({ changeWallpaper }: PersonalizationProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState(
    "/placeholder.svg?height=1080&width=1920"
  );
  const [selectedTheme, setSelectedTheme] = useState("light");

  const wallpapers = [
    {
      id: "default",
      src: "/placeholder.svg?height=1080&width=1920",
      name: "Default",
    },
    {
      id: "blue",
      src: "/placeholder.svg?height=1080&width=1920&text=Blue+Theme",
      name: "Blue",
    },
    {
      id: "dark",
      src: "/placeholder.svg?height=1080&width=1920&text=Dark+Theme",
      name: "Dark",
    },
    {
      id: "nature",
      src: "/placeholder.svg?height=1080&width=1920&text=Nature",
      name: "Nature",
    },
    {
      id: "abstract",
      src: "/placeholder.svg?height=1080&width=1920&text=Abstract",
      name: "Abstract",
    },
    {
      id: "minimal",
      src: "/placeholder.svg?height=1080&width=1920&text=Minimal",
      name: "Minimal",
    },
  ];

  const handleWallpaperChange = (src: string) => {
    setSelectedWallpaper(src);
  };

  const applyChanges = () => {
    changeWallpaper(selectedWallpaper);
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold mb-6">Personalization</h2>

      <Tabs defaultValue="background" className="h-[calc(100%-3rem)]">
        <TabsList>
          <TabsTrigger value="background" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Background
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="themes" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Themes
          </TabsTrigger>
          <TabsTrigger value="mouse" className="flex items-center gap-2">
            <MousePointer className="h-4 w-4" />
            Mouse pointer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="background" className="h-[calc(100%-2rem)] mt-4">
          <div className="flex h-full gap-6">
            <div className="w-1/3">
              <h3 className="text-lg font-medium mb-4">
                Choose your background
              </h3>
              <RadioGroup
                value={selectedWallpaper}
                onValueChange={handleWallpaperChange}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="/placeholder.svg?height=1080&width=1920&text=Picture"
                    id="picture"
                  />
                  <Label htmlFor="picture">Picture</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="/placeholder.svg?height=1080&width=1920&text=Solid+Color"
                    id="solid"
                  />
                  <Label htmlFor="solid">Solid color</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="/placeholder.svg?height=1080&width=1920&text=Slideshow"
                    id="slideshow"
                  />
                  <Label htmlFor="slideshow">Slideshow</Label>
                </div>
              </RadioGroup>

              <h3 className="text-lg font-medium mt-6 mb-4">Choose a fit</h3>
              <RadioGroup defaultValue="fill" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fill" id="fill" />
                  <Label htmlFor="fill">Fill</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fit" id="fit" />
                  <Label htmlFor="fit">Fit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stretch" id="stretch" />
                  <Label htmlFor="stretch">Stretch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tile" id="tile" />
                  <Label htmlFor="tile">Tile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="center" id="center" />
                  <Label htmlFor="center">Center</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="span" id="span" />
                  <Label htmlFor="span">Span</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-medium mb-4">Choose your picture</h3>
              <ScrollArea className="h-[calc(100%-8rem)]">
                <div className="grid grid-cols-3 gap-4">
                  {wallpapers.map((wallpaper) => (
                    <div
                      key={wallpaper.id}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedWallpaper === wallpaper.src
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                      onClick={() => handleWallpaperChange(wallpaper.src)}
                    >
                      <img
                        src={wallpaper.src || "/placeholder.svg"}
                        alt={wallpaper.name}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                        {wallpaper.name}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="mt-4 flex justify-end">
                <Button onClick={applyChanges}>Apply</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="h-[calc(100%-2rem)] mt-4">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-medium mb-4">Choose your color mode</h3>
            <RadioGroup
              value={selectedTheme}
              onValueChange={setSelectedTheme}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom</Label>
              </div>
            </RadioGroup>

            <h3 className="text-lg font-medium mt-6 mb-4">Accent color</h3>
            <div className="grid grid-cols-6 gap-2">
              {[
                "bg-blue-500",
                "bg-purple-500",
                "bg-pink-500",
                "bg-red-500",
                "bg-orange-500",
                "bg-yellow-500",
                "bg-green-500",
                "bg-teal-500",
                "bg-cyan-500",
                "bg-gray-500",
                "bg-gray-700",
                "bg-gray-900",
              ].map((color) => (
                <div
                  key={color}
                  className={`${color} w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2`}
                />
              ))}
            </div>

            <div className="mt-auto flex justify-end">
              <Button>Apply</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="themes" className="h-[calc(100%-2rem)] mt-4">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-medium mb-4">Choose a theme</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <div className="aspect-video bg-blue-100 rounded-md mb-3"></div>
                <h4 className="font-medium">Windows (light)</h4>
                <p className="text-sm text-gray-500">Default Windows theme</p>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <div className="aspect-video bg-gray-800 rounded-md mb-3"></div>
                <h4 className="font-medium">Windows (dark)</h4>
                <p className="text-sm text-gray-500">Dark Windows theme</p>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-500 rounded-md mb-3"></div>
                <h4 className="font-medium">Sunrise</h4>
                <p className="text-sm text-gray-500">Colorful sunrise theme</p>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <div className="aspect-video bg-gradient-to-r from-green-400 to-blue-500 rounded-md mb-3"></div>
                <h4 className="font-medium">Flow</h4>
                <p className="text-sm text-gray-500">Flowing colors theme</p>
              </div>
            </div>

            <div className="mt-auto flex justify-end">
              <Button>Apply</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mouse" className="h-[calc(100%-2rem)] mt-4">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-medium mb-4">Mouse pointer style</h3>
            <RadioGroup defaultValue="default" className="space-y-4">
              <div className="flex items-center space-x-2 p-2 border rounded-lg">
                <RadioGroupItem value="default" id="default-pointer" />
                <Label htmlFor="default-pointer" className="flex items-center">
                  <MousePointer className="h-5 w-5 mr-2" />
                  Default (white)
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded-lg">
                <RadioGroupItem value="black" id="black-pointer" />
                <Label htmlFor="black-pointer" className="flex items-center">
                  <MousePointer className="h-5 w-5 mr-2 text-black" />
                  Black
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded-lg">
                <RadioGroupItem value="large" id="large-pointer" />
                <Label htmlFor="large-pointer" className="flex items-center">
                  <MousePointer className="h-6 w-6 mr-2" />
                  Large white
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded-lg">
                <RadioGroupItem value="large-black" id="large-black-pointer" />
                <Label
                  htmlFor="large-black-pointer"
                  className="flex items-center"
                >
                  <MousePointer className="h-6 w-6 mr-2 text-black" />
                  Large black
                </Label>
              </div>
            </RadioGroup>

            <div className="mt-auto flex justify-end">
              <Button>Apply</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
