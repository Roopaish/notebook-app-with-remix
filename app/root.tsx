import bounceStyles from "./styles/app.css";
import styles from "./styles/styles.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/server-runtime";
import Footer from "./components/Footer";
import MainNavigation from "./components/MainNavigation";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notebook",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: bounceStyles },
  { rel: "stylesheet", href: styles },
];

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation />
        <main className="content page">
          <h1>Something went wrong</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  );
}
