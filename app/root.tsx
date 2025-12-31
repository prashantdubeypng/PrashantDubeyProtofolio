import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const meta: Route.MetaFunction = () => [
  { title: "Prashant Dubey | Data Pipeline Engineer" },
  { name: "description", content: "Prashant Dubey - Data Pipeline Engineer from India specializing in ETL pipelines, Apache Kafka, Apache Spark, Snowflake, and cloud data platforms. Building scalable data solutions." },
  { name: "keywords", content: "Prashant Dubey, Data Engineer, Data Pipeline Engineer, ETL, Apache Kafka, Apache Spark, Snowflake, Python, SQL, Azure, AWS, India" },
  { name: "author", content: "Prashant Dubey" },
  { name: "robots", content: "index, follow" },
  { property: "og:title", content: "Prashant Dubey | Data Pipeline Engineer" },
  { property: "og:description", content: "Data Pipeline Engineer specializing in ETL pipelines, Kafka, Spark, and cloud data platforms. Building scalable data solutions." },
  { property: "og:type", content: "website" },
  { property: "og:locale", content: "en_US" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Prashant Dubey | Data Pipeline Engineer" },
  { name: "twitter:description", content: "Data Pipeline Engineer specializing in ETL pipelines, Kafka, Spark, and cloud data platforms." },
  { name: "google-site-verification", content: "googleaa6c62d1f218c53d" },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "canonical", href: "https://your-domain.com" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
