import { Episode } from "@/types/anime";
import Link from "next/link";

export default function Episodes({
    episodes,
}: {
    episodes: Episode[];
}) {
    return (
        <div className="bg-accent h-full rounded-md shadow-lg space-y-2">
            {episodes?.map((episode) => (
                <Link
                    key={episode.id}
                    href={`${episode.number}`}
                >
                    <h3>{`Episode ${episode.number}: ${episode.title}`}</h3>
                </Link>
            ))}
        </div>
    );
}
