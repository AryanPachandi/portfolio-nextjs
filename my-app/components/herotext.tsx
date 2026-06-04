"use client";
import { cn } from "@/lib/utils";
import { CanvasText } from "@/components/ui/canvas-text";

export default function Herotext() {
  return (
    <div className="flex  items-center justify-center ">
      <h2
        className={cn(
          "group relative max-w-2xl text-left text-4xl leading-20 font-bold tracking-tight text-balance text-white sm:text-5xl md:text-6xl xl:text-7xl dark:text-neutral-700",
        )}
      >
        Aryan{" "}
        <CanvasText
          text="Pachandi"
          backgroundClassName="bg-blue-600 dark:bg-blue-700"
          colors={[
            "rgba(0, 153, 255, 1)",
            "rgba(0, 153, 255, 0.9)",
            "rgba(0, 153, 255, 0.8)",
            "rgba(0, 153, 255, 0.7)",
            "rgba(0, 153, 255, 0.6)",
            "rgba(0, 153, 255, 0.5)",
            "rgba(0, 153, 255, 0.4)",
            "rgba(0, 153, 255, 0.3)",
            "rgba(0, 153, 255, 0.2)",
            "rgba(0, 153, 255, 0.1)",
          ]}
          lineGap={4}
          animationDuration={20}
        />
      </h2>
    </div>
  );
}
