import type { Route } from "./+types/home";
import Main from "../pages/content/main"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "content page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Content() {
  return (
    <>
      <Main />
    </>
  );
}
