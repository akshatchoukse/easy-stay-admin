import { useState } from 'react';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardHeader } from './dashboard-header';
import { DashboardContent } from './dashboard-content';
import { HotelManagement } from './hotel-management';
import { RoomManagement } from './room-management';
import { StaffManagementHotel } from './staff-management-hotel';
import { InventoryManagementHotel } from './inventory-management-hotel';
import { ExpenseManagementHotel } from './expense-management-hotel';
import { HotelBookingManagement } from './hotel-booking-management';
import { AmenityManagement } from './amenity-management';


interface DashboardLayoutProps {
  onLogout: () => void;
}

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':    return 'Dashboard';
      case 'hotel-hotels': return 'Hotels';
      case 'hotel-rooms':  return 'Room Management';
      case 'hotel-bookings': return 'Hotel Bookings';
      case 'hotel-staff':  return 'Staff Management';
      case 'hotel-inventory': return 'Inventory';
      case 'hotel-expenses':  return 'Expenses';
      case 'hotel-amenities': return 'Hotel Amenities';

      default: return 'Dashboard';
    }
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'hotel-hotels':    return <HotelManagement />;
      case 'hotel-rooms':     return <RoomManagement />;
      case 'hotel-bookings':  return <HotelBookingManagement />;
      case 'hotel-staff':     return <StaffManagementHotel />;
      case 'hotel-inventory': return <InventoryManagementHotel />;
      case 'hotel-expenses':  return <ExpenseManagementHotel />;
      case 'hotel-amenities': return <AmenityManagement />;

      case 'dashboard':
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F9FC' }}>
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
        activePage={activePage}
        onNavigate={(pageId) => {
          setActivePage(pageId);
          setSidebarOpen(false);
        }}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Header */}
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          pageTitle={getPageTitle()}
          onLogout={onLogout}
        />

        {/* Page Content */}
        <main>
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}