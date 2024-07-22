import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, Folder, Bookmark } from "lucide-react";

export default function Collection() {
  return (
    <div className="flex flex-col w-full py-8 px-6 lg:px-12">
      <Tabs defaultValue="watching" className="flex flex-col gap-2 items-start">
        <TabsList className="w-full flex gap-4 items-center">
          <TabsTrigger value="watching">
            <Eye className="w-5 h-5 mr-2" />
            Watching
          </TabsTrigger>
          <TabsTrigger value="to-watch">
            <Bookmark className="w-5 h-5 mr-2" />
            To Watch
          </TabsTrigger>
          <TabsTrigger value="collections">
            <Folder className="w-5 h-5 mr-2" />
            Collections
          </TabsTrigger>
        </TabsList>
        <TabsContent value="watching">
          <div className="px-4 py-2">Watching content</div>
        </TabsContent>
        <TabsContent value="to-watch">
          <div className="px-4 py-2">To Watch content</div>
        </TabsContent>
        <TabsContent value="collections">
          <div className="px-4 py-2">Collections content</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
