    "use client";

    import { createContext, useContext, useRef, useState, ReactNode } from "react";

    type AudioContextValue = {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    playing: boolean;
    startAudio: () => Promise<void>;
    toggleAudio: () => Promise<void>;
    };

    const AudioCtx = createContext<AudioContextValue | null>(null);

    export function AudioProvider({ children }: { children: ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);

    const startAudio = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        try {
        await audio.play();
        setPlaying(true);
        } catch (err) {
        console.error("Playback failed:", err);
        }
    };

    const toggleAudio = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        try {
        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            await audio.play();
            setPlaying(true);
        }
        } catch (err) {
        console.error("Playback failed:", err);
        }
    };

    return (
        <AudioCtx.Provider value={{ audioRef, playing, startAudio, toggleAudio }}>
        <audio ref={audioRef} loop preload="none">
            <source src="/kholo.mp3" type="audio/mpeg" />
        </audio>
        {children}
        </AudioCtx.Provider>
    );
    }

    export function useAudio() {
    const ctx = useContext(AudioCtx);
    if (!ctx) throw new Error("useAudio must be used within AudioProvider");
    return ctx;
    }
