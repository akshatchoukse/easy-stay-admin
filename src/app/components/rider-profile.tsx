import { useState } from 'react';
import { ArrowLeft, User, CheckCircle, XCircle, AlertTriangle, RotateCcw, Eye, FileText, Clock, CreditCard, IndianRupee, Star } from 'lucide-react';

interface RiderProfileProps {
  riderId: string;
  onBack: () => void;
}

interface Rider {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  city: string;
  registrationDate: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  licenseNumber: string;
  licenseVerified: boolean;
  accountStatus: 'Active' | 'Suspended' | 'Blocked';
  riderRating: number;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  walletBalance: string;
  totalSpend: string;
  appVersion: string;
  devicePlatform: string;
  firstLoginDate: string;
  lastLoginDate: string;
  lastBookingDate: string;
  lastHubUsed: string;
  paymentFailures: number;
  overdueReturns: number;
  incidentFlags: number;
  kycDocuments: string[];
}

// Mock rider data
const mockRider: Rider = {
  id: 'RDR-10234',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  email: 'rajesh.kumar@example.com',
  dob: '15 Aug 1992',
  gender: 'Male',
  city: 'Bangalore',
  registrationDate: '15 Jan 2024',
  kycStatus: 'Verified',
  licenseNumber: 'KA12-20240012345',
  licenseVerified: true,
  accountStatus: 'Active',
  riderRating: 4.5,
  totalBookings: 42,
  completedBookings: 38,
  cancelledBookings: 4,
  walletBalance: '₹1,250',
  totalSpend: '₹18,450',
  appVersion: '2.4.1',
  devicePlatform: 'Android 13',
  firstLoginDate: '15 Jan 2024',
  lastLoginDate: '06 Feb 2024',
  lastBookingDate: '05 Feb 2024',
  lastHubUsed: 'Koramangala Hub',
  paymentFailures: 0,
  overdueReturns: 0,
  incidentFlags: 0,
  kycDocuments: ['Aadhaar Card', 'Driving License', 'Selfie Photo'],
};

const mockBookings = [
  {
    id: 'BKG-20245',
    date: '05 Feb 2024',
    hub: 'Koramangala Hub',
    vehicle: 'KA-05-MH-2891',
    amount: '₹450',
    status: 'Completed',
  },
  {
    id: 'BKG-20198',
    date: '02 Feb 2024',
    hub: 'Indiranagar Hub',
    vehicle: 'KA-05-MH-2756',
    amount: '₹380',
    status: 'Completed',
  },
  {
    id: 'BKG-20145',
    date: '30 Jan 2024',
    hub: 'Koramangala Hub',
    vehicle: 'KA-05-MH-2891',
    amount: '₹520',
    status: 'Completed',
  },
  {
    id: 'BKG-20099',
    date: '28 Jan 2024',
    hub: 'Whitefield Hub',
    vehicle: 'KA-05-MH-3012',
    amount: '₹290',
    status: 'Cancelled',
  },
];

const mockTransactions = [
  {
    id: 'TXN-50234',
    date: '05 Feb 2024',
    type: 'Booking Payment',
    amount: '₹450',
    status: 'Success',
  },
  {
    id: 'TXN-50189',
    date: '04 Feb 2024',
    type: 'Wallet Top-up',
    amount: '₹1,000',
    status: 'Success',
  },
  {
    id: 'TXN-50156',
    date: '02 Feb 2024',
    type: 'Booking Payment',
    amount: '₹380',
    status: 'Success',
  },
];

const mockActivityLog = [
  {
    id: '1',
    timestamp: '06 Feb 2024, 08:30 AM',
    action: 'Login',
    details: 'User logged in via Android app',
  },
  {
    id: '2',
    timestamp: '05 Feb 2024, 06:45 PM',
    action: 'Booking Created',
    details: 'Created booking BKG-20245',
  },
  {
    id: '3',
    timestamp: '05 Feb 2024, 06:50 PM',
    action: 'Payment Done',
    details: 'Paid ₹450 for BKG-20245',
  },
  {
    id: '4',
    timestamp: '04 Feb 2024, 12:15 PM',
    action: 'Wallet Top-up',
    details: 'Added ₹1,000 to wallet',
  },
];

