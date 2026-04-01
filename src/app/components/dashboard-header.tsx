import { useState } from "react";
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  pageTitle: string;
  onLogout: () => void;
}

export function DashboardHeader({
  onMenuClick,
  pageTitle,
  onLogout,
}: DashboardHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header
      className="h-16 bg-white flex items-center justify-between px-4 lg:px-6"
      style={{ borderBottom: "1px solid #E5E7EB" }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#F7F9FC")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "transparent")
          }
        >
          <Menu
            className="w-5 h-5"
            style={{ color: "#6B7280" }}
          />
        </button>
        
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}

        {/* Notifications */}
        <button
          className="relative p-2 rounded-md"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#F7F9FC")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "transparent")
          }
        >
          <Bell
            className="w-5 h-5"
            style={{ color: "#6B7280" }}
          />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#DC2626" }}
          />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-md"
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
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
              style={{
                backgroundColor: "#F24E1E",
                fontSize: "14px",
              }}
            >
              SA
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-20"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <div
                  className="px-4 py-3"
                  style={{ borderBottom: "1px solid #E5E7EB" }}
                >
                  <p
                    className="font-medium"
                    style={{
                      fontSize: "14px",
                      color: "#111111",
                    }}
                  >
                    Super Admin
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                    }}
                  >
                    admin@bhago.com
                  </p>
                </div>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2"
                  style={{
                    fontSize: "14px",
                    color: "#111111",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "#F7F9FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "transparent")
                  }
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2"
                  style={{
                    fontSize: "14px",
                    color: "#111111",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "#F7F9FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "transparent")
                  }
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <div
                  className="mt-1 pt-1"
                  style={{ borderTop: "1px solid #E5E7EB" }}
                >
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-2"
                    style={{
                      fontSize: "14px",
                      color: "#DC2626",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "#FEE2E2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "transparent")
                    }
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}