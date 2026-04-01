import { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  Edit,
  UserCog,
  BanIcon,
  Clock,
  Phone,
  Mail,
  Building,
  Calendar,
  FileText,
  Map as MapIcon,
} from 'lucide-react';
import { ScooterIcon } from './ui/scooter-icon';

interface HubProfileProps {
  hub: any;
  onClose: () => void;
}

// Mock data for hub details
const mockHubDetails = {
  id: '1',
  name: 'MG Road Hub',
  code: 'BLR-MGR-01',
  city: 'Bangalore',
  address: 'MG Road, Near Metro Station, Bangalore 560001',
  landmark: 'Opposite Phoenix Mall',
  pincode: '560001',
  state: 'Karnataka',
  country: 'India',
  latitude: '12.9716',
  longitude: '77.5946',
  managerName: 'Rajesh Kumar',
  managerEmail: 'rajesh.kumar@bhago.com',
  managerPhone: '+91 98765 43210',
  contactPhone: '+91 80 4567 8900',
  contactEmail: 'mgroad@bhago.com',
  vehicleCapacity: 50,
  currentVehicles: 42,
  staffCount: 8,
  activeBookings: 15,
  operatingHours: '6:00 AM - 10:00 PM',
  status: 'Active' as const,
  lastUpdated: '2024-02-04T10:30:00',
  createdOn: '2023-08-15T09:00:00',
  vehicles: [
    {
      id: '1',
      registrationNumber: 'KA-01-MH-1234',
      model: 'Activa Electric',
      status: 'Available',
      batteryLevel: 95,
      lastService: '2024-01-15',
    },
    {
      id: '2',
      registrationNumber: 'KA-01-MH-1235',
      model: 'Activa Electric',
      status: 'In Use',
      batteryLevel: 68,
      lastService: '2024-01-20',
    },
    {
      id: '3',
      registrationNumber: 'KA-01-MH-1236',
      model: 'Activa Electric',
      status: 'Maintenance',
      batteryLevel: 45,
      lastService: '2024-01-10',
    },
  ],
  staff: [
    {
      id: '1',
      name: 'Rajesh Kumar',
      role: 'Hub Manager',
      email: 'rajesh.kumar@bhago.com',
      phone: '+91 98765 43210',
      joinedDate: '2023-08-15',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Suresh Patil',
      role: 'Technician',
      email: 'suresh.patil@bhago.com',
      phone: '+91 98765 43215',
      joinedDate: '2023-09-01',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Meena Rao',
      role: 'Support Staff',
      email: 'meena.rao@bhago.com',
      phone: '+91 98765 43216',
      joinedDate: '2023-10-10',
      status: 'Active',
    },
  ],
};

