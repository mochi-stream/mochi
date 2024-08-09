"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface StreamPageProps {
    params: { animeId: string };
}

export default function StreamPage({ params }: StreamPageProps) {
    const router = useRouter();

    useEffect(() => {
        router.push(`/stream/${params.animeId}/1`);
    }, [router, params.animeId]);
}