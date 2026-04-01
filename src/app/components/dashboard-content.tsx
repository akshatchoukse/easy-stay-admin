import { useState } from 'react';
import {
  Users,
  MapPin,
  Calendar,
  Wrench,
  Bell,
  LayoutGrid,
  TrendingUp,
  TrendingDown,
  BarChart3,
  IndianRupee,
  AlertTriangle,
  Clock,
  XCircle,
  CalendarIcon,
  ChevronDown,
  CheckCircle,
  Star,
} from 'lucide-react';
import { ScooterIcon } from './ui/scooter-icon';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type TabId = 'overview' | 'riders' | 'hubs' | 'vehicles' | 'bookings' | 'maintenance' | 'notifications';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'riders', label: 'Riders', icon: Users },
  { id: 'hubs', label: 'Hubs', icon: MapPin },
  { id: 'vehicles', label: 'Vehicles', icon: ScooterIcon },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

// ========== MOCK DATA ==========

// Generate 30 days of dates
const generateLast30Days = () => {
  const days = [];
  const today = new Date('2026-02-09'); // Current date from context
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push({
      date: date.toISOString().split('T')[0],
      display: `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getDate()}`,
    });
  }
  return days;
};

const last30Days = generateLast30Days();

// Generate realistic hub utilization data
const generateHubUtilizationData = () => {
  const hubs = [
    { 
      name: 'MG Road Hub', 
      capacity: 70, 
      baseUtilization: 85,
      variance: 8,
    },
    { 
      name: 'Whitefield Hub', 
      capacity: 80, 
      baseUtilization: 78,
      variance: 10,
    },
    { 
      name: 'Indiranagar Hub', 
      capacity: 90, 
      baseUtilization: 82,
      variance: 9,
    },
    { 
      name: 'Koramangala Hub', 
      capacity: 100, 
      baseUtilization: 87,
      variance: 7,
    },
    { 
      name: 'Jayanagar Hub', 
      capacity: 60, 
      baseUtilization: 68,
      variance: 12,
    },
    { 
      name: 'Banashankari Hub', 
      capacity: 50, 
      baseUtilization: 65,
      variance: 10,
    },
  ];

  return hubs.map(hub => {
    const dailyData = last30Days.map((day, index) => {
      // Add some patterns: weekends slightly lower, mid-week higher
      const dayOfWeek = new Date(day.date).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekendAdjust = isWeekend ? -5 : 0;
      
      // Add some randomness
      const random = (Math.random() - 0.5) * hub.variance;
      
      let utilization = hub.baseUtilization + weekendAdjust + random;
      
      // Ensure within realistic bounds (55%-95%)
      utilization = Math.max(55, Math.min(95, utilization));
      utilization = Math.round(utilization);
      
      const vehiclesAssigned = Math.round((hub.capacity * utilization) / 100);
      
      return {
        date: day.date,
        display: day.display,
        utilization,
        vehiclesAssigned,
        capacity: hub.capacity,
      };
    });

    return {
      hubName: hub.name,
      capacity: hub.capacity,
      dailyData,
      avgUtilization: Math.round(
        dailyData.reduce((sum, d) => sum + d.utilization, 0) / dailyData.length
      ),
    };
  });
};

const hubUtilizationFullData = generateHubUtilizationData();

// Overview Tab Data
const bookingsTrendData = [
  { date: '23 Jan', bookings: 145 },
  { date: '24 Jan', bookings: 167 },
  { date: '25 Jan', bookings: 152 },
  { date: '26 Jan', bookings: 189 },
  { date: '27 Jan', bookings: 178 },
  { date: '28 Jan', bookings: 156 },
  { date: '29 Jan', bookings: 198 },
];

// Use the generated hub data and extract average utilization for the chart
const fleetUtilizationData = hubUtilizationFullData.map(hub => ({
  hub: hub.hubName,
  utilization: hub.avgUtilization,
  capacity: hub.capacity,
  assigned: Math.round((hub.capacity * hub.avgUtilization) / 100),
}));

