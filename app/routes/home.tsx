import type { Route } from "./+types/home";
import CountryMaster from "../pages/visa/VisaMaster";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Country Master - Visa Admin" },
    { name: "description", content: "Manage country and continent data for visa processing" },
  ];
}

export default function Home() {
  return <CountryMaster />;
}
