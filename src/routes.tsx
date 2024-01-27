import { createBrowserRouter } from "react-router-dom";
import FourOFour from "./pages/404";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Movie from "./pages/Movie";
import SearchResults from "./pages/SearchResults";
import Show from "./pages/Show";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/search/:query", element: <SearchResults /> },
      {
        path: "/movie/:tmdbId",
        element: <Movie />,
      },
      { path: "/show/:tmdbId/:seasonParam?/:episodeParam?", element: <Show /> },
      {
        path: "*",
        element: <FourOFour />,
      },
    ],
  },
]);

export default router;
