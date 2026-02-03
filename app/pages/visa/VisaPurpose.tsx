import { useState, useEffect, useMemo, useCallback } from "react";
import MasterSetupLayout from "./components/MasterSetupLayout";
import { IconButton, Table, type TableColumn, Badge, Alert, Modal, ConfirmationDialog } from "../../design-system/ui";
import LoadingSpinner from "../../design-system/ui/feedback/LoadingSpinner";
import {
  getVisaPurposes,
  deleteVisaPurpose,
  createVisaPurpose,
  updateVisaPurpose,
  type VisaPurposeResponse,
} from "../../api/visa.api";
import { useDebounce } from "../../hooks/useDebounce";
import VisaPurposeForm, { type VisaPurposeFormData, type VisaPurpose } from "./components/VisaPurposeForm";

// Re-export for external use
export type { VisaPurpose };

export function meta() {
  return [
    { title: "Visa Admin Desktop Master Setup" },
    { name: "description", content: "Configure and manage core system attributes for visa processing" },
  ];
}

interface VisaPurposeProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function VisaPurpose({ activeTab = "visa-purpose", onTabChange }: VisaPurposeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [visaPurposes, setVisaPurposes] = useState<VisaPurpose[]>([]);
  const [allPurposes, setAllPurposes] = useState<VisaPurpose[]>([]); // For uniqueness checking
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<VisaPurpose | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const resultsPerPage = 8;

  // Category list as per requirements
  const CATEGORIES = ["Travel", "Professional", "Education", "Personal", "Medical", "Transit"];

  const tabs = [
    { id: "visa-purpose", label: "Visa Purpose" },
    { id: "visa-mode", label: "Visa Mode" },
    { id: "entry-types", label: "Entry Types" },
    { id: "validity", label: "Validity" },
    { id: "duration", label: "Duration" },
  ];

  // Fetch all purposes for uniqueness checking (without pagination)
  const fetchAllPurposes = useCallback(async () => {
    try {
      const response = await getVisaPurposes({ limit: 1000 });
      const mappedData: VisaPurpose[] = response.data.data.map((item: VisaPurposeResponse) => ({
        code: item.code,
        name: item.name,
        description: item.description,
        synonyms: item.synonyms || "",
        category: item.category || "Travel",
      }));
      setAllPurposes(mappedData);
    } catch (err) {
      console.error("Failed to fetch all purposes for validation:", err);
    }
  }, []);

  // Fetch visa purposes from API
  const fetchVisaPurposes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getVisaPurposes({
        page: currentPage,
        limit: resultsPerPage,
        search: debouncedSearchTerm || undefined,
        category: categoryFilter !== "All Categories" ? categoryFilter : undefined,
      });

      const responseData = response.data;
      
      // Map API response to component format
      const mappedData: VisaPurpose[] = responseData.data.map((item: VisaPurposeResponse) => ({
        code: item.code,
        name: item.name,
        description: item.description,
        synonyms: item.synonyms || "",
        category: item.category || "Travel",
      }));

      setVisaPurposes(mappedData);
      setTotalResults(responseData.total);
      setTotalPages(responseData.totalPages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch visa purposes";
      setError(errorMessage);
      setVisaPurposes([]);
      setTotalResults(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, categoryFilter, resultsPerPage]);

  // Fetch all purposes on mount for validation
  useEffect(() => {
    fetchAllPurposes();
  }, [fetchAllPurposes]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchVisaPurposes();
  }, [fetchVisaPurposes]);

  // Refresh all purposes after create/update/delete
  const refreshData = useCallback(async () => {
    await Promise.all([fetchVisaPurposes(), fetchAllPurposes()]);
  }, [fetchVisaPurposes, fetchAllPurposes]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, categoryFilter]);

  // Category options for filter
  const categoryOptions = useMemo(() => {
    return ["All Categories", ...CATEGORIES];
  }, []);

  const getCategoryBadgeVariant = useCallback((category: string): "default" | "success" | "warning" | "danger" => {
    switch (category) {
      case "Travel":
        return "default";
      case "Professional":
        return "success";
      case "Education":
        return "warning";
      default:
        return "danger";
    }
  }, []);

  // Handle add
  const handleAdd = useCallback(() => {
    setSelectedPurpose(null);
    setIsAddModalOpen(true);
    setError(null);
  }, []);

  // Handle edit
  const handleEdit = useCallback((purpose: VisaPurpose) => {
    setSelectedPurpose(purpose);
    setIsEditModalOpen(true);
    setError(null);
  }, []);

  // Handle form submit (create or update)
  const handleFormSubmit = useCallback(
    async (formData: VisaPurposeFormData) => {
      try {
        setFormLoading(true);
        setError(null);

        const payload: VisaPurposeResponse = {
          code: formData.code.toUpperCase(),
          name: formData.name.trim(),
          description: formData.description.trim(),
          synonyms: formData.synonyms.trim(),
          category: formData.category,
          status: "ACTIVE",
        };

        let result;
        if (selectedPurpose) {
          // Update - pass original code in case code changed
          result = await updateVisaPurpose(payload, selectedPurpose.code);
        } else {
          // Create
          result = await createVisaPurpose(payload);
        }

        if (result.error) {
          setError(result.error);
          return;
        }

        // Success - refresh data and close modal
        await refreshData();
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedPurpose(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to save visa purpose";
        setError(errorMessage);
      } finally {
        setFormLoading(false);
      }
    },
    [selectedPurpose, refreshData]
  );

  // Handle delete confirmation
  const handleDeleteClick = useCallback((purpose: VisaPurpose) => {
    setSelectedPurpose(purpose);
    setIsDeleteDialogOpen(true);
    setError(null);
  }, []);

  // Handle delete confirmation
  const handleDeleteConfirm = useCallback(async () => {
    if (!selectedPurpose) return;

    try {
      setDeleteLoading(true);
      setError(null);

      const result = await deleteVisaPurpose(selectedPurpose.code);

      if (!result.success) {
        setError(result.message || "Failed to delete visa purpose");
        if (result.inUse) {
          // Keep dialog open if in use
          return;
        }
      } else {
        // Success - refresh data and close dialog
        await refreshData();
        setIsDeleteDialogOpen(false);
        setSelectedPurpose(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete visa purpose";
      setError(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  }, [selectedPurpose, refreshData]);

  // Handle category filter change
  const handleCategoryFilterChange = useCallback((value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  }, []);

  // Memoized table columns to prevent unnecessary re-renders

  const tableColumns: TableColumn<VisaPurpose>[] = useMemo(
    () => [
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
        render: (value) => <span className="text-sm text-slate-500 italic">{value || "-"}</span>,
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
              aria-label={`Edit ${row.name}`}
              onClick={() => handleEdit(row)}
            />
            <IconButton
              variant="ghost"
              size="sm"
              icon={<span className="material-symbols-outlined">delete</span>}
              aria-label={`Delete ${row.name}`}
              className="hover:text-red-600"
              onClick={() => handleDeleteClick(row)}
            />
          </div>
        ),
      },
    ],
    [getCategoryBadgeVariant, handleEdit, handleDeleteClick]
  );

  return (
    <MasterSetupLayout
      title="Master Setup & Core Attributes"
      description="Manage countries, visa purposes, modes, and other core system attributes."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange || (() => {})}
      searchPlaceholder="Search purposes..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      categoryFilter={categoryFilter}
      onCategoryFilterChange={handleCategoryFilterChange}
      categoryOptions={categoryOptions}
      onAddNew={handleAdd}
      addButtonLabel="Add New"
      pagination={{
        currentPage,
        totalPages,
        totalResults,
        resultsPerPage,
        onPageChange: setCurrentPage,
      }}
    >
      {error && (
        <div className="mb-4">
          <Alert variant="error" title="Error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner variant="circle" size="lg" />
        </div>
      ) : visaPurposes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-sm">
            {searchTerm || categoryFilter !== "All Categories"
              ? "No visa purposes found matching your criteria."
              : "No visa purposes available."}
          </p>
        </div>
      ) : (
        <Table columns={tableColumns} data={visaPurposes} />
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setError(null);
        }}
        title="Add New Visa Purpose"
        showFooter={false}
        maxWidth="2xl"
      >
        <VisaPurposeForm
          existingCodes={allPurposes.map((p) => p.code.toUpperCase())}
          existingNames={allPurposes.map((p) => p.name)}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsAddModalOpen(false);
            setError(null);
          }}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPurpose(null);
          setError(null);
        }}
        title="Edit Visa Purpose"
        showFooter={false}
        maxWidth="2xl"
      >
        {selectedPurpose && (
          <VisaPurposeForm
            initialData={selectedPurpose}
            isEditMode={true}
            existingCodes={allPurposes.map((p) => p.code.toUpperCase())}
            existingNames={allPurposes.filter((p) => p.code !== selectedPurpose.code).map((p) => p.name)}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedPurpose(null);
              setError(null);
            }}
            loading={formLoading}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedPurpose(null);
          setError(null);
        }}
        title="Delete Visa Purpose"
        message={
          error && error.includes("in use")
            ? error
            : `Are you sure you want to delete visa purpose "${selectedPurpose?.name}" (${selectedPurpose?.code})? This action cannot be undone.`
        }
        confirmText={deleteLoading ? "Deleting..." : "Delete Purpose"}
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        variant="danger"
      />
    </MasterSetupLayout>
  );
}
