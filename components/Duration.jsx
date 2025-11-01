"use client";
import React, { useEffect, useState } from "react";

export default function RunTime({ audioLink }) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioLink) return;
    const audio = new Audio(audioLink);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
  }, [audioLink]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return <span>{duration ? formatTime(duration) : "--:--"}</span>;
}