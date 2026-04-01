import { useState } from 'react';
import {
  Search,
  Download,
  MoreVertical,
  Eye,
  UserX,
  Ban,
  Info,
  CheckCircle,
  XCircle,
  RotateCcw,
  Star,
} from 'lucide-react';
import { RiderProfile } from './rider-profile';

interface Rider {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  kycStatus: 'Pending' | 'Verified' | 'Rejected';
  licenseVerified: boolean;
  walletBalance: string;
  totalBookings: number;
  lastBookingDate: string;
  lastActive: string;
  accountStatus: 'Active' | 'Suspended' | 'Blocked';
  riderRating: number; // 0-5 rating
  appVersion: string;
  createdDate: string;
  // Detail fields
  dob?: string;
  gender?: string;
  registrationDate?: string;
  licenseNumber?: string;
  kycDocuments?: string[];
  verificationTimestamp?: string;
  appSource?: string;
  devicePlatform?: string;
  firstLoginDate?: string;
  lastLoginDate?: string;
  completedBookings?: number;
  cancelledBookings?: number;
  totalSpend?: string;
  lastHubUsed?: string;
  lastVehicleUsed?: string;
  paymentFailures?: number;
  overdueReturns?: number;
  incidentFlags?: number;
  adminNotes?: string[];
}

