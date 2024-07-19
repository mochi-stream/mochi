import { Bell } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div variant="ghost" size="icon">
          <Bell className="w-5 h-5 text-primary cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px] p-4 space-y-2">
        <DropdownMenuLabel className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Notifications</h3>
          <Button disabled variant="ghost" size="sm" className="cursor-not-allowed">
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <div className="space-y-4 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">No New Notifications</p>
              <p className="text-sm text-muted-foreground">
                All caught up! Time to watch more anime!
              </p>
            </div>
          </div>
          {/* <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground"></div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Support Ticket</p>
              <p className="text-sm text-muted-foreground">
                Your support ticket #12345 has been updated.
              </p>
            </div>
          </div> */}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
