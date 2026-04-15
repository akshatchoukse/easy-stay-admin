import { useState } from 'react';
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  LogOut,
  X,
  Hotel,
  BedDouble,
  UserCheck,
  Package,
  IndianRupee,
  CalendarCheck,
  Sparkles,
} from 'lucide-react';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  activePage: string;
  onNavigate: (pageId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  { id: 'dashboard',       label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'hotel-hotels',    label: 'Hotels',         icon: Hotel },
  { id: 'hotel-rooms',     label: 'Rooms',          icon: BedDouble },
  { id: 'hotel-bookings',  label: 'Bookings',       icon: CalendarCheck },
  { id: 'hotel-staff',     label: 'Staff',          icon: UserCheck },
  { id: 'hotel-inventory', label: 'Inventory',      icon: Package },
  { id: 'hotel-expenses',  label: 'Expenses',       icon: IndianRupee },
  { id: 'hotel-amenities', label: 'Amenities',      icon: Sparkles },
];


export function DashboardSidebar({ isOpen, onClose, onLogout, activePage, onNavigate }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleItemClick = (id: string, hasChildren: boolean) => {
    if (hasChildren) {
      toggleExpanded(id);
    } else {
      onNavigate(id);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
        style={{ borderRight: '1px solid #E5E7EB' }}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <div>
            <h1 className="font-semibold" style={{ fontSize: '16px', color: '#111111' }}>Bhago Mobility</h1>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Super Admin Portal</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-5 h-5" style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 hide-scrollbar">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <NavItemComponent
                key={item.id}
                item={item}
                activeItem={activePage}
                expandedItems={expandedItems}
                onItemClick={handleItemClick}
              />
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4" style={{ borderTop: '1px solid #E5E7EB' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F24E1E', fontSize: '14px' }}>
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate" style={{ fontSize: '14px', color: '#111111' }}>
                Super Admin
              </p>
              <p className="truncate" style={{ fontSize: '12px', color: '#6B7280' }}>
                admin@bhago.com
              </p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-md transition-colors flex-shrink-0"
              style={{ color: '#DC2626', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

interface NavItemComponentProps {
  item: NavItem;
  activeItem: string;
  expandedItems: string[];
  onItemClick: (id: string, hasChildren: boolean) => void;
  depth?: number;
}

function NavItemComponent({
  item,
  activeItem,
  expandedItems,
  onItemClick,
  depth = 0,
}: NavItemComponentProps) {
  const hasChildren = !!(item.children && item.children.length > 0);
  const isExpanded = expandedItems.includes(item.id);
  const isActive = activeItem === item.id;
  const Icon = item.icon;

  return (
    <li>
      <button
        onClick={() => onItemClick(item.id, hasChildren)}
        className={`w-full flex items-center gap-3 px-3 rounded-md transition-colors ${
          depth > 0 ? 'pl-11' : ''
        }`}
        style={{
          height: '40px',
          fontSize: '14px',
          backgroundColor: isActive ? '#FFF1EC' : 'transparent',
          color: isActive ? '#F24E1E' : '#111111',
          fontWeight: isActive ? '500' : '400'
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = '#F7F9FC';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        {hasChildren && (
          <span className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
      </button>

      {hasChildren && isExpanded && (
        <ul className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <NavItemComponent
              key={child.id}
              item={child}
              activeItem={activeItem}
              expandedItems={expandedItems}
              onItemClick={onItemClick}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}