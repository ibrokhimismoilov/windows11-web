"use client";

import type React from "react";

import { useState } from "react";
import { Home, ArrowLeft, ArrowRight, RefreshCw, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function InternetExplorer() {
  const [url, setUrl] = useState("https://www.bing.com");
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-2 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Home className="h-4 w-4" />
          </Button>

          <form className="flex-1" onSubmit={handleNavigate}>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-8"
            />
          </form>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-xl mb-4">
                e
              </div>
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="h-16 w-16 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-2xl mb-6">
              e
            </div>
            <h2 className="text-2xl font-semibold mb-2">Internet Explorer</h2>
            <p className="text-gray-500 mb-6">Welcome to Internet Explorer</p>

            <div className="grid grid-cols-3 gap-6 max-w-3xl">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                <h3 className="font-medium mb-2">MSN</h3>
                <p className="text-sm text-gray-500">News, weather, and more</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                <h3 className="font-medium mb-2">Bing</h3>
                <p className="text-sm text-gray-500">Search the web</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                <h3 className="font-medium mb-2">Outlook</h3>
                <p className="text-sm text-gray-500">Check your email</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                <h3 className="font-medium mb-2">OneDrive</h3>
                <p className="text-sm text-gray-500">Cloud storage</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                <h3 className="font-medium mb-2">Office</h3>
                <p className="text-sm text-gray-500">Online productivity</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                <h3 className="font-medium mb-2">Microsoft 365</h3>
                <p className="text-sm text-gray-500">Subscribe now</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
