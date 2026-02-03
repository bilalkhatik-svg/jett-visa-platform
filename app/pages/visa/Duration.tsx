import { useState } from "react";
import MasterSetupLayout from "./components/MasterSetupLayout";
import { IconButton, Table, type TableColumn, Badge } from "../../design-system/ui";

// Types
export interface Duration {
  id?: string;
  code: string;
  name: string;
  description: string;
  synonyms: string;
  category: string;
}

export function meta() {
  return [
    { title: "Visa Admin Desktop Master Setup - Duration" },
    { name: "description", content: "Configure and manage visa duration periods" },
  ];
}

interface DurationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function Duration({ activeTab = "duration", onTabChange }: DurationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const durations: Duration[] = [
    {
      code: "7D",
      name: "7 Days",
      description: "Maximum stay of 7 days",
      synonyms: "7 Days, One Week, 7 Day Stay",
      category: "Short Stay",
    },
    {
      code: "14D",
      name: "14 Days",
      description: "Maximum stay of 14 days",
      synonyms: "14 Days, Two Weeks, 14 Day Stay",
      category: "Short Stay",
    },
    {
      code: "30D",
      name: "30 Days",
      description: "Maximum stay of 30 days",
      synonyms: "30 Days, One Month, 30 Day Stay",
      category: "Medium Stay",
    },
    {
      code: "90D",
      name: "90 Days",
      description: "Maximum stay of 90 days",
      synonyms: "90 Days, Three Months, 90 Day Stay",
      category: "Long Stay",
    },
  ];

  const tabs = [
    { id: "visa-purpose", label: "Visa Purpose" },
    { id: "visa-mode", label: "Visa Mode" },
    { id: "entry-types", label: "Entry Types" },
    { id: "validity", label: "Validity" },
    { id: "duration", label: "Duration" },
  ];

  const categoryOptions = ["All Categories", "Short Stay", "Medium Stay", "Long Stay"];

  const getCategoryBadgeVariant = (category: string): "default" | "success" | "warning" | "danger" => {
    switch (category) {
      case "Short Stay":
        return "default";
      case "Medium Stay":
        return "success";
      case "Long Stay":
        return "warning";
      default:
        return "danger";
    }
  };

  // Filter data
  const filteredDurations = durations.filter((duration) => {
    const matchesCategory =
      categoryFilter === "All Categories" || duration.category === categoryFilter;
    const matchesSearch =
      searchTerm === "" ||
      duration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duration.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalResults = filteredDurations.length;
  const resultsPerPage = 8;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedDurations = filteredDurations.slice(startIndex, endIndex);

  const tableColumns: TableColumn<Duration>[] = [
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
      searchPlaceholder="Search durations..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      categoryFilter={categoryFilter}
      onCategoryFilterChange={(value) => {
        setCategoryFilter(value);
        setCurrentPage(1);
      }}
      categoryOptions={categoryOptions}
      onAddNew={() => {
        console.log("Add new duration");
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
      <Table columns={tableColumns} data={displayedDurations} />
    </MasterSetupLayout>
  );
}
