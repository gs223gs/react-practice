import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/books", "./routes/BooksRouter.tsx"),
  route("/edit/:id", "./routes/EditRouter.tsx"),
  route("/new", "./routes/NewRouter.tsx"),
] satisfies RouteConfig;
