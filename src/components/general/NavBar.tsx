import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { Badge } from "../ui/badge";
export default function NavBar() {
  const [getSearchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <header className="sticky top-0 flex h-20 w-full shrink-0 items-center z-10 bg-background">
      {getSearchQuery !== null && (
        <Navigate
          to={getSearchQuery === "" ? "/" : `/search/${getSearchQuery}`}
        />
      )}
      <Link className="flex flex-row items-center space-x-2 md:mr-6" to="/">
        <Logo />
        <Badge variant="secondary">BETA</Badge>
      </Link>

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
