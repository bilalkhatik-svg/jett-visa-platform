import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/vendors";
import { Button, Table, type TableColumn, Pagination, Badge, IconButton } from "../design-system/ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vendors - Visa Admin" },
    { name: "description", content: "Manage vendors for visa processing" },
  ];
}

interface Vendor {
  id: string;
  name: string;
  code: string;
  country: string;
  status: "Active" | "Inactive";
  lastUpdated: string;
}

// Mock data for now
const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Vendor A",
    code: "VND-A",
    country: "United States",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Vendor B",
    code: "VND-B",
    country: "United Kingdom",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  },
];

export default function Vendors() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const columns: TableColumn<Vendor>[] = [
    {
      key: "name",
      header: "VENDOR NAME",
      render: (value) => <span className="text-sm text-gray-900 font-medium">{value}</span>,
    },
    {
      key: "code",
      header: "VENDOR CODE",
      render: (value) => <span className="text-sm text-gray-900">{value}</span>,
    },
    {
      key: "country",
      header: "COUNTRY",
      render: (value) => <span className="text-sm text-gray-900">{value}</span>,
    },
    {
      key: "status",
      header: "STATUS",
      render: (value) => (
        <Badge variant={value === "Active" ? "success" : "default"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "lastUpdated",
      header: "LAST UPDATED",
      render: (value) => (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <IconButton
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/vendors/edit/${row.id}`)}
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
            aria-label="Edit vendor"
          />
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            }
            aria-label="Delete vendor"
            className="text-red-600 hover:text-red-800"
          />
        </div>
      ),
    },
  ];

  const filteredVendors = mockVendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVendors.length / pageSize);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Vendors</h1>
            <p className="text-body text-gray-600">
              Manage vendors for visa processing
            </p>
          </div>
          <Button onClick={() => navigate("/vendors/create")}>
            <svg
              className="w-4 h-4 mr-2"
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
            Add Vendor
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by vendor name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {paginatedVendors.length > 0 ? (
            <>
              <Table columns={columns} data={paginatedVendors} />
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No vendors found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

