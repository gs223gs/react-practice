import type { Route } from "./+types/home";
import { Books } from "../pages/books";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Books />;
}
