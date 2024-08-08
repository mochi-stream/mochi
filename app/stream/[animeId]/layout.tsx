"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AnimeInfoContext = createContext<undefined>(undefined);

export const useAnimeInfo = () => {
    const context = useContext(AnimeInfoContext);
    return context;
};

export default function StreamLayout({ children, params }: { children: React.ReactNode, params: { animeId: string } }) {
    const { animeId } = params;
    const [animeInfo, setAnimeInfo] = useState<null>(null);

    useEffect(() => {
        const fetchAnimeInfo = async () => {
            const response = await fetch(`/api/anime/${animeId}`);
            const data = await response.json();
            setAnimeInfo(data);
        };

        fetchAnimeInfo();
    }, [animeId]);

    if (!animeInfo) {
        return <div>Loading...</div>;
    }

    return (
        <AnimeInfoContext.Provider value={animeInfo}>
            {children}
        </AnimeInfoContext.Provider>
    );
}
