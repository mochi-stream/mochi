import { useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useUser } from "@/app/_components/context";

export default function AddToCollection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAuthenticated } = useUser();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      {isAuthenticated ? (
        <DialogContent>

        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to add anime to your watch list.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex custom-dialog-footer items-center">
            <div className="flex justify-end space-x-2">
              <div className="gap-2 flex">
                <Button onClick={() => setIsDialogOpen(false)} variant="ghost">
                  Close
                </Button>
                <Link href={"/login"}>
                  <Button>Login</Button>
                </Link>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
