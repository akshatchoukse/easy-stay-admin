import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  X, 
  Eye, 
  Edit, 
  MapPin,
  Users,
  Car,
  CheckCircle,
  BanIcon,
  UserCog,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { HubProfile } from './hub-profile';
import { HubDrawerForm } from './hub-drawer-form';
import { ReassignManagerDrawer } from './reassign-manager-drawer';
import { ViewStaffModal } from './view-staff-modal';
import { DeactivateHubDialog } from './deactivate-hub-dialog';

interface Hub {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  managerName: string;
  managerAvatar?: string;
  contactPhone: string;
  vehicleCapacity: number;
  currentVehicles: number;
  staffCount: number;
  operatingHours: string;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
}

// Mock data
const mockHubs: Hub[] = [
  {
    id: '1',
    name: 'MG Road Hub',
    code: 'BLR-MGR-01',
    city: 'Bangalore',
    address: 'MG Road, Near Metro Station, Bangalore 560001',
    managerName: 'Rajesh Kumar',
    contactPhone: '+91 98765 43210',
    vehicleCapacity: 50,
    currentVehicles: 42,
    staffCount: 8,
    operatingHours: '6:00 AM - 10:00 PM',
    status: 'Active',
    lastUpdated: '2024-02-04T10:30:00',
  },
  {
    id: '2',
    name: 'Whitefield Hub',
    code: 'BLR-WHF-02',
    city: 'Bangalore',
    address: 'ITPL Main Road, Whitefield, Bangalore 560066',
    managerName: 'Priya Sharma',
    contactPhone: '+91 98765 43211',
    vehicleCapacity: 75,
    currentVehicles: 68,
    staffCount: 12,
    operatingHours: '5:00 AM - 11:00 PM',
    status: 'Active',
    lastUpdated: '2024-02-05T14:20:00',
  },
  {
    id: '3',
    name: 'Koramangala Hub',
    code: 'BLR-KRM-03',
    city: 'Bangalore',
    address: '80 Feet Road, Koramangala 4th Block, Bangalore 560034',
    managerName: 'Amit Patel',
    contactPhone: '+91 98765 43212',
    vehicleCapacity: 60,
    currentVehicles: 35,
    staffCount: 10,
    operatingHours: '6:00 AM - 10:00 PM',
    status: 'Active',
    lastUpdated: '2024-02-03T16:45:00',
  },
  {
    id: '4',
    name: 'Indiranagar Hub',
    code: 'BLR-IND-04',
    city: 'Bangalore',
    address: '100 Feet Road, Indiranagar, Bangalore 560038',
    managerName: 'Sneha Reddy',
    contactPhone: '+91 98765 43213',
    vehicleCapacity: 40,
    currentVehicles: 38,
    staffCount: 6,
    operatingHours: '6:00 AM - 9:00 PM',
    status: 'Active',
    lastUpdated: '2024-02-06T09:15:00',
  },
  {
    id: '5',
    name: 'Electronic City Hub',
    code: 'BLR-ELC-05',
    city: 'Bangalore',
    address: 'Hosur Road, Electronic City Phase 1, Bangalore 560100',
    managerName: 'Vikram Singh',
    contactPhone: '+91 98765 43214',
    vehicleCapacity: 80,
    currentVehicles: 52,
    staffCount: 14,
    operatingHours: '5:30 AM - 11:00 PM',
    status: 'Active',
    lastUpdated: '2024-02-05T11:30:00',
  },
  {
    id: '6',
    name: 'JP Nagar Hub',
    code: 'BLR-JPN-06',
    city: 'Bangalore',
    address: '24th Main Road, JP Nagar 2nd Phase, Bangalore 560078',
    managerName: 'Anita Desai',
    contactPhone: '+91 98765 43215',
    vehicleCapacity: 45,
    currentVehicles: 28,
    staffCount: 7,
    operatingHours: '6:00 AM - 10:00 PM',
    status: 'Inactive',
    lastUpdated: '2024-01-28T13:00:00',
  },
  {
    id: '7',
    name: 'Connaught Place Hub',
    code: 'DEL-CNP-01',
    city: 'Delhi',
    address: 'Connaught Place, Central Delhi, New Delhi 110001',
    managerName: 'Rohit Malhotra',
    contactPhone: '+91 98765 43216',
    vehicleCapacity: 65,
    currentVehicles: 61,
    staffCount: 11,
    operatingHours: '6:00 AM - 10:00 PM',
    status: 'Active',
    lastUpdated: '2024-02-06T08:45:00',
  },
  {
    id: '8',
    name: 'Saket Hub',
    code: 'DEL-SKT-02',
    city: 'Delhi',
    address: 'Press Enclave Road, Saket, New Delhi 110017',
    managerName: 'Kavita Jain',
    contactPhone: '+91 98765 43217',
    vehicleCapacity: 55,
    currentVehicles: 47,
    staffCount: 9,
    operatingHours: '6:00 AM - 10:00 PM',
    status: 'Active',
    lastUpdated: '2024-02-04T15:20:00',
  },
];

