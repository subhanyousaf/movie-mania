import RecentMedia from "@/entities/Media";

declare global {
  interface String {
    ucwords(): string;
  }
}

export function getRecents(
  filterByTmdbId?: string
): RecentMedia | RecentMedia[] | null {
  const recents = localStorage.getItem("recentMedia");
  if (recents) {
    const parsedRecents = JSON.parse(recents) as RecentMedia[];
    if (filterByTmdbId) {
      const filteredRecents = parsedRecents.filter(
        (recent) => recent.tmdbId === filterByTmdbId
      );
      return filteredRecents.length > 0 ? filteredRecents[0] : null;
    } else {
      return parsedRecents;
    }
  }
  return [];
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

String.prototype.ucwords = function () {
  return this.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
};
