import { H2, Muted } from "@/components/Typography";
import MediaGrid from "@/components/media/MediaGrid";
import { Separator } from "@/components/ui/separator";
import useSearchTMDb from "@/hooks/tmdb/useSearchTMDb";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const { data, isLoading, error } = useSearchTMDb(query ?? "");

  return (
    <div>
      <H2>Results For: {query}</H2>
      <Muted>It is possible a movie/series listed below is not available for streaming.</Muted>
      <Separator className="my-3" />
      <MediaGrid data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default SearchResults;
