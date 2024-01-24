import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

export default function NavBar() {
  const [getSearchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <header className="sticky top-0 flex h-20 w-full shrink-0 items-center z-10 bg-white dark:bg-zinc-950">
      {getSearchQuery !== null && (
        <Navigate
          to={getSearchQuery === "" ? "/" : `/search/${getSearchQuery}`}
        />
      )}
      <a className="md:mr-6" href="#">
        <Logo />
      </a>

      <div className="flex-1 mx-4 md:ml-6">
        <Input
          className="w-full"
          placeholder="Search for movies, TV shows, genres, etc."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ModeToggle />
    </header>
  );
}
