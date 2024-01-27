export interface TMDb {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  seasons: TMDbSeason[];
}

export interface TMDbResponse {
  page: number;
  results: TMDb[];
  total_pages: number;
  total_results: number;
}

export interface TMDbEpisode {
  name: string;
  air_date: string;
  episode_number: number;
  id: number;
}

export interface TMDbSeason {
  air_date: string;
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
  episodes: TMDbEpisode[];
  episode_count: number;
}