export function HubProfile({ hub, onClose }: HubProfileProps) {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'staff'>('vehicles');
  const [hubData] = useState(mockHubDetails);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  // Mock users data from system
  const systemUsers = [
    {
      id: '1',
      name: 'Amit Singh',
      email: 'amit.singh@bhago.com',
      phone: '+91 98765 43220',
      userId: 'USR-2024-0089',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@bhago.com',
      phone: '+91 98765 43221',
      userId: 'USR-2024-0090',
    },
    {
      id: '3',
      name: 'Vikram Reddy',
      email: 'vikram.reddy@bhago.com',
      phone: '+91 98765 43222',
      userId: 'USR-2024-0091',
    },
    {
      id: '4',
      name: 'Anita Desai',
      email: 'anita.desai@bhago.com',
      phone: '+91 98765 43223',
      userId: 'USR-2024-0092',
    },
    {
      id: '5',
      name: 'Ravi Kumar',
      email: 'ravi.kumar@bhago.com',
      phone: '+91 98765 43224',
      userId: 'USR-2024-0093',
    },
  ];

  const selectedUser = systemUsers.find((u) => u.id === selectedUserId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Inactive':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getVehicleStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'In Use':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'Maintenance':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Offline':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getStaffStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Inactive':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const utilizationPercent = Math.round((hubData.currentVehicles / hubData.vehicleCapacity) * 100);

  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-8">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 mb-6 transition-colors"
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#6B7280',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub Management
        </button>

        {/* Header Section */}
        <div className="bg-white p-5 mb-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Hub Name */}
              <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '8px' }}>
                {hubData.name}
              </h1>
              
              {/* Hub Code, City, Status */}
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>
                  {hubData.code}
                </span>
                <span style={{ color: '#E5E7EB' }}>•</span>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                  {hubData.city}
                </span>
                <span style={{ color: '#E5E7EB' }}>•</span>
                <span
                  className="px-2 py-1 rounded-full"
                  style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    ...getStatusColor(hubData.status),
                  }}
                >
                  {hubData.status}
                </span>
              </div>

              {/* Full Address with Google Maps Link */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" style={{ color: '#6B7280', flexShrink: 0 }} />
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>
                    {hubData.address}
                  </span>
                  <span style={{ color: '#E5E7EB' }}>•</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hubData.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 transition-colors"
                    style={{ 
                      fontSize: '13px', 
                      fontWeight: '500',
                      color: '#F24E1E',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    View on Map
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111111',
                  backgroundColor: 'white',
                }}
                onClick={() => setShowEditModal(true)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <Edit className="w-4 h-4" />
                Edit Hub
              </button>
              {hubData.status === 'Active' && (
                <button
                  className="flex items-center gap-2 px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #DC2626',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#DC2626',
                    backgroundColor: 'white',
                  }}
                  onClick={() => setShowDeactivateDialog(true)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  <BanIcon className="w-4 h-4" />
                  Deactivate Hub
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary Info Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Vehicle Capacity */}
          <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-2">
              <ScooterIcon className="w-4 h-4" style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                Vehicle Capacity
              </span>
            </div>
            <p style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
              {hubData.vehicleCapacity}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>
              {utilizationPercent}% utilized
            </p>
          </div>

          {/* Current Vehicles */}
          <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-2">
              <ScooterIcon className="w-4 h-4" style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                Current Vehicles
              </span>
            </div>
            <p style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
              {hubData.currentVehicles}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>
              Active now
            </p>
          </div>

          {/* Staff Assigned */}
          <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                Staff Assigned
              </span>
            </div>
            <p style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
              {hubData.staffCount}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>
              Team members
            </p>
          </div>

          {/* Active Bookings */}
          <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                Active Bookings
              </span>
            </div>
            <p style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
              {hubData.activeBookings}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>
              In progress
            </p>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="space-y-6 mb-6">
          {/* Row 1: Address & Hub Manager */}
          <div className="grid grid-cols-2 gap-6">
            {/* Address Block */}
            <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                  Address
                </h3>
                <button
                  className="flex items-center gap-1 transition-colors"
                  style={{ fontSize: '13px', color: '#F24E1E' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" style={{ color: '#6B7280' }} />
                  <div>
                    <p style={{ fontSize: '14px', color: '#111111', marginBottom: '2px' }}>
                      {hubData.address}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>
                      {hubData.landmark}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Pincode
                    </p>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {hubData.pincode}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      State
                    </p>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {hubData.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Manager */}
            <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                  Hub Manager
                </h3>
                <button
                  className="flex items-center gap-1 transition-colors"
                  style={{ fontSize: '13px', color: '#F24E1E' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  <UserCog className="w-3 h-3" />
                  Reassign
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#FFF1EC',
                      color: '#F24E1E',
                      fontSize: '18px',
                      fontWeight: '600',
                    }}
                  >
                    {hubData.managerName.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: '#111111' }}>
                      {hubData.managerName}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>
                      Hub Manager
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: '#6B7280' }} />
                    <span style={{ fontSize: '13px', color: '#111111' }}>
                      {hubData.managerEmail}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" style={{ color: '#6B7280' }} />
                    <span style={{ fontSize: '13px', color: '#111111' }}>
                      {hubData.managerPhone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Operating Hours & Hub Contact Info */}
          <div className="grid grid-cols-2 gap-6">
            {/* Operating Hours */}
            <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                  Operating Hours
                </h3>
                <button
                  className="flex items-center gap-1 transition-colors"
                  style={{ fontSize: '13px', color: '#F24E1E' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" style={{ color: '#F24E1E' }} />
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                  {hubData.operatingHours}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '8px' }}>
                Open 7 days a week
              </p>
            </div>

            {/* Hub Contact Info */}
            <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                  Hub Contact Info
                </h3>
                <button
                  className="flex items-center gap-1 transition-colors"
                  style={{ fontSize: '13px', color: '#F24E1E' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1" style={{ color: '#6B7280' }} />
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '2px' }}>
                      Phone
                    </p>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {hubData.contactPhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1" style={{ color: '#6B7280' }} />
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '2px' }}>
                      Email
                    </p>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {hubData.contactEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Map Preview */}
          
        </div>

        {/* Tabs */}
        <div className="bg-white overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
          {/* Tab Headers */}
          <div className="flex items-center gap-1 px-6 pt-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <button
              onClick={() => setActiveTab('vehicles')}
              className="px-4 py-2 transition-colors"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'vehicles' ? '#F24E1E' : '#6B7280',
                borderBottom: activeTab === 'vehicles' ? '2px solid #F24E1E' : '2px solid transparent',
                marginBottom: '-1px',
              }}
              onMouseEnter={(e) => activeTab !== 'vehicles' && (e.currentTarget.style.color = '#111111')}
              onMouseLeave={(e) => activeTab !== 'vehicles' && (e.currentTarget.style.color = '#6B7280')}
            >
              <div className="flex items-center gap-2">
                <ScooterIcon className="w-4 h-4" />
                Vehicles ({hubData.currentVehicles})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className="px-4 py-2 transition-colors"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'staff' ? '#F24E1E' : '#6B7280',
                borderBottom: activeTab === 'staff' ? '2px solid #F24E1E' : '2px solid transparent',
                marginBottom: '-1px',
              }}
              onMouseEnter={(e) => activeTab !== 'staff' && (e.currentTarget.style.color = '#111111')}
              onMouseLeave={(e) => activeTab !== 'staff' && (e.currentTarget.style.color = '#6B7280')}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Staff ({hubData.staffCount})
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'vehicles' && (
              <div>
                <div className="mb-4">
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Assigned Vehicles
                  </h3>
                </div>

                <div className="overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                      <tr>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Registration Number
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Model
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Status
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Battery Level
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Last Service
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {hubData.vehicles.map((vehicle, index) => (
                        <tr
                          key={vehicle.id}
                          style={{
                            borderBottom: index < hubData.vehicles.length - 1 ? '1px solid #F1F5F9' : 'none',
                          }}
                        >
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>
                            <div className="flex items-center gap-2">
                              <ScooterIcon className="w-4 h-4" />
                              {vehicle.registrationNumber}
                            </div>
                          </td>
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280' }}>
                            {vehicle.model}
                          </td>
                          <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                            <span
                              className="px-2 py-1 rounded-full"
                              style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                ...getVehicleStatusColor(vehicle.status),
                              }}
                            >
                              {vehicle.status}
                            </span>
                          </td>
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111' }}>
                            {vehicle.batteryLevel}%
                          </td>
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            {new Date(vehicle.lastService).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'staff' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Staff Members
                  </h3>
                  <button
                    className="flex items-center gap-2 px-4 transition-colors"
                    style={{
                      height: '36px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#111111',
                      backgroundColor: 'white',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                    onClick={() => setShowAddStaffModal(true)}
                  >
                    <Users className="w-4 h-4" />
                    Add Staff Member
                  </button>
                </div>

                <div className="overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                      <tr>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Name
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Role
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Email
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Phone
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Joined Date
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {hubData.staff.map((member, index) => (
                        <tr
                          key={member.id}
                          style={{
                            borderBottom: index < hubData.staff.length - 1 ? '1px solid #F1F5F9' : 'none',
                          }}
                        >
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>
                            <div className="flex items-center gap-2">
                              <div
                                className="rounded-full flex items-center justify-center"
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  backgroundColor: '#FFF1EC',
                                  color: '#F24E1E',
                                  fontSize: '13px',
                                  fontWeight: '600',
                                }}
                              >
                                {member.name.charAt(0)}
                              </div>
                              {member.name}
                            </div>
                          </td>
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280' }}>
                            {member.role}
                          </td>
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280' }}>
                            {member.email}
                          </td>
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            {member.phone}
                          </td>
                          <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            {new Date(member.joinedDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                            <span
                              className="px-2 py-1 rounded-full"
                              style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                ...getStaffStatusColor(member.status),
                              }}
                            >
                              {member.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Hub Modal - Right Side Drawer */}
      {showEditModal && (
        <div
          className="fixed inset-0 flex items-center justify-end"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white h-full flex flex-col"
            style={{ width: '600px', borderLeft: '1px solid #E5E7EB' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                Edit Hub Details
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="transition-colors"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Basic Information Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    {/* Hub Name */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Hub Name *
                      </label>
                      <input
                        type="text"
                        defaultValue={hubData.name}
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>

                    {/* Hub Code */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Hub Code *
                      </label>
                      <input
                        type="text"
                        defaultValue={hubData.code}
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>

                    {/* City & State Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                          City *
                        </label>
                        <input
                          type="text"
                          defaultValue={hubData.city}
                          style={{
                            width: '100%',
                            height: '40px',
                            padding: '0 12px',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                            fontSize: '14px',
                            color: '#111111',
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                          State *
                        </label>
                        <input
                          type="text"
                          defaultValue={hubData.state}
                          style={{
                            width: '100%',
                            height: '40px',
                            padding: '0 12px',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                            fontSize: '14px',
                            color: '#111111',
                          }}
                        />
                      </div>
                    </div>

                    {/* Pincode */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Pincode *
                      </label>
                      <input
                        type="text"
                        defaultValue={hubData.pincode}
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Address Details
                  </h3>
                  <div className="space-y-4">
                    {/* Address */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Street Address *
                      </label>
                      <textarea
                        defaultValue={hubData.address}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    {/* Landmark */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Landmark
                      </label>
                      <input
                        type="text"
                        defaultValue={hubData.landmark}
                        placeholder="e.g., Near Metro Station"
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Operating Hours Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Operating Hours
                  </h3>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                      Operating Hours *
                    </label>
                    <input
                      type="text"
                      defaultValue={hubData.operatingHours}
                      placeholder="e.g., 6:00 AM - 10:00 PM"
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Hub Contact Information
                  </h3>
                  <div className="space-y-4">
                    {/* Contact Phone */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Contact Phone *
                      </label>
                      <input
                        type="text"
                        defaultValue={hubData.contactPhone}
                        placeholder="+91 80 4567 8900"
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>

                    {/* Contact Email */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        defaultValue={hubData.contactEmail}
                        placeholder="hubname@bhago.com"
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hub Manager Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Hub Manager
                  </h3>
                  <div className="space-y-4">
                    {/* Manager Name */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Manager Name *
                      </label>
                      <select
                        defaultValue={hubData.managerName}
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                          backgroundColor: 'white',
                        }}
                      >
                        <option value={hubData.managerName}>{hubData.managerName}</option>
                        <option value="Suresh Patil">Suresh Patil</option>
                        <option value="Meena Rao">Meena Rao</option>
                        <option value="Amit Singh">Amit Singh</option>
                      </select>
                    </div>

                    {/* Manager Email */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Manager Email *
                      </label>
                      <input
                        type="email"
                        defaultValue={hubData.managerEmail}
                        placeholder="manager@bhago.com"
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>

                    {/* Manager Phone */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Manager Phone *
                      </label>
                      <input
                        type="text"
                        defaultValue={hubData.managerPhone}
                        placeholder="+91 98765 43210"
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Capacity Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Capacity
                  </h3>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                      Vehicle Capacity *
                    </label>
                    <input
                      type="number"
                      defaultValue={hubData.vehicleCapacity}
                      min="1"
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                      Maximum number of vehicles this hub can accommodate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6" style={{ borderTop: '1px solid #E5E7EB' }}>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#111111',
                    backgroundColor: 'white',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle save logic here
                    setShowEditModal(false);
                  }}
                  className="px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#F24E1E',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Hub Confirmation Dialog */}
      {showDeactivateDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}
          onClick={() => setShowDeactivateDialog(false)}
        >
          <div
            className="bg-white p-6"
            style={{ width: '480px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#FEE2E2',
                  flexShrink: 0,
                }}
              >
                <BanIcon className="w-6 h-6" style={{ color: '#DC2626' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111', marginBottom: '8px' }}>
                  Deactivate Hub
                </h2>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>
                  Are you sure you want to deactivate <strong>{hubData.name}</strong>? This will prevent new bookings from being assigned to this hub.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeactivateDialog(false)}
                className="px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111111',
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle deactivation logic here
                  setShowDeactivateDialog(false);
                }}
                className="px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: '#DC2626',
                  border: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B91C1C')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#DC2626')}
              >
                Deactivate Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Member Modal - Right Side Drawer */}
      {showAddStaffModal && (
        <div
          className="fixed inset-0 flex items-center justify-end"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}
          onClick={() => setShowAddStaffModal(false)}
        >
          <div
            className="bg-white h-full flex flex-col"
            style={{ width: '600px', borderLeft: '1px solid #E5E7EB' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                Add Staff Member
              </h2>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="transition-colors"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Select Staff Member Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Select Staff Member
                  </h3>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                      Select User from System *
                    </label>
                    <select
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                        backgroundColor: 'white',
                      }}
                    >
                      <option value="">-- Select a user --</option>
                      {systemUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                      Select an existing user from the system to assign to this hub
                    </p>
                  </div>
                </div>

                {/* User Information Section - Read-only */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    User Information
                  </h3>
                  <div className="space-y-4">
                    {/* Name - Disabled */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={selectedUser?.name || ''}
                        placeholder="Select a user to view details"
                        disabled
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#6B7280',
                          backgroundColor: '#F7F9FC',
                          cursor: 'not-allowed',
                        }}
                      />
                    </div>

                    {/* Email - Disabled */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={selectedUser?.email || ''}
                        placeholder="Select a user to view details"
                        disabled
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#6B7280',
                          backgroundColor: '#F7F9FC',
                          cursor: 'not-allowed',
                        }}
                      />
                    </div>

                    {/* Phone - Disabled */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Phone
                      </label>
                      <input
                        type="text"
                        value={selectedUser?.phone || ''}
                        placeholder="Select a user to view details"
                        disabled
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#6B7280',
                          backgroundColor: '#F7F9FC',
                          cursor: 'not-allowed',
                        }}
                      />
                    </div>

                    {/* User ID - Disabled */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        User ID
                      </label>
                      <input
                        type="text"
                        value={selectedUser?.userId || ''}
                        placeholder="Select a user to view details"
                        disabled
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#6B7280',
                          backgroundColor: '#F7F9FC',
                          cursor: 'not-allowed',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Assignment Details Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Assignment Details
                  </h3>
                  <div className="space-y-4">
                    {/* Role - Editable */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Assign Role *
                      </label>
                      <select
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                          backgroundColor: 'white',
                        }}
                      >
                        <option value="">-- Select role --</option>
                        <option value="Hub Manager">Hub Manager</option>
                        <option value="Technician">Technician</option>
                        <option value="Support Staff">Support Staff</option>
                        <option value="Security">Security</option>
                        <option value="Cleaner">Cleaner</option>
                      </select>
                      <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                        Select the role for this staff member at this hub
                      </p>
                    </div>

                    {/* Start Date */}
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#111111', display: 'block', marginBottom: '8px' }}>
                        Start Date *
                      </label>
                      <input
                        type="date"
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Info Banner */}
                <div
                  className="p-4"
                  style={{
                    backgroundColor: '#FFF1EC',
                    border: '1px solid #F24E1E20',
                    borderRadius: '6px',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#F24E1E',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>i</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#111111', lineHeight: '1.5' }}>
                      User information is fetched from the system users table and cannot be edited here. To update user details, go to User Management.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6" style={{ borderTop: '1px solid #E5E7EB' }}>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddStaffModal(false);
                    setSelectedUserId(''); // Reset selection
                  }}
                  className="px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#111111',
                    backgroundColor: 'white',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle assignment logic here
                    setShowAddStaffModal(false);
                    setSelectedUserId(''); // Reset selection
                  }}
                  className="px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#F24E1E',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
                >
                  Assign to Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}