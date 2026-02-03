import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("country-master", "routes/country-master.tsx"),
] satisfies RouteConfig;
