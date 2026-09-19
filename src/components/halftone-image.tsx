import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CSSProperties } from "react";
import Image from "next/image";
import sharp from "sharp";

import { cn } from "@/lib/utils";

async function loadImage(src: string) {
  if (src.startsWith("/")) return readFile(path.join(process.cwd(), "public", src));
  const res = await fetch(src);
  if (!res.ok) throw new Error(`HalftoneImage: failed to fetch ${src} (${res.status})`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * Image rendered as a halftone grid of squares sized by brightness;
 * hovering reveals the original in black and white. `src` is a remote URL or a
 * path inside `public/`. Size it with `className`.
 */
export async function HalftoneImage({
  src,
  alt,
  cells = 20,
  className,
}: {
  src: string;
  alt: string;
  cells?: number;
  className?: string;
}) {
  const pixels = await sharp(await loadImage(src))
    .resize(cells, cells)
    .greyscale()
    .normalise()
    .raw()
    .toBuffer();

  return (
    <div className={cn("group/halftone relative size-12 overflow-hidden", className)}>
      <svg
        aria-hidden
        viewBox={`0 0 ${cells} ${cells}`}
        className="size-full fill-current transition-opacity duration-300 ease-out *:origin-center *:scale-[calc(1-var(--brightness))] *:[transform-box:fill-box] group-hover/halftone:opacity-0 dark:*:scale-(--brightness)"
      >
        {Array.from(pixels, (value, i) => (
          <rect
            key={i}
            x={i % cells}
            y={Math.floor(i / cells)}
            width={0.85}
            height={0.85}
            style={{ "--brightness": (value / 255).toFixed(2) } as CSSProperties}
          />
        ))}
      </svg>

      <Image
        src={src}
        alt={alt}
        fill
        sizes="3rem"
        className="object-cover opacity-0 grayscale transition-opacity duration-300 ease-out group-hover/halftone:opacity-100"
      />
    </div>
  );
}
