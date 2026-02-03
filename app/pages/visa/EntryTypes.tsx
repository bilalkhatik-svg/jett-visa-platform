import { useState } from "react";
import MasterSetupLayout from "./components/MasterSetupLayout";
import { IconButton, Table, type TableColumn, Badge } from "../../design-system/ui";

// Types
export interface EntryType {
  id?: string;
  code: string;
  name: string;
  description: string;
  synonyms: string;
  category: string;
}

export function meta() {
  return [
    { title: "Visa Admin Desktop Master Setup - Entry Types" },
    { name: "description", content: "Configure and manage entry types" },
  ];
}

interface EntryTypesProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function EntryTypes({ activeTab = "entry-types", onTabChange }: EntryTypesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const entryTypes: EntryType[] = [
    {
      code: "SINGLE",
      name: "Single Entry",
      description: "Allows one entry into the country",
      synonyms: "Single, One Entry, Single Entry Visa",
      category: "Entry",
    },
    {
      code: "MULTI",
      name: "Multiple Entry",
      description: "Allows multiple entries within validity period",
      synonyms: "Multiple, Multi Entry, Multiple Entry Visa",
      category: "Entry",
    },
    {
      code: "DOUBLE",
      name: "Double Entry",
      description: "Allows two entries into the country",
      synonyms: "Double, Two Entry, Double Entry Visa",
      category: "Entry",
    },
  ];

  const tabs = [
    { id: "visa-purpose", label: "Visa Purpose" },
    { id: "visa-mode", label: "Visa Mode" },
    { id: "entry-types", label: "Entry Types" },
    { id: "validity", label: "Validity" },
    { id: "duration", label: "Duration" },
  ];

  const categoryOptions = ["All Categories", "Entry"];

  const tableColumns: TableColumn<EntryType>[] = [
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
      render: (value) => <Badge variant="default">{value}</Badge>,
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

  // Filter data
  const filteredTypes = entryTypes.filter((type) => {
    const matchesCategory =
      categoryFilter === "All Categories" || type.category === categoryFilter;
    const matchesSearch =
      searchTerm === "" ||
      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalResults = filteredTypes.length;
  const resultsPerPage = 8;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedTypes = filteredTypes.slice(startIndex, endIndex);

  return (
    <MasterSetupLayout
      title="Master Setup & Core Attributes"
      description="Manage countries, visa purposes, modes, and other core system attributes."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange || (() => {})}
      searchPlaceholder="Search entry types..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      categoryFilter={categoryFilter}
      onCategoryFilterChange={(value) => {
        setCategoryFilter(value);
        setCurrentPage(1);
      }}
      categoryOptions={categoryOptions}
      onAddNew={() => {
        console.log("Add new entry type");
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
      <Table columns={tableColumns} data={displayedTypes} />
    </MasterSetupLayout>
  );
}
