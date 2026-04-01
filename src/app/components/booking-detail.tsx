import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Clock,
  IndianRupee,
  CheckCircle,
  XCircle,
  FileText,
  Image as ImageIcon,
  AlertTriangle,
  Eye,
  ChevronRight,
  Star,
  Map as MapIcon,
} from 'lucide-react';
import { ScooterIcon } from './ui/scooter-icon';

interface BookingDetailProps {
  bookingId: string;
  onBack: () => void;
}

type TabId = 'overview' | 'handover' | 'timeline' | 'documents';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'handover', label: 'Handover & Return Checklist', icon: CheckCircle },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'documents', label: 'Documents & Photos', icon: ImageIcon },
];

// Mock booking data
const bookingData = {
  id: 'BKG-8F3A1B',
  status: 'Active',
  registrationNumber: 'KA01AB1234',
  riderName: 'Arjun Mehta',
  riderId: 'RDR-8F3A1B',
  riderPhone: '+91 98765 43210',
  riderRating: 4.5,
  riderKycStatus: 'Verified',
  hubName: 'Koramangala Hub',
  hubId: 'HUB-3D7F2A',
  hubAddress: '80 Feet Road, Koramangala 4th Block, Bangalore 560034',
  planType: 'Daily',
  startDateTime: '06 Feb 2026, 09:00 AM',
  endDateTime: '09 Feb 2026, 09:00 PM',
  duration: '3 days',
  createdAt: '05 Feb 2026, 08:45 PM',
  amount: '₹1,450',
  paymentMethod: 'UPI',
  paymentStatus: 'Paid',
  transactionId: 'TXN-9F2A3B',
  vehicleStatus: 'In Use',
  pickupCompleted: true,
  returnCompleted: false,
  pickupChecklist: {
    vehicleCondition: 'OK',
    batteryLevel: 92,
    odometerReading: 12458,
    helmetIssued: true,
    licenseVerified: true,
    imagesUploaded: true,
    notes: 'Vehicle in good condition. All checks passed.',
    updatedBy: 'Rajesh Kumar (Hub Manager)',
    timestamp: '06 Feb 2026, 09:15 AM',
  },
  returnChecklist: null,
  timeline: [
    { event: 'Booking Created', user: 'Arjun Mehta (Rider)', datetime: '05 Feb 2026, 08:45 PM' },
    { event: 'Payment Received', user: 'System', datetime: '05 Feb 2026, 08:46 PM' },
    { event: 'Vehicle Assigned', user: 'System', datetime: '05 Feb 2026, 08:46 PM' },
    { event: 'Pickup Marked Complete', user: 'Rajesh Kumar (Hub Manager)', datetime: '06 Feb 2026, 09:15 AM' },
  ],
  pickupPhotos: ['pickup-front.jpg', 'pickup-side.jpg', 'pickup-meter.jpg'],
  returnPhotos: [],
  riderLicense: 'license.jpg',
  damagePhotos: [],
};

