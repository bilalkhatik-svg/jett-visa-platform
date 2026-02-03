import { useState } from "react";
import type { Route } from "./+types/VisaMaster";
import VisaPurpose from "./VisaPurpose";
import VisaMode from "./VisaMode";
import EntryTypes from "./EntryTypes";
import Validity from "./Validity";
import Duration from "./Duration";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Visa Admin Desktop Master Setup" },
    { name: "description", content: "Configure and manage core system attributes for visa processing" },
  ];
}

export default function VisaMaster() {
  const [activeTab, setActiveTab] = useState("visa-purpose");



  // Render the appropriate component based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "visa-purpose":
        return <VisaPurpose activeTab={activeTab} onTabChange={setActiveTab} />;
      case "visa-mode":
        return <VisaMode activeTab={activeTab} onTabChange={setActiveTab} />;
      case "entry-types":
        return <EntryTypes activeTab={activeTab} onTabChange={setActiveTab} />;
      case "validity":
        return <Validity activeTab={activeTab} onTabChange={setActiveTab} />;
      case "duration":
        return <Duration activeTab={activeTab} onTabChange={setActiveTab} />;
      default:
        return <VisaPurpose activeTab={activeTab} onTabChange={setActiveTab} />;
    }
  };

  return <div>{renderTabContent()}</div>;
}
