"use client";

import { useState } from "react";
import { Trash2, RefreshCw, ArrowUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { DeletedItemType } from "@/app/page";

interface RecycleBinProps {
  deletedItems: DeletedItemType[];
}

export function RecycleBin({ deletedItems }: RecycleBinProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === deletedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(deletedItems.map((item) => item.id));
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-100 p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Trash2 className="h-5 w-5 mr-2 text-gray-600" />
          <span className="font-medium">Recycle Bin</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {selectedItems.length > 0 && (
            <>
              <Button variant="ghost" size="sm" className="h-8">
                <ArrowUp className="h-4 w-4 mr-2" />
                Restore
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Empty Recycle Bin
              </Button>
            </>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        {deletedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Trash2 className="h-16 w-16 mb-4" />
            <p>Recycle Bin is empty</p>
          </div>
        ) : (
          <div className="p-2">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 p-2 border-b text-sm font-medium text-gray-600">
              <div className="flex items-center">
                <Checkbox
                  checked={
                    selectedItems.length === deletedItems.length &&
                    deletedItems.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </div>
              <div>Name</div>
              <div>Original Location</div>
              <div>Date Deleted</div>
              <div>Size</div>
            </div>

            {deletedItems.map((item) => (
              <div
                key={item.id}
                className={`grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 p-2 hover:bg-gray-50 cursor-pointer ${
                  selectedItems.includes(item.id) ? "bg-blue-50" : ""
                }`}
                onClick={() => handleSelectItem(item.id)}
              >
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleSelectItem(item.id)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-gray-500" />
                  {item.name}
                </div>
                <div className="text-gray-600">
                  C:\Users\User\{item.type === "folder" ? "Folders" : "Files"}
                </div>
                <div className="text-gray-600">
                  {item.deletedAt.toLocaleDateString()}
                </div>
                <div className="text-gray-600">{item.size}</div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
