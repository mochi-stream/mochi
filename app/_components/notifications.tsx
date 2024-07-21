"use client";

import { useState, useEffect } from "react";

import { Bell } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Notifications } from "@prisma/client";
import { getNotifications, markAllAsRead } from "@/services/notifications";

export default function NotificationsDialog({ userid }: { userid: string }) {
  const [data, setData] = useState<Notifications[]>([]);

  useEffect(() => {
    getNotifications({ userId: userid }).then((data) => {
      setData(data);
    });
  }, [userid]);

  const markAllAsReadClick = async () => {
    if (data.length > 0) {
      await markAllAsRead({ userId: userid });
      setData([]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-primary cursor-pointer" />
          {data.length > 0 && (
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px] p-4 space-y-2">
        <DropdownMenuLabel className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Notifications</h3>
          <Button
            disabled={data.length === 0}
            variant="ghost"
            size="sm"
            onClick={markAllAsReadClick}
          >
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <div className="space-y-4 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-1">
              {data.length > 0 ? (
                data.map((n) => (
                  <div className="flex items-start gap-3" key={n.id}>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{n.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {n.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p className="text-sm font-medium">No New Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    All caught up! Time to watch more anime!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