const ridersData: Rider[] = [
  {
    id: 'RDR-8F3A1B',
    name: 'Arjun Mehta',
    phone: '+91 98765 43210',
    email: 'arjun.mehta@gmail.com',
    city: 'Bangalore',
    kycStatus: 'Verified',
    licenseVerified: true,
    walletBalance: '₹1,250',
    totalBookings: 47,
    lastBookingDate: '04 Feb 2026',
    lastActive: '2 hours ago',
    accountStatus: 'Active',
    riderRating: 4.5,
    appVersion: 'v2.4.1',
    createdDate: '12 Nov 2025',
    dob: '15 Jun 1992',
    gender: 'Male',
    registrationDate: '12 Nov 2025',
    licenseNumber: 'KA••••5678',
    kycDocuments: ['Aadhaar', 'Driving License'],
    verificationTimestamp: '13 Nov 2025, 10:30 AM',
    appSource: 'Google Play',
    devicePlatform: 'Android 13',
    firstLoginDate: '12 Nov 2025',
    lastLoginDate: '06 Feb 2026',
    completedBookings: 45,
    cancelledBookings: 2,
    totalSpend: '₹18,450',
    lastHubUsed: 'Koramangala Hub',
    lastVehicleUsed: 'OLA S1 Pro',
    paymentFailures: 0,
    overdueReturns: 0,
    incidentFlags: 0,
    adminNotes: ['Verified user', 'Premium rider'],
  },
  {
    id: 'RDR-9C2D4E',
    name: 'Priya Sharma',
    phone: '+91 87654 32109',
    email: 'priya.sharma@yahoo.com',
    city: 'Delhi',
    kycStatus: 'Pending',
    licenseVerified: false,
    walletBalance: '₹450',
    totalBookings: 12,
    lastBookingDate: '01 Feb 2026',
    lastActive: '1 day ago',
    accountStatus: 'Active',
    riderRating: 3.8,
    appVersion: 'v2.4.0',
    createdDate: '15 Jan 2026',
    dob: '22 Mar 1995',
    gender: 'Female',
    registrationDate: '15 Jan 2026',
    licenseNumber: 'DL••••1234',
    kycDocuments: ['Aadhaar'],
    appSource: 'App Store',
    devicePlatform: 'iOS 17',
    firstLoginDate: '15 Jan 2026',
    lastLoginDate: '05 Feb 2026',
    completedBookings: 11,
    cancelledBookings: 1,
    totalSpend: '₹4,200',
    lastHubUsed: 'Connaught Place Hub',
    lastVehicleUsed: 'Ather 450X',
    paymentFailures: 0,
    overdueReturns: 0,
    incidentFlags: 0,
    adminNotes: [],
  },
  {
    id: 'RDR-7E1F3G',
    name: 'Rajesh Kumar',
    phone: '+91 76543 21098',
    email: 'rajesh.k@outlook.com',
    city: 'Mumbai',
    kycStatus: 'Verified',
    licenseVerified: true,
    walletBalance: '₹2,100',
    totalBookings: 89,
    lastBookingDate: '05 Feb 2026',
    lastActive: '30 mins ago',
    accountStatus: 'Active',
    riderRating: 4.8,
    appVersion: 'v2.4.1',
    createdDate: '20 Sep 2025',
    dob: '08 Nov 1988',
    gender: 'Male',
    registrationDate: '20 Sep 2025',
    licenseNumber: 'MH••••9012',
    kycDocuments: ['Aadhaar', 'Driving License', 'PAN'],
    verificationTimestamp: '21 Sep 2025, 02:15 PM',
    appSource: 'Google Play',
    devicePlatform: 'Android 14',
    firstLoginDate: '20 Sep 2025',
    lastLoginDate: '06 Feb 2026',
    completedBookings: 86,
    cancelledBookings: 3,
    totalSpend: '₹32,890',
    lastHubUsed: 'Bandra Hub',
    lastVehicleUsed: 'Revolt RV400',
    paymentFailures: 0,
    overdueReturns: 0,
    incidentFlags: 0,
    adminNotes: ['High value rider', 'Loyal customer'],
  },
  {
    id: 'RDR-6D4H2J',
    name: 'Sneha Patel',
    phone: '+91 65432 10987',
    email: 'sneha.patel@gmail.com',
    city: 'Pune',
    kycStatus: 'Rejected',
    licenseVerified: false,
    walletBalance: '₹0',
    totalBookings: 2,
    lastBookingDate: '28 Jan 2026',
    lastActive: '3 days ago',
    accountStatus: 'Suspended',
    riderRating: 2.5,
    appVersion: 'v2.3.8',
    createdDate: '22 Jan 2026',
    dob: '19 Jul 1998',
    gender: 'Female',
    registrationDate: '22 Jan 2026',
    licenseNumber: 'MH••••3456',
    kycDocuments: ['Aadhaar'],
    appSource: 'Google Play',
    devicePlatform: 'Android 12',
    firstLoginDate: '22 Jan 2026',
    lastLoginDate: '03 Feb 2026',
    completedBookings: 1,
    cancelledBookings: 1,
    totalSpend: '₹380',
    lastHubUsed: 'Hinjewadi Hub',
    lastVehicleUsed: 'Simple One',
    paymentFailures: 2,
    overdueReturns: 1,
    incidentFlags: 1,
    adminNotes: ['KYC documents unclear', 'Account suspended pending verification'],
  },
  {
    id: 'RDR-5K7L9M',
    name: 'Vikram Singh',
    phone: '+91 54321 09876',
    email: 'vikram.singh@hotmail.com',
    city: 'Bangalore',
    kycStatus: 'Verified',
    licenseVerified: true,
    walletBalance: '₹850',
    totalBookings: 34,
    lastBookingDate: '03 Feb 2026',
    lastActive: '1 hour ago',
    accountStatus: 'Active',
    riderRating: 4.2,
    appVersion: 'v2.4.1',
    createdDate: '05 Dec 2025',
    dob: '28 Feb 1990',
    gender: 'Male',
    registrationDate: '05 Dec 2025',
    licenseNumber: 'KA••••7890',
    kycDocuments: ['Aadhaar', 'Driving License'],
    verificationTimestamp: '06 Dec 2025, 11:45 AM',
    appSource: 'App Store',
    devicePlatform: 'iOS 17',
    firstLoginDate: '05 Dec 2025',
    lastLoginDate: '06 Feb 2026',
    completedBookings: 32,
    cancelledBookings: 2,
    totalSpend: '₹12,650',
    lastHubUsed: 'Indiranagar Hub',
    lastVehicleUsed: 'Ather 450X',
    paymentFailures: 0,
    overdueReturns: 0,
    incidentFlags: 0,
    adminNotes: [],
  },
  {
    id: 'RDR-4N8P1Q',
    name: 'Ananya Desai',
    phone: '+91 43210 98765',
    email: 'ananya.d@gmail.com',
    city: 'Hyderabad',
    kycStatus: 'Pending',
    licenseVerified: false,
    walletBalance: '₹200',
    totalBookings: 5,
    lastBookingDate: '02 Feb 2026',
    lastActive: '12 hours ago',
    accountStatus: 'Active',
    riderRating: 3.5,
    appVersion: 'v2.4.0',
    createdDate: '28 Jan 2026',
    dob: '10 Sep 1993',
    gender: 'Female',
    registrationDate: '28 Jan 2026',
    licenseNumber: 'TS••••2345',
    kycDocuments: ['Aadhaar'],
    appSource: 'Google Play',
    devicePlatform: 'Android 13',
    firstLoginDate: '28 Jan 2026',
    lastLoginDate: '05 Feb 2026',
    completedBookings: 5,
    cancelledBookings: 0,
    totalSpend: '₹1,850',
    lastHubUsed: 'Gachibowli Hub',
    lastVehicleUsed: 'OLA S1 Pro',
    paymentFailures: 0,
    overdueReturns: 0,
    incidentFlags: 0,
    adminNotes: [],
  },
];

