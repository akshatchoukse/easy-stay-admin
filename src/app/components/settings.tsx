import { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Database, 
  Mail, 
  ShieldCheck, 
  Save,
  CheckCircle,
} from 'lucide-react';

export function Settings() {
  const [activeCategory, setActiveCategory] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  const categories = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Lock },
    { id: 'system', label: 'System Config', icon: Database },
    { id: 'communications', label: 'Communications', icon: Mail },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#F7F9FC', minHeight: '100%' }}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-semibold" style={{ fontSize: '24px', color: '#111111' }}>
            System Settings
          </h1>
          <p className="mt-1" style={{ fontSize: '14px', color: '#6B7280' }}>
            Manage your administrative preferences and system configurations
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 text-white transition-all shadow-sm"
          style={{
            height: '42px',
            borderRadius: '10px',
            backgroundColor: isSaved ? '#16A34A' : '#F24E1E',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          {isSaved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Changes Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save All Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar categories */}
        <div className="md:col-span-1 space-y-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? '#F24E1E' : '#6B7280',
                  backgroundColor: isActive ? 'white' : 'transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F24E1E]' : 'text-[#6B7280]'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className="md:col-span-3 bg-white rounded-2xl p-8 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
          {activeCategory === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md" style={{ backgroundColor: '#F24E1E' }}>
                  SA
                </div>
                <div>
                   <h3 className="font-semibold text-lg" style={{ color: '#111111' }}>Super Admin</h3>
                   <p className="text-gray-500 text-sm">Full System Access</p>
                   <button className="mt-2 text-[#F24E1E] text-sm font-semibold">Change Avatar</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Super Admin"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F24E1E]/20 focus:border-[#F24E1E] text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="admin@bhago.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F24E1E]/20 focus:border-[#F24E1E] text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F24E1E]/20 focus:border-[#F24E1E] text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Language Prefix</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F24E1E]/20 focus:border-[#F24E1E] text-sm">
                    <option>English (US)</option>
                    <option>Hindi (In)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'notifications' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg pb-4 border-b border-gray-100">Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'System Alerts (Critical)', desc: 'Immediate push notifications for downtime' },
                  { label: 'Booking Confirmation', desc: 'Notify me when new bookings are active' },
                  { label: 'Vehicle Battery Low', desc: 'Notifications for vehicles with battery < 20%' },
                  { label: 'Review Reminders', desc: 'Daily summary for pending KYC verifications' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F24E1E]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === 'security' && (
             <div className="space-y-6">
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-4">
                   <ShieldCheck className="w-5 h-5 text-[#F24E1E] mt-1" />
                   <div>
                      <h4 className="font-semibold text-sm" style={{ color: '#C2410C' }}>Enhanced Security Active</h4>
                      <p className="text-xs text-[#C2410C]">2-Factor Authentication is currently enabled for this account.</p>
                   </div>
                </div>

                <div className="space-y-4 pt-4">
                   <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                      <p className="font-medium text-sm">Change Access Password</p>
                      <p className="text-xs text-gray-500">Last changed 4 months ago</p>
                   </button>
                   <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                      <p className="font-medium text-sm">Manage API Keys</p>
                      <p className="text-xs text-gray-500">3 active keys in production</p>
                   </button>
                   <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                      <p className="font-medium text-sm text-red-600">Terminate Active Sessions</p>
                      <p className="text-xs text-red-400">Logout from all other devices</p>
                   </button>
                </div>
             </div>
          )}

          {activeCategory === 'system' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg pb-4 border-b border-gray-100">Global Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                 <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Maintenance Threshold (km)</label>
                   <input type="number" defaultValue={5000} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Default Booking Buffer (min)</label>
                   <input type="number" defaultValue={15} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Active Bookings Per Rider</label>
                   <input type="number" defaultValue={1} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Auto-Refresh Interval (sec)</label>
                   <input type="number" defaultValue={30} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                 </div>
              </div>
            </div>
          )}

          {activeCategory === 'communications' && (
             <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                   <Mail className="w-8 h-8 text-gray-300" />
                </div>
                <h4 className="font-medium text-gray-900">Email Templates Coming Soon</h4>
                <p className="text-sm text-gray-500 max-w-xs mt-2">The communication management module is currently under active development.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
