import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const MediaCardSkeleton = () => {
  return (
    <Card className="border-none p-3 shadow-none">
      <Skeleton className="rounded-xl h-[275px]" />
      <CardHeader className="py-3 px-0">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4" />
      </CardHeader>
    </Card>
  );
};

export default MediaCardSkeleton;
