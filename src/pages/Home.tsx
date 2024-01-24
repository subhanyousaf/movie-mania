import { H2, Muted } from "@/components/Typography";
import MediaGrid from "@/components/media/MediaGrid";
import MediaTypeTabs from "@/components/media/MediaTypeTabs";
import { Separator } from "@/components/ui/separator";
import useTrendingTMDb from "@/hooks/tmdb/useTrendingTMDb";

const Home = () => {
  const { data, error, isLoading } = useTrendingTMDb();
  
  return (
    <>
      <H2>Trending</H2>
      <Muted>Movies & TV Shows that are trending this week.</Muted>
      <Separator className="my-3" />
      <MediaTypeTabs />
      <MediaGrid data={data} error={error} isLoading={isLoading} />
    </>
  );
};

export default Home;
