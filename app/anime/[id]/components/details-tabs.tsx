import { CharacterFragment } from "@/graphql/types";

interface DetailedTabsProps {
    characters?: CharacterFragment | null;
}

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CharacterList } from "./character-list";

export default function AnimeInfoTabs({ characters }: DetailedTabsProps) {
    console.log(characters)
    return (
        <div className="flex flex-col w-full">
            <Tabs defaultValue="char" className="flex flex-col gap-2 items-start">
                <TabsList className="w-full flex gap-4 items-center">
                    <TabsTrigger value="char">
                        Characters
                    </TabsTrigger>
                    <TabsTrigger value="staff">
                        Staff
                    </TabsTrigger>
                    <TabsTrigger value="activity">
                        Activity
                    </TabsTrigger>
                    <TabsTrigger value="threads">
                        Threads
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="char">
                    {characters &&
                        <CharacterList list={characters} quantity={5} />}
                </TabsContent>
                <TabsContent value="staff">
                    <div className="px-4 py-2"></div>
                </TabsContent>
                <TabsContent value="activity">
                    <div className="px-4 py-2"></div>
                </TabsContent>
                <TabsContent value="threads">
                    <div className="px-4 py-2"></div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
