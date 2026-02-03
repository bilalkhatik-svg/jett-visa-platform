import { useState, useEffect } from "react";
import type { Route } from "./+types/country-master";
import {
  Button,
  Table,
  type TableColumn,
  Pagination,
  LoadingSpinner,
  Alert,
  Badge,
  IconButton,
} from "../design-system/ui";

// Types
interface Country {
  id: string;
  name: string;
  isoCode: string;
  currency: string;
  continent: string;
  lastUpdated: string;
  status?: string;
}

interface CountriesResponse {
  data: Country[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface ApiRequest {
  language: string;
  searchTerm: string;
  status: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Country Master - Visa Admin" },
    { name: "description", content: "Manage country and continent data for visa processing" },
  ];
}

export default function CountryMaster() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);

    try {
      const requestBody: ApiRequest = {
        language: "en-US",
        searchTerm: searchTerm,
        status: "Active",
        page: currentPage,
        pageSize: pageSize,
        sortBy: "name",
        sortDirection: "Ascending",
      };

      // Note: Standard HTTP GET doesn't support request bodies
      // Using POST as most browsers/fetch don't support GET with body
      // If your API specifically requires GET, you may need to use query parameters instead
      const response = await fetch("/api/v1/visa/countries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data: CountriesResponse = await response.json();
      setCountries(data.data || []);
      setTotalCount(data.totalCount || 0);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch countries");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatLastUpdated = (dateString: string) => {
    // Format date to "X days ago" format
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  const tableColumns: TableColumn<Country>[] = [
    {
      key: "name",
      header: "COUNTRY NAME",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-gray-100 text-gray-800 text-xs font-medium">
            {row.isoCode}
          </Badge>
          <span className="text-sm text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: "isoCode",
      header: "ISO CODE",
      render: (value) => <span className="text-sm text-gray-900">{value}</span>,
    },
    {
      key: "currency",
      header: "CURRENCY",
      render: (value) => <span className="text-sm text-gray-900">{value}</span>,
    },
    {
      key: "continent",
      header: "CONTINENT",
      render: (value) => <span className="text-sm text-gray-900">{value}</span>,
    },
    {
      key: "lastUpdated",
      header: "LAST UPDATED",
      render: (value) => (
        <span className="text-sm text-gray-500">{formatLastUpdated(value)}</span>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (_, row) => (
        <IconButton
          variant="ghost"
          size="sm"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          }
          aria-label="Edit country"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Country Master</h1>
          <p className="text-body text-gray-600">
            Manage country and continent data for visa processing
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button className="px-4 py-3 text-body font-medium text-gray-900 border-b-2 border-gray-900 relative">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-bold">Countries</span>
              </div>
            </button>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by country name or ISO code.."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-md px-3 py-2 pl-10 text-body border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
              />
            </div>
          </div>
          <Button>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Country</span>
            </div>
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6">
            <Alert variant="error" title="Error">
              {error}
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : countries.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No countries found</h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Get started by adding your first country"}
            </p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              <Table
                columns={tableColumns}
                data={countries}
                className="w-full"
              />
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              variant="with-info"
              totalItems={totalCount}
              itemsPerPage={pageSize}
              itemsLabel="countries"
            />
          </>
        )}
      </div>
    </div>
  );
}

