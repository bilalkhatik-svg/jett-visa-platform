import React from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: SidebarItem[];
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  activeItemId: string;
  onItemClick: (itemId: string) => void;
}

export default function Sidebar({
  sections,
  activeItemId,
  onItemClick,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-50 h-screen fixed left-0 top-0 overflow-y-auto border-r border-gray-200">
      <div className="py-4 pb-8">
        <nav className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeItemId === item.id;
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => onItemClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-left transition-colors ${
                          isActive
                            ? "bg-gray-200 text-gray-900 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`shrink-0 w-5 h-5 ${
                            isActive ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-sm">{item.label}</span>
                      </button>
                      {item.children && (
                        <div className="ml-4 mt-0.5 space-y-0.5">
                          {item.children.map((child) => {
                            const isChildActive = activeItemId === child.id;
                            return (
                              <button
                                key={child.id}
                                onClick={() => onItemClick(child.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-left transition-colors ${
                                  isChildActive
                                    ? "bg-gray-200 text-gray-900 font-medium"
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
                              </button>
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
  );
}