const mockDocuments = [
  {
    name: 'Aadhaar Card',
    status: 'Verified',
    uploadedDate: '15 Jan 2024',
  },
  {
    name: 'Driving License',
    status: 'Verified',
    uploadedDate: '15 Jan 2024',
  },
  {
    name: 'Selfie Photo',
    status: 'Verified',
    uploadedDate: '15 Jan 2024',
  },
];

type Tab = 'Overview' | 'KYC & Documents' | 'Bookings' | 'Wallet & Payments' | 'Risk & Flags' | 'Activity Log';

export function RiderProfile({ riderId, onBack }: RiderProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const rider = mockRider; // In real app, fetch by riderId

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getStatusStyle = (status: string) => {
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

  const getKycStatusStyle = (status: string) => {
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

  const tabs: Tab[] = ['Overview', 'KYC & Documents', 'Bookings', 'Wallet & Payments', 'Risk & Flags', 'Activity Log'];

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-6" style={{ maxWidth: '1320px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 transition-colors"
          style={{ color: '#6B7280', fontSize: '14px' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F24E1E')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Riders</span>
        </button>

        {/* Header Section */}
        <div
          className="bg-white p-6 mb-6"
          style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}
        >
          <div className="flex items-start justify-between">
            {/* Left side - Rider info */}
            <div className="flex gap-4">
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#FFF1EC',
                  color: '#F24E1E',
                  fontSize: '20px',
                  fontWeight: '600',
                }}
              >
                {getInitials(rider.name)}
              </div>

              {/* Details */}
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                  {rider.name}
                </h1>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                  {rider.id} • {rider.phone} • {rider.email}
                </p>

                {/* KPI Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <div
                    className="px-3 py-1 rounded-full flex items-center gap-1"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      ...getStatusStyle(rider.accountStatus),
                    }}
                  >
                    {rider.accountStatus === 'Active' && <CheckCircle className="w-3 h-3" />}
                    {rider.accountStatus === 'Suspended' && <AlertTriangle className="w-3 h-3" />}
                    {rider.accountStatus === 'Blocked' && <XCircle className="w-3 h-3" />}
                    {rider.accountStatus}
                  </div>

                  <div
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      ...getKycStatusStyle(rider.kycStatus),
                    }}
                  >
                    KYC: {rider.kycStatus}
                  </div>

                  <div
                    className="px-3 py-1 rounded-full flex items-center gap-1"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: rider.licenseVerified ? '#DCFCE7' : '#FEE2E2',
                      color: rider.licenseVerified ? '#16A34A' : '#DC2626',
                    }}
                  >
                    {rider.licenseVerified ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    License: {rider.licenseVerified ? 'Verified' : 'Not Verified'}
                  </div>

                  <div
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: '#F7F9FC',
                      color: '#111111',
                    }}
                  >
                    {rider.totalBookings} Bookings
                  </div>

                  <div
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: '#F7F9FC',
                      color: '#111111',
                    }}
                  >
                    Wallet: {rider.walletBalance}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => console.log('Reset login session')}
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
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Reset Login
              </button>
              <button
                onClick={() => console.log('Suspend rider')}
                className="px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #F59E0B',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#F59E0B',
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEF3C7';
                  e.currentTarget.style.color = '#92400E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#F59E0B';
                }}
              >
                Suspend Rider
              </button>
              <button
                onClick={() => console.log('Block rider')}
                className="px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #DC2626',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#DC2626',
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEE2E2';
                  e.currentTarget.style.color = '#991B1B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#DC2626';
                }}
              >
                Block Rider
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white mb-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
          <div className="flex" style={{ borderBottom: '1px solid #E5E7EB' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-4 transition-colors relative"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: activeTab === tab ? '#F24E1E' : '#6B7280',
                  backgroundColor: 'transparent',
                  borderBottom: activeTab === tab ? '2px solid #F24E1E' : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.color = '#111111';
                    e.currentTarget.style.backgroundColor = '#F7F9FC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.color = '#6B7280';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
              Rider Information
            </h3>
            
            {/* Status Badges Row */}
            <div className="flex gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                  ACCOUNT STATUS
                </label>
                <span
                  className="inline-flex px-3 py-1 rounded-full"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    ...getStatusStyle(rider.accountStatus),
                  }}
                >
                  {rider.accountStatus}
                </span>
              </div>
              
              <div>
                <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                  RIDER RATING
                </label>
                <StarRating rating={rider.riderRating} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <InfoRow label="Full Name" value={rider.name} />
              <InfoRow label="Gender" value={rider.gender} />
              
              <InfoRow label="Phone" value={rider.phone} />
              <InfoRow label="City" value={rider.city} />
              
              <InfoRow label="Email" value={rider.email} />
              <InfoRow label="Registration Date" value={rider.registrationDate} />
              
              <InfoRow label="Date of Birth" value={rider.dob} />
              <InfoRow label="Rider ID" value={rider.id} />
            </div>
          </div>
        )}

        {activeTab === 'KYC & Documents' && (
          <div className="grid grid-cols-12 gap-6">
            {/* KYC Status Card */}
            <div className="col-span-6">
              <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  KYC Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                      STATUS
                    </label>
                    <span
                      className="inline-flex px-3 py-1 rounded-full"
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        ...getKycStatusStyle(rider.kycStatus),
                      }}
                    >
                      {rider.kycStatus}
                    </span>
                  </div>
                  <InfoRow label="Documents Submitted" value={rider.kycDocuments.length.toString()} />
                </div>
              </div>
            </div>

            {/* License Verification Card */}
            <div className="col-span-6">
              <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  License Verification
                </h3>
                <div className="space-y-4">
                  <InfoRow label="License Number" value={rider.licenseNumber} />
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                      VERIFICATION STATUS
                    </label>
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full"
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: rider.licenseVerified ? '#DCFCE7' : '#FEE2E2',
                        color: rider.licenseVerified ? '#16A34A' : '#DC2626',
                      }}
                    >
                      {rider.licenseVerified ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {rider.licenseVerified ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className="col-span-12">
              <div className="bg-white overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Documents
                  </h3>
                </div>
                <div className="table-scroll-container">
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                      <tr>
                        <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                          Document Name
                        </th>
                        <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                          Uploaded Date
                        </th>
                        <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                          Status
                        </th>
                        <th className="px-6 py-3 text-right uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDocuments.map((doc, index) => (
                        <tr
                          key={doc.name}
                          style={{
                            borderBottom: index < mockDocuments.length - 1 ? '1px solid #F1F5F9' : 'none',
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" style={{ color: '#6B7280' }} />
                              <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                                {doc.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span style={{ fontSize: '13px', color: '#6B7280' }}>
                              {doc.uploadedDate}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="inline-flex px-2 py-1 rounded-full"
                              style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                backgroundColor: '#DCFCE7',
                                color: '#16A34A',
                              }}
                            >
                              {doc.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => console.log('View document')}
                                className="px-3 py-1 rounded transition-colors"
                                style={{
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  color: '#F24E1E',
                                  backgroundColor: '#FFF1EC',
                                  border: 'none',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFE4DB')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFF1EC')}
                              >
                                <Eye className="w-3 h-3 inline mr-1" />
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Bookings' && (
          <div className="bg-white overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                Booking History ({mockBookings.length})
              </h3>
            </div>
            <div className="table-scroll-container">
              <table className="w-full">
                <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                  <tr>
                    <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Date
                    </th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Hub
                    </th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Status
                    </th>
                    <th className="px-6 py-3 text-right uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      style={{
                        borderBottom: index < mockBookings.length - 1 ? '1px solid #F1F5F9' : 'none',
                      }}
                    >
                      <td className="px-6 py-4">
                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111', fontFamily: 'monospace' }}>
                          {booking.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ fontSize: '13px', color: '#6B7280' }}>
                          {booking.date}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ fontSize: '13px', color: '#111111' }}>
                          {booking.hub}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                            Activa Electric
                          </p>
                          <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'monospace' }}>
                            {booking.vehicle}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                          {booking.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex px-2 py-1 rounded-full"
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            backgroundColor: booking.status === 'Completed' ? '#DCFCE7' : '#FEE2E2',
                            color: booking.status === 'Completed' ? '#16A34A' : '#DC2626',
                          }}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => console.log('View booking')}
                          className="px-3 py-1 rounded transition-colors"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#F24E1E',
                            backgroundColor: '#FFF1EC',
                            border: 'none',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFE4DB')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFF1EC')}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Wallet & Payments' && (
          <div className="space-y-6">
            {/* Wallet Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#FFF1EC' }}
                  >
                    <CreditCard className="w-6 h-6" style={{ color: '#F24E1E' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                      Wallet Balance
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                      {rider.walletBalance}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#DCFCE7' }}
                  >
                    <IndianRupee className="w-6 h-6" style={{ color: '#16A34A' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                      Total Spend
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                      {rider.totalSpend}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#F7F9FC' }}
                  >
                    <FileText className="w-6 h-6" style={{ color: '#6B7280' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                      Total Transactions
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                      {mockTransactions.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                  Recent Transactions
                </h3>
              </div>
              <div className="table-scroll-container">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                    <tr>
                      <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                        Date
                      </th>
                      <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                        Type
                      </th>
                      <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map((txn, index) => (
                      <tr
                        key={txn.id}
                        style={{
                          borderBottom: index < mockTransactions.length - 1 ? '1px solid #F1F5F9' : 'none',
                        }}
                      >
                        <td className="px-6 py-4">
                          <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111', fontFamily: 'monospace' }}>
                            {txn.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>
                            {txn.date}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span style={{ fontSize: '13px', color: '#111111' }}>
                            {txn.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                            {txn.amount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex px-2 py-1 rounded-full"
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              backgroundColor: '#DCFCE7',
                              color: '#16A34A',
                            }}
                          >
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Risk & Flags' && (
          <div className="space-y-6">
            {/* Flag Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <div className="flex items-center justify-between mb-2">
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                    Payment Failures
                  </p>
                  {rider.paymentFailures > 0 && <AlertTriangle className="w-4 h-4" style={{ color: '#DC2626' }} />}
                </div>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: rider.paymentFailures > 0 ? '#DC2626' : '#6B7280',
                  }}
                >
                  {rider.paymentFailures}
                </p>
              </div>

              <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <div className="flex items-center justify-between mb-2">
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                    Overdue Returns
                  </p>
                  {rider.overdueReturns > 0 && <AlertTriangle className="w-4 h-4" style={{ color: '#DC2626' }} />}
                </div>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: rider.overdueReturns > 0 ? '#DC2626' : '#6B7280',
                  }}
                >
                  {rider.overdueReturns}
                </p>
              </div>

              <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                <div className="flex items-center justify-between mb-2">
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                    Incident Flags
                  </p>
                  {rider.incidentFlags > 0 && <AlertTriangle className="w-4 h-4" style={{ color: '#DC2626' }} />}
                </div>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: rider.incidentFlags > 0 ? '#DC2626' : '#6B7280',
                  }}
                >
                  {rider.incidentFlags}
                </p>
              </div>
            </div>

            {/* Empty State if no flags */}
            {rider.paymentFailures === 0 && rider.overdueReturns === 0 && rider.incidentFlags === 0 && (
              <div
                className="bg-white p-12 text-center"
                style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: '#DCFCE7' }}
                >
                  <CheckCircle className="w-8 h-8" style={{ color: '#16A34A' }} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '8px' }}>
                  No Compliance Flags
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  This rider has a clean compliance record.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Activity Log' && (
          <div className="bg-white overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockActivityLog.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex gap-4"
                    style={{
                      paddingBottom: index < mockActivityLog.length - 1 ? '16px' : '0',
                      borderBottom: index < mockActivityLog.length - 1 ? '1px solid #F1F5F9' : 'none',
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#FFF1EC' }}
                    >
                      <Clock className="w-4 h-4" style={{ color: '#F24E1E' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                          {activity.action}
                        </p>
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                          {activity.timestamp}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#6B7280' }}>
                        {activity.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
        {label.toUpperCase()}
      </label>
      <p style={{ fontSize: '13px', color: '#111111' }}>
        {value}
      </p>
    </div>
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