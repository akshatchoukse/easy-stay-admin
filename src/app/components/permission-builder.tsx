import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Info,
  AlertTriangle,
  X,
  Save,
  RotateCcw,
  Check,
} from "lucide-react";
import React from "react";
import './permission-builder.css';

interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  reject: boolean;
  assign: boolean;
  export: boolean;
  override: boolean;
}

interface Screen {
  id: string;
  name: string;
  description: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  permissions: Permission;
  notes?: string;
  lastChangedBy?: string;
  lastChangedDate?: string;
  dependencies?: string[];
}

interface Module {
  id: string;
  name: string;
  screens: Screen[];
}

const modulesData: Module[] = [
  {
    id: "user-management",
    name: "User Management",
    screens: [
      {
        id: "users",
        name: "Users",
        description: "Manage system users and their profiles",
        riskLevel: "High",
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: false,
          approve: false,
          reject: false,
          assign: true,
          export: true,
          override: false,
        },
        notes: "User deletion requires Super Admin approval",
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-02-01",
        dependencies: ["Approve requires View"],
      },
      {
        id: "roles",
        name: "Roles",
        description: "Configure system roles and access levels",
        riskLevel: "Critical",
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: false,
          approve: false,
          reject: false,
          assign: false,
          export: true,
          override: false,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-02-01",
      },
      {
        id: "permissions",
        name: "Permissions",
        description: "Define and manage permission matrix",
        riskLevel: "Critical",
        permissions: {
          view: true,
          create: false,
          edit: true,
          delete: false,
          approve: false,
          reject: false,
          assign: false,
          export: true,
          override: true,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-01-28",
      },
    ],
  },
  {
    id: "hub-operations",
    name: "Hub Operations",
    screens: [
      {
        id: "hubs",
        name: "Hubs",
        description: "Manage hub locations and configurations",
        riskLevel: "Medium",
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: false,
          approve: true,
          reject: true,
          assign: false,
          export: true,
          override: false,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-01-25",
      },
      {
        id: "staff-mapping",
        name: "Staff Mapping",
        description: "Assign staff members to hubs and roles",
        riskLevel: "Medium",
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: true,
          approve: false,
          reject: false,
          assign: true,
          export: true,
          override: false,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-01-20",
      },
    ],
  },
  {
    id: "fleet-management",
    name: "Fleet Management",
    screens: [
      {
        id: "vehicles",
        name: "Vehicles",
        description: "Manage vehicle registry and fleet data",
        riskLevel: "High",
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: false,
          approve: true,
          reject: false,
          assign: true,
          export: true,
          override: false,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-01-22",
      },
      {
        id: "maintenance",
        name: "Maintenance",
        description:
          "Track vehicle maintenance and service records",
        riskLevel: "Medium",
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: false,
          approve: true,
          reject: true,
          assign: false,
          export: true,
          override: false,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-01-18",
      },
      {
        id: "downtime",
        name: "Downtime",
        description: "Manage vehicle downtime approvals",
        riskLevel: "Low",
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: false,
          approve: true,
          reject: true,
          assign: false,
          export: true,
          override: true,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-01-15",
      },
    ],
  },
  {
    id: "bookings",
    name: "Bookings & Operations",
    screens: [
      {
        id: "bookings",
        name: "Bookings",
        description: "View and manage customer bookings",
        riskLevel: "Medium",
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: false,
          approve: false,
          reject: false,
          assign: false,
          export: true,
          override: true,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-01-10",
      },
      {
        id: "reports",
        name: "Reports",
        description: "Access system reports and analytics",
        riskLevel: "Low",
        permissions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
          reject: false,
          assign: false,
          export: true,
          override: false,
        },
        lastChangedBy: "admin@bhago.com",
        lastChangedDate: "2024-01-05",
      },
    ],
  },
];

