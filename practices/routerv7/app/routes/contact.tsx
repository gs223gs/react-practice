import type { Route } from "./+types/home";
import Form from "../pages/contact/Form"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "contact page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Contact() {
  return (
    <>
      <Form />
    </>
  );
}
