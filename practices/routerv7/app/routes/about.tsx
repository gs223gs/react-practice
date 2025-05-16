import type { Route } from "./+types/home";
import About2 from "../pages/about/About2"
import Header from "../components/header"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "about page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return (
    <>
      <About2 />
    </>
  );
}
