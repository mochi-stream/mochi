"use client"

import Image, { ImageProps as NextImageProps } from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface CustomImageProps extends NextImageProps {
    onLoad?: () => void;
    index?: number; // add index prop for staggering
}

export default function CustomImage({ onLoad, index = 0, ...props }: CustomImageProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const [staggerDelay, setStaggerDelay] = useState(0);

    useEffect(() => {
        // Calculate stagger delay based on the index
        setStaggerDelay(index * 50); // 100ms delay per image index
    }, [index]);

    return (
        <div ref={ref} className="relative group rounded-lg">
            <Image
                {...props}
                style={{
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.2s cubic-bezier(0.3, 0.2, 0.2, 0.8) ${staggerDelay}ms, transform 0.2s ease`,
                }}
            />
        </div>
    );
}
