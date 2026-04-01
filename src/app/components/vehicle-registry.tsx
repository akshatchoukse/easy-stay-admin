import { useState } from 'react';
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Bike,
  MapPin,
  AlertCircle,
  CheckCircle,
  BanIcon,
  FileText,
  Wrench,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Battery,
  FileCheck,
  Shield,
  Calendar,
  Car,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { VehicleDetailModal } from './vehicle-detail-modal';
import { VehicleDrawerForm } from './vehicle-drawer-form';
import { VehicleStatusDialog } from './vehicle-status-dialog';
import { VehicleProfile } from './vehicle-profile';

interface Vehicle {
  id: string;
  registrationNumber: string;
  imageUrl: string;
  model: string;
  variant?: string;
  hubAssigned: string;
  hubCode: string;
  hubAddress: string;
  status: 'Available' | 'Down' | 'Hold' | 'Pending Approval' | 'Inactive';
  odometer: number;
  lastInspectionDate: string;
  warrantyStatus: 'Valid' | 'Expiring Soon' | 'Expired';
  warrantyExpiryDate: string;
  insuranceExpiryDate: string;
  documents: {
    rc: boolean;
    insurance: boolean;
    fitness: boolean;
  };
  lastUpdated: string;
  manufacturingYear: number;
  batteryCapacity: number;
}

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    registrationNumber: 'KA-01-AB-1234',
    imageUrl: 'https://images.unsplash.com/photo-1744298350102-7db880bf551c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    model: 'Activa Electric',
    variant: 'Gen 3',
    hubAssigned: 'MG Road Hub',
    hubCode: 'BLR-MGR-01',
    hubAddress: '123 MG Road, Bangalore',
    status: 'Available',
    odometer: 12450,
    lastInspectionDate: '2024-02-01',
    warrantyStatus: 'Valid',
    warrantyExpiryDate: '2025-08-15',
    insuranceExpiryDate: '2025-09-30',
    documents: { rc: true, insurance: true, fitness: true },
    lastUpdated: '2024-02-06T10:30:00',
    manufacturingYear: 2023,
    batteryCapacity: 3700,
  },
  {
    id: '2',
    registrationNumber: 'KA-01-AB-1235',
    imageUrl: 'https://images.unsplash.com/photo-1744298350102-7db880bf551c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    model: 'Activa Electric',
    hubAssigned: 'Whitefield Hub',
    hubCode: 'BLR-WHF-02',
    hubAddress: '456 Whitefield Road, Bangalore',
    status: 'Down',
    odometer: 8920,
    lastInspectionDate: '2024-01-28',
    warrantyStatus: 'Valid',
    warrantyExpiryDate: '2025-12-20',
    insuranceExpiryDate: '2025-11-15',
    documents: { rc: true, insurance: true, fitness: false },
    lastUpdated: '2024-02-05T14:20:00',
    manufacturingYear: 2023,
    batteryCapacity: 3970,
  },
  {
    id: '3',
    registrationNumber: 'KA-01-AB-1236',
    imageUrl: 'https://images.unsplash.com/photo-1744298350102-7db880bf551c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    model: 'Activa Electric',
    hubAssigned: 'Koramangala Hub',
    hubCode: 'BLR-KRM-03',
    hubAddress: '789 Koramangala Road, Bangalore',
    status: 'Available',
    odometer: 5200,
    lastInspectionDate: '2024-02-03',
    warrantyStatus: 'Valid',
    warrantyExpiryDate: '2026-01-10',
    insuranceExpiryDate: '2026-02-20',
    documents: { rc: true, insurance: true, fitness: true },
    lastUpdated: '2024-02-04T16:45:00',
    manufacturingYear: 2024,
    batteryCapacity: 3040,
  },
  {
    id: '4',
    registrationNumber: 'KA-01-AB-1237',
    imageUrl: 'https://images.unsplash.com/photo-1744298350102-7db880bf551c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    model: 'Activa Electric',
    variant: 'Gen 3',
    hubAssigned: 'Indiranagar Hub',
    hubCode: 'BLR-IND-04',
    hubAddress: '101 Indiranagar Road, Bangalore',
    status: 'Hold',
    odometer: 15600,
    lastInspectionDate: '2024-01-20',
    warrantyStatus: 'Expiring Soon',
    warrantyExpiryDate: '2024-03-15',
    insuranceExpiryDate: '2024-04-30',
    documents: { rc: true, insurance: false, fitness: true },
    lastUpdated: '2024-02-03T09:15:00',
    manufacturingYear: 2022,
    batteryCapacity: 3700,
  },
  {
    id: '5',
    registrationNumber: 'KA-01-AB-1238',
    imageUrl: 'https://images.unsplash.com/photo-1744298350102-7db880bf551c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    model: 'Activa Electric',
    hubAssigned: 'Electronic City Hub',
    hubCode: 'BLR-ELC-05',
    hubAddress: '202 Electronic City Road, Bangalore',
    status: 'Available',
    odometer: 3400,
    lastInspectionDate: '2024-02-05',
    warrantyStatus: 'Valid',
    warrantyExpiryDate: '2026-06-30',
    insuranceExpiryDate: '2026-07-15',
    documents: { rc: true, insurance: true, fitness: true },
    lastUpdated: '2024-02-06T11:30:00',
    manufacturingYear: 2024,
    batteryCapacity: 2000,
  },
  {
    id: '6',
    registrationNumber: 'KA-01-AB-1239',
    imageUrl: 'https://images.unsplash.com/photo-1744298350102-7db880bf551c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    model: 'Activa Electric',
    hubAssigned: 'MG Road Hub',
    hubCode: 'BLR-MGR-01',
    hubAddress: '123 MG Road, Bangalore',
    status: 'Pending Approval',
    odometer: 0,
    lastInspectionDate: '2024-02-06',
    warrantyStatus: 'Valid',
    warrantyExpiryDate: '2027-02-06',
    insuranceExpiryDate: '2027-01-20',
    documents: { rc: false, insurance: true, fitness: false },
    lastUpdated: '2024-02-06T14:00:00',
    manufacturingYear: 2024,
    batteryCapacity: 3970,
  },
  {
    id: '7',
    registrationNumber: 'DL-01-CD-5678',
    imageUrl: 'https://images.unsplash.com/photo-1744298350102-7db880bf551c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    model: 'Activa Electric',
    hubAssigned: 'Connaught Place Hub',
    hubCode: 'DEL-CNP-01',
    hubAddress: '303 Connaught Place, Delhi',
    status: 'Available',
    odometer: 7800,
    lastInspectionDate: '2024-01-30',
    warrantyStatus: 'Valid',
    warrantyExpiryDate: '2025-10-15',
    insuranceExpiryDate: '2025-12-05',
    documents: { rc: true, insurance: true, fitness: true },
    lastUpdated: '2024-02-05T08:45:00',
    manufacturingYear: 2023,
    batteryCapacity: 3040,
  },
  {
    id: '8',
    registrationNumber: 'DL-01-CD-5679',
    imageUrl: 'https://images.unsplash.com/photo-1744298350102-7db880bf551c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    model: 'Activa Electric',
    variant: 'Gen 2',
    hubAssigned: 'Saket Hub',
    hubCode: 'DEL-SKT-02',
    hubAddress: '404 Saket Road, Delhi',
    status: 'Inactive',
    odometer: 22000,
    lastInspectionDate: '2023-12-15',
    warrantyStatus: 'Expired',
    warrantyExpiryDate: '2023-11-30',
    insuranceExpiryDate: '2023-10-15',
    documents: { rc: true, insurance: false, fitness: false },
    lastUpdated: '2024-01-10T13:00:00',
    manufacturingYear: 2021,
    batteryCapacity: 3700,
  },
];

