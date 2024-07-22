"use client";

import "@vidstack/react/player/styles/base.css";

import { useEffect, useRef } from "react";

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

// Temp
const textTracks = [
  // Subtitles
  {
    src: "http://0.0.0.0:8080/https://s.megastatics.com/subtitle/3d6637b2aeff131991105ba8b7ea739e/eng-2.vtt",
    label: "English",
    language: "en-US",
    kind: "subtitles" as TextTrackKind,
    default: true,
  },
  // Chapters
];

export default function Player() {
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
      title="Anime Name"
      src="http://0.0.0.0:8080/https://ee.netmagcdn.com:2228/hls-playback/3ff26776823138c5adb809f603886152da1e7263a32a9497638798c23162e8ecd511d8fcf58c1a956bc2b3dda1f804ad292c9e814b7786a689adf77381bbc90964b249ef5a141353ea1f713a5a1e67100ee25c0f0ad805b4c69eadc13cb96978a387a03d45447ef5298b39c68eb312d72189f741d64e3c651c54f397659670e2113305697a12dffc1fd113b9c13b8e59/master.m3u8"
      crossOrigin
      playsInline
      onProviderChange={onProviderChange}
      onCanPlay={onCanPlay}
      ref={player}
    >
      <MediaProvider>
        {/* <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src="https://files.vidstack.io/sprite-fight/poster.webp"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        /> */}
        {textTracks.map((track) => (
          <Track {...track} key={track.src} />
        ))}
      </MediaProvider>

      <VideoLayout thumbnails="http://0.0.0.0:8080/https://s.megastatics.com/thumbnails/0191f2b6964ab975d56d6f684592958b/thumbnails.vtt" />
    </MediaPlayer>
  );
}