export function HubManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [managerFilter, setManagerFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [isReassignManagerDrawerOpen, setIsReassignManagerDrawerOpen] = useState(false);
  const [isViewStaffModalOpen, setIsViewStaffModalOpen] = useState(false);
  const [isDeactivateHubDialogOpen, setIsDeactivateHubDialogOpen] = useState(false);

  // Get unique cities for filter
  const cities = Array.from(new Set(mockHubs.map(h => h.city)));
  const managers = Array.from(new Set(mockHubs.map(h => h.managerName)));

  // Filter logic
  const filteredHubs = mockHubs.filter((hub) => {
    const matchesSearch = 
      hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hub.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hub.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = cityFilter === 'all' || hub.city === cityFilter;
    const matchesStatus = statusFilter === 'all' || hub.status === statusFilter;
    const matchesManager = managerFilter === 'all' || hub.managerName === managerFilter;

    return matchesSearch && matchesCity && matchesStatus && matchesManager;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHubs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedHubs = filteredHubs.slice(startIndex, startIndex + rowsPerPage);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCityFilter('all');
    setStatusFilter('all');
    setManagerFilter('all');
    setCurrentPage(1);
  };

  const handleViewDetails = (hub: Hub) => {
    setSelectedHub(hub);
    setIsDetailModalOpen(true);
    setOpenMenuId(null);
  };

  const handleCreateHub = () => {
    setDrawerMode('create');
    setSelectedHub(null);
    setIsDrawerOpen(true);
  };

  const handleEditHub = (hub: Hub) => {
    setDrawerMode('edit');
    setSelectedHub(hub);
    setIsDrawerOpen(true);
    setOpenMenuId(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Active') {
      return {
        backgroundColor: '#DCFCE7',
        color: '#16A34A',
        border: '1px solid #16A34A',
      };
    }
    return {
      backgroundColor: '#FEE2E2',
      color: '#DC2626',
      border: '1px solid #DC2626',
    };
  };

  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) {
      return '#DC2626'; // Red - almost full
    } else if (percentage >= 70) {
      return '#F59E0B'; // Orange - getting full
    }
    return '#16A34A'; // Green - available
  };

  return (
    <>
      {isDetailModalOpen && selectedHub ? (
        <HubProfile
          hub={selectedHub}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedHub(null);
          }}
        />
      ) : (
        <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                  Hub Management
                </h1>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  Manage city hubs and operational locations
                </p>
              </div>
              <button
                onClick={handleCreateHub}
                className="flex items-center gap-2 px-4 text-white transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#F24E1E',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
              >
                <Plus className="w-4 h-4" />
                Create Hub
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ border: '1px solid #E5E7EB' }}>
              <div className="grid grid-cols-12 gap-4">
                {/* Search */}
                <div className="col-span-3">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                    <input
                      type="text"
                      placeholder="Hub name, city, code..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
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
                    />
                  </div>
                </div>

                {/* City Filter */}
                <div className="col-span-2">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    City
                  </label>
                  <select
                    value={cityFilter}
                    onChange={(e) => {
                      setCityFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  >
                    <option value="all">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="col-span-2">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Manager Filter */}
                <div className="col-span-3">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Manager Assigned
                  </label>
                  <select
                    value={managerFilter}
                    onChange={(e) => {
                      setManagerFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  >
                    <option value="all">All Managers</option>
                    {managers.map(manager => (
                      <option key={manager} value={manager}>{manager}</option>
                    ))}
                  </select>
                </div>

                {/* Reset Button */}
                <div className="col-span-2 flex items-end">
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center justify-center gap-2 px-4 w-full transition-colors"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#6B7280',
                      backgroundColor: 'white',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Active filters indicator */}
              {(searchTerm || cityFilter !== 'all' || statusFilter !== 'all' || managerFilter !== 'all') && (
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E5E7EB' }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Active filters:
                    </span>
                    {searchTerm && (
                      <span
                        className="px-2 py-1 rounded-full flex items-center gap-1"
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#FFF1EC',
                          color: '#F24E1E',
                          border: '1px solid #F24E1E',
                        }}
                      >
                        Search: {searchTerm}
                      </span>
                    )}
                    {cityFilter !== 'all' && (
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#FFF1EC',
                          color: '#F24E1E',
                          border: '1px solid #F24E1E',
                        }}
                      >
                        City: {cityFilter}
                      </span>
                    )}
                    {statusFilter !== 'all' && (
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#FFF1EC',
                          color: '#F24E1E',
                          border: '1px solid #F24E1E',
                        }}
                      >
                        Status: {statusFilter}
                      </span>
                    )}
                    {managerFilter !== 'all' && (
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#FFF1EC',
                          color: '#F24E1E',
                          border: '1px solid #F24E1E',
                        }}
                      >
                        Manager: {managerFilter}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                Showing <span style={{ fontWeight: '500', color: '#111111' }}>{filteredHubs.length}</span> hub{filteredHubs.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
              {paginatedHubs.length === 0 ? (
                <div className="text-center py-12">
                  <div
                    className="mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
                  >
                    <MapPin className="w-8 h-8" style={{ color: '#6B7280' }} />
                  </div>
                  <h3 className="font-semibold mb-1" style={{ fontSize: '16px', color: '#111111' }}>
                    {searchTerm || cityFilter !== 'all' || statusFilter !== 'all' || managerFilter !== 'all'
                      ? 'No hubs found'
                      : 'No hubs yet'}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    {searchTerm || cityFilter !== 'all' || statusFilter !== 'all' || managerFilter !== 'all'
                      ? 'Try adjusting your filters or search terms'
                      : 'Get started by creating your first hub'}
                  </p>
                  {!(searchTerm || cityFilter !== 'all' || statusFilter !== 'all' || managerFilter !== 'all') && (
                    <button
                      onClick={handleCreateHub}
                      className="mt-4 flex items-center gap-2 px-4 text-white transition-colors mx-auto"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: '#F24E1E',
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
                    >
                      <Plus className="w-4 h-4" />
                      Create Hub
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="table-scroll-container">
                    <table className="w-full" style={{ minWidth: '1200px' }}>
                      <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                        <tr>
                          <th
                            className="px-6 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Hub Name
                          </th>
                          <th
                            className="px-4 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Hub Code
                          </th>
                          <th
                            className="px-4 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Full Address
                          </th>
                          <th
                            className="px-4 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Manager
                          </th>
                          <th
                            className="px-4 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Capacity
                          </th>
                          <th
                            className="px-4 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Vehicles
                          </th>
                          <th
                            className="px-4 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Operating Hours
                          </th>
                          <th
                            className="px-4 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Status
                          </th>
                          <th
                            className="px-4 py-3 text-left uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                          >
                            Last Updated
                          </th>
                          <th
                            className="px-4 py-3 text-center uppercase tracking-wider"
                            style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '60px', whiteSpace: 'nowrap' }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedHubs.map((hub, index) => (
                          <tr
                            key={hub.id}
                            className="cursor-pointer"
                            style={{
                              borderBottom: index < paginatedHubs.length - 1 ? '1px solid #F1F5F9' : 'none',
                            }}
                            onClick={() => handleViewDetails(hub)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            <td className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <div className="flex items-center gap-3">
                                <div
                                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: '#FFF1EC',
                                    color: '#F24E1E',
                                  }}
                                >
                                  <MapPin className="w-4 h-4" />
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                                  {hub.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span
                                className="px-2 py-1 rounded"
                                style={{
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  backgroundColor: '#F7F9FC',
                                  color: '#6B7280',
                                }}
                              >
                                {hub.code}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '14px', color: '#111111' }}>
                                {hub.address}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="flex items-center justify-center rounded-full flex-shrink-0"
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    backgroundColor: '#2563EB',
                                    color: 'white',
                                    fontSize: '10px',
                                    fontWeight: '600',
                                  }}
                                >
                                  {getInitials(hub.managerName)}
                                </div>
                                <span style={{ fontSize: '13px', color: '#111111' }}>
                                  {hub.managerName}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                                {hub.vehicleCapacity}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <div className="flex items-center gap-2">
                                <span
                                  className="px-2 py-1 rounded-full inline-flex items-center gap-1"
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    backgroundColor: '#F7F9FC',
                                    color: getCapacityColor(hub.currentVehicles, hub.vehicleCapacity),
                                  }}
                                >
                                  <Car className="w-3 h-3" />
                                  {hub.currentVehicles}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '13px', color: '#6B7280' }}>
                                {hub.operatingHours}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span
                                className="px-2 py-1 rounded-full"
                                style={{
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  ...getStatusColor(hub.status),
                                }}
                              >
                                {hub.status}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '13px', color: '#6B7280' }}>
                                {new Date(hub.lastUpdated).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(openMenuId === hub.id ? null : hub.id);
                                  }}
                                  className="p-1 rounded transition-colors"
                                  style={{ backgroundColor: 'transparent' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                  <MoreVertical className="w-4 h-4" style={{ color: '#6B7280' }} />
                                </button>
                                {openMenuId === hub.id && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-10"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(null);
                                      }}
                                    />
                                    <div
                                      className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-20"
                                      style={{
                                        border: '1px solid #E5E7EB',
                                        minWidth: '180px',
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <button
                                        onClick={() => handleViewDetails(hub)}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                        style={{ fontSize: '14px', color: '#111111' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                      >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                      </button>
                                      <button
                                        onClick={() => handleEditHub(hub)}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                        style={{ fontSize: '14px', color: '#111111' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                      >
                                        <Edit className="w-4 h-4" />
                                        Edit Hub
                                      </button>
                                      <button
                                        onClick={() => {
                                          setSelectedHub(hub);
                                          setIsReassignManagerDrawerOpen(true);
                                          setOpenMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                        style={{ fontSize: '14px', color: '#111111' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                      >
                                        <UserCog className="w-4 h-4" />
                                        Reassign Manager
                                      </button>
                                      <button
                                        onClick={() => {
                                          console.log('View vehicles:', hub.id);
                                          setOpenMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                        style={{ fontSize: '14px', color: '#111111' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                      >
                                        <Car className="w-4 h-4" />
                                        View Vehicles
                                      </button>
                                      <button
                                        onClick={() => {
                                          setSelectedHub(hub);
                                          setIsViewStaffModalOpen(true);
                                          setOpenMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                        style={{ fontSize: '14px', color: '#111111' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                      >
                                        <Users className="w-4 h-4" />
                                        View Staff
                                      </button>
                                      <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '4px 0' }} />
                                      {hub.status === 'Active' ? (
                                        <button
                                          onClick={() => {
                                            setSelectedHub(hub);
                                            setIsDeactivateHubDialogOpen(true);
                                            setOpenMenuId(null);
                                          }}
                                          className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                          style={{ fontSize: '14px', color: '#DC2626' }}
                                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                          <BanIcon className="w-4 h-4" />
                                          Deactivate Hub
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            console.log('Activate hub:', hub.id);
                                            setOpenMenuId(null);
                                          }}
                                          className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                          style={{ fontSize: '14px', color: '#16A34A' }}
                                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DCFCE7'}
                                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                          <CheckCircle className="w-4 h-4" />
                                          Activate Hub
                                        </button>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
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
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '14px', color: '#6B7280' }}>
                        {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredHubs.length)} of {filteredHubs.length}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="p-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ border: '1px solid #E5E7EB' }}
                          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          <ChevronLeft className="w-4 h-4" style={{ color: '#6B7280' }} />
                        </button>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="p-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ border: '1px solid #E5E7EB' }}
                          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          <ChevronRight className="w-4 h-4" style={{ color: '#6B7280' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Modals */}
          {isDrawerOpen && (
            <HubDrawerForm
              mode={drawerMode}
              hub={selectedHub}
              onClose={() => {
                setIsDrawerOpen(false);
                setSelectedHub(null);
              }}
              onSave={(hubData) => {
                console.log('Save hub:', hubData);
                setIsDrawerOpen(false);
                setSelectedHub(null);
              }}
            />
          )}

          {isReassignManagerDrawerOpen && selectedHub && (
            <ReassignManagerDrawer
              hub={selectedHub}
              onClose={() => {
                setIsReassignManagerDrawerOpen(false);
                setSelectedHub(null);
              }}
              onSave={(managerId, effectiveDate, notifyManager) => {
                console.log('Reassign manager:', { managerId, effectiveDate, notifyManager });
                setIsReassignManagerDrawerOpen(false);
                setSelectedHub(null);
              }}
            />
          )}

          {isViewStaffModalOpen && selectedHub && (
            <ViewStaffModal
              hub={selectedHub}
              onClose={() => {
                setIsViewStaffModalOpen(false);
                setSelectedHub(null);
              }}
            />
          )}

          {isDeactivateHubDialogOpen && selectedHub && (
            <DeactivateHubDialog
              hub={selectedHub}
              onClose={() => {
                setIsDeactivateHubDialogOpen(false);
                setSelectedHub(null);
              }}
              onConfirm={(reason) => {
                console.log('Deactivate hub:', reason);
                setIsDeactivateHubDialogOpen(false);
                setSelectedHub(null);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}