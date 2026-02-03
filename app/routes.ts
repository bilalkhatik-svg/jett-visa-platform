import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("country-master", "pages/country/CountryMaster.tsx"),
  route("visa-master", "pages/visa/VisaMaster.tsx"),
] satisfies RouteConfig;