const actions = [
  {
    id: "view",
    label: "View",
    tooltip: "View screen and data",
  },
  {
    id: "create",
    label: "Create",
    tooltip: "Create new records",
  },
  {
    id: "edit",
    label: "Edit",
    tooltip: "Edit existing records",
  },
  { id: "delete", label: "Delete", tooltip: "Delete records" },
  {
    id: "approve",
    label: "Approve",
    tooltip: "Approve requests",
  },
  { id: "reject", label: "Reject", tooltip: "Reject requests" },
  {
    id: "assign",
    label: "Assign",
    tooltip: "Assign resources",
  },
  { id: "export", label: "Export", tooltip: "Export data" },
  {
    id: "override",
    label: "Override",
    tooltip: "Override restrictions",
  },
];

export function PermissionBuilder() {
  const [selectedRole, setSelectedRole] =
    useState("hub-manager");
  const [selectedScope, setSelectedScope] = useState("Hub");
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [showOnlyEnabled, setShowOnlyEnabled] = useState(false);
  const [expandedModules, setExpandedModules] = useState<
    string[]
  >([
    "user-management",
    "hub-operations",
    "fleet-management",
    "bookings",
  ]);
  const [selectedScreen, setSelectedScreen] =
    useState<Screen | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [modifiedCells, setModifiedCells] = useState<Set<string>>(new Set());
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>(modulesData);

  // Role metadata
  const roleMetadata = {
    "hub-manager": { type: "System", lastUpdated: "2024-02-01" },
    "super-admin": { type: "System", lastUpdated: "2024-02-05" },
    "fleet-manager": { type: "Custom", lastUpdated: "2024-01-28" },
    "operations-viewer": { type: "Custom", lastUpdated: "2024-01-20" },
    "customer-support": { type: "System", lastUpdated: "2024-01-15" },
  };

  const currentRoleMeta = roleMetadata[selectedRole as keyof typeof roleMetadata];

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const handlePermissionToggle = (
    screenId: string,
    action: string,
  ) => {
    setModules((prevModules) =>
      prevModules.map((module) => ({
        ...module,
        screens: module.screens.map((screen) =>
          screen.id === screenId
            ? {
                ...screen,
                permissions: {
                  ...screen.permissions,
                  [action]: !screen.permissions[action as keyof Permission],
                },
              }
            : screen
        ),
      }))
    );
    setHasChanges(true);
    setModifiedCells((prev) => new Set(prev.add(`${screenId}-${action}`)));
  };

  const handleSelectRow = (
    screenId: string,
    checked: boolean,
  ) => {
    setModules((prevModules) =>
      prevModules.map((module) => ({
        ...module,
        screens: module.screens.map((screen) =>
          screen.id === screenId
            ? {
                ...screen,
                permissions: Object.keys(screen.permissions).reduce(
                  (acc, key) => ({
                    ...acc,
                    [key]: checked,
                  }),
                  {} as Permission
                ),
              }
            : screen
        ),
      }))
    );
    setHasChanges(true);
    actions.forEach((action) => {
      setModifiedCells((prev) => new Set(prev.add(`${screenId}-${action.id}`)));
    });
  };

  const handleSelectColumn = (
    action: string,
    checked: boolean,
  ) => {
    setModules((prevModules) =>
      prevModules.map((module) => ({
        ...module,
        screens: module.screens.map((screen) => ({
          ...screen,
          permissions: {
            ...screen.permissions,
            [action]: checked,
          },
        })),
      }))
    );
    setHasChanges(true);
    modules.forEach((module) => {
      module.screens.forEach((screen) => {
        setModifiedCells((prev) => new Set(prev.add(`${screen.id}-${action}`)));
      });
    });
  };

  const handleSave = () => {
    console.log("Save changes");
    setHasChanges(false);
    setModifiedCells(new Set());
  };

  const handleReset = () => {
    console.log("Reset changes");
    setHasChanges(false);
    setModifiedCells(new Set());
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return { bg: "#DCFCE7", color: "#16A34A" };
      case "Medium":
        return { bg: "#FEF3C7", color: "#F59E0B" };
      case "High":
        return { bg: "#FED7AA", color: "#EA580C" };
      case "Critical":
        return { bg: "#FEE2E2", color: "#DC2626" };
      default:
        return { bg: "#F7F9FC", color: "#6B7280" };
    }
  };

  const getRiskLevelTooltip = (level: string) => {
    switch (level) {
      case "Low":
        return "Low risk: Minimal impact on system security or data integrity";
      case "Medium":
        return "Medium risk: Moderate impact requiring oversight";
      case "High":
        return "High risk: Significant impact requiring approval";
      case "Critical":
        return "Critical risk: Maximum impact - restricted to senior administrators";
      default:
        return "";
    }
  };

  return (
    <div
      className="p-6 space-y-6"
      style={{ backgroundColor: "#F7F9FC", minHeight: "100%", paddingBottom: hasChanges ? "120px" : "24px" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="font-semibold"
            style={{ fontSize: "24px", color: "#111111" }}
          >
            Permission Builder
          </h1>
          <p
            className="mt-1"
            style={{ fontSize: "14px", color: "#6B7280" }}
          >
            Configure screen and action level permissions for
            roles
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className="flex items-center gap-2 px-4 transition-colors disabled:opacity-50"
            style={{
              height: "40px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              backgroundColor: "white",
              fontSize: "14px",
              fontWeight: "500",
              color: "#111111",
            }}
            onMouseEnter={(e) =>
              !e.currentTarget.disabled &&
              (e.currentTarget.style.backgroundColor =
                "#F7F9FC")
            }
            onMouseLeave={(e) =>
              !e.currentTarget.disabled &&
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            <RotateCcw className="w-4 h-4" />
            Reset Changes
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex items-center gap-2 px-4 text-white transition-colors disabled:opacity-50"
            style={{
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "#F24E1E",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onMouseEnter={(e) =>
              !e.currentTarget.disabled &&
              (e.currentTarget.style.backgroundColor =
                "#D84315")
            }
            onMouseLeave={(e) =>
              !e.currentTarget.disabled &&
              (e.currentTarget.style.backgroundColor =
                "#F24E1E")
            }
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Role & Scope Selectors */}
      <div
        className="bg-white rounded-xl p-4"
        style={{ border: "1px solid #E5E7EB" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="roleSelector"
              className="block mb-2"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#111111",
              }}
            >
              Select Role
            </label>
            <div className="space-y-2">
              <select
                id="roleSelector"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3"
                style={{
                  height: "40px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "14px",
                  color: "#111111",
                }}
              >
                <option value="super-admin">Super Admin</option>
                <option value="hub-manager">Hub Manager</option>
                <option value="fleet-manager">
                  Fleet Manager
                </option>
                <option value="operations-viewer">
                  Operations Viewer
                </option>
                <option value="customer-support">
                  Customer Support
                </option>
              </select>
              <div className="flex items-center gap-3">
                <span
                  className="px-2 py-1 rounded-full"
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: currentRoleMeta.type === "System" ? "#F3F4F6" : "#FEF3C7",
                    color: currentRoleMeta.type === "System" ? "#374151" : "#92400E",
                  }}
                >
                  {currentRoleMeta.type}
                </span>
                <span style={{ fontSize: "13px", color: "#6B7280" }}>
                  Last updated: {new Date(currentRoleMeta.lastUpdated).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="scopeSelector"
              className="block mb-2"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#111111",
              }}
            >
              Data Scope
            </label>
            <select
              id="scopeSelector"
              value={selectedScope}
              onChange={(e) => setSelectedScope(e.target.value)}
              className="w-full px-3"
              style={{
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                fontSize: "14px",
                color: "#111111",
              }}
            >
              <option value="Global">Global</option>
              <option value="City">City</option>
              <option value="Hub">Hub</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        className="bg-white rounded-xl p-4"
        style={{ border: "1px solid #E5E7EB" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Search */}
          <div className="md:col-span-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: "#6B7280" }}
              />
              <input
                type="text"
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3"
                style={{
                  height: "40px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Module Filter */}
          <div>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full px-3"
              style={{
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                fontSize: "14px",
                color: "#111111",
              }}
            >
              <option value="all">All Modules</option>
              <option value="user-management">
                User Management
              </option>
              <option value="hub-operations">
                Hub Operations
              </option>
              <option value="fleet-management">
                Fleet Management
              </option>
              <option value="bookings">
                Bookings & Operations
              </option>
            </select>
          </div>

          {/* Toggle */}
        </div>
      </div>

      {/* Permission Matrix */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid #E5E7EB" }}
      >
        <div className="table-scroll-container">
          <table
            className="w-full"
            style={{ minWidth: "1200px" }}
          >
            {/* Header */}
            <thead
              className="sticky top-0 z-10"
              style={{ backgroundColor: "#F7F9FC" }}
            >
              <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                <th
                  className="px-6 text-left uppercase tracking-wider sticky left-0 z-20"
                  style={{
                    height: "48px",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#6B7280",
                    backgroundColor: "#F7F9FC",
                    width: "300px",
                    minWidth: "300px",
                  }}
                >
                  Module / Screen
                </th>
                {actions.map((action) => (
                  <th
                    key={action.id}
                    className="px-4 text-center uppercase tracking-wider"
                    style={{
                      height: "48px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#6B7280",
                      width: "100px",
                    }}
                    title={action.tooltip}
                    onMouseEnter={() => setHoveredColumn(action.id)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{action.label}</span>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleSelectColumn(
                            action.id,
                            e.target.checked,
                          )
                        }
                        className="permission-checkbox"
                        title={`Select all ${action.label}`}
                      />
                    </div>
                  </th>
                ))}
                <th
                  className="px-6 text-center uppercase tracking-wider"
                  style={{
                    height: "48px",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#6B7280",
                    width: "100px",
                  }}
                >
                  All
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {modules.flatMap((module) => [
                // Module Group Row
                <tr
                  key={`module-${module.id}`}
                  className="cursor-pointer"
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                    backgroundColor: "#FAFAFA",
                  }}
                  onClick={() => toggleModule(module.id)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "#F0F0F0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "#FAFAFA")
                  }
                >
                  <td
                    className="px-6 font-semibold sticky left-0 z-10"
                    style={{
                      height: "44px",
                      fontSize: "14px",
                      color: "#111111",
                      backgroundColor: "inherit",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      {module.name}
                      <span
                        className="ml-2 px-2 py-0.5 rounded-full"
                        style={{
                          fontSize: "11px",
                          backgroundColor: "#F7F9FC",
                          color: "#6B7280",
                        }}
                      >
                        {module.screens.length}
                      </span>
                    </div>
                  </td>
                  <td colSpan={actions.length + 1}></td>
                </tr>,
                // Screen Rows
                ...(expandedModules.includes(module.id)
                  ? module.screens.map((screen, index) => (
                      <tr
                        key={`screen-${module.id}-${screen.id}`}
                        style={{
                          borderBottom:
                            index < module.screens.length - 1
                              ? "1px solid #F1F5F9"
                              : "1px solid #E5E7EB",
                          height: "44px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "#FAFAFA")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "white")
                        }
                      >
                        <td
                          className="px-6 sticky left-0 z-10"
                          style={{
                            fontSize: "14px",
                            color: "#111111",
                            backgroundColor: "inherit",
                          }}
                        >
                          <div className="flex items-center gap-3" style={{ paddingLeft: "32px" }}>
                            <button
                              onClick={() =>
                                setSelectedScreen(screen)
                              }
                              className="text-left hover:underline"
                            >
                              {screen.name}
                            </button>
                            <span
                              className="px-2 py-0.5 rounded-full flex-shrink-0"
                              title={getRiskLevelTooltip(screen.riskLevel)}
                              style={{
                                fontSize: "11px",
                                fontWeight: "500",
                                ...getRiskLevelColor(
                                  screen.riskLevel,
                                ),
                                cursor: "help",
                              }}
                            >
                              {screen.riskLevel}
                            </span>
                          </div>
                        </td>
                        {actions.map((action) => {
                          const cellId = `${screen.id}-${action.id}`;
                          const isModified = modifiedCells.has(cellId);
                          const isHovered = hoveredColumn === action.id;
                          
                          return (
                          <td
                            key={action.id}
                            className="px-2 text-center"
                            style={{
                              backgroundColor: isHovered ? "#FAFAFA" : "transparent",
                            }}
                          >
                            <div className="flex justify-center items-center" style={{ minHeight: "32px" }}>
                              <label className="flex items-center justify-center cursor-pointer" style={{ width: "100%", height: "100%", padding: "8px" }}>
                              <input
                                type="checkbox"
                                checked={
                                  screen.permissions[
                                    action.id as keyof Permission
                                  ]
                                }
                                onChange={() =>
                                  handlePermissionToggle(
                                    screen.id,
                                    action.id,
                                  )
                                }
                                className="permission-checkbox"
                              />
                              </label>
                            </div>
                          </td>
                          );
                        })}
                        <td className="px-6 text-center">
                          <div className="flex justify-center items-center" style={{ minHeight: "32px" }}>
                            <label className="flex items-center justify-center cursor-pointer" style={{ padding: "8px" }}>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleSelectRow(
                                screen.id,
                                e.target.checked,
                              )
                            }
                            className="permission-checkbox"
                            title="Select all permissions for this screen"
                          />
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))
                  : []),
              ])}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Bar */}
      {hasChanges && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white z-30 shadow-lg"
          style={{
            borderTop: "1px solid #E5E7EB",
            paddingLeft: "256px",
          }}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle
                className="w-5 h-5"
                style={{ color: "#F59E0B" }}
              />
              <p
                style={{
                  fontSize: "14px",
                  color: "#111111",
                  fontWeight: "500",
                }}
              >
                You have unsaved changes
              </p>
              <span
                style={{ fontSize: "13px", color: "#6B7280" }}
              >
                • Version snapshot will be created on save
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 transition-colors"
                style={{
                  height: "40px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#111111",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#F7F9FC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "white")
                }
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 text-white transition-colors"
                style={{
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#F24E1E",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#D84315")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#F24E1E")
                }
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permission Detail Drawer */}
      {selectedScreen && (
        <PermissionDetailDrawer
          screen={selectedScreen}
          onClose={() => setSelectedScreen(null)}
        />
      )}
    </div>
  );
}

interface PermissionDetailDrawerProps {
  screen: Screen;
  onClose: () => void;
}

function PermissionDetailDrawer({
  screen,
  onClose,
}: PermissionDetailDrawerProps) {
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return { bg: "#DCFCE7", color: "#16A34A" };
      case "Medium":
        return { bg: "#FEF3C7", color: "#F59E0B" };
      case "High":
        return { bg: "#FED7AA", color: "#EA580C" };
      case "Critical":
        return { bg: "#FEE2E2", color: "#DC2626" };
      default:
        return { bg: "#F7F9FC", color: "#6B7280" };
    }
  };

  const getRiskLevelTooltip = (level: string) => {
    switch (level) {
      case "Low":
        return "Low risk: Minimal impact on system security or data integrity";
      case "Medium":
        return "Medium risk: Moderate impact requiring oversight";
      case "High":
        return "High risk: Significant impact requiring approval";
      case "Critical":
        return "Critical risk: Maximum impact - restricted to senior administrators";
      default:
        return "";
    }
  };

  const enabledPermissions = Object.entries(screen.permissions)
    .filter(([_, enabled]) => enabled)
    .map(([action]) => action);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full bg-white z-50 shadow-xl overflow-y-auto"
        style={{ width: "480px", maxWidth: "100vw" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-10"
          style={{ borderBottom: "1px solid #E5E7EB" }}
        >
          <h2
            className="font-semibold"
            style={{ fontSize: "18px", color: "#111111" }}
          >
            Permission Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md transition-colors"
            style={{ backgroundColor: "transparent" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "#F7F9FC")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "transparent")
            }
          >
            <X
              className="w-5 h-5"
              style={{ color: "#6B7280" }}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Screen Info */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#6B7280",
              }}
            >
              SCREEN NAME
            </label>
            <p
              className="font-semibold"
              style={{ fontSize: "16px", color: "#111111" }}
            >
              {screen.name}
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#6B7280",
              }}
            >
              DESCRIPTION
            </label>
            <p style={{ fontSize: "14px", color: "#111111" }}>
              {screen.description}
            </p>
          </div>

          {/* Risk Level */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#6B7280",
              }}
            >
              RISK LEVEL
            </label>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                ...getRiskLevelColor(screen.riskLevel),
              }}
            >
              {screen.riskLevel === "Critical" && (
                <AlertTriangle className="w-4 h-4" />
              )}
              {screen.riskLevel}
            </span>
            <div
              className="mt-1 text-sm"
              style={{ color: "#6B7280" }}
            >
              {getRiskLevelTooltip(screen.riskLevel)}
            </div>
          </div>

          {/* Enabled Permissions */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#6B7280",
              }}
            >
              ENABLED PERMISSIONS
            </label>
            <div className="flex flex-wrap gap-2">
              {enabledPermissions.map((permission) => (
                <span
                  key={permission}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full"
                  style={{
                    fontSize: "13px",
                    backgroundColor: "#FFF1EC",
                    color: "#F24E1E",
                    fontWeight: "500",
                  }}
                >
                  <Check className="w-3 h-3" />
                  {permission.charAt(0).toUpperCase() +
                    permission.slice(1)}
                </span>
              ))}
            </div>
          </div>

          {/* Dependencies */}
          {screen.dependencies &&
            screen.dependencies.length > 0 && (
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: "#FFF9E6",
                  border: "1px solid #FEF3C7",
                }}
              >
                <div className="flex gap-2 mb-2">
                  <Info
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color: "#F59E0B" }}
                  />
                  <label
                    className="font-medium"
                    style={{
                      fontSize: "13px",
                      color: "#92400E",
                    }}
                  >
                    Permission Dependencies
                  </label>
                </div>
                <ul className="space-y-1 ml-6">
                  {screen.dependencies.map((dep, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "13px",
                        color: "#92400E",
                      }}
                    >
                      • {dep}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Notes */}
          {screen.notes && (
            <div>
              <label
                className="block mb-2"
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6B7280",
                }}
              >
                PERMISSION NOTES
              </label>
              <div
                className="p-3 rounded-lg"
                style={{
                  backgroundColor: "#F7F9FC",
                  border: "1px solid #E5E7EB",
                }}
              >
                <p
                  style={{ fontSize: "14px", color: "#111111" }}
                >
                  {screen.notes}
                </p>
              </div>
            </div>
          )}

          {/* Audit Info */}
          <div
            className="pt-6 space-y-3"
            style={{ borderTop: "1px solid #E5E7EB" }}
          >
            <label
              className="block mb-2"
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#6B7280",
              }}
            >
              AUDIT INFORMATION
            </label>
            {screen.lastChangedBy && (
              <div className="flex justify-between">
                <span
                  style={{ fontSize: "14px", color: "#6B7280" }}
                >
                  Last Changed By
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#111111",
                    fontWeight: "500",
                  }}
                >
                  {screen.lastChangedBy}
                </span>
              </div>
            )}
            {screen.lastChangedDate && (
              <div className="flex justify-between">
                <span
                  style={{ fontSize: "14px", color: "#6B7280" }}
                >
                  Last Changed Date
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#111111",
                    fontWeight: "500",
                  }}
                >
                  {new Date(
                    screen.lastChangedDate,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}