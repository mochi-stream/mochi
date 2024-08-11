"use client";

import "@vidstack/react/player/styles/base.css";

import { useEffect, useRef, useState } from "react";

import { PlayerSubtitle, TimeRange } from "@/types/anime";

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
  intro?: TimeRange;
  outro?: TimeRange;
}

export default function Player({
  title,
  poster,
  src,
  thumbnail,
  subtitles,
  intro,
  outro,
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

  const [vttContent, setVttContent] = useState<string>();

  useEffect(() => {
    if (intro && outro) {
      const intros: TimeRange[] = [intro];
      const outros: TimeRange[] = [outro];
      setVttContent(generateVTT(intros, outros));
    }
  }, [intro, outro]);

  return (
    <MediaPlayer
      className="w-full aspect-video text-white font-sans overflow-hidden rounded-sm z-[5] ring-media-focus data-[focus]:ring-4"
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

        {vttContent && (
          <Track
            content={vttContent}
            default={true}
            language="en-US"
            kind="chapters"
            data-type="vtt"
          />
        )}
      </MediaProvider>
      <VideoLayout thumbnails={thumbnail} />
    </MediaPlayer>
  );
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}.000`;
};

const generateVTT = (intros: TimeRange[], outros: TimeRange[]): string => {
  let vtt = "WEBVTT\n\n";

  intros.forEach((intro, index) => {
    vtt += `${formatTime(intro.start)} --> ${formatTime(intro.end)}\n`;
    vtt += `Intro\n\n`;
  });

  outros.forEach((outro, index) => {
    vtt += `${formatTime(outro.start)} --> ${formatTime(outro.end)}\n`;
    vtt += `Outro\n\n`;
  });

  return vtt;
};
