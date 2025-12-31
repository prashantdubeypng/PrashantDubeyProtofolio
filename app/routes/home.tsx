import type { Route } from "./+types/home";
import Portfolio from "../components/Portfolio";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Prashant Dubey | Backend Engineer" },
    // { name: "description", content: "Portfolio of John Developer - A Creative Frontend Engineer & UI Designer specializing in React, TypeScript, and modern web experiences." },
    // { name: "keywords", content: "frontend developer, react developer, UI designer, portfolio, web developer" },
    { property: "og:title", content: "John Developer | Creative Frontend Engineer" },
    // { property: "og:description", content: "Portfolio of John Developer - A Creative Frontend Engineer & UI Designer" },
    // { property: "og:type", content: "website" },
  ];
}

export default function Home() {
  return <Portfolio />;
}
