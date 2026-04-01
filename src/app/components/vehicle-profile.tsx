import { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Wrench,
  MapPin,
  Upload,
  X,
  Battery,
  Gauge,
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  User,
  Phone,
  CreditCard,
  AlertCircle,
  Download,
  Trash2,
  Plus,
  Image as ImageIcon,
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

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

interface VehicleProfileProps {
  vehicle: Vehicle;
  onBack: () => void;
  onEdit: () => void;
}

// Mock booking history
const mockBookings = [
  {
    id: '1',
    bookingId: 'BKG-2024-0001',
    userName: 'Rajesh Kumar',
    userPhone: '+91 98765 43210',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    status: 'Completed',
    amount: 1999,
  },
  {
    id: '2',
    bookingId: 'BKG-2024-0045',
    userName: 'Priya Sharma',
    userPhone: '+91 98765 43211',
    startDate: '2024-02-06',
    endDate: '2024-02-06',
    status: 'Active',
    amount: 499,
  },
];

// Mock maintenance history
const mockMaintenance = [
  {
    id: '1',
    type: 'Scheduled Maintenance',
    startDate: '2024-01-15',
    endDate: '2024-01-16',
    reason: 'Regular service - 10,000 km',
    status: 'Completed',
    cost: 2500,
  },
  {
    id: '2',
    type: 'Breakdown',
    startDate: '2024-01-28',
    endDate: '2024-01-30',
    reason: 'Battery charging issue',
    status: 'Completed',
    cost: 5000,
  },
];

// Mock documents
const mockDocuments = [
  {
    id: '1',
    name: 'Registration Certificate (RC)',
    type: 'RC',
    uploadDate: '2024-01-10',
    expiryDate: '2029-01-10',
    status: 'Valid',
    fileSize: '2.4 MB',
  },
  {
    id: '2',
    name: 'Insurance Certificate',
    type: 'Insurance',
    uploadDate: '2024-01-15',
    expiryDate: '2025-01-15',
    status: 'Valid',
    fileSize: '1.8 MB',
  },
  {
    id: '3',
    name: 'Fitness Certificate',
    type: 'Fitness',
    uploadDate: '2024-02-01',
    expiryDate: '2025-02-01',
    status: 'Valid',
    fileSize: '1.2 MB',
  },
];

// Generate realistic revenue and bookings data for a vehicle
const generateVehicleRevenueData = (registrationNumber: string) => {
  const numBookings = Math.floor(Math.random() * (120 - 20 + 1)) + 20; // 20-120 bookings
  const bookings: any[] = [];
  let totalRevenue = 0;
  let last30DaysRevenue = 0;
  
  const today = new Date('2026-02-09');
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const riders = [
    'Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikram Reddy',
    'Ananya Gupta', 'Rohan Mehta', 'Kavya Nair', 'Aditya Verma', 'Pooja Iyer',
    'Karthik Rao', 'Divya Joshi', 'Arjun Desai', 'Meera Pillai', 'Sanjay Kumar',
  ];
  
  const hubs = [
    'MG Road Hub', 'Whitefield Hub', 'Koramangala Hub', 
    'Indiranagar Hub', 'Jayanagar Hub', 'Banashankari Hub',
  ];
  
  const plans = [
    { name: '4 Hours', minAmount: 200, maxAmount: 350 },
    { name: '8 Hours', minAmount: 350, maxAmount: 500 },
    { name: '1 Day', minAmount: 450, maxAmount: 650 },
    { name: '3 Days', minAmount: 1200, maxAmount: 1800 },
    { name: '1 Week', minAmount: 2500, maxAmount: 3500 },
  ];
  
  for (let i = 0; i < numBookings; i++) {
    const daysAgo = Math.floor(Math.random() * 180); // Last 6 months
    const bookingDate = new Date(today);
    bookingDate.setDate(bookingDate.getDate() - daysAgo);
    
    // 85% completed, 10% active, 5% cancelled
    const rand = Math.random();
    let status: string;
    let paymentStatus: string;
    
    if (rand < 0.85) {
      status = 'Completed';
      paymentStatus = 'Paid';
    } else if (rand < 0.95) {
      status = 'Active';
      paymentStatus = 'Paid';
    } else {
      status = 'Cancelled';
      paymentStatus = 'Refunded';
    }
    
    const plan = plans[Math.floor(Math.random() * plans.length)];
    const amount = Math.floor(Math.random() * (plan.maxAmount - plan.minAmount + 1)) + plan.minAmount;
    
    if (status === 'Completed' && paymentStatus === 'Paid') {
      totalRevenue += amount;
      if (bookingDate >= thirtyDaysAgo) {
        last30DaysRevenue += amount;
      }
    }
    
    bookings.push({
      id: `BK${String(10000 + i).substring(1)}`,
      bookingId: `BKG-${2025 + Math.floor(i / 500)}-${String(1000 + i).substring(1)}`,
      rider: riders[Math.floor(Math.random() * riders.length)],
      date: bookingDate.toISOString().split('T')[0],
      plan: plan.name,
      amount,
      paymentStatus,
      hub: hubs[Math.floor(Math.random() * hubs.length)],
      status,
    });
  }
  
  // Sort bookings by date descending
  bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;
  const avgRevenuePerBooking = completedBookings > 0 ? Math.round(totalRevenue / completedBookings) : 0;
  
  // Find last booking date
  const lastBookingDate = bookings.length > 0 ? bookings[0].date : null;
  
  // Calculate revenue trend (comparing last 15 days vs previous 15 days)
  const fifteenDaysAgo = new Date(today);
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  
  const last15DaysRevenue = bookings
    .filter(b => b.status === 'Completed' && b.paymentStatus === 'Paid' && new Date(b.date) >= fifteenDaysAgo)
    .reduce((sum, b) => sum + b.amount, 0);
  
  const previous15DaysStart = new Date(today);
  previous15DaysStart.setDate(previous15DaysStart.getDate() - 30);
  const previous15DaysEnd = new Date(today);
  previous15DaysEnd.setDate(previous15DaysEnd.getDate() - 15);
  
  const previous15DaysRevenue = bookings
    .filter(b => 
      b.status === 'Completed' && 
      b.paymentStatus === 'Paid' && 
      new Date(b.date) >= previous15DaysStart && 
      new Date(b.date) < previous15DaysEnd
    )
    .reduce((sum, b) => sum + b.amount, 0);
  
  const revenueTrend = previous15DaysRevenue > 0 
    ? Math.round(((last15DaysRevenue - previous15DaysRevenue) / previous15DaysRevenue) * 100)
    : 0;
  
  return {
    totalRevenue,
    last30DaysRevenue,
    bookings,
    totalBookings: numBookings,
    completedBookings,
    cancelledBookings,
    avgRevenuePerBooking,
    lastBookingDate,
    revenueTrend,
  };
};

export function VehicleProfile({ vehicle, onBack, onEdit }: VehicleProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'images' | 'revenue' | 'bookings' | 'maintenance' | 'documents' | 'activity'>('overview');
  const [mainImage, setMainImage] = useState(vehicle.imageUrl);
  const [galleryImages, setGalleryImages] = useState([
    vehicle.imageUrl,
    vehicle.imageUrl,
    vehicle.imageUrl,
  ]);
  
  // Generate revenue data for this vehicle
  const revenueData = generateVehicleRevenueData(vehicle.registrationNumber);

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

  const getBatteryColor = (health: number) => {
    if (health >= 90) return '#16A34A';
    if (health >= 70) return '#F59E0B';
    return '#DC2626';
  };

  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 transition-colors"
          style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F24E1E')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fleet Registry
        </button>

        {/* Expanded Header Section with Integrated Stats */}
        <div className="bg-white p-6 mb-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
          {/* Top Row: Vehicle Name, Status, Actions */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '8px' }}>
                Activa Electric
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: '18px', fontWeight: '500', color: '#F24E1E' }}>
                  {vehicle.registrationNumber}
                </span>
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    ...getStatusColor(vehicle.status),
                  }}
                >
                  {vehicle.status}
                </span>
              </div>
              <div className="flex items-center gap-4" style={{ fontSize: '14px', color: '#6B7280' }}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{vehicle.hubAssigned} ({vehicle.hubCode})</span>
                </div>
                <span style={{ color: '#9CA3AF' }}>•</span>
                <span>{vehicle.hubAddress}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 text-white transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#F24E1E',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
              >
                <Edit className="w-4 h-4" />
                Edit Vehicle
              </button>
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <MapPin className="w-4 h-4" />
                Assign Hub
              </button>
            </div>
          </div>

          {/* Integrated Stats Grid - Single Row */}
          <div className="grid grid-cols-5 gap-4">
            {/* Odometer */}
            <div className="flex items-start gap-3 p-4 rounded-md" style={{ backgroundColor: '#F7F9FC' }}>
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FFF1EC' }}>
                <Gauge className="w-4 h-4" style={{ color: '#F24E1E' }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Odometer
                </p>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                  {vehicle.odometer.toLocaleString()} km
                </p>
              </div>
            </div>

            {/* Last Inspection */}
            <div className="flex items-start gap-3 p-4 rounded-md" style={{ backgroundColor: '#F7F9FC' }}>
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FFF1EC' }}>
                <Calendar className="w-4 h-4" style={{ color: '#F24E1E' }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Last Inspection
                </p>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
                  {new Date(vehicle.lastInspectionDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>
                  {Math.floor((new Date().getTime() - new Date(vehicle.lastInspectionDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                </p>
              </div>
            </div>

            {/* Warranty Status */}
            <div className="flex items-start gap-3 p-4 rounded-md" style={{ backgroundColor: '#F7F9FC' }}>
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FFF1EC' }}>
                <CheckCircle className="w-4 h-4" style={{ color: '#F24E1E' }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Warranty Status
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: vehicle.warrantyStatus === 'Valid' ? '#DCFCE7' : '#FEE2E2',
                      color: vehicle.warrantyStatus === 'Valid' ? '#16A34A' : '#DC2626',
                    }}
                  >
                    {vehicle.warrantyStatus}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  Until {new Date(vehicle.warrantyExpiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Insurance Expiry */}
            <div className="flex items-start gap-3 p-4 rounded-md" style={{ backgroundColor: '#F7F9FC' }}>
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FFF1EC' }}>
                <FileText className="w-4 h-4" style={{ color: '#F24E1E' }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Insurance Expiry
                </p>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
                  {vehicle.insuranceExpiryDate
                    ? new Date(vehicle.insuranceExpiryDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Not set'}
                </p>
                <p style={{ fontSize: '12px', color: vehicle.insuranceExpiryDate && Math.floor((new Date(vehicle.insuranceExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) < 0 ? '#DC2626' : '#6B7280' }}>
                  {vehicle.insuranceExpiryDate
                    ? (() => {
                        const daysRemaining = Math.floor((new Date(vehicle.insuranceExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                        return daysRemaining < 0 ? 'Overdue' : `${daysRemaining} days remaining`;
                      })()
                    : 'No expiry date'}
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-start gap-3 p-4 rounded-md" style={{ backgroundColor: '#F7F9FC' }}>
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FFF1EC' }}>
                <Clock className="w-4 h-4" style={{ color: '#F24E1E' }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Last Updated
                </p>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                  {new Date(vehicle.lastUpdated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>
                  {new Date(vehicle.lastUpdated).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - Full Width */}
        <div className="bg-white overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
          {/* Tab Headers */}
          <div className="flex" style={{ borderBottom: '1px solid #E5E7EB' }}>
            {(['overview', 'images', 'revenue', 'bookings', 'maintenance', 'documents', 'activity'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-4 transition-all"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: activeTab === tab ? '#F24E1E' : '#6B7280',
                  borderBottom: activeTab === tab ? '2px solid #F24E1E' : '2px solid transparent',
                  backgroundColor: activeTab === tab ? '#FFF1EC' : 'transparent',
                  textTransform: 'capitalize',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.backgroundColor = '#F7F9FC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tab === 'images' ? 'Vehicle Images' : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-2 gap-6">
                {/* Basic Information */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Registration Number
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>{vehicle.registrationNumber}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Model
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>Activa Electric</p>
                    </div>
                    {vehicle.variant && (
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                          Variant
                        </label>
                        <p style={{ fontSize: '14px', color: '#111111' }}>{vehicle.variant}</p>
                      </div>
                    )}
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Manufacturing Year
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>{vehicle.manufacturingYear}</p>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                    Technical Specifications
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Battery Capacity
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>{vehicle.batteryCapacity} Wh</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Total Odometer
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>{vehicle.odometer.toLocaleString()} km</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Warranty Status
                      </label>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-1 rounded-full"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: vehicle.warrantyStatus === 'Valid' ? '#DCFCE7' : '#FEE2E2',
                            color: vehicle.warrantyStatus === 'Valid' ? '#16A34A' : '#DC2626',
                          }}
                        >
                          {vehicle.warrantyStatus}
                        </span>
                        <span style={{ fontSize: '13px', color: '#6B7280' }}>
                          Until {new Date(vehicle.warrantyExpiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Last Updated
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>
                        {new Date(vehicle.lastUpdated).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vehicle Images Tab */}
            {activeTab === 'images' && (
              <div>
                {/* Image Gallery - All Same Size */}
                <div className="grid grid-cols-4 gap-4">
                  {galleryImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden"
                      style={{
                        height: '240px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: '#F7F9FC',
                      }}
                    >
                      <img src={img} alt={`Vehicle ${index + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #E5E7EB',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)')}
                        >
                          <Edit className="w-4 h-4" style={{ color: '#6B7280' }} />
                        </button>
                        <button
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #E5E7EB',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEE2E2';
                          }}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)')}
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Add Image Button */}
                  <button
                    className="rounded-lg flex flex-col items-center justify-center transition-colors"
                    style={{
                      height: '240px',
                      border: '2px dashed #E5E7EB',
                      backgroundColor: '#F7F9FC',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#F24E1E';
                      e.currentTarget.style.backgroundColor = '#FFF1EC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.backgroundColor = '#F7F9FC';
                    }}
                  >
                    <Plus className="w-8 h-8" style={{ color: '#6B7280', marginBottom: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>Add Image</span>
                  </button>
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {activeTab === 'revenue' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Revenue Summary
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Total Revenue Card */}
                  <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                        Total Revenue
                      </span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      ₹{revenueData.totalRevenue.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>Last 6 months</p>
                  </div>

                  {/* Last 30 Days Revenue Card */}
                  <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                        Last 30 Days Revenue
                      </span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      ₹{revenueData.last30DaysRevenue.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>Last 30 days</p>
                  </div>

                  {/* Total Bookings Card */}
                  <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                        Total Bookings
                      </span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      {revenueData.totalBookings}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>Last 6 months</p>
                  </div>

                  {/* Completed Bookings Card */}
                  <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                        Completed Bookings
                      </span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      {revenueData.completedBookings}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>Last 6 months</p>
                  </div>

                  {/* Cancelled Bookings Card */}
                  <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <X className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                        Cancelled Bookings
                      </span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      {revenueData.cancelledBookings}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>Last 6 months</p>
                  </div>

                  {/* Average Revenue per Booking Card */}
                  <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                        Avg Revenue per Booking
                      </span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      ₹{revenueData.avgRevenuePerBooking.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>Last 6 months</p>
                  </div>

                  {/* Last Booking Date Card */}
                  <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                        Last Booking Date
                      </span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      {revenueData.lastBookingDate
                        ? new Date(revenueData.lastBookingDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'No bookings'}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>Last 6 months</p>
                  </div>

                  {/* Revenue Trend Card */}
                  <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                        Revenue Trend
                      </span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      {revenueData.revenueTrend > 0 ? '+' : ''}{revenueData.revenueTrend}%
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>Last 15 days vs previous 15 days</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Booking History ({mockBookings.length})
                  </h3>
                </div>
                <div className="table-scroll-container">
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                      <tr>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Booking ID
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Rider
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Start Date
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          End Date
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Status
                        </th>
                        <th className="px-4 py-3 text-right" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Amount
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
                          <td className="px-4 py-3">
                            <span style={{ fontSize: '13px', fontWeight: '500', color: '#F24E1E' }}>
                              {booking.bookingId}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <p style={{ fontSize: '13px', color: '#111111' }}>{booking.userName}</p>
                              <p style={{ fontSize: '12px', color: '#6B7280' }}>{booking.userPhone}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span style={{ fontSize: '13px', color: '#111111' }}>
                              {new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span style={{ fontSize: '13px', color: '#111111' }}>
                              {new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="px-2 py-1 rounded-full"
                              style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                backgroundColor: booking.status === 'Active' ? '#DCFCE7' : '#F3F4F6',
                                color: booking.status === 'Active' ? '#16A34A' : '#6B7280',
                              }}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                              ₹{booking.amount.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Maintenance History ({mockMaintenance.length})
                  </h3>
                  <button
                    className="flex items-center gap-2 px-4 text-white transition-colors"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#F24E1E',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
                  >
                    <Plus className="w-4 h-4" />
                    Log Maintenance
                  </button>
                </div>
                <div className="table-scroll-container">
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                      <tr>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Type
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Reason
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Start Date
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          End Date
                        </th>
                        <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Status
                        </th>
                        <th className="px-4 py-3 text-right" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                          Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMaintenance.map((maintenance, index) => (
                        <tr
                          key={maintenance.id}
                          style={{
                            borderBottom: index < mockMaintenance.length - 1 ? '1px solid #F1F5F9' : 'none',
                          }}
                        >
                          <td className="px-4 py-3">
                            <span
                              className="px-2 py-1 rounded-full"
                              style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                backgroundColor: maintenance.type === 'Breakdown' ? '#FEE2E2' : '#DBEAFE',
                                color: maintenance.type === 'Breakdown' ? '#DC2626' : '#2563EB',
                              }}
                            >
                              {maintenance.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span style={{ fontSize: '13px', color: '#111111' }}>{maintenance.reason}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span style={{ fontSize: '13px', color: '#111111' }}>
                              {new Date(maintenance.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span style={{ fontSize: '13px', color: '#111111' }}>
                              {new Date(maintenance.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="px-2 py-1 rounded-full"
                              style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                backgroundColor: '#DCFCE7',
                                color: '#16A34A',
                              }}
                            >
                              {maintenance.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                              ₹{maintenance.cost.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Vehicle Documents ({mockDocuments.length})
                  </h3>
                  <button
                    className="flex items-center gap-2 px-4 text-white transition-colors"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#F24E1E',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </button>
                </div>
                <div className="grid gap-4">
                  {mockDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{ border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex items-center justify-center rounded-lg"
                          style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#F24E1E',
                          }}
                        >
                          <FileText className="w-6 h-6" style={{ color: 'white' }} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#111111', marginBottom: '4px' }}>
                            {doc.name}
                          </h4>
                          <div className="flex items-center gap-3" style={{ fontSize: '12px', color: '#6B7280' }}>
                            <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span>•</span>
                            <span>Expires: {new Date(doc.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span>•</span>
                            <span>{doc.fileSize}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-1 rounded-full"
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            backgroundColor: '#DCFCE7',
                            color: '#16A34A',
                          }}
                        >
                          {doc.status}
                        </span>
                        <button
                          className="p-2 rounded transition-colors"
                          style={{ backgroundColor: 'transparent' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <Download className="w-4 h-4" style={{ color: '#6B7280' }} />
                        </button>
                        <button
                          className="p-2 rounded transition-colors"
                          style={{ backgroundColor: 'transparent' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Log Tab */}
            {activeTab === 'activity' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Activity Log
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  Activity log content coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}