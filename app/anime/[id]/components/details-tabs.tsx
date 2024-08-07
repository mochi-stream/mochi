import { CharacterFragment, StaffFragment } from "@/graphql/types";

interface DetailedTabsProps {
    characters?: CharacterFragment | null;
    staff?: StaffFragment[] | null;
}

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CharacterList } from "./character-list";
import { StaffList } from "./staff-list";

export default function AnimeInfoTabs({ characters, staff }: DetailedTabsProps) {
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
                    {staff &&
                        <StaffList list={staff} quantity={5} />}
                </TabsContent>
                <TabsContent value="activity">
                    <div className="text-muted-foreground px-2 py-4 w-full h-16 flex text-center">
                        <p>Activity not available yet.</p>
                    </div>
                </TabsContent>
                <TabsContent value="threads">
                    <div className="text-muted-foreground px-2 py-4 w-full h-16 flex text-center">
                        <p>Threads not available yet.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