// Riders Tab Data
const riderRegistrationsTrendData = [
  { date: '23 Jan', riders: 24 },
  { date: '24 Jan', riders: 31 },
  { date: '25 Jan', riders: 28 },
  { date: '26 Jan', riders: 35 },
  { date: '27 Jan', riders: 42 },
  { date: '28 Jan', riders: 38 },
  { date: '29 Jan', riders: 45 },
];

const kycStatusData = [
  { name: 'Verified', value: 1847, color: '#16A34A' },
  { name: 'Pending', value: 342, color: '#F59E0B' },
  { name: 'Rejected', value: 58, color: '#DC2626' },
];

const riderRatingDistributionData = [
  { rating: '1 Star', count: 12 },
  { rating: '2 Stars', count: 28 },
  { rating: '3 Stars', count: 156 },
  { rating: '4 Stars', count: 842 },
  { rating: '5 Stars', count: 1209 },
];

const recentRiders = [
  { name: 'Amit Sharma', phone: '+91 98765 43210', city: 'Bangalore', kyc: 'Verified', rating: 4.8 },
  { name: 'Priya Reddy', phone: '+91 87654 32109', city: 'Bangalore', kyc: 'Pending', rating: 4.2 },
  { name: 'Rohan Kumar', phone: '+91 76543 21098', city: 'Bangalore', kyc: 'Verified', rating: 4.5 },
  { name: 'Sneha Patel', phone: '+91 65432 10987', city: 'Bangalore', kyc: 'Pending', rating: 3.9 },
];

// Hubs Tab Data
const vehiclesPerHubData = [
  { hub: 'Koramangala Hub', vehicles: 85 },
  { hub: 'Indiranagar Hub', vehicles: 72 },
  { hub: 'Whitefield Hub', vehicles: 68 },
  { hub: 'MG Road Hub', vehicles: 54 },
  { hub: 'Jayanagar Hub', vehicles: 48 },
  { hub: 'Banashankari Hub', vehicles: 42 },
];

const hubUtilizationData = [
  { hub: 'Koramangala Hub', utilization: 87 },
  { hub: 'Indiranagar Hub', utilization: 82 },
  { hub: 'Whitefield Hub', utilization: 78 },
  { hub: 'MG Road Hub', utilization: 75 },
  { hub: 'Jayanagar Hub', utilization: 68 },
];

const topHubs = [
  { hub: 'Koramangala Hub', capacity: 100, occupied: 87, utilization: 87 },
  { hub: 'Indiranagar Hub', capacity: 90, occupied: 74, utilization: 82 },
  { hub: 'Whitefield Hub', capacity: 80, occupied: 62, utilization: 78 },
  { hub: 'MG Road Hub', capacity: 70, occupied: 53, utilization: 75 },
];

// Vehicles Tab Data
const vehicleStatusData = [
  { name: 'Available', value: 186, color: '#16A34A' },
  { name: 'In Use', value: 124, color: '#2563EB' },
  { name: 'Maintenance', value: 28, color: '#F59E0B' },
];

const vehiclesByHubData = [
  { hub: 'Koramangala', vehicles: 85 },
  { hub: 'Indiranagar', vehicles: 72 },
  { hub: 'Whitefield', vehicles: 68 },
  { hub: 'MG Road', vehicles: 54 },
  { hub: 'Jayanagar', vehicles: 48 },
];

const recentMaintenanceVehicles = [
  { regNumber: 'KA01AB1234', hub: 'Koramangala Hub', issue: 'Battery Issue', date: '2026-02-05' },
  { regNumber: 'KA01CD5678', hub: 'Indiranagar Hub', issue: 'Brake Service', date: '2026-02-05' },
  { regNumber: 'KA02EF9012', hub: 'Whitefield Hub', issue: 'Tire Replacement', date: '2026-02-04' },
  { regNumber: 'KA03GH3456', hub: 'MG Road Hub', issue: 'General Service', date: '2026-02-04' },
];