export function BookingDetail({ bookingId, onBack }: BookingDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'Completed':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Cancelled':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      case 'Overdue':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
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

  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2" style={{ fontSize: '13px', color: '#6B7280' }}>
          <button
            onClick={onBack}
            className="hover:text-primary transition-colors"
            style={{ color: '#6B7280' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F24E1E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
          >
            Bookings
          </button>
          <ChevronRight className="w-4 h-4" />
          <span style={{ color: '#111111', fontWeight: '500' }}>{bookingData.id}</span>
        </div>

        {/* Header Card */}
        <div
          className="bg-white p-6"
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left Side - Booking Info */}
            <div className="flex-1 space-y-4">
              {/* Booking Number & Status */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111' }}>
                  {bookingData.id}
                </h1>
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    ...getStatusColor(bookingData.status),
                  }}
                >
                  {bookingData.status}
                </span>
              </div>

              {/* Hub Name and Address */}
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111', marginBottom: '4px' }}>
                  {bookingData.hubName}
                </p>
                <div className="flex items-center gap-2">
                  <p style={{ fontSize: '13px', color: '#6B7280' }}>
                    {bookingData.hubAddress}
                  </p>
                  <span style={{ color: '#E5E7EB' }}>•</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bookingData.hubAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 transition-colors"
                    style={{ 
                      fontSize: '12px', 
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

              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Registration Number */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#FFF1EC' }}
                  >
                    <ScooterIcon className="w-5 h-5" isActive={true} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>
                      Registration No
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#F24E1E',
                        fontFamily: 'monospace',
                      }}
                    >
                      {bookingData.registrationNumber}
                    </p>
                  </div>
                </div>

                {/* Rider Name */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#FFF1EC' }}
                  >
                    <User className="w-5 h-5" style={{ color: '#F24E1E' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>
                      Rider
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#F24E1E' }}>
                      {bookingData.riderName}
                    </p>
                  </div>
                </div>

                {/* Plan Type */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#FFF1EC' }}
                  >
                    <Calendar className="w-5 h-5" style={{ color: '#F24E1E' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>
                      Plan Type
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {bookingData.planType}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                

                {/* Date Range */}
                
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex flex-col gap-2 lg:min-w-[200px]">
              <button
                className="flex items-center justify-center gap-2 px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#F24E1E',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
              >
                <Eye className="w-4 h-4" />
                View Rider
              </button>
              <button
                className="flex items-center justify-center gap-2 px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111111',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <ScooterIcon className="w-4 h-4" isActive={false} />
                View Vehicle
              </button>
              {!bookingData.pickupCompleted && (
                <button
                  className="flex items-center justify-center gap-2 px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #16A34A',
                    backgroundColor: '#16A34A',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'white',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Pickup Complete
                </button>
              )}
              {bookingData.pickupCompleted && !bookingData.returnCompleted && (
                <button
                  className="flex items-center justify-center gap-2 px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #16A34A',
                    backgroundColor: '#16A34A',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'white',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Return Complete
                </button>
              )}
              {bookingData.status === 'Active' && (
                <button
                  className="flex items-center justify-center gap-2 px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #DC2626',
                    backgroundColor: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#DC2626',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FEE2E2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <KPIChip
            label="Booking Status"
            value={bookingData.status}
            color={getStatusColor(bookingData.status).color}
            bgColor={getStatusColor(bookingData.status).backgroundColor}
          />
          <KPIChip
            label="Payment Status"
            value={bookingData.paymentStatus}
            color={getPaymentStatusColor(bookingData.paymentStatus).color}
            bgColor={getPaymentStatusColor(bookingData.paymentStatus).backgroundColor}
          />
          <KPIChip label="Amount Paid" value={bookingData.amount} />
          <KPIChip label="Vehicle" value={bookingData.registrationNumber} />
          <KPIChip label="Duration" value={bookingData.duration} />
        </div>

        {/* Tabs */}
        <div className="border-b-2" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-3 transition-colors relative whitespace-nowrap"
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? '500' : '400',
                    color: isActive ? '#F24E1E' : '#6B7280',
                    backgroundColor: 'transparent',
                    borderBottom: isActive ? '2px solid #F24E1E' : '2px solid transparent',
                    marginBottom: '-2px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#111111';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#6B7280';
                    }
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab data={bookingData} />}
        {activeTab === 'handover' && <HandoverTab data={bookingData} />}
        {activeTab === 'timeline' && <TimelineTab data={bookingData} />}
        {activeTab === 'documents' && <DocumentsTab data={bookingData} />}
      </div>
    </div>
  );
}

// ========== KPI CHIP COMPONENT ==========

interface KPIChipProps {
  label: string;
  value: string;
  color?: string;
  bgColor?: string;
}

function KPIChip({ label, value, color, bgColor }: KPIChipProps) {
  return (
    <div
      className="px-4 py-3"
      style={{
        backgroundColor: bgColor || '#FFFFFF',
        border: bgColor ? 'none' : '1px solid #E5E7EB',
        borderRadius: '6px',
      }}
    >
      <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>{label}</p>
      <p
        style={{
          fontSize: '14px',
          fontWeight: '500',
          color: color || '#111111',
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ========== OVERVIEW TAB ==========

function OverviewTab({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Booking Summary */}
      <InfoCard title="Booking Summary">
        <InfoRow label="Booking Number" value={data.id} />
        <InfoRow label="Status" value={data.status} badge />
        <InfoRow label="Plan Type" value={data.planType} />
        <InfoRow label="Created At" value={data.createdAt} />
        <InfoRow label="Start Date-Time" value={data.startDateTime} />
        <InfoRow label="End Date-Time" value={data.endDateTime} />
        <InfoRow label="Duration" value={data.duration} />
      </InfoCard>

      {/* Rider Summary */}
      <InfoCard title="Rider Summary">
        <InfoRow label="Name" value={data.riderName} />
        <InfoRow label="Phone" value={data.riderPhone} />
        <InfoRow label="Rider Rating" value={`⭐ ${data.riderRating}`} />
        <InfoRow label="KYC Status" value={data.riderKycStatus} badge />
      </InfoCard>

      {/* Vehicle Summary */}
      <InfoCard title="Vehicle Summary">
        <InfoRow label="Registration Number" value={data.registrationNumber} monospace />
        <InfoRow label="Model" value="Activa Electric" />
        <InfoRow label="Current Status" value={data.vehicleStatus} badge />
        <InfoRow label="Hub Assigned" value={data.hubName} />
      </InfoCard>

      {/* Payment Summary */}
      <InfoCard title="Payment Summary">
        <InfoRow label="Amount" value={data.amount} />
        <InfoRow label="Method" value={data.paymentMethod} />
        <InfoRow label="Status" value={data.paymentStatus} badge />
        <InfoRow label="Transaction ID" value={data.transactionId} monospace />
      </InfoCard>
    </div>
  );
}

// ========== HANDOVER & RETURN TAB ==========

function HandoverTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Pickup Checklist */}
      <div
        className="bg-white p-6"
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
            Pickup Checklist (Before Handover)
          </h3>
          {data.pickupCompleted && (
            <span
              className="flex items-center gap-1 px-3 py-1 rounded-full"
              style={{
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
              }}
            >
              <CheckCircle className="w-4 h-4" />
              Completed
            </span>
          )}
        </div>

        {data.pickupChecklist ? (
          <div className="space-y-4">
            <ChecklistRow label="Vehicle Condition Check" value={data.pickupChecklist.vehicleCondition} />
            <ChecklistRow label="Battery Level Recorded" value={`${data.pickupChecklist.batteryLevel}%`} />
            <ChecklistRow
              label="Odometer Reading"
              value={data.pickupChecklist.odometerReading.toString()}
            />
            <ChecklistRow
              label="Scooter Images Uploaded"
              value={data.pickupChecklist.imagesUploaded ? 'Yes' : 'No'}
            />
            <ChecklistRow
              label="Rider License Verified"
              value={data.pickupChecklist.licenseVerified ? 'Yes' : 'No'}
            />
            <ChecklistRow
              label="Helmet Issued"
              value={data.pickupChecklist.helmetIssued ? 'Yes' : 'No'}
            />

            <div
              className="p-4"
              style={{
                backgroundColor: '#F7F9FC',
                borderLeft: '3px solid #F24E1E',
                borderRadius: '6px',
              }}
            >
              <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Notes</p>
              <p style={{ fontSize: '14px', color: '#111111' }}>{data.pickupChecklist.notes}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <p style={{ fontSize: '11px', color: '#6B7280' }}>Updated By</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                  {data.pickupChecklist.updatedBy}
                </p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: '11px', color: '#6B7280' }}>Timestamp</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                  {data.pickupChecklist.timestamp}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
              Pickup checklist not completed yet
            </p>
            <button
              className="px-4 transition-colors"
              style={{
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#16A34A',
                fontSize: '14px',
                fontWeight: '500',
                color: 'white',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
            >
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Mark Pickup Completed
            </button>
          </div>
        )}
      </div>

      {/* Return Checklist */}
      <div
        className="bg-white p-6"
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>Return Checklist</h3>
          {data.returnCompleted && (
            <span
              className="flex items-center gap-1 px-3 py-1 rounded-full"
              style={{
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
              }}
            >
              <CheckCircle className="w-4 h-4" />
              Completed
            </span>
          )}
        </div>

        {data.returnChecklist ? (
          <div className="space-y-4">
            <ChecklistRow label="Vehicle Condition After Return" value={data.returnChecklist.vehicleCondition} />
            <ChecklistRow
              label="Damage Observed"
              value={data.returnChecklist.damageObserved ? 'Yes' : 'No'}
            />
            <ChecklistRow label="Battery Level on Return" value={`${data.returnChecklist.batteryLevel}%`} />
            <ChecklistRow
              label="Odometer Reading on Return"
              value={data.returnChecklist.odometerReading.toString()}
            />
            <ChecklistRow label="Photos Uploaded" value={data.returnChecklist.photosUploaded ? 'Yes' : 'No'} />
            <ChecklistRow label="Extra Charges" value={data.returnChecklist.extraCharges || '₹0'} />

            <div
              className="p-4"
              style={{
                backgroundColor: '#F7F9FC',
                borderLeft: '3px solid #F24E1E',
                borderRadius: '6px',
              }}
            >
              <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Notes</p>
              <p style={{ fontSize: '14px', color: '#111111' }}>{data.returnChecklist.notes}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <p style={{ fontSize: '11px', color: '#6B7280' }}>Updated By</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                  {data.returnChecklist.updatedBy}
                </p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: '11px', color: '#6B7280' }}>Timestamp</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                  {data.returnChecklist.timestamp}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
              {!data.pickupCompleted
                ? 'Complete pickup checklist first'
                : 'Return checklist not completed yet'}
            </p>
            {data.pickupCompleted && (
              <button
                className="px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#16A34A',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
              >
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Mark Return Completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ========== TIMELINE TAB ==========

function TimelineTab({ data }: { data: any }) {
  return (
    <div
      className="bg-white p-6"
      style={{
        border: '1px solid #E5E7EB',
        borderRadius: '6px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111', marginBottom: '24px' }}>
        Activity Timeline
      </h3>

      <div className="space-y-6">
        {data.timeline.map((item: any, index: number) => (
          <div key={index} className="flex gap-4">
            {/* Timeline Dot */}
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: '#FFF1EC',
                  border: '2px solid #F24E1E',
                }}
              >
                <CheckCircle className="w-5 h-5" style={{ color: '#F24E1E' }} />
              </div>
              {index < data.timeline.length - 1 && (
                <div
                  className="w-0.5 flex-1 mt-2"
                  style={{
                    backgroundColor: '#E5E7EB',
                    minHeight: '40px',
                  }}
                />
              )}
            </div>

            {/* Timeline Content */}
            <div className="flex-1 pb-8">
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#111111', marginBottom: '4px' }}>
                {item.event}
              </p>
              <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>{item.user}</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{item.datetime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== DOCUMENTS TAB ==========

function DocumentsTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Pickup Photos */}
      {data.pickupPhotos.length > 0 && (
        <div
          className="bg-white p-6"
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111111', marginBottom: '16px' }}>
            Pickup Photos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.pickupPhotos.map((photo: string, index: number) => (
              <div
                key={index}
                className="aspect-square rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: '#F7F9FC',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2" style={{ color: '#E5E7EB' }} />
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>{photo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Return Photos */}
      {data.returnPhotos.length > 0 && (
        <div
          className="bg-white p-6"
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111111', marginBottom: '16px' }}>
            Return Photos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.returnPhotos.map((photo: string, index: number) => (
              <div
                key={index}
                className="aspect-square rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: '#F7F9FC',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2" style={{ color: '#E5E7EB' }} />
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>{photo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rider License */}
      {data.riderLicense && (
        <div
          className="bg-white p-6"
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111111', marginBottom: '16px' }}>
            Rider License Copy
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              className="aspect-square rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: '#F7F9FC',
                border: '1px solid #E5E7EB',
              }}
            >
              <div className="text-center">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" style={{ color: '#E5E7EB' }} />
                <p style={{ fontSize: '12px', color: '#6B7280' }}>{data.riderLicense}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Damage Photos */}
      {data.damagePhotos.length > 0 && (
        <div
          className="bg-white p-6"
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#DC2626', marginBottom: '16px' }}>
            <AlertTriangle className="w-5 h-5 inline mr-2" />
            Damage Photos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.damagePhotos.map((photo: string, index: number) => (
              <div
                key={index}
                className="aspect-square rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: '#FEE2E2',
                  border: '1px solid #DC2626',
                }}
              >
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2" style={{ color: '#DC2626' }} />
                  <p style={{ fontSize: '12px', color: '#DC2626' }}>{photo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.pickupPhotos.length === 0 &&
        data.returnPhotos.length === 0 &&
        data.damagePhotos.length === 0 &&
        !data.riderLicense && (
          <div
            className="bg-white p-12 text-center"
            style={{
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
            }}
          >
            <ImageIcon className="w-16 h-16 mx-auto mb-4" style={{ color: '#E5E7EB' }} />
            <p style={{ fontSize: '14px', color: '#6B7280' }}>No documents or photos uploaded yet</p>
          </div>
        )}
    </div>
  );
}

// ========== HELPER COMPONENTS ==========

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div
      className="bg-white p-6"
      style={{
        border: '1px solid #E5E7EB',
        borderRadius: '6px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
      }}
    >
      <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111111', marginBottom: '16px' }}>{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  badge?: boolean;
  monospace?: boolean;
}

function InfoRow({ label, value, badge, monospace }: InfoRowProps) {
  const getBadgeColor = (val: string) => {
    if (val === 'Active' || val === 'Paid' || val === 'Verified' || val === 'In Use')
      return { backgroundColor: '#DCFCE7', color: '#16A34A' };
    if (val === 'Completed') return { backgroundColor: '#DCFCE7', color: '#16A34A' };
    if (val === 'Pending') return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
    if (val === 'Cancelled' || val === 'Failed') return { backgroundColor: '#FEE2E2', color: '#DC2626' };
    if (val === 'Overdue') return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
    return { backgroundColor: '#F7F9FC', color: '#6B7280' };
  };

  return (
    <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#F1F5F9' }}>
      <span style={{ fontSize: '13px', color: '#6B7280' }}>{label}</span>
      {badge ? (
        <span
          className="px-2 py-1 rounded-full"
          style={{
            fontSize: '11px',
            fontWeight: '500',
            ...getBadgeColor(value),
          }}
        >
          {value}
        </span>
      ) : (
        <span
          style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#111111',
            fontFamily: monospace ? 'monospace' : 'inherit',
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}

interface ChecklistRowProps {
  label: string;
  value: string;
}

function ChecklistRow({ label, value }: ChecklistRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: '#F1F5F9' }}>
      <span style={{ fontSize: '14px', color: '#111111' }}>{label}</span>
      <span style={{ fontSize: '14px', fontWeight: '500', color: '#F24E1E' }}>{value}</span>
    </div>
  );
}