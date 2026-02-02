import { useState } from "react";
import type { Route } from "./+types/design-system";
import {
  Button,
  Card,
  Input,
  Modal,
  Badge,
  Alert,
  Table,
  Checkbox,
  Radio,
  Select,
  Textarea,
  IconButton,
  BasicCard,
  StatsCard,
  ListCard,
  CountryListCard,
  ConfirmationDialog,
  SuccessDialog,
  Tabs,
  Breadcrumbs,
  Pagination,
  CountBadge,
  Tag,
  Dropdown,
  Toggle,
  Tooltip,
  ListViewLayout,
  ListViewItem,
  DetailViewLayout,
  DetailViewSection,
  ProgressBar,
  LoadingSpinner,
} from "../design-system/ui";
import Sidebar, { type SidebarSection } from "../design-system/ui/Sidebar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Design System - Visa Platform" },
    { name: "description", content: "Design System Showcase" },
  ];
}

// Icon components matching the design system sidebar
const FoundationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ButtonsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const FormInputsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const TablesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CardsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const ModalsDialogsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
);

const NavigationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const BadgesTagsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const AlertsMessagesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0113 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const DropdownsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const TogglesSwitchesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const TooltipsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const PageLayoutsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
  </svg>
);

const DataDisplayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default function DesignSystem() {
  const [activeItem, setActiveItem] = useState("buttons");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  
  // Tab states
  const [defaultActiveTab, setDefaultActiveTab] = useState("general-info");
  const [pillActiveTab, setPillActiveTab] = useState("all");
  const [iconActiveTab, setIconActiveTab] = useState("overview");
  
  // Pagination states
  const [defaultPaginationPage, setDefaultPaginationPage] = useState(1);
  const [infoPaginationPage, setInfoPaginationPage] = useState(1);
  
  // Toggle states
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [autoSaveChanges, setAutoSaveChanges] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const sidebarSections: SidebarSection[] = [
    {
      title: "COMPONENTS",
      items: [
        { id: "foundation", label: "Foundation", icon: <FoundationIcon /> },
        { id: "buttons", label: "Buttons", icon: <ButtonsIcon /> },
        { id: "form-inputs", label: "Form Inputs", icon: <FormInputsIcon /> },
        { id: "tables", label: "Tables", icon: <TablesIcon /> },
        { id: "cards", label: "Cards", icon: <CardsIcon /> },
        { id: "modals-dialogs", label: "Modals & Dialogs", icon: <ModalsDialogsIcon /> },
        { id: "navigation", label: "Navigation", icon: <NavigationIcon /> },
        { id: "badges-tags", label: "Badges & Tags", icon: <BadgesTagsIcon /> },
        { id: "alerts-messages", label: "Alerts & Messages", icon: <AlertsMessagesIcon /> },
        {
          id: "dropdowns",
          label: "Dropdowns",
          icon: <DropdownsIcon />,
          children: [
            { id: "toggles-switches", label: "Toggles & Switches", icon: <TogglesSwitchesIcon /> },
            { id: "tooltips", label: "Tooltips", icon: <TooltipsIcon /> },
          ],
        },
      ],
    },
    {
      title: "PATTERNS",
      items: [
        { id: "page-layouts", label: "Page Layouts", icon: <PageLayoutsIcon /> },
        { id: "data-display", label: "Data Display", icon: <DataDisplayIcon /> },
      ],
    },
  ];

  const [selectedTableRows, setSelectedTableRows] = useState<Set<number>>(
    new Set([1])
  );

  const basicTableData = [
    {
      country: "United States",
      code: "US",
      status: "Active",
      created: "Jan 15, 2024",
    },
    {
      country: "United Kingdom",
      code: "GB",
      status: "Active",
      created: "Jan 12, 2024",
    },
    {
      country: "Canada",
      code: "CA",
      status: "Inactive",
      created: "Jan 10, 2024",
    },
    {
      country: "Australia",
      code: "AU",
      status: "Active",
      created: "Jan 08, 2024",
    },
  ];

  const basicTableColumns = [
    { key: "country", header: "COUNTRY" },
    { key: "code", header: "CODE" },
    {
      key: "status",
      header: "STATUS",
      render: (value: string) => (
        <Badge variant={value === "Active" ? "success" : "danger"}>
          {value}
        </Badge>
      ),
    },
    { key: "created", header: "CREATED" },
    {
      key: "actions",
      header: "ACTIONS",
      render: () => (
        <div className="flex items-center gap-3">
          <button className="text-gray-600 hover:text-gray-900">
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
          </button>
          <button className="text-gray-600 hover:text-gray-900">
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
          </button>
        </div>
      ),
    },
  ];

  const selectionTableData = [
    {
      documentName: "Passport",
      type: "Identity",
      required: "Yes",
      status: "Active",
    },
    {
      documentName: "Travel Insurance",
      type: "Insurance",
      required: "No",
      status: "Active",
    },
    {
      documentName: "Bank Statement",
      type: "Financial",
      required: "Yes",
      status: "Active",
    },
  ];

  const selectionTableColumns = [
    { key: "documentName", header: "DOCUMENT NAME" },
    { key: "type", header: "TYPE" },
    { key: "required", header: "REQUIRED" },
    {
      key: "status",
      header: "STATUS",
      render: (value: string) => (
        <Badge variant={value === "Active" ? "success" : "danger"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: () => (
        <div className="flex items-center gap-3">
          <button className="text-gray-600 hover:text-gray-900">
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
          </button>
          <button className="text-gray-600 hover:text-gray-900">
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
          </button>
        </div>
      ),
    },
  ];

  const handleRowSelect = (rowIndex: number, selected: boolean) => {
    const newSelected = new Set(selectedTableRows);
    if (selected) {
      newSelected.add(rowIndex);
    } else {
      newSelected.delete(rowIndex);
    }
    setSelectedTableRows(newSelected);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        sections={sidebarSections}
        activeItemId={activeItem}
        onItemClick={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">S</span>
                </div>
                <span className="text-white font-semibold text-lg">Stackflow</span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="search"
                  placeholder="Search..."
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-body text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center relative">
                  <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute top-0 right-0 w-3 h-3 bg-danger rounded-full border-2 border-gray-800"></span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Foundation Section - Colors */}
        {activeItem === "foundation" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Color Palette</h2>
          
          <div className="space-y-8">
            {/* Primary Colors */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                Primary Colors
              </h3>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#000000" }}></div>
                  <p className="text-sm text-gray-600">Black</p>
                  <p className="text-xs text-gray-500">#000000</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#111827" }}></div>
                  <p className="text-sm text-gray-600">Gray 900</p>
                  <p className="text-xs text-gray-500">#111827</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#374151" }}></div>
                  <p className="text-sm text-gray-600">Gray 700</p>
                  <p className="text-xs text-gray-500">#374151</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#687280" }}></div>
                  <p className="text-sm text-gray-600">Gray 500</p>
                  <p className="text-xs text-gray-500">#687280</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2 border border-gray-200" style={{ backgroundColor: "#FFFFFF" }}></div>
                  <p className="text-sm text-gray-600">White</p>
                  <p className="text-xs text-gray-500">#FFFFFF</p>
                </div>
              </div>
            </div>

            {/* Background Colors */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                Background Colors
              </h3>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#F9FAFB" }}></div>
                  <p className="text-sm text-gray-600">Gray 50</p>
                  <p className="text-xs text-gray-500">#F9FAFB</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#F3F4F6" }}></div>
                  <p className="text-sm text-gray-600">Gray 100</p>
                  <p className="text-xs text-gray-500">#F3F4F6</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#E5E7EB" }}></div>
                  <p className="text-sm text-gray-600">Gray 200</p>
                  <p className="text-xs text-gray-500">#E5E7EB</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#D1D5DB" }}></div>
                  <p className="text-sm text-gray-600">Gray 300</p>
                  <p className="text-xs text-gray-500">#D1D5DB</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#9CA3AF" }}></div>
                  <p className="text-sm text-gray-600">Gray 400</p>
                  <p className="text-xs text-gray-500">#9CA3AF</p>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                Status Colors
              </h3>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#D1F5D3" }}></div>
                  <p className="text-sm text-gray-600">Success Light</p>
                  <p className="text-xs text-gray-500">#D1F5D3</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#059669" }}></div>
                  <p className="text-sm text-gray-600">Success</p>
                  <p className="text-xs text-gray-500">#059669</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#DCEEFF" }}></div>
                  <p className="text-sm text-gray-600">Info Light</p>
                  <p className="text-xs text-gray-500">#DCEEFF</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#2563EB" }}></div>
                  <p className="text-sm text-gray-600">Info</p>
                  <p className="text-xs text-gray-500">#2563EB</p>
                </div>
                <div>
                  <div className="w-full h-20 rounded-md mb-2" style={{ backgroundColor: "#DC2626" }}></div>
                  <p className="text-sm text-gray-600">Error</p>
                  <p className="text-xs text-gray-500">#DC2626</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Foundation Section - Typography */}
        {activeItem === "foundation" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Typography</h2>
          
          <div className="space-y-0">
            {/* Heading 1 / Bold */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-h1 font-bold text-gray-900 mb-1" style={{ fontSize: "36px", fontWeight: 700 }}>Heading 1 / Bold</p>
              <p className="text-sm text-gray-500">font-size: 36px / font-weight: 700</p>
            </div>

            {/* Heading 2 / Bold */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-h2 font-bold text-gray-900 mb-1" style={{ fontSize: "30px", fontWeight: 700 }}>Heading 2 / Bold</p>
              <p className="text-sm text-gray-500">font-size: 30px / font-weight: 700</p>
            </div>

            {/* Heading 3 / Bold */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-h3 font-bold text-gray-900 mb-1" style={{ fontSize: "24px", fontWeight: 700 }}>Heading 3 / Bold</p>
              <p className="text-sm text-gray-500">font-size: 24px / font-weight: 700</p>
            </div>

            {/* Heading 4 / Bold */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-h4 font-bold text-gray-900 mb-1" style={{ fontSize: "20px", fontWeight: 700 }}>Heading 4 / Bold</p>
              <p className="text-sm text-gray-500">font-size: 20px / font-weight: 700</p>
            </div>

            {/* Heading 5 / Semibold */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-h5 font-semibold text-gray-900 mb-1" style={{ fontSize: "18px", fontWeight: 600 }}>Heading 5 / Semibold</p>
              <p className="text-sm text-gray-500">font-size: 18px / font-weight: 600</p>
            </div>

            {/* Body Large / Medium */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-body-large font-medium text-gray-900 mb-1" style={{ fontSize: "16px", fontWeight: 500 }}>Body Large / Medium</p>
              <p className="text-sm text-gray-500">font-size: 16px / font-weight: 500</p>
            </div>

            {/* Body Regular / Normal */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-body font-normal text-gray-900 mb-1" style={{ fontSize: "14px", fontWeight: 400 }}>Body Regular / Normal</p>
              <p className="text-sm text-gray-500">font-size: 14px / font-weight: 400</p>
            </div>

            {/* Caption / Normal */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-caption font-normal text-gray-900 mb-1" style={{ fontSize: "12px", fontWeight: 400 }}>Caption / Normal</p>
              <p className="text-sm text-gray-500">font-size: 12px / font-weight: 400</p>
            </div>

            {/* LABEL / UPPERCASE */}
            <div className="py-4">
              <p className="text-label font-semibold uppercase text-gray-900 mb-1" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>LABEL / UPPERCASE</p>
              <p className="text-sm text-gray-500">font-size: 12px / font-weight: 600 / letter-spacing: 0.05em</p>
            </div>
          </div>
        </section>
        )}

        {/* Foundation Section - Spacing Scale */}
        {activeItem === "foundation" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Spacing Scale</h2>
          
          <div className="space-y-6">
            {/* 4px / 0.25rem */}
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-900 w-36">4px / 0.25rem</p>
              <div className="bg-black" style={{ width: "4px", height: "16px" }}></div>
            </div>

            {/* 8px / 0.5rem */}
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-900 w-36">8px / 0.5rem</p>
              <div className="bg-black" style={{ width: "8px", height: "20px" }}></div>
            </div>

            {/* 12px / 0.75rem */}
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-900 w-36">12px / 0.75rem</p>
              <div className="bg-black" style={{ width: "12px", height: "24px" }}></div>
            </div>

            {/* 16px / 1rem */}
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-900 w-36">16px / 1rem</p>
              <div className="bg-black" style={{ width: "16px", height: "32px" }}></div>
            </div>

            {/* 24px / 1.5rem */}
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-900 w-36">24px / 1.5rem</p>
              <div className="bg-black" style={{ width: "24px", height: "40px" }}></div>
            </div>

            {/* 32px / 2rem */}
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-900 w-36">32px / 2rem</p>
              <div className="bg-black" style={{ width: "32px", height: "48px" }}></div>
            </div>

            {/* 48px / 3rem */}
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-900 w-36">48px / 3rem</p>
              <div className="bg-black" style={{ width: "48px", height: "32px" }}></div>
            </div>

            {/* 64px / 4rem */}
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-900 w-36">64px / 4rem</p>
              <div className="bg-black" style={{ width: "64px", height: "40px" }}></div>
            </div>
          </div>
        </section>
        )}

        {/* Buttons Section */}
        {activeItem === "buttons" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Primary Buttons</h2>
          
          <div className="space-y-8">
            {/* Large Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Large</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="lg">Default</Button>
                <Button variant="primary" size="lg" className="bg-gray-700 hover:bg-gray-700">
                  Hover
                </Button>
                <Button variant="primary" size="lg" className="bg-gray-900 hover:bg-gray-900">
                  Active
                </Button>
                <Button variant="primary" size="lg" disabled>
                  Disabled
                </Button>
                <Button variant="primary" size="lg">
                  <span className="flex items-center gap-2">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    With Icon
                  </span>
                </Button>
                <Button variant="primary" size="lg" isLoading>
                  Loading
                </Button>
              </div>
            </div>

            {/* Medium Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Medium</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="md">Default</Button>
                <Button variant="primary" size="md" className="bg-gray-700 hover:bg-gray-700">
                  Hover
                </Button>
                <Button variant="primary" size="md" className="bg-gray-900 hover:bg-gray-900">
                  Active
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled
                </Button>
                <Button variant="primary" size="md">
                  <span className="flex items-center gap-2">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    With Icon
                  </span>
                </Button>
              </div>
            </div>

            {/* Small Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Small</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="sm">Default</Button>
                <Button variant="primary" size="sm" className="bg-gray-700 hover:bg-gray-700">
                  Hover
                </Button>
                <Button variant="primary" size="sm" className="bg-gray-900 hover:bg-gray-900">
                  Active
                </Button>
                <Button variant="primary" size="sm" disabled>
                  Disabled
                </Button>
                <Button variant="primary" size="sm">
                  <span className="flex items-center gap-2">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    With Icon
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Secondary Buttons Section */}
        {activeItem === "buttons" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Secondary Buttons</h2>
          
          <div className="space-y-8">
            {/* Large Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Large</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="secondary" size="lg">Default</Button>
                <Button variant="secondary" size="lg" className="bg-gray-100 hover:bg-gray-100">
                  Hover
                </Button>
                <Button variant="secondary" size="lg" className="bg-gray-200 hover:bg-gray-200">
                  Active
                </Button>
                <Button variant="secondary" size="lg" disabled>
                  Disabled
                </Button>
                <Button variant="secondary" size="lg">
                  <span className="flex items-center gap-2">
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    With Icon
                  </span>
                </Button>
              </div>
            </div>

            {/* Medium Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Medium</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="secondary" size="md">Default</Button>
                <Button variant="secondary" size="md" className="bg-gray-100 hover:bg-gray-100">
                  Hover
                </Button>
                <Button variant="secondary" size="md" className="bg-gray-200 hover:bg-gray-200">
                  Active
                </Button>
                <Button variant="secondary" size="md" disabled>
                  Disabled
                </Button>
                <Button variant="secondary" size="md">
                  <span className="flex items-center gap-2">
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    With Icon
                  </span>
                </Button>
              </div>
            </div>

            {/* Small Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Small</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="secondary" size="sm">Default</Button>
                <Button variant="secondary" size="sm" className="bg-gray-100 hover:bg-gray-100">
                  Hover
                </Button>
                <Button variant="secondary" size="sm" className="bg-gray-200 hover:bg-gray-200">
                  Active
                </Button>
                <Button variant="secondary" size="sm" disabled>
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Ghost Buttons Section */}
        {activeItem === "buttons" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Ghost Buttons</h2>
          
          <div className="space-y-8">
            {/* Large Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Large</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-gray-900">Default</span>
                <Button variant="ghost" size="lg" className="bg-gray-100 hover:bg-gray-100">
                  Hover
                </Button>
                <Button variant="ghost" size="lg" className="bg-gray-200 hover:bg-gray-200">
                  Active
                </Button>
                <span className="text-gray-400">Disabled</span>
                <span className="flex items-center gap-2 text-gray-900">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  With Icon
                </span>
              </div>
            </div>

            {/* Medium Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Medium</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-gray-900">Default</span>
                <Button variant="ghost" size="md" className="bg-gray-100 hover:bg-gray-100">
                  Hover
                </Button>
                <Button variant="ghost" size="md" className="bg-gray-200 hover:bg-gray-200">
                  Active
                </Button>
                <span className="text-gray-400">Disabled</span>
              </div>
            </div>

            {/* Small Buttons */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Small</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-gray-900">Default</span>
                <Button variant="ghost" size="sm" className="bg-gray-100 hover:bg-gray-100">
                  Hover
                </Button>
                <Button variant="ghost" size="sm" className="bg-gray-200 hover:bg-gray-200">
                  Active
                </Button>
                <span className="text-gray-400">Disabled</span>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Icon Buttons Section */}
        {activeItem === "buttons" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Icon Buttons</h2>
          
          <div className="space-y-8">
            {/* Large Icon Buttons (48px) */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Large (48px)</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <IconButton
                  variant="primary"
                  size="lg"
                  aria-label="Add"
                  icon={
                    <svg
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
                  }
                />
                <IconButton
                  variant="secondary"
                  size="lg"
                  aria-label="Edit"
                  icon={
                    <svg
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
                />
                <svg
                  className="w-12 h-12 text-gray-700"
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
                <IconButton
                  variant="danger"
                  size="lg"
                  aria-label="Settings"
                  icon={
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Medium Icon Buttons (40px) */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Medium (40px)</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <IconButton
                  variant="primary"
                  size="md"
                  aria-label="Add"
                  icon={
                    <svg
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
                  }
                />
                <IconButton
                  variant="secondary"
                  size="md"
                  aria-label="Edit"
                  icon={
                    <svg
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
                />
                <svg
                  className="w-10 h-10 text-gray-700"
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
                <IconButton
                  variant="danger"
                  size="md"
                  aria-label="Settings"
                  icon={
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Small Icon Buttons (32px) */}
            <div>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">Small (32px)</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <IconButton
                  variant="primary"
                  size="sm"
                  aria-label="Add"
                  icon={
                    <svg
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
                  }
                />
                <IconButton
                  variant="secondary"
                  size="sm"
                  aria-label="Edit"
                  icon={
                    <svg
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
                />
                <svg
                  className="w-8 h-8 text-gray-700"
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
                <IconButton
                  variant="danger"
                  size="sm"
                  aria-label="Settings"
                  icon={
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Form Elements Section */}
        {activeItem === "form-inputs" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Form Inputs
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Text fields, textareas, selects, and other form elements
          </p>
          
          <Card>
            <div className="space-y-8">
              <div>
                <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                  Text Inputs
                </h3>
                <div className="space-y-6">
                  <Input label="Default State" placeholder="" />
                  <Input label="Filled State" value="Sample text" readOnly />
                  <Input
                    label="Disabled State"
                    placeholder=""
                    disabled
                  />
                  <Input
                    label="Error State"
                    placeholder=""
                    error="This field is required"
                  />
                  <Input
                    label="Success State"
                    placeholder=""
                    success="Input validated successfully"
                  />
                  <Input
                    label="With Icon (Left)"
                    placeholder=""
                    leftIcon={
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
                    }
                  />
                  <Input
                    label="With Icon (Right)"
                    placeholder=""
                    rightIcon={
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />
                  <Input
                    label="With Helper Text"
                    placeholder=""
                    helperText="Username must be 3-20 characters long"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                  Textarea
                </h3>
                <div className="space-y-6">
                  <Textarea
                    label="Default"
                    placeholder=""
                    rows={4}
                  />
                  <Textarea
                    label="With Content"
                    value="This is sample text content in the textarea field."
                    rows={4}
                    readOnly
                  />
                  <Textarea
                    label="Disabled"
                    placeholder=""
                    rows={4}
                    disabled
                  />
                </div>
              </div>

              <div>
                <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                  Checkboxes & Radio Buttons
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Checkboxes Section */}
                  <div>
                    <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                      Checkboxes
                    </h4>
                    <div className="space-y-3">
                      <Checkbox label="Unchecked" />
                      <Checkbox label="Checked" defaultChecked />
                      <Checkbox label="Disabled" disabled />
                      <Checkbox label="Disabled Checked" defaultChecked disabled />
                    </div>
                  </div>

                  {/* Radio Buttons Section */}
                  <div>
                    <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                      Radio Buttons
                    </h4>
                    <div className="space-y-3">
                      <Radio name="radio-options" label="Option 1" />
                      <Radio
                        name="radio-options"
                        label="Option 2 (Selected)"
                        defaultChecked
                      />
                      <Radio name="radio-options" label="Option 3" />
                      <Radio name="radio-disabled" label="Disabled" disabled />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                  Select Dropdowns
                </h3>
                <div className="space-y-6">
                  <Select
                    label="Default Select"
                    placeholder="Choose an option..."
                    options={[
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                      { value: "3", label: "Option 3" },
                    ]}
                  />
                  <Select
                    label="Selected State"
                    options={[
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                      { value: "3", label: "Option 3" },
                    ]}
                    defaultValue="2"
                  />
                  <Select
                    label="Disabled Select"
                    placeholder="Choose an option..."
                    disabled
                    options={[
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                      { value: "3", label: "Option 3" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>
        )}

        {/* Badges & Tags Section */}
        {activeItem === "badges-tags" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Badges & Tags
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Status badges, tags, and label components
          </p>
          
          <Card>
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Status Badges
            </h3>
            <div className="space-y-6">
              {/* Default Badges */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Default Badges
                </h4>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="active">Active</Badge>
                  <Badge variant="inactive">Inactive</Badge>
                  <Badge variant="pending">Pending</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="draft">Draft</Badge>
                </div>
              </div>

              {/* Badges with Icons */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Badges with Icons
                </h4>
                <div className="flex flex-wrap gap-4">
                  <Badge
                    variant="active"
                    icon={
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    }
                  >
                    Approved
                  </Badge>
                  <Badge
                    variant="inactive"
                    icon={
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    }
                  >
                    Rejected
                  </Badge>
                  <Badge
                    variant="pending"
                    icon={
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" fill="currentColor" />
                        <circle cx="12" cy="12" r="3" fill="white" />
                      </svg>
                    }
                  >
                    In Progress
                  </Badge>
                  <Badge
                    variant="warning"
                    icon={
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 22h20L12 2z" fill="currentColor" />
                        <path
                          d="M12 8v4M12 16h.01"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  >
                    Attention
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Count Badges */}
          <Card className="mt-8">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Count Badges
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-body text-gray-900">Notifications</span>
                <CountBadge count={5} variant="danger" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-body text-gray-900">Messages</span>
                <CountBadge count={12} variant="default" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-body text-gray-900">Updates</span>
                <CountBadge count={3} variant="info" />
              </div>
            </div>
          </Card>

          {/* Tags with Remove */}
          <Card className="mt-8">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Tags with Remove
            </h3>
            <div className="flex flex-wrap gap-4">
              <Tag onRemove={() => console.log("Remove Tourism")}>
                Tourism
              </Tag>
              <Tag onRemove={() => console.log("Remove Business")}>
                Business
              </Tag>
              <Tag onRemove={() => console.log("Remove Student")}>
                Student
              </Tag>
              <Tag onRemove={() => console.log("Remove Work")}>Work</Tag>
            </div>
          </Card>
        </section>
        )}

        {/* Tables Section */}
        {activeItem === "tables" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Tables</h2>
          
          <div className="space-y-8">
            {/* Basic Table */}
            <Card>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                Basic Table
              </h3>
              <Table columns={basicTableColumns} data={basicTableData} />
            </Card>

            {/* Table with Selection */}
            <Card>
              <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                Table with Selection
              </h3>
              <Table
                columns={selectionTableColumns}
                data={selectionTableData}
                selectable
                selectedRows={selectedTableRows}
                onRowSelect={handleRowSelect}
              />
            </Card>
          </div>
        </section>
        )}

        {/* Cards Section */}
        {activeItem === "cards" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">Cards</h2>
          <p className="text-body text-gray-600 mb-6">
            Card components with different layouts and content types
          </p>
          
          <Card>
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Basic Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BasicCard
                icon={
                  <svg
                    className="w-6 h-6 text-white"
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
                }
                title="Country Master"
                description="Manage country information and configurations"
                entryCount="125 entries"
              />
              <BasicCard
                icon={
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
                title="Visa Master"
                description="Configure visa types and processing rules"
                entryCount="89 entries"
              />
              <BasicCard
                icon={
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="Document Master"
                description="Manage required documentation templates"
                entryCount="54 entries"
              />
            </div>
          </Card>

          {/* Stats Cards */}
          <Card className="mt-8">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Stats Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard
                title="TOTAL COUNTRIES"
                icon={
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                value="125"
                change="+12% vs last month"
                changeType="positive"
              />
              <StatsCard
                title="ACTIVE VISAS"
                icon={
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
                value="89"
                change="+8% vs last month"
                changeType="positive"
              />
              <StatsCard
                title="DOCUMENTS"
                icon={
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
                value="54"
                change="-3% vs last month"
                changeType="negative"
              />
              <StatsCard
                title="PROCESSING"
                icon={
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                value="32"
                change="+5% vs last month"
                changeType="positive"
              />
            </div>
          </Card>

          {/* List Cards */}
          <Card className="mt-8">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              List Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ListCard
                title="Recent Activities"
                items={[
                  {
                    id: "1",
                    content: 'Country "United States" updated',
                    timestamp: "2 hours ago",
                  },
                  {
                    id: "2",
                    content: 'New visa type "Tourist" added',
                    timestamp: "5 hours ago",
                  },
                  {
                    id: "3",
                    content: 'Document "Passport" modified',
                    timestamp: "1 day ago",
                  },
                  {
                    id: "4",
                    content: "Tax structure updated",
                    timestamp: "2 days ago",
                  },
                ]}
              />
              <CountryListCard
                title="Top Countries"
                countries={[
                  {
                    id: "1",
                    name: "United States",
                    applicationCount: "1,234",
                    status: "active",
                  },
                  {
                    id: "2",
                    name: "United Kingdom",
                    applicationCount: "987",
                    status: "active",
                  },
                  {
                    id: "3",
                    name: "Canada",
                    applicationCount: "756",
                    status: "active",
                  },
                  {
                    id: "4",
                    name: "Australia",
                    applicationCount: "654",
                    status: "active",
                  },
                ]}
              />
            </div>
          </Card>
        </section>
        )}

        {/* Modals & Dialogs Section */}
        {activeItem === "modals-dialogs" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Modals & Dialogs
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Modal windows and dialog boxes for different use cases
          </p>
          
          <Card>
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Standard Modal
            </h3>
            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={() => setModalOpen(true)}
              >
                Open Modal
              </Button>
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Add New Country"
                onConfirm={() => {
                  console.log("Country saved");
                }}
                maxWidth="md"
              >
                <div className="space-y-4">
                  <Input
                    label="Country Name"
                    placeholder=""
                  />
                  <Input
                    label="Country Code"
                    placeholder=""
                  />
                  <Select
                    label="Status"
                    placeholder="Select status..."
                    disabled
                    options={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                  />
                </div>
              </Modal>
            </div>
          </Card>

          <Card className="mt-8">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Confirmation Dialog
            </h3>
            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={() => setConfirmModalOpen(true)}
              >
                Open Confirmation Dialog
              </Button>
              <ConfirmationDialog
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                title="Delete Country?"
                message="Are you sure you want to delete this country? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => {
                  console.log("Country deleted");
                }}
                variant="danger"
              />
            </div>
          </Card>

          <Card className="mt-8">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Success Dialog
            </h3>
            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={() => setSuccessDialogOpen(true)}
              >
                Open Success Dialog
              </Button>
              <SuccessDialog
                isOpen={successDialogOpen}
                onClose={() => setSuccessDialogOpen(false)}
                title="Success!"
                message="Country has been successfully added to the system."
                buttonText="Continue"
                onButtonClick={() => {
                  console.log("Continue clicked");
                }}
              />
            </div>
          </Card>
        </section>
        )}

        {/* Navigation Section */}
        {activeItem === "navigation" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">Navigation</h2>
          <p className="text-body text-gray-600 mb-6">
            Navigation patterns including tabs, breadcrumbs, and pagination
          </p>
          
          <Card>
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">Tabs</h3>
            <div className="space-y-8">
              {/* Default Tabs */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Default Tabs
                </h4>
                <Tabs
                  items={[
                    { id: "general-info", label: "General Info" },
                    { id: "assets", label: "Assets" },
                    { id: "age-rules", label: "Age Rules" },
                    { id: "tax-structure", label: "Tax Structure" },
                    { id: "configurations", label: "Configurations" },
                  ]}
                  activeTab={defaultActiveTab}
                  onTabChange={setDefaultActiveTab}
                  variant="default"
                />
              </div>

              {/* Pill Tabs */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Pill Tabs
                </h4>
                <Tabs
                  items={[
                    { id: "all", label: "All" },
                    { id: "active", label: "Active" },
                    { id: "inactive", label: "Inactive" },
                    { id: "draft", label: "Draft" },
                  ]}
                  activeTab={pillActiveTab}
                  onTabChange={setPillActiveTab}
                  variant="pill"
                />
              </div>

              {/* Tabs with Icons */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Tabs with Icons
                </h4>
                <Tabs
                  items={[
                    {
                      id: "overview",
                      label: "Overview",
                      icon: (
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
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ),
                    },
                    {
                      id: "analytics",
                      label: "Analytics",
                      icon: (
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
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      ),
                    },
                    {
                      id: "settings",
                      label: "Settings",
                      icon: (
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ),
                    },
                  ]}
                  activeTab={iconActiveTab}
                  onTabChange={setIconActiveTab}
                  variant="icon"
                />
              </div>
            </div>
          </Card>

          {/* Breadcrumbs */}
          <Card className="mt-8">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Breadcrumbs
            </h3>
            <div className="space-y-6">
              {/* Default Breadcrumb */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Default Breadcrumb
                </h4>
                <Breadcrumbs
                  items={[
                    { id: "home", label: "Home" },
                    { id: "master-setup", label: "Master Setup" },
                    { id: "country-master", label: "Country Master" },
                  ]}
                />
              </div>

              {/* Breadcrumb with Icons */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Breadcrumb with Icons
                </h4>
                <Breadcrumbs
                  items={[
                    {
                      id: "home",
                      label: "Home",
                      icon: (
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
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      ),
                    },
                    {
                      id: "master-setup",
                      label: "Master Setup",
                      icon: (
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ),
                    },
                    {
                      id: "country-master",
                      label: "Country Master",
                      icon: (
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
                      ),
                    },
                  ]}
                  showIcons={true}
                />
              </div>
            </div>
          </Card>

          {/* Pagination */}
          <Card className="mt-8">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Pagination
            </h3>
            <div className="space-y-8">
              {/* Default Pagination */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Default Pagination
                </h4>
                <Pagination
                  currentPage={defaultPaginationPage}
                  totalPages={5}
                  onPageChange={setDefaultPaginationPage}
                  variant="default"
                  showPageNumbers={5}
                />
              </div>

              {/* Pagination with Info */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Pagination with Info
                </h4>
                <Pagination
                  currentPage={infoPaginationPage}
                  totalPages={13}
                  onPageChange={setInfoPaginationPage}
                  variant="with-info"
                  totalItems={125}
                  itemsPerPage={10}
                  showPageNumbers={3}
                />
              </div>
            </div>
          </Card>
        </section>
        )}

        {/* Foundation Section - Border Radius */}
        {activeItem === "foundation" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">
            Border Radius
          </h2>
          
          <div className="grid grid-cols-4 gap-6">
            {/* Row 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-none mx-auto mb-2"></div>
              <p className="text-sm text-gray-900 font-medium">None</p>
              <p className="text-xs text-gray-500">0px</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 mx-auto mb-2" style={{ borderRadius: "2px" }}></div>
              <p className="text-sm text-gray-900 font-medium">Small</p>
              <p className="text-xs text-gray-500">2px</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 mx-auto mb-2" style={{ borderRadius: "6px" }}></div>
              <p className="text-sm text-gray-900 font-medium">Medium</p>
              <p className="text-xs text-gray-500">6px</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 mx-auto mb-2" style={{ borderRadius: "8px" }}></div>
              <p className="text-sm text-gray-900 font-medium">Large</p>
              <p className="text-xs text-gray-500">8px</p>
            </div>

            {/* Row 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 mx-auto mb-2" style={{ borderRadius: "12px" }}></div>
              <p className="text-sm text-gray-900 font-medium">XLarge</p>
              <p className="text-xs text-gray-500">12px</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 mx-auto mb-2" style={{ borderRadius: "16px" }}></div>
              <p className="text-sm text-gray-900 font-medium">2XLarge</p>
              <p className="text-xs text-gray-500">16px</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 mx-auto mb-2" style={{ borderRadius: "9999px" }}></div>
              <p className="text-sm text-gray-900 font-medium">Full</p>
              <p className="text-xs text-gray-500">9999px</p>
            </div>
            <div></div>
          </div>
        </section>
        )}

        {/* Foundation Section - Shadows */}
        {activeItem === "foundation" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-6">Shadows</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-4 gap-6">
              {/* None */}
              <div className="text-center">
                <div className="w-32 h-24 bg-white mx-auto mb-3" style={{ boxShadow: "none" }}></div>
                <p className="text-sm text-gray-900 font-medium">None</p>
                <p className="text-xs text-gray-500">No shadow</p>
              </div>

              {/* Small */}
              <div className="text-center">
                <div className="w-32 h-24 bg-white mx-auto mb-3" style={{ boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}></div>
                <p className="text-sm text-gray-900 font-medium">Small</p>
                <p className="text-xs text-gray-500">0 1px 2px</p>
              </div>

              {/* Medium */}
              <div className="text-center">
                <div className="w-32 h-24 bg-white mx-auto mb-3" style={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}></div>
                <p className="text-sm text-gray-900 font-medium">Medium</p>
                <p className="text-xs text-gray-500">0 4px 6px</p>
              </div>

              {/* Large */}
              <div className="text-center">
                <div className="w-32 h-24 bg-white mx-auto mb-3" style={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}></div>
                <p className="text-sm text-gray-900 font-medium">Large</p>
                <p className="text-xs text-gray-500">0 10px 15px</p>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Alerts & Messages Section */}
        {activeItem === "alerts-messages" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Alerts & Messages
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Alert boxes and notification messages
          </p>
          
          <Card>
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Alert Types
            </h3>
            <div className="space-y-4">
              <Alert
                variant="success"
                title="Success"
                onClose={() => console.log("Close success alert")}
              >
                Your changes have been successfully saved to the database.
              </Alert>
              <Alert
                variant="info"
                title="Information"
                onClose={() => console.log("Close info alert")}
              >
                Please review the new visa requirements before submitting applications.
              </Alert>
              <Alert
                variant="warning"
                title="Warning"
                onClose={() => console.log("Close warning alert")}
              >
                Some fields are missing. Please complete all required information.
              </Alert>
              <Alert
                variant="error"
                title="Error"
                onClose={() => console.log("Close error alert")}
              >
                Unable to process your request. Please try again later.
              </Alert>
            </div>
          </Card>
        </section>
        )}

        {/* Dropdowns Section */}
        {activeItem === "dropdowns" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Dropdowns
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Menu dropdowns and context menus
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Dropdown */}
            <div>
              <h3 className="text-h5 font-semibold text-gray-900 mb-4">
                Basic Dropdown
              </h3>
              <Dropdown
                items={[
                  {
                    id: "profile",
                    label: "Profile Settings",
                    onClick: () => console.log("Profile Settings"),
                  },
                  {
                    id: "account",
                    label: "Account",
                    onClick: () => console.log("Account"),
                  },
                  {
                    id: "support",
                    label: "Support",
                    onClick: () => console.log("Support"),
                  },
                  {
                    id: "logout",
                    label: "Logout",
                    variant: "danger",
                    onClick: () => console.log("Logout"),
                  },
                ]}
              />
            </div>

            {/* Dropdown with Icons */}
            <div>
              <h3 className="text-h5 font-semibold text-gray-900 mb-4">
                Dropdown with Icons
              </h3>
              <Dropdown
                items={[
                  {
                    id: "edit",
                    label: "Edit",
                    icon: (
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
                    ),
                    onClick: () => console.log("Edit"),
                  },
                  {
                    id: "duplicate",
                    label: "Duplicate",
                    icon: (
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                    onClick: () => console.log("Duplicate"),
                  },
                  {
                    id: "archive",
                    label: "Archive",
                    icon: (
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
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    ),
                    onClick: () => console.log("Archive"),
                  },
                  {
                    id: "delete",
                    label: "Delete",
                    variant: "danger",
                    icon: (
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
                    ),
                    onClick: () => console.log("Delete"),
                  },
                ]}
              />
            </div>

            {/* Dropdown with Sections */}
            <div>
              <h3 className="text-h5 font-semibold text-gray-900 mb-4">
                Dropdown with Sections
              </h3>
              <Dropdown
                sections={[
                  {
                    id: "actions",
                    title: "ACTIONS",
                    items: [
                      {
                        id: "view-details",
                        label: "View Details",
                        onClick: () => console.log("View Details"),
                      },
                      {
                        id: "edit-entry",
                        label: "Edit Entry",
                        onClick: () => console.log("Edit Entry"),
                      },
                    ],
                  },
                  {
                    id: "danger-zone",
                    title: "DANGER ZONE",
                    items: [
                      {
                        id: "delete-entry",
                        label: "Delete",
                        variant: "danger",
                        onClick: () => console.log("Delete"),
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </section>
        )}

        {/* Toggles & Switches Section */}
        {activeItem === "toggles-switches" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Toggles & Switches
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Toggle switches and option selectors
          </p>
          
          <Card>
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Toggle Switches
            </h3>
            
            <div className="space-y-6">
              {/* Default Toggles */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Default Toggles
                </h4>
                <div className="space-y-4">
                  <Toggle
                    label="Enable notifications"
                    checked={enableNotifications}
                    onChange={setEnableNotifications}
                  />
                  <Toggle
                    label="Auto-save changes"
                    checked={autoSaveChanges}
                    onChange={setAutoSaveChanges}
                  />
                  <Toggle
                    label="Disabled option"
                    checked={false}
                    disabled
                  />
                </div>
              </div>

              {/* Toggles with Description */}
              <div>
                <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                  Toggles with Description
                </h4>
                <div className="space-y-4">
                  <Toggle
                    label="Email Notifications"
                    description="Receive email updates about your account activity"
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                  />
                  <Toggle
                    label="Push Notifications"
                    description="Get push notifications on your mobile device"
                    checked={pushNotifications}
                    onChange={setPushNotifications}
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>
        )}

        {/* Tooltips Section */}
        {activeItem === "tooltips" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Tooltips
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Tooltip components for additional information
          </p>
          
          <Card>
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Tooltip Positions
            </h3>
            
            <div className="grid grid-cols-2 gap-8 py-8">
              {/* Top Position */}
              <div className="flex flex-col items-center justify-center">
                <Tooltip content="Tooltip on top" position="top">
                  <Button variant="primary" size="md">
                    Top
                  </Button>
                </Tooltip>
              </div>

              {/* Left Position */}
              <div className="flex flex-col items-center justify-center">
                <Tooltip content="Tooltip on left" position="left">
                  <Button variant="primary" size="md">
                    Left
                  </Button>
                </Tooltip>
              </div>

              {/* Bottom Position */}
              <div className="flex flex-col items-center justify-center">
                <Tooltip content="Tooltip on bottom" position="bottom">
                  <Button variant="primary" size="md">
                    Bottom
                  </Button>
                </Tooltip>
              </div>

              {/* Right Position */}
              <div className="flex flex-col items-center justify-center">
                <Tooltip content="Tooltip on right" position="right">
                  <Button variant="primary" size="md">
                    Right
                  </Button>
                </Tooltip>
              </div>
            </div>
          </Card>
        </section>
        )}

        {/* Page Layouts Section */}
        {activeItem === "page-layouts" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Page Layouts
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Common page layout patterns and structures
          </p>
          
          <div>
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Layout Examples
            </h3>
            
            {/* List View Layout */}
            <div className="mb-8">
              <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                List View Layout
              </h4>
              <ListViewLayout>
                <ListViewItem />
                <ListViewItem />
                <ListViewItem />
                <ListViewItem />
                <ListViewItem />
              </ListViewLayout>
            </div>

            {/* Detail View Layout */}
            <div className="mb-8">
              <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                Detail View Layout
              </h4>
              <DetailViewLayout />
            </div>
          </div>
        </section>
        )}

        {/* Data Display Section */}
        {activeItem === "data-display" && (
        <section className="mb-12">
          <h2 className="text-h2 font-bold text-gray-900 mb-2">
            Data Display
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Components for displaying data and statistics
          </p>
          
          <Card className="p-6">
            <h3 className="text-h4 font-semibold text-gray-900 mb-6">
              Progress Indicators
            </h3>
            
            {/* Progress Bars */}
            <div className="mb-8">
              <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                Progress Bars
              </h4>
              <div className="space-y-4">
                <ProgressBar
                  value={75}
                  label="Completion"
                  variant="default"
                />
                <ProgressBar
                  value={45}
                  label="Processing"
                  variant="info"
                />
                <ProgressBar
                  value={92}
                  label="Success Rate"
                  variant="success"
                />
              </div>
            </div>

            {/* Loading Spinners */}
            <div>
              <h4 className="text-h5 font-semibold text-gray-900 mb-4">
                Loading Spinners
              </h4>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner variant="default" size="md" />
                  <span className="text-body text-gray-900">Default</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner variant="circle" size="md" />
                  <span className="text-body text-gray-900">Circle</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner variant="sync" size="md" />
                  <span className="text-body text-gray-900">Sync</span>
                </div>
              </div>
            </div>
          </Card>
        </section>
        )}

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
              <div className="px-6 py-6">
                <div className="flex justify-between items-center">
                  <p className="text-body text-gray-600">
                    © 2024 Visa Platform. All rights reserved.
                  </p>
                  <div className="flex gap-6">
                    <a href="#" className="text-body text-gray-600 hover:text-primary">
                      About
                    </a>
                    <a href="#" className="text-body text-gray-600 hover:text-primary">
                      Support
                    </a>
                    <a href="#" className="text-body text-gray-600 hover:text-primary">
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