export function VehicleRegistry() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hubFilter, setHubFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showVehicleProfile, setShowVehicleProfile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusDialogAction, setStatusDialogAction] = useState<'down' | 'deactivate' | 'block'>('down');

  // Get unique values for filters
  const hubs = Array.from(new Set(mockVehicles.map(v => v.hubAssigned)));

  // Filter logic
  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHub = hubFilter === 'all' || vehicle.hubAssigned === hubFilter;
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;

    return matchesSearch && matchesHub && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + rowsPerPage);

  const handleResetFilters = () => {
    setSearchTerm('');
    setHubFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleProfile(true);
    setOpenMenuId(null);
  };

  const handleCreateVehicle = () => {
    setDrawerMode('create');
    setSelectedVehicle(null);
    setIsDrawerOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setDrawerMode('edit');
    setSelectedVehicle(vehicle);
    setIsDrawerOpen(true);
    setOpenMenuId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return { backgroundColor: '#DCFCE7', color: '#16A34A', border: '1px solid #16A34A' };
      case 'Down':
        return { backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid #DC2626' };
      case 'Hold':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B', border: '1px solid #F59E0B' };
      case 'Pending Approval':
        return { backgroundColor: '#DBEAFE', color: '#2563EB', border: '1px solid #2563EB' };
      case 'Inactive':
        return { backgroundColor: '#F3F4F6', color: '#6B7280', border: '1px solid #6B7280' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280', border: '1px solid #6B7280' };
    }
  };

  const handleChangeStatus = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setStatusDialogAction('down');
    setIsStatusDialogOpen(true);
    setOpenMenuId(null);
  };

  return (
    <>
      {showVehicleProfile && selectedVehicle ? (
        <VehicleProfile
          vehicle={selectedVehicle}
          onBack={() => {
            setShowVehicleProfile(false);
            setSelectedVehicle(null);
          }}
          onEdit={() => {
            setShowVehicleProfile(false);
            handleEditVehicle(selectedVehicle);
          }}
        />
      ) : (
        <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                  Vehicle Master & Fleet Registry
                </h1>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  Central registry of all vehicles and lifecycle status
                </p>
              </div>
              <button
                onClick={handleCreateVehicle}
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
                Register Vehicle
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
                      placeholder="Registration number, hub..."
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

                {/* Hub Filter */}
                <div className="col-span-2">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Hub
                  </label>
                  <select
                    value={hubFilter}
                    onChange={(e) => {
                      setHubFilter(e.target.value);
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
                    <option value="all">All Hubs</option>
                    {hubs.map(hub => (
                      <option key={hub} value={hub}>{hub}</option>
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
                    <option value="Available">Available</option>
                    <option value="Down">Down</option>
                    <option value="Hold">Hold</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Reset Button */}
                <div className="col-span-1 flex items-end">
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center justify-center w-full transition-colors"
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
                  </button>
                </div>
              </div>

              {/* Active filters indicator */}
              {(searchTerm || hubFilter !== 'all' || statusFilter !== 'all') && (
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E5E7EB' }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Active filters:
                    </span>
                    {searchTerm && (
                      <span
                        className="px-2 py-1 rounded-full"
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
                    {hubFilter !== 'all' && (
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#FFF1EC',
                          color: '#F24E1E',
                          border: '1px solid #F24E1E',
                        }}
                      >
                        Hub: {hubFilter}
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
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                Showing <span style={{ fontWeight: '500', color: '#111111' }}>{filteredVehicles.length}</span> vehicle{filteredVehicles.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
              {paginatedVehicles.length === 0 ? (
                <div className="text-center py-12">
                  <div
                    className="mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
                  >
                    <Car className="w-8 h-8" style={{ color: '#6B7280' }} />
                  </div>
                  <h3 className="font-semibold mb-1" style={{ fontSize: '16px', color: '#111111' }}>
                    No vehicles found
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    Try adjusting your filters or register a new vehicle
                  </p>
                </div>
              ) : (
                <>
                  <div className="table-scroll-container">
                    <table className="w-full" style={{ minWidth: '1100px' }}>
                      <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                        <tr>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap', width: '80px' }}>
                            Image
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Vehicle
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Odometer
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Insurance Expiry
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Hub Assigned
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Status
                          </th>
                          <th className="px-4 py-3 text-right uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedVehicles.map((vehicle, index) => (
                          <tr
                            key={vehicle.id}
                            style={{
                              borderBottom: index < paginatedVehicles.length - 1 ? '1px solid #F1F5F9' : 'none',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            {/* Vehicle Image */}
                            <td className="px-4 py-2" style={{ width: '80px' }}>
                              <div
                                className="flex items-center justify-center rounded-lg"
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  backgroundColor: '#F7F9FC',
                                  border: '1px solid #E5E7EB',
                                }}
                              >
                                <img
                                  src={vehicle.imageUrl}
                                  alt={vehicle.registrationNumber}
                                  className="rounded-lg object-cover"
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                  }}
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent && !parent.querySelector('svg')) {
                                      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                      icon.setAttribute('width', '24');
                                      icon.setAttribute('height', '24');
                                      icon.setAttribute('viewBox', '0 0 24 24');
                                      icon.setAttribute('fill', 'none');
                                      icon.setAttribute('stroke', '#6B7280');
                                      icon.setAttribute('stroke-width', '2');
                                      icon.setAttribute('stroke-linecap', 'round');
                                      icon.setAttribute('stroke-linejoin', 'round');
                                      icon.innerHTML = '<path d="M5 12h14M12 5l7 7-7 7"/>';
                                      parent.appendChild(icon);
                                    }
                                  }}
                                />
                              </div>
                            </td>

                            {/* Vehicle Info (Registration + Model) */}
                            <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(vehicle);
                                }}
                                className="text-left hover:underline"
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                              >
                                <div>
                                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
                                    {vehicle.registrationNumber}
                                  </p>
                                  <p style={{ fontSize: '12px', color: '#6B7280' }}>
                                    Activa Electric
                                  </p>
                                </div>
                              </button>
                            </td>

                            {/* Odometer Reading */}
                            <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>
                              <div>
                                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                                  {vehicle.odometer.toLocaleString()} km
                                </p>
                              </div>
                            </td>

                            {/* Insurance Expiry */}
                            <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" style={{ color: '#6B7280' }} />
                                <div>
                                  <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                                    {new Date(vehicle.insuranceExpiryDate).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Hub Assigned */}
                            <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" style={{ color: '#6B7280' }} />
                                <div>
                                  <p style={{ fontSize: '13px', color: '#111111' }}>
                                    {vehicle.hubAssigned}
                                  </p>
                                  <p style={{ fontSize: '11px', color: '#6B7280' }}>
                                    {vehicle.hubCode}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Status with Dot */}
                            <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="rounded-full"
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: vehicle.status === 'Available' ? '#16A34A' 
                                      : vehicle.status === 'Down' ? '#DC2626'
                                      : vehicle.status === 'Hold' ? '#F59E0B'
                                      : vehicle.status === 'Pending Approval' ? '#2563EB'
                                      : '#6B7280',
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    color: vehicle.status === 'Available' ? '#16A34A' 
                                      : vehicle.status === 'Down' ? '#DC2626'
                                      : vehicle.status === 'Hold' ? '#F59E0B'
                                      : vehicle.status === 'Pending Approval' ? '#2563EB'
                                      : '#6B7280',
                                  }}
                                >
                                  {vehicle.status}
                                </span>
                              </div>
                            </td>

                            {/* Inline Actions */}
                            <td className="px-4 py-2 text-right" style={{ whiteSpace: 'nowrap' }}>
                              <div className="flex items-center justify-end gap-1">
                                {/* View Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewDetails(vehicle);
                                  }}
                                  className="p-1.5 rounded transition-colors"
                                  style={{ backgroundColor: 'transparent' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" style={{ color: '#6B7280' }} />
                                </button>

                                {/* Edit Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditVehicle(vehicle);
                                  }}
                                  className="p-1.5 rounded transition-colors"
                                  style={{ backgroundColor: 'transparent' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  title="Edit Vehicle"
                                >
                                  <Edit className="w-4 h-4" style={{ color: '#6B7280' }} />
                                </button>

                                {/* Change Hub Button */}
                                

                                {/* Mark Down Button */}
                                

                                {/* More Actions (overflow menu for destructive actions) */}
                                <div className="relative">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenMenuId(openMenuId === vehicle.id ? null : vehicle.id);
                                    }}
                                    className="p-1.5 rounded transition-colors"
                                    style={{ backgroundColor: 'transparent' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    title="More Actions"
                                  >
                                    <MoreVertical className="w-4 h-4" style={{ color: '#6B7280' }} />
                                  </button>
                                  {openMenuId === vehicle.id && (
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
                                          onClick={() => {
                                            console.log('View documents:', vehicle.id);
                                            setOpenMenuId(null);
                                          }}
                                          className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                          style={{ fontSize: '14px', color: '#111111' }}
                                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                          <FileText className="w-4 h-4" />
                                          View Documents
                                        </button>
                                        <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '4px 0' }} />
                                        <button
                                          onClick={() => {
                                            if (confirm('Are you sure you want to deactivate this vehicle?')) {
                                              console.log('Deactivate vehicle:', vehicle.id);
                                            }
                                            setOpenMenuId(null);
                                          }}
                                          className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                          style={{ fontSize: '14px', color: '#DC2626' }}
                                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                          <XCircle className="w-4 h-4" />
                                          Deactivate Vehicle
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
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
                        {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredVehicles.length)} of {filteredVehicles.length}
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
          {isDetailModalOpen && selectedVehicle && (
            <VehicleDetailModal
              vehicle={selectedVehicle}
              onClose={() => {
                setIsDetailModalOpen(false);
                setSelectedVehicle(null);
              }}
              onEdit={() => {
                setIsDetailModalOpen(false);
                handleEditVehicle(selectedVehicle);
              }}
            />
          )}

          {isDrawerOpen && (
            <VehicleDrawerForm
              mode={drawerMode}
              vehicle={selectedVehicle}
              onClose={() => {
                setIsDrawerOpen(false);
                setSelectedVehicle(null);
              }}
              onSave={(vehicleData) => {
                console.log('Save vehicle:', vehicleData);
                setIsDrawerOpen(false);
                setSelectedVehicle(null);
              }}
            />
          )}

          {isStatusDialogOpen && selectedVehicle && (
            <VehicleStatusDialog
              vehicle={selectedVehicle}
              action={statusDialogAction}
              onClose={() => {
                setIsStatusDialogOpen(false);
                setSelectedVehicle(null);
              }}
              onConfirm={(reason, effectiveDate) => {
                console.log('Status change:', { action: statusDialogAction, reason, effectiveDate });
                setIsStatusDialogOpen(false);
                setSelectedVehicle(null);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}