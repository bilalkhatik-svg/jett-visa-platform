import { useState } from "react";
import MasterSetupLayout from "./components/MasterSetupLayout";
import { IconButton, Table, type TableColumn, Badge } from "../../design-system/ui";

// Types
export interface Validity {
  id?: string;
  code: string;
  name: string;
  description: string;
  synonyms: string;
  category: string;
}

export function meta() {
  return [
    { title: "Visa Admin Desktop Master Setup - Validity" },
    { name: "description", content: "Configure and manage visa validity periods" },
  ];
}

interface ValidityProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function Validity({ activeTab = "validity", onTabChange }: ValidityProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const validities: Validity[] = [
    {
      code: "30D",
      name: "30 Days",
      description: "Visa valid for 30 days from issue date",
      synonyms: "30 Days, One Month, 30 Day Validity",
      category: "Short Term",
    },
    {
      code: "90D",
      name: "90 Days",
      description: "Visa valid for 90 days from issue date",
      synonyms: "90 Days, Three Months, 90 Day Validity",
      category: "Short Term",
    },
    {
      code: "180D",
      name: "180 Days",
      description: "Visa valid for 180 days from issue date",
      synonyms: "180 Days, Six Months, 180 Day Validity",
      category: "Medium Term",
    },
    {
      code: "1Y",
      name: "1 Year",
      description: "Visa valid for 1 year from issue date",
      synonyms: "1 Year, Annual, Yearly",
      category: "Long Term",
    },
  ];

  const tabs = [
    { id: "visa-purpose", label: "Visa Purpose" },
    { id: "visa-mode", label: "Visa Mode" },
    { id: "entry-types", label: "Entry Types" },
    { id: "validity", label: "Validity" },
    { id: "duration", label: "Duration" },
  ];

  const categoryOptions = ["All Categories", "Short Term", "Medium Term", "Long Term"];

  const getCategoryBadgeVariant = (category: string): "default" | "success" | "warning" | "danger" => {
    switch (category) {
      case "Short Term":
        return "default";
      case "Medium Term":
        return "success";
      case "Long Term":
        return "warning";
      default:
        return "danger";
    }
  };

  // Filter data
  const filteredValidities = validities.filter((validity) => {
    const matchesCategory =
      categoryFilter === "All Categories" || validity.category === categoryFilter;
    const matchesSearch =
      searchTerm === "" ||
      validity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      validity.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalResults = filteredValidities.length;
  const resultsPerPage = 8;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedValidities = filteredValidities.slice(startIndex, endIndex);

  const tableColumns: TableColumn<Validity>[] = [
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
      searchPlaceholder="Search validity periods..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      categoryFilter={categoryFilter}
      onCategoryFilterChange={(value) => {
        setCategoryFilter(value);
        setCurrentPage(1);
      }}
      categoryOptions={categoryOptions}
      onAddNew={() => {
        console.log("Add new validity");
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
      <Table columns={tableColumns} data={displayedValidities} />
    </MasterSetupLayout>
  );
}
