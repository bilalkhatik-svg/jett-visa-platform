import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import type { SidebarSection } from "../design-system/ui/sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

// Icon components
const BuildingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const WifiIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PassportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const ShoppingCartIcon = () => (
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
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M7 13l-4-8M16 21a1 1 0 100-2 1 1 0 000 2zM8 21a1 1 0 100-2 1 1 0 000 2z"
    />
  </svg>
);
const BarChartIcon = () => (
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
      d="M4 19V5M10 19V9M16 19v-6M22 19H2"
    />
  </svg>
);

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(["master-setup"]));

  const getActiveItemId = () => {
    if (location.pathname === "/" || location.pathname === "/country-master") {
      return "country-master";
    }
    return location.pathname.replace("/", "") || "country-master";
  };

  const handleItemClick = (itemId: string) => {
    // Toggle expansion for parent items
    if (expandedItems.has(itemId)) {
      setExpandedItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    } else {
      setExpandedItems((prev) => new Set(prev).add(itemId));
    }
  };

  const visaConfigSections: SidebarSection[] = [
    {
      title: "CONFIGURATION",
     items: [
      {
        id: "master-setup",
        label: "Master Setup",
        icon: <DatabaseIcon />,
      },
      {
        id: "visa-products",
        label: "Visa Products",
        icon: <PassportIcon />,
      },
      {
        id: "rules-engine",
        label: "Rules Engine",
        icon: <SettingsIcon />,
      },
    ],
  },
  {
    title: "FULFILLMENT",
    items: [
      {
        id: "orders",
        label: "Orders",
        icon: <ShoppingCartIcon />,
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChartIcon />,
      },
    ],
    },
  ];
const Sections: SidebarSection[] = [
    {
      title: "CONFIGURATION",
      items: [
        {
          id: "organization",
          label: "Organization",
          icon: <BuildingIcon />,
          children: [
            { id: "entities", label: "Entities", icon: <UsersIcon /> },
            { id: "users", label: "Users", icon: <UserIcon /> },
            { id: "channels", label: "Channels", icon: <WifiIcon /> },
            { id: "settings", label: "Settings", icon: <SettingsIcon /> },
          ],
        },
        {
          id: "master-setup",
          label: "Master Setup",
          icon: <DatabaseIcon />,
          children: [
            { id: "country-master", label: "Country Master", icon: <GlobeIcon /> },
            { id: "visa-master", label: "Visa Master", icon: <PassportIcon /> },
            { id: "document-master", label: "Document Master", icon: <DocumentIcon /> },
          ],
        },
        {
          id: "visa-catalog",
          label: "Visa Catalog",
          icon: <InfoIcon />,
          children: [
            { id: "list-sku", label: "List SKU", icon: <ListIcon /> },
            { id: "sku-pricing", label: "SKU Pricing", icon: <DollarIcon /> },
          ],
        },
      ],
    },
  ];
  const activeItemId = getActiveItemId();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900">Visa Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0113 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Enhanced Sidebar */}
        <aside className="w-64 bg-gray-50 h-[calc(100vh-4rem)] fixed left-0 top-16 overflow-y-auto border-r border-gray-200">
          <div className="py-4 pb-8">
            <nav className="space-y-6">
              {Sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isExpanded = expandedItems.has(item.id);
                      const hasChildren = item.children && item.children.length > 0;
                      const isParentActive = item.children?.some((child) => child.id === activeItemId);
                      const isActive = activeItemId === item.id;

                      return (
                        <div key={item.id}>
                          <button
                            onClick={() => {
                              if (hasChildren) {
                                handleItemClick(item.id);
                              }
                            }}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-md text-left transition-colors ${
                              isParentActive || isActive
                                ? "bg-black text-white font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <span
                                className={`shrink-0 w-5 h-5 ${
                                  isParentActive || isActive ? "text-white" : "text-gray-500"
                                }`}
                              >
                                {item.icon}
                              </span>
                              <span className="text-sm">{item.label}</span>
                            </div>
                            {hasChildren && (
                              <span
                                className={`shrink-0 ${
                                  isParentActive || isActive ? "text-white" : "text-gray-400"
                                }`}
                              >
                                {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                              </span>
                            )}
                          </button>
                          {item.children && isExpanded && (
                            <div className="ml-4 mt-0.5 space-y-0.5">
                              {item.children.map((child) => {
                                const isChildActive = activeItemId === child.id;
                                return (
                                  <Link
                                    key={child.id}
                                    to={child.id === "country-master" ? "/country-master" : child.id === "visa-master" ? "/visa-master" : `/${child.id}`}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-left transition-colors ${
                                      isChildActive
                                        ? "bg-white text-gray-900 font-medium"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                  >
                                    <span
                                      className={`shrink-0 w-5 h-5 ${
                                        isChildActive ? "text-gray-900" : "text-gray-500"
                                      }`}
                                    >
                                      {child.icon}
                                    </span>
                                    <span className="text-sm">{child.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}

