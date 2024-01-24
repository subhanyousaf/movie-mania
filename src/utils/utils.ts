import { Captions } from "@/entities/Stream";

declare global {
  interface String {
    ucwords(): string;
  }
}

export function getTmdbImageURL(path: string): string {
  return `https://image.tmdb.org/t/p/w500//${path}`;
}

export function formatTime(time: number) {
  if (isNaN(time)) {
    return "00:00";
  }

  const date = new Date(time * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  if (hours) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds}`;
  }
}

export function getEnCaptionUrl(captions: Captions[]): Captions | undefined {
  return captions.find((caption) => caption.language === "en");
}

String.prototype.ucwords = function () {
  return this.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
};
