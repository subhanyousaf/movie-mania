import { TMDbTypes, useTMDbStore } from "@/stores";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const MediaTypeTabs = () => {
  const setSortBy = useTMDbStore((state) => state.setSortBy);
  const sortBy = useTMDbStore((state) => state.sortBy);
  return (
    <Tabs
      defaultValue={sortBy}
      className="w-[400px]"
      onValueChange={(event) => setSortBy(event as TMDbTypes)}
    >
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="movie">Movies</TabsTrigger>
        <TabsTrigger value="tv">TV Shows</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MediaTypeTabs;