// Bookings Tab Data
const bookingTrendData = [
  { date: 'Jan 23', bookings: 145 },
  { date: 'Jan 24', bookings: 167 },
  { date: 'Jan 25', bookings: 152 },
  { date: 'Jan 26', bookings: 189 },
  { date: 'Jan 27', bookings: 178 },
  { date: 'Jan 28', bookings: 196 },
  { date: 'Jan 29', bookings: 203 },
];

const bookingStatusData = [
  { name: 'Active', value: 124, color: '#2563EB' },
  { name: 'Completed', value: 892, color: '#16A34A' },
  { name: 'Cancelled', value: 43, color: '#6B7280' },
];

const revenueTrendData = [
  { date: 'Jan 23', revenue: 52 },
  { date: 'Jan 24', revenue: 61 },
  { date: 'Jan 25', revenue: 58 },
  { date: 'Jan 26', revenue: 68 },
  { date: 'Jan 27', revenue: 72 },
  { date: 'Jan 28', revenue: 78 },
  { date: 'Jan 29', revenue: 84 },
];

const recentBookings = [
  { id: 'BKG-8F2A', rider: 'Amit Sharma', regNumber: 'KA01AB1234', hub: 'Koramangala', status: 'Active' },
  { id: 'BKG-7C1B', rider: 'Priya Reddy', regNumber: 'KA01CD5678', hub: 'Indiranagar', status: 'Completed' },
  { id: 'BKG-6D3E', rider: 'Rohan Kumar', regNumber: 'KA02EF9012', hub: 'Whitefield', status: 'Active' },
  { id: 'BKG-5F4G', rider: 'Sneha Patel', regNumber: 'KA03GH3456', hub: 'MG Road', status: 'Completed' },
];

// Maintenance Tab Data
const maintenanceByCategoryData = [
  { category: 'Battery', count: 12 },
  { category: 'Brakes', count: 8 },
  { category: 'Tires', count: 6 },
  { category: 'General', count: 15 },
  { category: 'Electrical', count: 5 },
];

const maintenanceStatusData = [
  { name: 'Open', value: 18, color: '#F59E0B' },
  { name: 'In Repair', value: 12, color: '#2563EB' },
  { name: 'Closed', value: 156, color: '#16A34A' },
];

const latestMaintenanceRequests = [
  { id: 'MNT-8F2A', vehicle: 'KA01AB1234', issue: 'Battery Issue', status: 'Open', date: '2026-02-05' },
  { id: 'MNT-7C1B', vehicle: 'KA01CD5678', issue: 'Brake Service', status: 'In Repair', date: '2026-02-05' },
  { id: 'MNT-6D3E', vehicle: 'KA02EF9012', issue: 'Tire Replacement', status: 'In Repair', date: '2026-02-04' },
  { id: 'MNT-5F4G', vehicle: 'KA03GH3456', issue: 'General Service', status: 'Closed', date: '2026-02-04' },
];

// Notifications Tab Data
const notificationsTrendData = [
  { date: 'Jan 23', sent: 1245 },
  { date: 'Jan 24', sent: 1567 },
  { date: 'Jan 25', sent: 1342 },
  { date: 'Jan 26', sent: 1689 },
  { date: 'Jan 27', sent: 1478 },
  { date: 'Jan 28', sent: 1756 },
  { date: 'Jan 29', sent: 1834 },
];

const notificationChannelData = [
  { name: 'Push', value: 4567, color: '#2563EB' },
  { name: 'SMS', value: 2341, color: '#F59E0B' },
  { name: 'Email', value: 1892, color: '#16A34A' },
];

