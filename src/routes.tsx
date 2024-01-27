import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import FourOFour from "./pages/404";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Movie from "./pages/Movie";
import SearchResults from "./pages/SearchResults";
import Show from "./pages/Show";
import Dmca from "./pages/Dmca";

Sentry.init({
  dsn: "https://3c80766a7fe26b99724867b0bcdee433@o4506643346685952.ingest.sentry.io/4506643395051520",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
  ],
  tracesSampleRate: 1.0,
});

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router = sentryCreateBrowserRouter([
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
      { path: "/dmca", element: <Dmca /> },
      {
        path: "*",
        element: <FourOFour />,
      },
    ],
  },
]);

export default router;
