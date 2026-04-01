import { useState } from 'react';
import {
  Search,
  Download,
  Eye,
  X,
  Calendar,
  User,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  actorEmail?: string;
  actorId?: string;
  actionType: 'Create' | 'Update' | 'Delete' | 'Approve' | 'Reject' | 'Assign' | 'Override' | 'Login' | 'Logout';
  module: 'Vehicles' | 'Bookings' | 'Maintenance' | 'Hubs' | 'Riders' | 'System Users' | 'Notifications' | 'Masters' | 'Settings / Permissions';
  screenName: string;
  entityType: string;
  entityId: string;
  changeSummary: string;
  ipAddress: string;
  device: string;
  result: 'Success' | 'Failed';
  changeDiff?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
}

// Mock data organized by module
const mockAuditLogs: AuditLog[] = [
  // Vehicles Module
  {
    id: 'AUD-2024-10234',
    timestamp: '06 Feb 2024, 02:32 PM',
    actorName: 'Priya Sharma',
    actorRole: 'Super Admin',
    actorEmail: 'priya.sharma@bhago.com',
    actorId: 'USR-10235',
    actionType: 'Update',
    module: 'Vehicles',
    screenName: 'Vehicle Registry',
    entityType: 'Vehicle',
    entityId: 'KA-01-AB-1234',
    changeSummary: 'Updated vehicle status: Active → Under Maintenance',
    ipAddress: '192.168.1.45',
    device: 'Chrome 120 / macOS',
    result: 'Success',
    changeDiff: {
      before: {
        status: 'Active',
        lastServiceDate: '15 Jan 2024',
      },
      after: {
        status: 'Under Maintenance',
        lastServiceDate: '06 Feb 2024',
        maintenanceReason: 'Scheduled battery check',
      },
    },
  },
  {
    id: 'AUD-2024-10240',
    timestamp: '06 Feb 2024, 11:20 AM',
    actorName: 'Ramesh Kumar',
    actorRole: 'Fleet Manager',
    actorEmail: 'ramesh.kumar@bhago.com',
    actorId: 'USR-10241',
    actionType: 'Create',
    module: 'Vehicles',
    screenName: 'Vehicle Registry',
    entityType: 'Vehicle',
    entityId: 'KA-05-MH-7890',
    changeSummary: 'Added new vehicle to fleet registry',
    ipAddress: '192.168.1.67',
    device: 'Chrome 120 / Windows 11',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        registrationNumber: 'KA-05-MH-7890',
        model: 'Activa Electric',
        status: 'Active',
        batteryCapacity: '3.94 kWh',
        assignedHub: 'Koramangala Hub',
      },
    },
  },
  {
    id: 'AUD-2024-10236',
    timestamp: '05 Feb 2024, 04:15 PM',
    actorName: 'Anjali Reddy',
    actorRole: 'Hub Manager',
    actorEmail: 'anjali.reddy@bhago.com',
    actorId: 'USR-10238',
    actionType: 'Update',
    module: 'Vehicles',
    screenName: 'Vehicle Detail',
    entityType: 'Vehicle',
    entityId: 'KA-02-CD-5678',
    changeSummary: 'Updated vehicle hub assignment',
    ipAddress: '192.168.1.89',
    device: 'Firefox 122 / Windows 11',
    result: 'Success',
    changeDiff: {
      before: {
        assignedHub: 'Whitefield Hub',
        hubId: 'HUB-WHF-01',
      },
      after: {
        assignedHub: 'Indiranagar Hub',
        hubId: 'HUB-IND-02',
      },
    },
  },
  // Bookings Module
  {
    id: 'AUD-2024-10227',
    timestamp: '06 Feb 2024, 08:30 AM',
    actorName: 'Deepika Iyer',
    actorRole: 'Customer Support',
    actorEmail: 'deepika.iyer@bhago.com',
    actorId: 'USR-10241',
    actionType: 'Update',
    module: 'Bookings',
    screenName: 'Booking Management',
    entityType: 'Booking',
    entityId: 'BKG-2024-8923',
    changeSummary: 'Extended booking duration by 2 hours',
    ipAddress: '192.168.1.103',
    device: 'Firefox 122 / Windows 11',
    result: 'Success',
    changeDiff: {
      before: {
        startTime: '06 Feb 2024, 08:00 AM',
        endTime: '06 Feb 2024, 12:00 PM',
        duration: '4 hours',
        amount: 400,
      },
      after: {
        startTime: '06 Feb 2024, 08:00 AM',
        endTime: '06 Feb 2024, 02:00 PM',
        duration: '6 hours',
        amount: 600,
      },
    },
  },
  {
    id: 'AUD-2024-10239',
    timestamp: '05 Feb 2024, 08:45 PM',
    actorName: 'System Auto',
    actorRole: 'System',
    actorId: 'SYSTEM',
    actionType: 'Create',
    module: 'Bookings',
    screenName: 'Booking Management',
    entityType: 'Booking',
    entityId: 'BKG-2024-9001',
    changeSummary: 'New booking created by rider',
    ipAddress: '103.45.67.89',
    device: 'Mobile App / Android 13',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        bookingId: 'BKG-2024-9001',
        riderId: 'RDR-8F3A1B',
        vehicleId: 'KA-01-AB-1234',
        planType: 'Daily',
        amount: 499,
      },
    },
  },
  // Maintenance Module
  {
    id: 'AUD-2024-10233',
    timestamp: '06 Feb 2024, 02:15 PM',
    actorName: 'Ramesh Kumar',
    actorRole: 'Hub Manager',
    actorEmail: 'ramesh.kumar@bhago.com',
    actorId: 'USR-10240',
    actionType: 'Approve',
    module: 'Maintenance',
    screenName: 'Downtime Approvals',
    entityType: 'Downtime Request',
    entityId: 'DT-2024-0142',
    changeSummary: 'Approved downtime request for vehicle KA-05-MH-1045',
    ipAddress: '192.168.1.78',
    device: 'Firefox 122 / Windows 11',
    result: 'Success',
    changeDiff: {
      before: {
        status: 'Pending Approval',
        approver: null,
      },
      after: {
        status: 'Approved',
        approver: 'Ramesh Kumar',
        approvedAt: '06 Feb 2024, 02:15 PM',
      },
    },
  },
  {
    id: 'AUD-2024-10242',
    timestamp: '05 Feb 2024, 10:30 AM',
    actorName: 'Vikram Singh',
    actorRole: 'Maintenance Staff',
    actorEmail: 'vikram.singh@bhago.com',
    actorId: 'USR-10245',
    actionType: 'Create',
    module: 'Maintenance',
    screenName: 'Maintenance Cases',
    entityType: 'Maintenance Case',
    entityId: 'MC-2024-0345',
    changeSummary: 'Created new maintenance case for battery issue',
    ipAddress: '192.168.1.56',
    device: 'Chrome 120 / Android 13',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        caseId: 'MC-2024-0345',
        vehicleId: 'KA-03-EF-2345',
        issueType: 'Battery',
        priority: 'High',
        status: 'Open',
      },
    },
  },
  // Hubs Module
  {
    id: 'AUD-2024-10230',
    timestamp: '06 Feb 2024, 11:20 AM',
    actorName: 'Vikram Singh',
    actorRole: 'Hub Manager',
    actorEmail: 'vikram.singh@bhago.com',
    actorId: 'USR-10238',
    actionType: 'Delete',
    module: 'Hubs',
    screenName: 'Hub Management',
    entityType: 'Hub Staff Assignment',
    entityId: 'STAFF-HUB-0234',
    changeSummary: 'Removed staff assignment: Rajesh Kumar from Whitefield Hub',
    ipAddress: '192.168.1.56',
    device: 'Chrome 120 / Windows 11',
    result: 'Success',
    changeDiff: {
      before: {
        staffId: 'STAFF-HUB-0234',
        staffName: 'Rajesh Kumar',
        hubName: 'Whitefield Hub',
        role: 'Maintenance Staff',
      },
      after: {},
    },
  },
  {
    id: 'AUD-2024-10244',
    timestamp: '04 Feb 2024, 03:20 PM',
    actorName: 'Priya Sharma',
    actorRole: 'Super Admin',
    actorEmail: 'priya.sharma@bhago.com',
    actorId: 'USR-10235',
    actionType: 'Update',
    module: 'Hubs',
    screenName: 'Hub Detail',
    entityType: 'Hub',
    entityId: 'HUB-KRM-01',
    changeSummary: 'Updated hub operational hours',
    ipAddress: '192.168.1.45',
    device: 'Chrome 120 / macOS',
    result: 'Success',
    changeDiff: {
      before: {
        operatingHours: '08:00 AM - 08:00 PM',
      },
      after: {
        operatingHours: '07:00 AM - 09:00 PM',
      },
    },
  },
  // Riders Module
  {
    id: 'AUD-2024-10245',
    timestamp: '06 Feb 2024, 09:15 AM',
    actorName: 'Deepika Iyer',
    actorRole: 'Customer Support',
    actorEmail: 'deepika.iyer@bhago.com',
    actorId: 'USR-10241',
    actionType: 'Update',
    module: 'Riders',
    screenName: 'Rider Management',
    entityType: 'Rider',
    entityId: 'RDR-8F3A1B',
    changeSummary: 'Updated rider KYC status to Verified',
    ipAddress: '192.168.1.103',
    device: 'Firefox 122 / Windows 11',
    result: 'Success',
    changeDiff: {
      before: {
        kycStatus: 'Pending',
        licenseVerified: false,
      },
      after: {
        kycStatus: 'Verified',
        licenseVerified: true,
        verifiedBy: 'Deepika Iyer',
        verifiedAt: '06 Feb 2024, 09:15 AM',
      },
    },
  },
  {
    id: 'AUD-2024-10246',
    timestamp: '05 Feb 2024, 02:30 PM',
    actorName: 'System Auto',
    actorRole: 'System',
    actorId: 'SYSTEM',
    actionType: 'Create',
    module: 'Riders',
    screenName: 'Rider Registration',
    entityType: 'Rider',
    entityId: 'RDR-9C2D4E',
    changeSummary: 'New rider registered via mobile app',
    ipAddress: '103.56.78.90',
    device: 'Mobile App / iOS 17',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        riderId: 'RDR-9C2D4E',
        name: 'Priya Sharma',
        phone: '+91 87654 32109',
        email: 'priya.sharma@yahoo.com',
        city: 'Delhi',
      },
    },
  },
  // System Users Module
  {
    id: 'AUD-2024-10229',
    timestamp: '06 Feb 2024, 10:45 AM',
    actorName: 'System Auto',
    actorRole: 'System',
    actorId: 'SYSTEM',
    actionType: 'Login',
    module: 'System Users',
    screenName: 'Authentication',
    entityType: 'User Session',
    entityId: 'sess_user_xyz123',
    changeSummary: 'User login: priya.sharma@bhago.com',
    ipAddress: '192.168.1.45',
    device: 'Chrome 120 / macOS',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        sessionId: 'sess_user_xyz123',
        userId: 'USR-10235',
        email: 'priya.sharma@bhago.com',
        loginTime: '06 Feb 2024, 10:45 AM',
      },
    },
  },
  {
    id: 'AUD-2024-10247',
    timestamp: '05 Feb 2024, 11:30 AM',
    actorName: 'Admin',
    actorRole: 'Super Admin',
    actorEmail: 'admin@bhago.com',
    actorId: 'USR-10001',
    actionType: 'Create',
    module: 'System Users',
    screenName: 'User Management',
    entityType: 'User',
    entityId: 'USR-10250',
    changeSummary: 'Created new user account for Amit Verma',
    ipAddress: '10.0.0.12',
    device: 'Chrome 120 / macOS',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        userId: 'USR-10250',
        name: 'Amit Verma',
        email: 'amit.verma@bhago.com',
        role: 'Hub Manager',
        assignedHub: 'MG Road Hub',
      },
    },
  },
  // Notifications Module
  {
    id: 'AUD-2024-10231',
    timestamp: '06 Feb 2024, 12:30 PM',
    actorName: 'Anjali Reddy',
    actorRole: 'Marketing Manager',
    actorEmail: 'anjali.reddy@bhago.com',
    actorId: 'USR-10267',
    actionType: 'Create',
    module: 'Notifications',
    screenName: 'Campaign Management',
    entityType: 'Campaign',
    entityId: 'CAMP-2024-0089',
    changeSummary: 'Created promotional campaign: "Valentine Week Offer"',
    ipAddress: '192.168.1.92',
    device: 'Safari 17 / iOS 17',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        name: 'Valentine Week Offer',
        type: 'Promotional',
        channels: ['Push', 'SMS'],
        targetScope: 'City',
        targetCities: ['Bangalore'],
        scheduledTime: '14 Feb 2024, 09:00 AM',
      },
    },
  },
  {
    id: 'AUD-2024-10248',
    timestamp: '04 Feb 2024, 05:45 PM',
    actorName: 'System Auto',
    actorRole: 'System',
    actorId: 'SYSTEM',
    actionType: 'Create',
    module: 'Notifications',
    screenName: 'Notification System',
    entityType: 'Notification',
    entityId: 'NOTIF-2024-1234',
    changeSummary: 'Sent booking confirmation notification',
    ipAddress: '10.0.0.5',
    device: 'Server / Automated',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        notificationId: 'NOTIF-2024-1234',
        type: 'Booking Confirmation',
        recipient: 'RDR-8F3A1B',
        channel: 'Push',
        status: 'Sent',
      },
    },
  },
  // Masters Module
  {
    id: 'AUD-2024-10249',
    timestamp: '03 Feb 2024, 02:15 PM',
    actorName: 'Priya Sharma',
    actorRole: 'Super Admin',
    actorEmail: 'priya.sharma@bhago.com',
    actorId: 'USR-10235',
    actionType: 'Create',
    module: 'Masters',
    screenName: 'Model Master',
    entityType: 'Vehicle Model',
    entityId: 'MODEL-ACT-ELEC',
    changeSummary: 'Added new vehicle model: Activa Electric',
    ipAddress: '192.168.1.45',
    device: 'Chrome 120 / macOS',
    result: 'Success',
    changeDiff: {
      before: {},
      after: {
        modelId: 'MODEL-ACT-ELEC',
        modelName: 'Activa Electric',
        manufacturer: 'Honda',
        batteryCapacity: '3.94 kWh',
        range: '102 km',
      },
    },
  },
  // Settings / Permissions Module
  {
    id: 'AUD-2024-10232',
    timestamp: '06 Feb 2024, 01:45 PM',
    actorName: 'Admin',
    actorRole: 'Super Admin',
    actorEmail: 'admin@bhago.com',
    actorId: 'USR-10001',
    actionType: 'Override',
    module: 'Settings / Permissions',
    screenName: 'Permission Builder',
    entityType: 'Permission',
    entityId: 'PERM-VEHICLE-DELETE',
    changeSummary: 'Overridden role permission: Fleet Manager can now delete vehicles',
    ipAddress: '10.0.0.12',
    device: 'Chrome 120 / macOS',
    result: 'Success',
    changeDiff: {
      before: {
        'Fleet Manager': {
          'vehicle.delete': false,
        },
      },
      after: {
        'Fleet Manager': {
          'vehicle.delete': true,
        },
      },
    },
  },
  {
    id: 'AUD-2024-10228',
    timestamp: '06 Feb 2024, 09:15 AM',
    actorName: 'Admin',
    actorRole: 'Super Admin',
    actorEmail: 'admin@bhago.com',
    actorId: 'USR-10001',
    actionType: 'Update',
    module: 'Settings / Permissions',
    screenName: 'Role Management',
    entityType: 'Role',
    entityId: 'ROLE-HUB-MGR',
    changeSummary: 'Updated role permissions for Hub Manager',
    ipAddress: '10.0.0.12',
    device: 'Chrome 120 / macOS',
    result: 'Success',
    changeDiff: {
      before: {
        permissions: {
          'vehicle.view': true,
          'vehicle.assign': true,
          'maintenance.approve': false,
        },
      },
      after: {
        permissions: {
          'vehicle.view': true,
          'vehicle.assign': true,
          'maintenance.approve': true,
        },
      },
    },
  },
];