export function RiderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState('All');
  const [accountStatusFilter, setAccountStatusFilter] = useState('All');
  const [selectedRiderId, setSelectedRiderId] = useState<string | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  // Show detail view if rider is selected
  if (selectedRiderId) {
    return <RiderProfile riderId={selectedRiderId} onBack={() => setSelectedRiderId(null)} />;
  }

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Pending':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Rejected':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getAccountStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Suspended':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Blocked':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setKycFilter('All');
    setAccountStatusFilter('All');
  };

  const filteredRiders = ridersData.filter((rider) => {
    const matchesSearch =
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.phone.includes(searchTerm) ||
      rider.id.includes(searchTerm);
    const matchesKyc = kycFilter === 'All' || rider.kycStatus === kycFilter;
    const matchesAccountStatus =
      accountStatusFilter === 'All' || rider.accountStatus === accountStatusFilter;
    return matchesSearch && matchesKyc && matchesAccountStatus;
  });

  const onViewRider = (riderId: string) => {
    setSelectedRiderId(riderId);
  };

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#F7F9FC', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-semibold" style={{ fontSize: '24px', color: '#111111' }}>
            Riders
          </h1>
          <p className="mt-1" style={{ fontSize: '14px', color: '#6B7280' }}>
            External riders onboarded via mobile app
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 transition-colors"
          style={{
            height: '40px',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            backgroundColor: 'white',
            fontSize: '14px',
            fontWeight: '500',
            color: '#111111',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <Download className="w-4 h-4" />
          Export Riders
        </button>
      </div>

      {/* Info Banner */}
      <div
        className="p-4 rounded-lg flex items-start gap-3"
        style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
      >
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2563EB' }} />
        <p style={{ fontSize: '14px', color: '#1E40AF', lineHeight: '1.5' }}>
          Riders are self-onboarded via mobile app. Profile data cannot be edited by admins.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #E5E7EB' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: '#6B7280' }}
              />
              <input
                type="text"
                placeholder="Search by name, phone, or rider ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          {/* KYC Status */}
          <div>
            <select
              value={kycFilter}
              onChange={(e) => setKycFilter(e.target.value)}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                color: '#111111',
              }}
            >
              <option value="All">All KYC Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Account Status */}
          <div>
            <select
              value={accountStatusFilter}
              onChange={(e) => setAccountStatusFilter(e.target.value)}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                color: '#111111',
              }}
            >
              <option value="All">All Account Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Reset Filters */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-3 py-1.5 transition-colors"
            style={{
              fontSize: '13px',
              color: '#6B7280',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#F24E1E'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      </div>

      {/* Riders Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
        <div className="table-scroll-container">
          <table className="w-full" style={{ minWidth: '1400px' }}>
            <thead style={{ backgroundColor: '#F7F9FC' }}>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Rider ID
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '200px' }}>
                  Name
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '140px' }}>
                  Phone
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '180px' }}>
                  Email
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '100px' }}>
                  City
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '110px' }}>
                  KYC Status
                </th>
                <th className="px-4 text-center uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  License
                </th>
                <th className="px-4 text-right uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Wallet
                </th>
                <th className="px-4 text-right uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '100px' }}>
                  Bookings
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Last Active
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Status
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '140px' }}>
                  Rider Rating
                </th>
                <th className="px-4 text-center uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '80px' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredRiders.map((rider) => (
                <tr
                  key={rider.id}
                  onClick={() => onViewRider(rider.id)}
                  className="cursor-pointer transition-colors"
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F7F9FC';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td className="px-4" style={{ height: '48px', whiteSpace: 'nowrap' }}>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                        {rider.name}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'monospace' }}>
                        {rider.id}
                      </p>
                    </div>
                  </td>
                  <td className="px-4" style={{ whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '13px', color: '#111111' }}>{rider.phone}</span>
                  </td>
                  <td className="px-4" style={{ whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '13px', color: '#111111' }}>{rider.email}</span>
                  </td>
                  <td className="px-4" style={{ whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '13px', color: '#111111' }}>{rider.city}</span>
                  </td>
                  <td className="px-4" style={{ whiteSpace: 'nowrap' }}>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        ...(rider.kycStatus === 'Verified'
                          ? { backgroundColor: '#DCFCE7', color: '#16A34A' }
                          : rider.kycStatus === 'Pending'
                          ? { backgroundColor: '#FEF3C7', color: '#F59E0B' }
                          : { backgroundColor: '#FEE2E2', color: '#DC2626' }),
                      }}
                    >
                      {rider.kycStatus === 'Verified' && <CheckCircle className="w-3 h-3" />}
                      {rider.kycStatus === 'Rejected' && <XCircle className="w-3 h-3" />}
                      {rider.kycStatus === 'Pending' && <Info className="w-3 h-3" />}
                      {rider.kycStatus}
                    </span>
                  </td>
                  <td className="px-4" style={{ whiteSpace: 'nowrap' }}>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: rider.licenseVerified ? '#DCFCE7' : '#FEE2E2',
                        color: rider.licenseVerified ? '#16A34A' : '#DC2626',
                      }}
                    >
                      {rider.licenseVerified ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {rider.licenseVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                  <td className="px-4 text-right" style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: '500', color: '#111111', whiteSpace: 'nowrap' }}>
                    {rider.walletBalance}
                  </td>
                  <td className="px-4 text-center" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>
                    {rider.totalBookings}
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                    {rider.lastActive}
                  </td>
                  <td className="px-4" style={{ whiteSpace: 'nowrap' }}>
                    <span
                      className="inline-flex px-2 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        ...(rider.accountStatus === 'Active'
                          ? { backgroundColor: '#DCFCE7', color: '#16A34A' }
                          : rider.accountStatus === 'Suspended'
                          ? { backgroundColor: '#FEF3C7', color: '#F59E0B' }
                          : { backgroundColor: '#FEE2E2', color: '#DC2626' }),
                      }}
                    >
                      {rider.accountStatus}
                    </span>
                  </td>
                  <td className="px-4" style={{ whiteSpace: 'nowrap' }}>
                    <StarRating rating={rider.riderRating} />
                  </td>
                  <td className="px-4 text-center" onClick={(e) => e.stopPropagation()} style={{ whiteSpace: 'nowrap' }}>
                    <div className="relative inline-block">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === rider.id ? null : rider.id)}
                        className="p-1.5 rounded transition-colors"
                        style={{ backgroundColor: 'transparent' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <MoreVertical className="w-4 h-4" style={{ color: '#6B7280' }} />
                      </button>
                      {actionMenuOpen === rider.id && (
                        <RiderActionsMenu
                          rider={rider}
                          onClose={() => setActionMenuOpen(null)}
                          onViewDetails={() => {
                            setSelectedRiderId(rider.id);
                            setActionMenuOpen(null);
                          }}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface RiderActionsMenuProps {
  rider: Rider;
  onClose: () => void;
  onViewDetails: () => void;
}

function RiderActionsMenu({ rider, onClose, onViewDetails }: RiderActionsMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-50"
        style={{
          border: '1px solid #E5E7EB',
          minWidth: '180px',
        }}
      >
        <button
          onClick={onViewDetails}
          className="w-full flex items-center gap-2 px-4 py-2 text-left transition-colors"
          style={{ fontSize: '13px', color: '#111111' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <button
          onClick={() => console.log('Suspend rider')}
          className="w-full flex items-center gap-2 px-4 py-2 text-left transition-colors"
          style={{ fontSize: '13px', color: '#111111' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <UserX className="w-4 h-4" />
          Suspend Account
        </button>
        <button
          onClick={() => console.log('Block rider')}
          className="w-full flex items-center gap-2 px-4 py-2 text-left transition-colors"
          style={{ fontSize: '13px', color: '#DC2626' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <Ban className="w-4 h-4" />
          Block Account
        </button>
      </div>
    </>
  );
}

interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className="w-3.5 h-3.5"
      style={{
        color: index < fullStars ? '#F24E1E' : '#E5E7EB',
        fill: index < fullStars ? '#F24E1E' : 'transparent',
      }}
    />
  ));
  
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      <span style={{ fontSize: '12px', fontWeight: '500', color: '#111111' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}