import { useState } from 'react';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardHeader } from './dashboard-header';
import { DashboardContent } from './dashboard-content';
import { RoleManagement } from './role-management';
import { PermissionBuilder } from './permission-builder';
import { UserManagement } from './user-management';
import { RiderManagement } from './rider-management';
import { KYCVerification } from './kyc-verification';
import { ComplianceFlags } from './compliance-flags';
import { HubManagement } from './hub-management';
import { VehicleRegistry } from './vehicle-registry';
import { BookingManagement } from './booking-management';
import { MaintenanceGovernance } from './maintenance-governance';
import { NotificationCampaignManagement } from './notification-campaign-management';
import { AuditLog } from './audit-log';
import { ModelMaster } from './model-master';

interface DashboardLayoutProps {
  onLogout: () => void;
}

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return 'Dashboard';
      case 'roles':
        return 'Role Management';
      case 'users':
        return 'User Management';
      case 'riders':
        return 'Riders';
      case 'kyc-verification':
        return 'KYC & Verification';
      case 'compliance-flags':
        return 'Compliance Flags';
      case 'permissions':
        return 'Permissions';
      case 'bookings':
        return 'Bookings';
      case 'vehicles':
        return 'Vehicles';
      case 'maintenance':
        return 'Maintenance';
      case 'notifications':
        return 'Notifications';
      case 'hubs':
        return 'Hubs';
      case 'audit':
        return 'Audit Log';
      case 'reports':
        return 'Reports';
      case 'model-master':
        return 'Model Master';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'users':
        return <UserManagement />;
      case 'riders':
        return <RiderManagement />;
      case 'kyc-verification':
        return <KYCVerification />;
      case 'compliance-flags':
        return <ComplianceFlags />;
      case 'roles':
        return <RoleManagement />;
      case 'permissions':
        return <PermissionBuilder />;
      case 'hubs':
        return <HubManagement />;
      case 'vehicles':
        return <VehicleRegistry />;
      case 'bookings':
        return <BookingManagement />;
      case 'maintenance':
        return <MaintenanceGovernance />;
      case 'notifications':
        return <NotificationCampaignManagement />;
      case 'audit':
        return <AuditLog />;
      case 'model-master':
        return <ModelMaster />;
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