type Module = 'Vehicles' | 'Bookings' | 'Maintenance' | 'Hubs' | 'Riders' | 'System Users' | 'Notifications' | 'Masters' | 'Settings / Permissions';

export function AuditLog() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [userFilter, setUserFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const modules: Module[] = [
    'Vehicles',
    'Bookings',
    'Maintenance',
    'Hubs',
    'Riders',
    'System Users',
    'Notifications',
    'Masters',
    'Settings / Permissions',
  ];

  // Filter logs by selected module
  const filteredLogs = mockAuditLogs.filter((log) => {
    if (!selectedModule) return false;
    
    const matchesModule = log.module === selectedModule;
    const matchesUser = userFilter === 'all' || log.actorName === userFilter;
    
    // Date filtering (simplified for demo)
    let matchesDate = true;
    if (startDate || endDate) {
      // In production, implement proper date range filtering
      matchesDate = true;
    }

    return matchesModule && matchesUser && matchesDate;
  });

  // Get unique users for filter dropdown
  const uniqueUsers = Array.from(new Set(mockAuditLogs.map(log => log.actorName)));

  // Pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + rowsPerPage);

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setIsDetailOpen(true);
  };

  const handleExportLogs = () => {
    console.log('Exporting logs for module:', selectedModule);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Create':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Update':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'Delete':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      case 'Approve':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Reject':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      case 'Override':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
    }
  };

  return (
    <div className="flex-1 overflow-auto hide-scrollbar" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
              Audit Log
            </h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              System-wide activity and change trace
            </p>
          </div>
          {selectedModule && (
            <button
              onClick={handleExportLogs}
              className="flex items-center gap-2 px-4 text-white transition-colors"
              style={{
                height: '40px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: '#F24E1E',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
            >
              <Download className="w-4 h-4" />
              Export Logs
            </button>
          )}
        </div>

        {/* Module Selector */}
        <div className="mb-6">
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Select Module
          </label>
          <div className="grid grid-cols-9 gap-3">
            {modules.map((module) => (
              <button
                key={module}
                onClick={() => {
                  setSelectedModule(module);
                  setCurrentPage(1);
                }}
                className="text-center transition-all"
                style={{
                  padding: '16px 12px',
                  borderRadius: '8px',
                  border: selectedModule === module ? '2px solid #F24E1E' : '1px solid #E5E7EB',
                  backgroundColor: selectedModule === module ? '#FFF1EC' : 'white',
                  fontSize: '13px',
                  fontWeight: selectedModule === module ? '600' : '500',
                  color: selectedModule === module ? '#F24E1E' : '#111111',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (selectedModule !== module) {
                    e.currentTarget.style.backgroundColor = '#F7F9FC';
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedModule !== module) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }
                }}
              >
                {module}
              </button>
            ))}
          </div>
        </div>

        {/* Show message if no module selected */}
        {!selectedModule && (
          <div className="bg-white rounded-xl p-12 text-center" style={{ border: '1px solid #E5E7EB' }}>
            <div
              className="mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
            >
              <Search className="w-8 h-8" style={{ color: '#6B7280' }} />
            </div>
            <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#111111' }}>
              Select a Module to View Audit Logs
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              Choose a module from the options above to view its audit trail
            </p>
          </div>
        )}

        {/* Filters and Table (shown only when module is selected) */}
        {selectedModule && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ border: '1px solid #E5E7EB' }}>
              <div className="grid grid-cols-12 gap-4">
                {/* Date Range */}
                <div className="col-span-6">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder="Start Date"
                        className="w-full pl-10 pr-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder="End Date"
                        className="w-full pl-10 pr-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* User Filter */}
                <div className="col-span-4">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Filter by User
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                    <select
                      value={userFilter}
                      onChange={(e) => {
                        setUserFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    >
                      <option value="all">All Users</option>
                      {uniqueUsers.map((user) => (
                        <option key={user} value={user}>
                          {user}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results Count */}
                <div className="col-span-2 flex items-end">
                  <div className="w-full text-right">
                    <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                      Total Records
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                      {filteredLogs.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
              {paginatedLogs.length === 0 ? (
                <div className="text-center py-12">
                  <div
                    className="mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
                  >
                    <Search className="w-8 h-8" style={{ color: '#6B7280' }} />
                  </div>
                  <h3 className="font-semibold mb-1" style={{ fontSize: '16px', color: '#111111' }}>
                    No audit records found
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    Try adjusting your filters or select a different date range
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                        <tr>
                          <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '25%' }}>
                            Timestamp
                          </th>
                          <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '30%' }}>
                            User Name
                          </th>
                          <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '30%' }}>
                            User Role
                          </th>
                          <th className="px-6 py-3 text-center uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '15%' }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedLogs.map((log, index) => (
                          <tr
                            key={log.id}
                            style={{
                              borderBottom: index < paginatedLogs.length - 1 ? '1px solid #F1F5F9' : 'none',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            <td className="px-6 py-4" style={{ fontSize: '14px', color: '#111111' }}>
                              {log.timestamp}
                            </td>
                            <td className="px-6 py-4" style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                              {log.actorName}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className="px-3 py-1 rounded inline-block"
                                style={{
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  backgroundColor: '#F7F9FC',
                                  color: '#6B7280',
                                }}
                              >
                                {log.actorRole}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleViewDetails(log)}
                                className="inline-flex items-center gap-2 px-4 transition-colors"
                                style={{
                                  height: '36px',
                                  borderRadius: '6px',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  color: '#F24E1E',
                                  backgroundColor: '#FFF1EC',
                                  border: '1px solid #F24E1E',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#F24E1E';
                                  e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#FFF1EC';
                                  e.currentTarget.style.color = '#F24E1E';
                                }}
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div
                    className="flex items-center justify-between px-6 py-4"
                    style={{ borderTop: '1px solid #E5E7EB' }}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '14px', color: '#6B7280' }}>Rows per page:</span>
                      <select
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="px-2 py-1"
                        style={{
                          borderRadius: '6px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '14px', color: '#6B7280' }}>
                        {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredLogs.length)} of {filteredLogs.length}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 transition-colors"
                          style={{
                            borderRadius: '6px',
                            border: '1px solid #E5E7EB',
                            fontSize: '14px',
                            color: currentPage === 1 ? '#D1D5DB' : '#111111',
                            backgroundColor: 'white',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                          }}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={startIndex + rowsPerPage >= filteredLogs.length}
                          className="px-3 py-1 transition-colors"
                          style={{
                            borderRadius: '6px',
                            border: '1px solid #E5E7EB',
                            fontSize: '14px',
                            color: startIndex + rowsPerPage >= filteredLogs.length ? '#D1D5DB' : '#111111',
                            backgroundColor: 'white',
                            cursor: startIndex + rowsPerPage >= filteredLogs.length ? 'not-allowed' : 'pointer',
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Detail Drawer */}
      {isDetailOpen && selectedLog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsDetailOpen(false)}
        >
          <div
            className="h-full bg-white overflow-y-auto hide-scrollbar"
            style={{ width: '600px', boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white"
              style={{ borderBottom: '1px solid #E5E7EB' }}
            >
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                  Audit Log Detail
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>
                  {selectedLog.module} • {selectedLog.id}
                </p>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X className="w-5 h-5" style={{ color: '#6B7280' }} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6" style={{ paddingBottom: '32px' }}>
              {/* Overview Card */}
              <div className="bg-white rounded-md p-5 mb-6" style={{ border: '1px solid #E5E7EB' }}>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      ...getActionColor(selectedLog.actionType),
                    }}
                  >
                    {selectedLog.actionType}
                  </span>
                  {selectedLog.result === 'Success' ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#16A34A' }} />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#16A34A' }}>
                        Success
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5" style={{ color: '#DC2626' }} />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#DC2626' }}>
                        Failed
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div>
                    <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Module
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {selectedLog.module}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Timestamp
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {selectedLog.timestamp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actor Details */}
              <div className="mb-6">
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Actor Details
                </h3>
                <div className="bg-white rounded-md p-5" style={{ border: '1px solid #E5E7EB' }}>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                          User Name
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                          {selectedLog.actorName}
                        </span>
                      </div>
                      <span
                        className="px-3 py-1 rounded"
                        style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: '#F7F9FC',
                          color: '#6B7280',
                        }}
                      >
                        {selectedLog.actorRole}
                      </span>
                    </div>
                    {selectedLog.actorEmail && (
                      <div>
                        <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                          Email
                        </span>
                        <span style={{ fontSize: '14px', color: '#111111' }}>
                          {selectedLog.actorEmail}
                        </span>
                      </div>
                    )}
                    <div>
                      <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        User ID
                      </span>
                      <code style={{ fontSize: '13px', fontFamily: 'monospace', color: '#111111', backgroundColor: '#F7F9FC', padding: '4px 8px', borderRadius: '4px' }}>
                        {selectedLog.actorId}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Details */}
              <div className="mb-6">
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Action Details
                </h3>
                <div className="bg-white rounded-md p-5" style={{ border: '1px solid #E5E7EB' }}>
                  <div className="space-y-4">
                    <div>
                      <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Action Type
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        {selectedLog.actionType}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Entity Type
                      </span>
                      <span style={{ fontSize: '14px', color: '#111111' }}>
                        {selectedLog.entityType}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Entity ID
                      </span>
                      <code style={{ fontSize: '13px', fontFamily: 'monospace', color: '#111111', backgroundColor: '#F7F9FC', padding: '4px 8px', borderRadius: '4px' }}>
                        {selectedLog.entityId}
                      </code>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Screen Name
                      </span>
                      <span style={{ fontSize: '14px', color: '#111111' }}>
                        {selectedLog.screenName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Summary */}
              <div className="mb-6">
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Change Summary
                </h3>
                <div className="bg-white rounded-md p-5" style={{ border: '1px solid #E5E7EB' }}>
                  <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.6' }}>
                    {selectedLog.changeSummary}
                  </p>
                </div>
              </div>

              {/* Field Changes */}
              {selectedLog.changeDiff && (
                <div className="mb-6">
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                    Field Changes
                  </h3>
                  <div className="bg-white rounded-md overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
                    <table className="w-full">
                      <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                        <tr>
                          <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '33%' }}>
                            Field
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '33%' }}>
                            Old Value
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '33%' }}>
                            New Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys({ ...selectedLog.changeDiff.before, ...selectedLog.changeDiff.after }).map((field, index) => {
                          const oldValue = selectedLog.changeDiff?.before[field];
                          const newValue = selectedLog.changeDiff?.after[field];
                          
                          return (
                            <tr
                              key={field}
                              style={{
                                borderBottom: index < Object.keys({ ...selectedLog.changeDiff!.before, ...selectedLog.changeDiff!.after }).length - 1 ? '1px solid #F1F5F9' : 'none',
                              }}
                            >
                              <td className="px-4 py-3" style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                                {field}
                              </td>
                              <td className="px-4 py-3" style={{ fontSize: '13px', color: oldValue ? '#111111' : '#6B7280' }}>
                                {oldValue !== undefined ? (
                                  typeof oldValue === 'object' ? JSON.stringify(oldValue) : String(oldValue)
                                ) : (
                                  <span style={{ fontStyle: 'italic' }}>—</span>
                                )}
                              </td>
                              <td className="px-4 py-3" style={{ fontSize: '13px', color: newValue ? '#111111' : '#6B7280' }}>
                                {newValue !== undefined ? (
                                  typeof newValue === 'object' ? JSON.stringify(newValue) : String(newValue)
                                ) : (
                                  <span style={{ fontStyle: 'italic' }}>—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Technical Details */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Technical Details
                </h3>
                <div className="bg-white rounded-md p-5" style={{ border: '1px solid #E5E7EB' }}>
                  <div className="space-y-4">
                    <div>
                      <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        IP Address
                      </span>
                      <code style={{ fontSize: '13px', fontFamily: 'monospace', color: '#111111' }}>
                        {selectedLog.ipAddress}
                      </code>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Device / Browser
                      </span>
                      <span style={{ fontSize: '14px', color: '#111111' }}>
                        {selectedLog.device}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Audit ID
                      </span>
                      <code style={{ fontSize: '13px', fontFamily: 'monospace', color: '#111111', backgroundColor: '#F7F9FC', padding: '4px 8px', borderRadius: '4px' }}>
                        {selectedLog.id}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