// ========== MAIN COMPONENT ==========

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [showDateMenu, setShowDateMenu] = useState(false);

  const dateRangeOptions = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'Last 14 Days',
    'Last 30 Days',
    'This Month',
    'Custom Range',
  ];

  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-8">
        {/* Header with Date Range Filter */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
              Dashboard
            </h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              System overview and operational KPIs
            </p>
          </div>
          
          {/* Date Range Filter */}
          <div className="relative">
            <button
              onClick={() => setShowDateMenu(!showDateMenu)}
              className="flex items-center gap-2 px-4 transition-colors"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
                fontSize: '14px',
                fontWeight: '400',
                color: '#111111',
                minWidth: '200px',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" style={{ color: '#6B7280' }} />
                <span>{dateRange}</span>
              </div>
              <ChevronDown className="w-4 h-4" style={{ color: '#6B7280' }} />
            </button>

            {/* Dropdown Menu */}
            {showDateMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDateMenu(false)}
                />
                <div
                  className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-20"
                  style={{
                    border: '1px solid #E5E7EB',
                    minWidth: '200px',
                  }}
                >
                  {dateRangeOptions.map((option, index) => (
                    <button
                      key={option}
                      onClick={() => {
                        setDateRange(option);
                        setShowDateMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 transition-colors"
                      style={{
                        fontSize: '14px',
                        color: dateRange === option ? '#F24E1E' : '#111111',
                        backgroundColor: dateRange === option ? '#FFF1EC' : 'transparent',
                        fontWeight: dateRange === option ? '500' : '400',
                        borderBottom: index < dateRangeOptions.length - 1 ? '1px solid #F1F5F9' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (dateRange !== option) {
                          e.currentTarget.style.backgroundColor = '#F7F9FC';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (dateRange !== option) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Module Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max" style={{ borderBottom: '2px solid #E5E7EB' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isScooterIcon = Icon === ScooterIcon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-3 transition-colors relative"
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
                  {isScooterIcon ? (
                    <Icon className="w-4 h-4" isActive={isActive} />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'riders' && <RidersTab />}
        {activeTab === 'hubs' && <HubsTab />}
        {activeTab === 'vehicles' && <VehiclesTab />}
        {activeTab === 'bookings' && <BookingsTab />}
        {activeTab === 'maintenance' && <MaintenanceTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
      </div>
    </div>
  );
}

// ========== OVERVIEW TAB ==========

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Riders" value="1,247" icon={Users} />
        <KPICard title="Vehicles Available Now" value="186" icon={ScooterIcon} />
        <KPICard title="Active Bookings" value="124" icon={Calendar} />
        <KPICard title="Revenue (Selected Range)" value="₹4.2L" icon={IndianRupee} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Bookings — Last 7 Days">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={bookingsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#F24E1E"
                strokeWidth={2}
                dot={{ fill: '#F24E1E', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Fleet Utilization by Hub">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={fleetUtilizationData} layout="horizontal" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                type="category"
                dataKey="hub"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                width={150}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                  padding: '8px 12px',
                }}
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div style={{ 
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '13px'
                      }}>
                        <div style={{ fontWeight: '600', marginBottom: '4px', color: '#111111' }}>{data.hub}</div>
                        <div style={{ marginBottom: '4px', color: '#6B7280' }}>
                          <strong>Utilization:</strong> {data.utilization}%
                        </div>
                        <div style={{ marginBottom: '4px', color: '#6B7280' }}>
                          <strong>Assigned:</strong> {data.assigned} scooters
                        </div>
                        <div style={{ color: '#6B7280' }}>
                          <strong>Capacity:</strong> {data.capacity} scooters
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="utilization" 
                fill="#F24E1E" 
                radius={[0, 4, 4, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// ========== RIDERS TAB ==========

function RidersTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total Riders" value="2,247" icon={Users} />
        <KPICard title="New Riders (Range)" value="243" icon={TrendingUp} />
        <KPICard title="KYC Pending" value="342" icon={Clock} />
        <KPICard title="Suspended Riders" value="18" icon={AlertTriangle} />
        <KPICard title="Avg Rider Rating" value="4.3" icon={Star} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Rider Registrations Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={riderRegistrationsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Line
                type="monotone"
                dataKey="riders"
                stroke="#F24E1E"
                strokeWidth={2}
                dot={{ fill: '#F24E1E', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="KYC Status Split">
          <DonutChart data={kycStatusData} />
        </ChartCard>
      </div>

      {/* Rider Rating Distribution */}
      <ChartCard title="Rider Rating Distribution">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={riderRatingDistributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="rating"
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '13px',
              }}
            />
            <Bar dataKey="count" fill="#F24E1E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recently Registered Riders Table */}
      <TableCard title="Recently Registered Riders">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F7F9FC' }}>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>NAME</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>PHONE</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>CITY</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>KYC</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>RATING</th>
            </tr>
          </thead>
          <tbody>
            {recentRiders.map((rider, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{rider.name}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{rider.phone}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{rider.city}</td>
                <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: rider.kyc === 'Verified' ? '#DCFCE7' : '#FEF3C7',
                      color: rider.kyc === 'Verified' ? '#16A34A' : '#F59E0B',
                    }}
                  >
                    {rider.kyc}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>⭐ {rider.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

// ========== HUBS TAB ==========

function HubsTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Hubs" value="12" icon={MapPin} />
        <KPICard title="Active Hubs" value="11" icon={CheckCircle} />
        <KPICard title="Total Capacity" value="960" icon={BarChart3} />
        <KPICard title="Current Vehicles Assigned" value="369" icon={ScooterIcon} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Vehicles per Hub">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={vehiclesPerHubData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="hub"
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="vehicles" fill="#F24E1E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Hub Utilization %">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={hubUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="hub"
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="utilization" fill="#F24E1E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top Utilized Hubs Table */}
      <TableCard title="Top Utilized Hubs">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F7F9FC' }}>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>HUB NAME</th>
              <th className="px-4 py-3 text-right" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>CAPACITY</th>
              <th className="px-4 py-3 text-right" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>OCCUPIED</th>
              <th className="px-4 py-3 text-right" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>UTILIZATION</th>
            </tr>
          </thead>
          <tbody>
            {topHubs.map((hub, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{hub.hub}</td>
                <td className="px-4 py-3 text-right" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{hub.capacity}</td>
                <td className="px-4 py-3 text-right" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{hub.occupied}</td>
                <td className="px-4 py-3 text-right" style={{ fontSize: '13px', fontWeight: '500', color: '#F24E1E', whiteSpace: 'nowrap' }}>{hub.utilization}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

// ========== VEHICLES TAB ==========

function VehiclesTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Vehicles" value="338" icon={ScooterIcon} />
        <KPICard title="Available" value="186" icon={CheckCircle} />
        <KPICard title="In Use" value="124" icon={Calendar} />
        <KPICard title="Under Maintenance" value="28" icon={Wrench} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Vehicle Status Split">
          <DonutChart data={vehicleStatusData} />
        </ChartCard>

        <ChartCard title="Vehicles by Hub">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={vehiclesByHubData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="hub"
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="vehicles" fill="#F24E1E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Vehicles Recently Marked Maintenance */}
      <TableCard title="Vehicles Recently Marked Maintenance">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F7F9FC' }}>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>REGISTRATION NUMBER</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>HUB</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>ISSUE</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {recentMaintenanceVehicles.map((vehicle, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td className="px-4 py-3" style={{ fontSize: '13px', fontWeight: '500', color: '#111111', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{vehicle.regNumber}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{vehicle.hub}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{vehicle.issue}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap' }}>{vehicle.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

// ========== BOOKINGS TAB ==========

function BookingsTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Bookings (Range)" value="1,059" icon={Calendar} />
        <KPICard title="Active Bookings" value="124" icon={Clock} />
        <KPICard title="Completed" value="892" icon={CheckCircle} />
        <KPICard title="Cancelled" value="43" icon={XCircle} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Booking Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={bookingTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#F24E1E"
                strokeWidth={2}
                dot={{ fill: '#F24E1E', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Booking Status Split">
          <DonutChart data={bookingStatusData} />
        </ChartCard>
      </div>

      {/* Revenue Trend */}
      <ChartCard title="Revenue Trend">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={revenueTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '13px',
              }}
              formatter={(value) => `₹${value}K`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16A34A"
              strokeWidth={2}
              dot={{ fill: '#16A34A', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recent Bookings Table */}
      <TableCard title="Recent Bookings">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F7F9FC' }}>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>BOOKING ID</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>RIDER</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>REG NUMBER</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>HUB</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td className="px-4 py-3" style={{ fontSize: '13px', fontWeight: '500', color: '#111111', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{booking.id}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{booking.rider}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', fontWeight: '500', color: '#111111', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{booking.regNumber}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{booking.hub}</td>
                <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: booking.status === 'Active' ? '#DBEAFE' : '#DCFCE7',
                      color: booking.status === 'Active' ? '#2563EB' : '#16A34A',
                    }}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

// ========== MAINTENANCE TAB ==========

function MaintenanceTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Open Maintenance Requests" value="18" icon={AlertTriangle} />
        <KPICard title="In Repair" value="12" icon={Wrench} />
        <KPICard title="Closed" value="156" icon={CheckCircle} />
        <KPICard title="Avg Resolution Time" value="2.4d" icon={Clock} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Maintenance by Category">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={maintenanceByCategoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="count" fill="#F24E1E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Maintenance Status Split">
          <DonutChart data={maintenanceStatusData} />
        </ChartCard>
      </div>

      {/* Latest Maintenance Requests Table */}
      <TableCard title="Latest Maintenance Requests">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F7F9FC' }}>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>REQUEST ID</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>VEHICLE</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>ISSUE</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>STATUS</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280' }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {latestMaintenanceRequests.map((request, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td className="px-4 py-3" style={{ fontSize: '13px', fontWeight: '500', color: '#111111', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{request.id}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', fontWeight: '500', color: '#111111', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{request.vehicle}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>{request.issue}</td>
                <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor:
                        request.status === 'Open'
                          ? '#FEF3C7'
                          : request.status === 'In Repair'
                          ? '#DBEAFE'
                          : '#DCFCE7',
                      color:
                        request.status === 'Open'
                          ? '#F59E0B'
                          : request.status === 'In Repair'
                          ? '#2563EB'
                          : '#16A34A',
                    }}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap' }}>{request.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

// ========== NOTIFICATIONS TAB ==========

function NotificationsTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Campaigns Sent" value="8,800" icon={Bell} />
        <KPICard title="Active Campaigns" value="3" icon={TrendingUp} />
        <KPICard title="Failed Deliveries" value="142" icon={XCircle} />
        <KPICard title="Scheduled" value="5" icon={Clock} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Notifications Sent Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={notificationsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Line
                type="monotone"
                dataKey="sent"
                stroke="#F24E1E"
                strokeWidth={2}
                dot={{ fill: '#F24E1E', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Channel Split">
          <DonutChart data={notificationChannelData} />
        </ChartCard>
      </div>
    </div>
  );
}

// ========== REUSABLE UI COMPONENTS ==========

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ElementType;
}

function KPICard({ title, value, icon: Icon }: KPICardProps) {
  const isScooterIcon = Icon === ScooterIcon;
  
  return (
    <div
      className="bg-white p-6"
      style={{
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        borderRadius: '6px',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{ backgroundColor: '#FFF1EC', borderRadius: '6px' }}
        >
          {isScooterIcon ? (
            <Icon className="w-5 h-5" style={{ color: '#F24E1E' }} isActive={true} />
          ) : (
            <Icon className="w-5 h-5" style={{ color: '#F24E1E' }} />
          )}
        </div>
      </div>
      <div className="mb-2">
        <span
          style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#111111',
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </span>
      </div>
      <p style={{ fontSize: '14px', color: '#6B7280' }}>{title}</p>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div
      className="bg-white"
      style={{
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        borderRadius: '6px',
      }}
    >
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111111' }}>
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

interface TableCardProps {
  title: string;
  children: React.ReactNode;
}

function TableCard({ title, children }: TableCardProps) {
  return (
    <div
      className="bg-white overflow-hidden"
      style={{
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        borderRadius: '6px',
      }}
    >
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111111' }}>
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

interface DonutChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

function DonutChart({ data }: DonutChartProps) {
  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '13px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span style={{ fontSize: '13px', color: '#6B7280' }}>{item.name}</span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}