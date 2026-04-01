import { useState } from 'react';
import {
  Search,
  Download,
  MoreVertical,
  Eye,
  X,
  AlertTriangle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Calendar,
  User,
  Car,
} from 'lucide-react';
import { BookingDetail } from './booking-detail';
import { CancelBookingDialog } from './cancel-booking-dialog';
import { ForceCloseTripDialog } from './force-close-trip-dialog';
import { ReassignVehicleDrawer } from './reassign-vehicle-drawer';

interface Booking {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAvatar?: string;
  userRole?: string;
  vehicleRegistrationNumber: string;
  hubName: string;
  hubCode: string;
  planType: 'Daily' | 'Weekly' | 'Monthly';
  startDateTime: string;
  endDateTime: string;
  status: 'Reserved' | 'Active' | 'Completed' | 'Cancelled' | 'Overdue' | 'Failed Payment';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  amount: number;
  settlementType: 'Prepaid' | 'Daily';
  createdAt: string;
  actualReturnDateTime?: string;
  paymentMethod?: string;
  transactionId?: string;
  pickupInspectionDone: boolean;
  returnInspectionDone: boolean;
  damageFlagged: boolean;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    bookingId: 'BKG-2024-0001',
    userId: 'USR-001',
    userName: 'Rajesh Kumar',
    userPhone: '+91 98765 43210',
    vehicleRegistrationNumber: 'KA 01 MH 2341',
    hubName: 'MG Road Hub',
    hubCode: 'BLR-MGR-01',
    planType: 'Daily',
    startDateTime: '06 Feb 2024, 09:00 AM',
    endDateTime: '06 Feb 2024, 06:00 PM',
    status: 'Active',
    paymentStatus: 'Paid',
    amount: 499,
    settlementType: 'Prepaid',
    createdAt: '05 Feb 2024, 02:30 PM',
    paymentMethod: 'UPI',
    transactionId: 'TXN123456789',
    pickupInspectionDone: true,
    returnInspectionDone: false,
    damageFlagged: false,
  },
  {
    id: '2',
    bookingId: 'BKG-2024-0002',
    userId: 'USR-002',
    userName: 'Priya Sharma',
    userPhone: '+91 98765 43211',
    vehicleRegistrationNumber: 'KA 02 AB 5678',
    hubName: 'Whitefield Hub',
    hubCode: 'BLR-WHF-02',
    planType: 'Weekly',
    startDateTime: '01 Feb 2024, 10:00 AM',
    endDateTime: '08 Feb 2024, 10:00 AM',
    status: 'Active',
    paymentStatus: 'Paid',
    amount: 2999,
    settlementType: 'Prepaid',
    createdAt: '31 Jan 2024, 04:20 PM',
    paymentMethod: 'Card',
    transactionId: 'TXN123456790',
    pickupInspectionDone: true,
    returnInspectionDone: false,
    damageFlagged: false,
  },
  {
    id: '3',
    bookingId: 'BKG-2024-0003',
    userId: 'USR-003',
    userName: 'Amit Verma',
    userPhone: '+91 98765 43212',
    vehicleRegistrationNumber: 'KA 03 CD 9012',
    hubName: 'Koramangala Hub',
    hubCode: 'BLR-KRM-03',
    planType: 'Monthly',
    startDateTime: '01 Feb 2024, 09:00 AM',
    endDateTime: '01 Mar 2024, 09:00 AM',
    status: 'Completed',
    paymentStatus: 'Paid',
    amount: 9999,
    settlementType: 'Prepaid',
    createdAt: '30 Jan 2024, 11:15 AM',
    paymentMethod: 'UPI',
    transactionId: 'TXN123456791',
    pickupInspectionDone: true,
    returnInspectionDone: true,
    damageFlagged: false,
  },
  {
    id: '4',
    bookingId: 'BKG-2024-0004',
    userId: 'USR-004',
    userName: 'Sneha Gupta',
    userPhone: '+91 98765 43213',
    vehicleRegistrationNumber: 'KA 04 EF 3456',
    hubName: 'Indiranagar Hub',
    hubCode: 'BLR-IND-04',
    planType: 'Daily',
    startDateTime: '05 Feb 2024, 08:00 AM',
    endDateTime: '05 Feb 2024, 08:00 PM',
    status: 'Completed',
    paymentStatus: 'Paid',
    amount: 499,
    settlementType: 'Prepaid',
    createdAt: '04 Feb 2024, 06:45 PM',
    paymentMethod: 'Card',
    transactionId: 'TXN123456792',
    pickupInspectionDone: true,
    returnInspectionDone: true,
    damageFlagged: false,
  },
  {
    id: '5',
    bookingId: 'BKG-2024-0005',
    userId: 'USR-005',
    userName: 'Vikram Singh',
    userPhone: '+91 98765 43214',
    vehicleRegistrationNumber: 'KA 05 GH 7890',
    hubName: 'MG Road Hub',
    hubCode: 'BLR-MGR-01',
    planType: 'Weekly',
    startDateTime: '03 Feb 2024, 10:00 AM',
    endDateTime: '10 Feb 2024, 10:00 AM',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    amount: 2999,
    settlementType: 'Prepaid',
    createdAt: '02 Feb 2024, 03:30 PM',
    paymentMethod: 'UPI',
    transactionId: 'TXN123456793',
    pickupInspectionDone: false,
    returnInspectionDone: false,
    damageFlagged: false,
  },
];

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hubFilter, setHubFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [planTypeFilter, setPlanTypeFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isForceCloseDialogOpen, setIsForceCloseDialogOpen] = useState(false);
  const [isReassignDrawerOpen, setIsReassignDrawerOpen] = useState(false);

  // Show detail view if a booking is selected
  if (selectedBookingId) {
    return <BookingDetail bookingId={selectedBookingId} onBack={() => setSelectedBookingId(null)} />;
  }

  // Get unique values for filters
  const hubs = Array.from(new Set(mockBookings.map(b => b.hubName)));
  const vehicles = Array.from(new Set(mockBookings.map(b => b.vehicleRegistrationNumber)));

  // Filter logic
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userPhone.includes(searchTerm) ||
      booking.vehicleRegistrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesHub = hubFilter === 'all' || booking.hubName === hubFilter;
    const matchesVehicle = vehicleFilter === 'all' || booking.vehicleRegistrationNumber === vehicleFilter;
    const matchesPlanType = planTypeFilter === 'all' || booking.planType === planTypeFilter;
    const matchesPaymentStatus = paymentStatusFilter === 'all' || booking.paymentStatus === paymentStatusFilter;

    return matchesSearch && matchesStatus && matchesHub && matchesVehicle && matchesPlanType && matchesPaymentStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + rowsPerPage);

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setHubFilter('all');
    setVehicleFilter('all');
    setPlanTypeFilter('all');
    setPaymentStatusFilter('all');
    setCurrentPage(1);
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setSelectedBookingId(booking.bookingId);
    setOpenMenuId(null);
  };

  const handleExport = () => {
    console.log('Export bookings');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reserved':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'Active':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Completed':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      case 'Cancelled':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      case 'Overdue':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Failed Payment':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Pending':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Failed':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getPlanTypeColor = (planType: string) => {
    switch (planType) {
      case 'Daily':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'Weekly':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Monthly':
        return { backgroundColor: '#FFF1EC', color: '#F24E1E' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex-1 overflow-auto hide-scrollbar" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
              Booking Management
            </h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              Monitor and manage all vehicle bookings
            </p>
          </div>
          <button
            onClick={handleExport}
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
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            <Download className="w-4 h-4" />
            Export Bookings
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
                  placeholder="Booking ID, user, phone, vehicle..."
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
                <option value="Reserved">Reserved</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Overdue">Overdue</option>
                <option value="Failed Payment">Failed Payment</option>
              </select>
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

            {/* Vehicle Filter */}
            <div className="col-span-2">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Vehicle
              </label>
              <select
                value={vehicleFilter}
                onChange={(e) => {
                  setVehicleFilter(e.target.value);
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
                <option value="all">All Vehicles</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle} value={vehicle}>{vehicle}</option>
                ))}
              </select>
            </div>

            {/* Plan Type Filter */}
            <div className="col-span-2">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Plan Type
              </label>
              <select
                value={planTypeFilter}
                onChange={(e) => {
                  setPlanTypeFilter(e.target.value);
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
                <option value="all">All Plans</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
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

          {/* Second Row - Payment Status */}
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-2">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Payment Status
              </label>
              <select
                value={paymentStatusFilter}
                onChange={(e) => {
                  setPaymentStatusFilter(e.target.value);
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
                <option value="all">All Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            Showing <span style={{ fontWeight: '500', color: '#111111' }}>{filteredBookings.length}</span> booking{filteredBookings.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          {paginatedBookings.length === 0 ? (
            <div className="text-center py-12">
              <div
                className="mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
              >
                <Calendar className="w-8 h-8" style={{ color: '#6B7280' }} />
              </div>
              <h3 className="font-semibold mb-1" style={{ fontSize: '16px', color: '#111111' }}>
                No bookings found
              </h3>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <>
              <div className="table-scroll-container">
                <table className="w-full" style={{ minWidth: '1800px' }}>
                  <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                    <tr>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Booking ID
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Rider
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Registration Number
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Hub
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Plan Type
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Start Date & Time
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        End Date & Time
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Status
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Payment Status
                      </th>
                      <th className="px-4 py-3 text-right uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Settlement
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Created At
                      </th>
                      <th className="px-4 py-3 text-center uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '60px', whiteSpace: 'nowrap' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className="cursor-pointer"
                        style={{
                          borderBottom: index < paginatedBookings.length - 1 ? '1px solid #F1F5F9' : 'none',
                        }}
                        onClick={() => handleViewDetails(booking)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '13px', fontWeight: '500', color: '#F24E1E' }}>
                            {booking.bookingId}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <div className="flex items-center gap-2">
                            <div
                              className="flex items-center justify-center rounded-full flex-shrink-0"
                              style={{
                                width: '28px',
                                height: '28px',
                                backgroundColor: '#F7F9FC',
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#6B7280',
                              }}
                            >
                              {getInitials(booking.userName)}
                            </div>
                            <span style={{ fontSize: '13px', color: '#111111' }}>
                              {booking.userName}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>
                            {booking.userPhone}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                            {booking.vehicleRegistrationNumber}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <div>
                            <p style={{ fontSize: '13px', color: '#111111' }}>
                              {booking.hubName}
                            </p>
                            <p style={{ fontSize: '11px', color: '#6B7280' }}>
                              {booking.hubCode}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span
                            className="px-2 py-1 rounded-full"
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              ...getPlanTypeColor(booking.planType),
                            }}
                          >
                            {booking.planType}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <div>
                            <p style={{ fontSize: '13px', color: '#111111' }}>
                              {new Date(booking.startDateTime).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                            <p style={{ fontSize: '11px', color: '#6B7280' }}>
                              {new Date(booking.startDateTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <div>
                            <p style={{ fontSize: '13px', color: '#111111' }}>
                              {new Date(booking.endDateTime).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                            <p style={{ fontSize: '11px', color: '#6B7280' }}>
                              {new Date(booking.endDateTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span
                            className="px-2 py-1 rounded-full"
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              ...getStatusColor(booking.status),
                            }}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span
                            className="px-2 py-1 rounded-full"
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              ...getPaymentStatusColor(booking.paymentStatus),
                            }}
                          >
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                            ₹{booking.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            {booking.settlementType}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            {new Date(booking.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === booking.id ? null : booking.id);
                              }}
                              className="p-1 rounded transition-colors"
                              style={{ backgroundColor: 'transparent' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <MoreVertical className="w-4 h-4" style={{ color: '#6B7280' }} />
                            </button>
                            {openMenuId === booking.id && (
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
                                    onClick={() => handleViewDetails(booking)}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                    style={{ fontSize: '14px', color: '#111111' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </button>
                                  {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                                    <>
                                      <button
                                        onClick={() => {
                                          setSelectedBooking(booking);
                                          setIsCancelDialogOpen(true);
                                          setOpenMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                        style={{ fontSize: '14px', color: '#DC2626' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                      >
                                        <X className="w-4 h-4" />
                                        Cancel Booking
                                      </button>
                                      <button
                                        onClick={() => {
                                          setSelectedBooking(booking);
                                          setIsReassignDrawerOpen(true);
                                          setOpenMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                        style={{ fontSize: '14px', color: '#111111' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                      >
                                        <Car className="w-4 h-4" />
                                        Reassign Vehicle
                                      </button>
                                    </>
                                  )}
                                  {booking.status === 'Active' && (
                                    <button
                                      onClick={() => {
                                        setSelectedBooking(booking);
                                        setIsForceCloseDialogOpen(true);
                                        setOpenMenuId(null);
                                      }}
                                      className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                      style={{ fontSize: '14px', color: '#F59E0B' }}
                                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF3C7'}
                                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                    >
                                      <AlertTriangle className="w-4 h-4" />
                                      Force Close Trip
                                    </button>
                                  )}
                                  {booking.paymentStatus === 'Pending' && (
                                    <button
                                      onClick={() => {
                                        console.log('Mark payment received:', booking.id);
                                        setOpenMenuId(null);
                                      }}
                                      className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                      style={{ fontSize: '14px', color: '#16A34A' }}
                                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DCFCE7'}
                                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                    >
                                      <AlertTriangle className="w-4 h-4" />
                                      Mark Payment Received
                                    </button>
                                  )}
                                  <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '4px 0' }} />
                                  <button
                                    onClick={() => {
                                      console.log('Flag issue:', booking.id);
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                    style={{ fontSize: '14px', color: '#DC2626' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    <AlertTriangle className="w-4 h-4" />
                                    Flag Issue
                                  </button>
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
                    {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredBookings.length)} of {filteredBookings.length}
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

      {/* Modals & Dialogs */}
      {isCancelDialogOpen && selectedBooking && (
        <CancelBookingDialog
          booking={selectedBooking}
          onClose={() => {
            setIsCancelDialogOpen(false);
            setSelectedBooking(null);
          }}
          onConfirm={(reason) => {
            console.log('Cancel booking:', selectedBooking.id, reason);
            setIsCancelDialogOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}

      {isForceCloseDialogOpen && selectedBooking && (
        <ForceCloseTripDialog
          booking={selectedBooking}
          onClose={() => {
            setIsForceCloseDialogOpen(false);
            setSelectedBooking(null);
          }}
          onConfirm={(data) => {
            console.log('Force close trip:', selectedBooking.id, data);
            setIsForceCloseDialogOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}

      {isReassignDrawerOpen && selectedBooking && (
        <ReassignVehicleDrawer
          booking={selectedBooking}
          onClose={() => {
            setIsReassignDrawerOpen(false);
            setSelectedBooking(null);
          }}
          onSave={(vehicleId) => {
            console.log('Reassign vehicle:', selectedBooking.id, vehicleId);
            setIsReassignDrawerOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
}