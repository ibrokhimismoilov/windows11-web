"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Desktop } from "@/components/desktop";
import { Taskbar } from "@/components/taskbar";
import { StartMenu } from "@/components/start-menu";
import { Window } from "@/components/window";
import { ThemeProvider } from "@/components/theme-provider";
import { ContextMenu } from "@/components/context-menu";
import { useTheme } from "next-themes";

export type WindowType = {
  id: string;
  title: string;
  icon: string;
  minimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  zIndex: number;
};

export type DeletedItemType = {
  id: string;
  name: string;
  type: string;
  icon: string;
  size: string;
  deletedAt: Date;
};

export default function Home() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowType[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
  }>({
    show: false,
    x: 0,
    y: 0,
  });
  const [deletedItems, setDeletedItems] = useState<DeletedItemType[]>([]);
  const [wallpaper, setWallpaper] = useState(
    "/win1.jpg?height=1080&width=1920"
  );
  const { theme } = useTheme();

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ show: false, x: 0, y: 0 });
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle window positioning
  const getInitialPosition = () => {
    const basePosition = { x: 100, y: 50 };
    const offset = openWindows.length * 30;
    return {
      x: basePosition.x + offset,
      y: basePosition.y + offset,
    };
  };

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
    if (contextMenu.show) {
      setContextMenu({ show: false, x: 0, y: 0 });
    }
  };

  const openWindow = (id: string, title: string, icon: string) => {
    const existingWindowIndex = openWindows.findIndex(
      (window) => window.id === id
    );

    if (existingWindowIndex !== -1) {
      // Window exists, bring to front and un-minimize if needed
      const updatedWindows = [...openWindows];
      const newZIndex = maxZIndex + 1;

      updatedWindows[existingWindowIndex] = {
        ...updatedWindows[existingWindowIndex],
        minimized: false,
        zIndex: newZIndex,
      };

      setOpenWindows(updatedWindows);
      setActiveWindowId(id);
      setMaxZIndex(newZIndex);
    } else {
      // Create new window
      const newZIndex = maxZIndex + 1;
      const initialPosition = getInitialPosition();

      setOpenWindows([
        ...openWindows,
        {
          id,
          title,
          icon,
          minimized: false,
          position: initialPosition,
          size: { width: 800, height: 500 },
          isMaximized: false,
          zIndex: newZIndex,
        },
      ]);

      setActiveWindowId(id);
      setMaxZIndex(newZIndex);
    }

    setIsStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((window) => window.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id ? { ...window, minimized: true } : window
      )
    );
  };

  const maximizeWindow = (id: string) => {
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id
          ? { ...window, isMaximized: !window.isMaximized }
          : window
      )
    );
  };

  const activateWindow = (id: string) => {
    if (id === activeWindowId) return;

    const newZIndex = maxZIndex + 1;
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id ? { ...window, zIndex: newZIndex } : window
      )
    );
    setActiveWindowId(id);
    setMaxZIndex(newZIndex);
  };

  const updateWindowPosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id ? { ...window, position } : window
      )
    );
  };

  const updateWindowSize = (
    id: string,
    size: { width: number; height: number }
  ) => {
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id ? { ...window, size } : window
      )
    );
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
    });
    setIsStartMenuOpen(false);
  };

  const deleteItem = (id: string, name: string, type: string, icon: string) => {
    // Add to recycle bin
    setDeletedItems([
      ...deletedItems,
      {
        id,
        name,
        type,
        icon,
        size: "1.2 MB",
        deletedAt: new Date(),
      },
    ]);
  };

  const changeWallpaper = (newWallpaper: string) => {
    setWallpaper(newWallpaper);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <main
        className={`h-screen w-screen overflow-hidden bg-cover bg-center relative ${
          theme === "dark" ? "bg-gray-900" : ""
        }`}
        style={{ backgroundImage: `url(${wallpaper})` }}
        onContextMenu={handleContextMenu}
      >
        <Desktop openWindow={openWindow} deleteItem={deleteItem} />

        {openWindows.map((window) =>
          !window.minimized ? (
            <Window
              key={window.id}
              window={window}
              isActive={window.id === activeWindowId}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onActivate={() => activateWindow(window.id)}
              updatePosition={updateWindowPosition}
              updateSize={updateWindowSize}
              deletedItems={window.id === "recycle-bin" ? deletedItems : []}
              changeWallpaper={changeWallpaper}
            />
          ) : null
        )}

        {isStartMenuOpen && (
          <StartMenu
            openWindow={openWindow}
            toggleStartMenu={toggleStartMenu}
          />
        )}

        <Taskbar
          toggleStartMenu={toggleStartMenu}
          isStartMenuOpen={isStartMenuOpen}
          openWindows={openWindows}
          openWindow={openWindow}
          activeWindowId={activeWindowId}
        />

        {contextMenu.show && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            openWindow={openWindow}
            changeWallpaper={changeWallpaper}
          />
        )}
      </main>
    </ThemeProvider>
  );
}
