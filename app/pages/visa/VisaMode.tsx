import { useState } from "react";
import MasterSetupLayout from "./components/MasterSetupLayout";
import { IconButton, Table, type TableColumn, Badge } from "../../design-system/ui";

// Types
export interface VisaMode {
  id?: string;
  code: string;
  name: string;
  description: string;
  synonyms: string;
  category: string;
}

export function meta() {
  return [
    { title: "Visa Admin Desktop Master Setup - Visa Mode" },
    { name: "description", content: "Configure and manage visa modes" },
  ];
}

interface VisaModeProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function VisaMode({ activeTab = "visa-mode", onTabChange }: VisaModeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const visaModes: VisaMode[] = [
    {
      code: "E-VISA",
      name: "Electronic Visa",
      description: "Visa obtained online through electronic application system",
      synonyms: "E-Visa, Online Visa, Digital Visa",
      category: "Digital",
    },
    {
      code: "STAMP",
      name: "Stamped Visa",
      description: "Traditional visa stamped in passport at embassy or consulate",
      synonyms: "Embassy Visa, Consular Visa, Stamped",
      category: "Traditional",
    },
    {
      code: "VOA",
      name: "Visa on Arrival",
      description: "Visa obtained upon arrival at the destination country",
      synonyms: "On Arrival, Airport Visa, Landing Visa",
      category: "On Arrival",
    },
  ];

  const tabs = [
    { id: "visa-purpose", label: "Visa Purpose" },
    { id: "visa-mode", label: "Visa Mode" },
    { id: "entry-types", label: "Entry Types" },
    { id: "validity", label: "Validity" },
    { id: "duration", label: "Duration" },
  ];

  const categoryOptions = ["All Categories", "Digital", "Traditional", "On Arrival"];

  const getCategoryBadgeVariant = (category: string): "default" | "success" | "warning" | "danger" => {
    switch (category) {
      case "Digital":
        return "default";
      case "Traditional":
        return "success";
      case "On Arrival":
        return "warning";
      default:
        return "danger";
    }
  };

  // Filter data
  const filteredModes = visaModes.filter((mode) => {
    const matchesCategory =
      categoryFilter === "All Categories" || mode.category === categoryFilter;
    const matchesSearch =
      searchTerm === "" ||
      mode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mode.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalResults = filteredModes.length;
  const resultsPerPage = 8;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedModes = filteredModes.slice(startIndex, endIndex);

  const tableColumns: TableColumn<VisaMode>[] = [
    {
      key: "code",
      header: "Code",
      render: (value) => (
        <Badge variant="default" className="text-[11px] font-bold">
          {value}
        </Badge>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (value) => <span className="font-semibold text-sm">{value}</span>,
    },
    {
      key: "description",
      header: "Description",
      render: (value) => (
        <span className="text-sm text-slate-500 max-w-xs truncate block">{value}</span>
      ),
    },
    {
      key: "synonyms",
      header: "Synonyms",
      render: (value) => <span className="text-sm text-slate-500 italic">{value}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (value) => (
        <Badge variant={getCategoryBadgeVariant(value)}>{value}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, row) => (
        <div className="flex justify-end gap-1">
          <IconButton
            variant="ghost"
            size="sm"
            icon={<span className="material-symbols-outlined">edit</span>}
            aria-label="Edit"
          />
          <IconButton
            variant="ghost"
            size="sm"
            icon={<span className="material-symbols-outlined">delete</span>}
            aria-label="Delete"
            className="hover:text-red-600"
          />
        </div>
      ),
    },
  ];

  return (
    <MasterSetupLayout
      title="Master Setup & Core Attributes"
      description="Manage countries, visa purposes, modes, and other core system attributes."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange || (() => {})}
      searchPlaceholder="Search modes..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      categoryFilter={categoryFilter}
      onCategoryFilterChange={(value) => {
        setCategoryFilter(value);
        setCurrentPage(1);
      }}
      categoryOptions={categoryOptions}
      onAddNew={() => {
        console.log("Add new visa mode");
      }}
      addButtonLabel="Add New"
      pagination={{
        currentPage,
        totalPages,
        totalResults,
        resultsPerPage,
        onPageChange: setCurrentPage,
      }}
    >
      <Table columns={tableColumns} data={displayedModes} />
    </MasterSetupLayout>
  );
}
