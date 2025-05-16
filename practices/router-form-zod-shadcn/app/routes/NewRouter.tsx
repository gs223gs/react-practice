import type { Route } from "./+types/home";
import  New  from "../pages/new";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Book" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <New />;
}
