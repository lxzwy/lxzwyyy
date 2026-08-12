"use client";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const audioRef = useRef<HTMLAudioElement>(null);

  const enterSite = () => {
    setEntered(true);

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const changeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;

    if (!audio) return;

    const newProgress = Number(e.target.value);

    if (audio.duration) {
      audio.currentTime = (newProgress / 100) * audio.duration;
      setProgress(newProgress);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-6 text-white">

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/background/background.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Music */}
      <audio ref={audioRef} loop>
        <source src="/music/song.mp3" type="audio/mpeg" />
      </audio>

      {!entered ? (

        /* Click to Enter */
        <div className="relative z-10 text-center">

          <h1 className="text-5xl font-bold">
            Lxzwy
          </h1>

          <p className="mt-2 text-white/50">
            @lxzwydev
          </p>

          <button
            onClick={enterSite}
            className="mt-8 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
          >
            Welcome
          </button>

        </div>

      ) : (

        <>
          {/* Profile card */}
        <div className="relative z-10 w-full max-w-xl rounded-3xl border border-purple-400/20 bg-black/40 p-8 text-center shadow-2xl shadow-purple-500/20 backdrop-blur-xl animate-in fade-in zoom-in duration-700">
        
            {/* Profile picture */}
            <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-2 border-white/20">
              <img
                src="/profile/svcode.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">
              Lxzwy
            </h1>

            <p className="mt-1 text-sm text-white/40">
              @lxzwydev
            </p>

            <p className="mx-auto mt-5 max-w-md text-white/70">
              test run
            </p>

            {/* Links */}
           <div className="mt-6 space-y-3">

  <a
    href="YOUR_GITHUB_LINK"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 transition hover:scale-[1.02] hover:border-purple-400/30 hover:bg-purple-500/10"
  >
    <span>🐙</span>
    Synapse
  </a>

  <a
    href="BLANK"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 transition hover:scale-[1.02] hover:border-purple-400/30 hover:bg-purple-500/10"
  >
    <span>💬</span>
    Discord
  </a>

  <a
    href="https://www.tiktok.com/@lxzwy.cc"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 transition hover:scale-[1.02] hover:border-purple-400/30 hover:bg-purple-500/10"
  >
    <span>▶️</span>
    Tiktok
  </a>

</div>


            <p className="mt-8 text-xs text-white/30">
              978 profile views
            </p>

          </div>

          {/* Floating music player */}
          <div className="fixed bottom-6 left-6 z-50 w-80 rounded-2xl border border-purple-400/20 bg-black/60 p-4 shadow-2xl shadow-purple-500/20 backdrop-blur-xl">

            <div className="flex items-center gap-4">

              {/* Music icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-2xl">
                🎵
              </div>

              {/* Song information */}
              <div className="min-w-0 flex-1 text-left">

                <p className="truncate font-semibold">
                  My Song
                </p>

                <p className="truncate text-xs text-white/40">
                  Lxzwy
                </p>

              </div>

              {/* Play button */}
              <button
                onClick={toggleMusic}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white transition hover:scale-105 hover:bg-purple-400"
              >
                {playing ? "⏸" : "▶"}
              </button>

            </div>

            {/* Progress bar */}
            <div className="mt-4">

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={changeProgress}
                className="w-full accent-purple-500"
              />

            </div>

            {/* Volume */}
            <div className="mt-2 flex items-center gap-3">

              <span className="text-sm">
                🔊
              </span>

              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={changeVolume}
                className="w-full accent-purple-500"
              />

              <span className="w-8 text-right text-xs text-white/40">
                {volume}
              </span>

            </div>

          </div>
        </>
      )}

    </main>
  );
}
