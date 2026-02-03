import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/country-master.tsx"),
  route("country/create", "routes/country-create.tsx", { id: "country-create" }),
  route("country/edit/:id", "routes/country-create.tsx", { id: "country-edit" }),
  route("vendors", "routes/vendors.tsx"),
  route("vendors/create", "routes/vendor-create.tsx", { id: "vendor-create" }),
  route("vendors/edit/:id", "routes/vendor-create.tsx", { id: "vendor-edit" }),
] satisfies RouteConfig;
