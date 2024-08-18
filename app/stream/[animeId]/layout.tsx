import AnimeInfoProvider from "./context";
import { ReactNode } from "react";

interface StreamLayoutProps {
    children: ReactNode;
    params: { animeId: string };
}

export default function StreamLayout({ children, params }: StreamLayoutProps) {
    const { animeId } = params;

    return (
        <AnimeInfoProvider animeId={animeId}>
            {children}
        </AnimeInfoProvider>
    );
}
