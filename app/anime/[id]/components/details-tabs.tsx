// TODO: Recently watched?

import { CharacterFragment, StaffFragment, MediaStreamingEpisode } from "@/graphql/types";

interface DetailedTabsProps {
    animeId: number | null;
    characters?: CharacterFragment | null;
    staff?: (StaffFragment | null)[] | null;
    episodes?: (MediaStreamingEpisode | null)[] | null;
}

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CharacterList } from "./character-list";
import { StaffList } from "./staff-list";
import { EpisodeList } from "./episode-list";

export default function AnimeInfoTabs({ animeId, characters, staff, episodes }: DetailedTabsProps) {
    return (
        <div className="flex flex-col w-full">
            <Tabs defaultValue={episodes && animeId && episodes.length > 0 && "epi" || "char"} className="flex flex-col gap-2 items-start">
                <TabsList className="w-full flex gap-4 items-center overflow-x-auto overflow-y-hidden">
                    {episodes && animeId && episodes.length > 0 && (
                        <TabsTrigger value="epi">
                            Episodes
                        </TabsTrigger>
                    )}
                    <TabsTrigger value="char">
                        Characters
                    </TabsTrigger>
                    <TabsTrigger value="staff">
                        Staff
                    </TabsTrigger>
                    <TabsTrigger value="art">
                        Art Works
                    </TabsTrigger>
                    <TabsTrigger value="comments">
                        Comments
                    </TabsTrigger>
                    <TabsTrigger value="threads">
                        Threads
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="epi">
                    {episodes && animeId && episodes?.length > 0 && (
                        <EpisodeList animeId={animeId} list={episodes.filter((episode): episode is MediaStreamingEpisode => episode !== null)} quantity={8} />
                    )}

                </TabsContent>
                <TabsContent value="char">
                    {characters &&
                        <CharacterList list={characters} quantity={5} />}
                </TabsContent>
                <TabsContent value="staff">
                    {staff &&
                        <StaffList list={staff?.filter((item): item is StaffFragment => item !== null)} quantity={5} />}
                </TabsContent>
                <TabsContent value="art">
                    <div className="text-muted-foreground px-2 py-4 w-full h-16 flex text-center">
                        <p>Art Works not available yet.</p>
                    </div>
                </TabsContent>
                <TabsContent value="comments">
                    <div className="text-muted-foreground px-2 py-4 w-full h-16 flex text-center">
                        <p>Comments not available yet.</p>
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
