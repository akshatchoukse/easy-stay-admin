import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Filter,
  FileText,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  IndianRupee,
  Users,
  ScooterIcon
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 450000, target: 400000 },
  { month: 'Feb', revenue: 520000, target: 450000 },
  { month: 'Mar', revenue: 480000, target: 500000 },
  { month: 'Apr', revenue: 610000, target: 550000 },
  { month: 'May', revenue: 590000, target: 600000 },
  { month: 'Jun', revenue: 720000, target: 650000 },
];

const vehicleUtilization = [
  { name: 'In Use', value: 65, color: '#F24E1E' },
  { name: 'Available', value: 25, color: '#16A34A' },
  { name: 'Maintenance', value: 10, color: '#F59E0B' },
];

const cityPerformance = [
  { city: 'Bangalore', bookings: 1240, growth: 12 },
  { city: 'Mumbai', bookings: 850, growth: 8 },
  { city: 'Delhi', bookings: 620, growth: -3 },
  { city: 'Pune', bookings: 430, growth: 15 },
];

export function Reports() {
  const [reportType, setReportType] = useState('financial');

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#F7F9FC', minHeight: '100%' }}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-semibold" style={{ fontSize: '24px', color: '#111111' }}>
            Reports & Analytics
          </h1>
          <p className="mt-1" style={{ fontSize: '14px', color: '#6B7280' }}>
            Detailed insights and operational growth metrics
          </p>
        </div>
        <div className="flex gap-3">
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
          >
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button
            className="flex items-center gap-2 px-4 text-white transition-colors"
            style={{
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#F24E1E',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Selector */}
      <div className="flex gap-1 p-1 bg-white rounded-lg inline-flex" style={{ border: '1px solid #E5E7EB' }}>
        {['financial', 'operational', 'growth'].map((type) => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className="px-4 py-2 rounded-md transition-colors capitalize"
            style={{
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: reportType === type ? '#FFF1EC' : 'transparent',
              color: reportType === type ? '#F24E1E' : '#6B7280',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold" style={{ fontSize: '16px', color: '#111111' }}>Revenue vs Target</h3>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F24E1E' }} />
                 <span style={{ fontSize: '12px', color: '#6B7280' }}>Revenue</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E5E7EB' }} />
                 <span style={{ fontSize: '12px', color: '#6B7280' }}>Target</span>
               </div>
            </div>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip cursor={{ fill: '#F7F9FC' }} />
                <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#F24E1E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Small Charts */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E5E7EB' }}>
            <h3 className="font-semibold mb-4" style={{ fontSize: '16px', color: '#111111' }}>Fleet Status</h3>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleUtilization}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vehicleUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ fontSize: '16px', color: '#111111' }}>Quick Stats</h3>
              <TrendingUp className="w-4 h-4" style={{ color: '#16A34A' }} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Avg. Order Value</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>₹1,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Customer LTV</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>₹12,800</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Retention Rate</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* City Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <h3 className="font-semibold" style={{ fontSize: '16px', color: '#111111' }}>Performance by City</h3>
        </div>
        <table className="w-full">
          <thead style={{ backgroundColor: '#F7F9FC' }}>
            <tr>
              <th className="px-6 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>CITY</th>
              <th className="px-6 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>TOTAL BOOKINGS</th>
              <th className="px-6 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>M-o-M GROWTH</th>
              <th className="px-6 py-3 text-right" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cityPerformance.map((city, index) => (
              <tr key={city.city} style={{ borderBottom: index < cityPerformance.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-6 py-4" style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>{city.city}</td>
                <td className="px-6 py-4" style={{ fontSize: '14px', color: '#6B7280' }}>{city.bookings.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1" style={{ color: city.growth > 0 ? '#16A34A' : '#DC2626' }}>
                    {city.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 transform rotate-180" />}
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{Math.abs(city.growth)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button style={{ color: '#F24E1E', fontSize: '13px', fontWeight: '500' }}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
