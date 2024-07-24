"use client";

import "@vidstack/react/player/styles/base.css";

import { useEffect, useRef } from "react";

import { PlayerSubtitle } from "@/types/anime";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from "@vidstack/react";

import { VideoLayout } from "./components/layouts/video-layout";

interface PlayerProps {
  title: string;
  poster?: string;
  src: string;
  thumbnail?: string;
  subtitles?: PlayerSubtitle[];
}

export default function Player({
  title,
  poster,
  src,
  thumbnail,
  subtitles,
}: PlayerProps) {
  let player = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    // Subscribe to state updates.
    return player.current!.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', state.paused);
      // console.log('is audio view?', '->', state.viewType === 'audio');
    });
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent
  ) {
    // ...
  }

  return (
    <MediaPlayer
      className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
      title={title}
      poster={poster}
      src={src}
      crossOrigin
      playsInline
      autoPlay
      onProviderChange={onProviderChange}
      onCanPlay={onCanPlay}
      ref={player}
    >
      <MediaProvider>
        {subtitles &&
          subtitles.length > 0 &&
          subtitles.map((sub, index) => <Track {...sub} key={sub.src} />)}
      </MediaProvider>
      <VideoLayout thumbnails={thumbnail} />
    </MediaPlayer>
  );
}
