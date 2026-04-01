import { useState } from 'react';
import { X, Save, UserCog, Phone, Mail, Calendar, AlertCircle } from 'lucide-react';

interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  hubCount: number;
  available: boolean;
}

interface Hub {
  id: string;
  name: string;
  managerName: string;
  contactPhone: string;
}

interface ReassignManagerDrawerProps {
  hub: Hub;
  onClose: () => void;
  onSave: (managerId: string, effectiveDate: string, notifyManager: boolean) => void;
}

// Mock managers data
const availableManagers: Manager[] = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh.kumar@bhagomobility.com', phone: '+91 98765 43210', hubCount: 2, available: true },
  { id: '2', name: 'Priya Sharma', email: 'priya.sharma@bhagomobility.com', phone: '+91 98765 43211', hubCount: 1, available: true },
  { id: '3', name: 'Amit Patel', email: 'amit.patel@bhagomobility.com', phone: '+91 98765 43212', hubCount: 3, available: false },
  { id: '4', name: 'Sneha Reddy', email: 'sneha.reddy@bhagomobility.com', phone: '+91 98765 43213', hubCount: 1, available: true },
  { id: '5', name: 'Vikram Singh', email: 'vikram.singh@bhagomobility.com', phone: '+91 98765 43214', hubCount: 2, available: true },
  { id: '6', name: 'Anita Desai', email: 'anita.desai@bhagomobility.com', phone: '+91 98765 43215', hubCount: 0, available: true },
  { id: '7', name: 'Rohit Malhotra', email: 'rohit.malhotra@bhagomobility.com', phone: '+91 98765 43216', hubCount: 2, available: true },
  { id: '8', name: 'Kavita Jain', email: 'kavita.jain@bhagomobility.com', phone: '+91 98765 43217', hubCount: 1, available: true },
];

export function ReassignManagerDrawer({ hub, onClose, onSave }: ReassignManagerDrawerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [notifyManager, setNotifyManager] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredManagers = availableManagers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedManager = availableManagers.find(m => m.id === selectedManagerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedManagerId) {
      onSave(selectedManagerId, effectiveDate, notifyManager);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full bg-white overflow-hidden flex flex-col z-50"
        style={{
          width: '560px',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FFF1EC',
                color: '#F24E1E',
              }}
            >
              <UserCog className="w-5 h-5" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                Reassign Hub Manager
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                {hub.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-5 h-5" style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} id="reassign-manager-form">
            <div className="p-6 space-y-6">
              {/* Info Note */}
              <div
                className="flex gap-3 p-4 rounded-lg"
                style={{ backgroundColor: '#FFF7ED', border: '1px solid #FDBA74' }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
                <p style={{ fontSize: '13px', color: '#92400E', lineHeight: '1.5' }}>
                  Reassignment will transfer hub operational responsibility. All active vehicle assignments and staff mappings will be transferred to the new manager.
                </p>
              </div>

              {/* Current Manager Section */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Current Manager
                </h3>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#2563EB',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      {getInitials(hub.managerName)}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        {hub.managerName}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>
                        Hub Manager
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '13px', color: '#6B7280' }}>
                        {hub.contactPhone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '13px', color: '#6B7280' }}>
                        {hub.managerName.toLowerCase().replace(' ', '.')}@bhagomobility.com
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '13px', color: '#6B7280' }}>
                        Assigned since 15 Jan 2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Manager Selection */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  New Manager Selection
                </h3>
                <div className="space-y-4">
                  {/* Search */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Search Staff
                    </label>
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>

                  {/* Manager List */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Select Manager <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <div
                      className="rounded-lg overflow-hidden"
                      style={{ border: '1px solid #E5E7EB', maxHeight: '300px', overflowY: 'auto' }}
                    >
                      {filteredManagers.length === 0 ? (
                        <div className="text-center py-8">
                          <p style={{ fontSize: '14px', color: '#6B7280' }}>
                            No managers found
                          </p>
                        </div>
                      ) : (
                        filteredManagers.map((manager, index) => (
                          <div
                            key={manager.id}
                            className="cursor-pointer"
                            style={{
                              borderBottom: index < filteredManagers.length - 1 ? '1px solid #F1F5F9' : 'none',
                            }}
                            onClick={() => setSelectedManagerId(manager.id)}
                          >
                            <div
                              className="p-3 transition-colors"
                              style={{
                                backgroundColor: selectedManagerId === manager.id ? '#FFF1EC' : 'white',
                              }}
                              onMouseEnter={(e) => {
                                if (selectedManagerId !== manager.id) {
                                  e.currentTarget.style.backgroundColor = '#F7F9FC';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (selectedManagerId !== manager.id) {
                                  e.currentTarget.style.backgroundColor = 'white';
                                }
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="flex items-center justify-center rounded-full flex-shrink-0"
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: '#2563EB',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                  }}
                                >
                                  {getInitials(manager.name)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                                      {manager.name}
                                    </p>
                                    {manager.available ? (
                                      <span
                                        className="px-2 py-0.5 rounded-full"
                                        style={{
                                          fontSize: '11px',
                                          fontWeight: '500',
                                          backgroundColor: '#DCFCE7',
                                          color: '#16A34A',
                                        }}
                                      >
                                        Available
                                      </span>
                                    ) : (
                                      <span
                                        className="px-2 py-0.5 rounded-full"
                                        style={{
                                          fontSize: '11px',
                                          fontWeight: '500',
                                          backgroundColor: '#FEE2E2',
                                          color: '#DC2626',
                                        }}
                                      >
                                        Busy
                                      </span>
                                    )}
                                  </div>
                                  <p style={{ fontSize: '12px', color: '#6B7280' }}>
                                    Currently managing {manager.hubCount} hub{manager.hubCount !== 1 ? 's' : ''}
                                  </p>
                                </div>
                                <input
                                  type="radio"
                                  name="manager"
                                  checked={selectedManagerId === manager.id}
                                  onChange={() => setSelectedManagerId(manager.id)}
                                  style={{ width: '16px', height: '16px', accentColor: '#F24E1E' }}
                                />
                              </div>
                              {manager.hubCount >= 3 && (
                                <div
                                  className="mt-2 flex items-start gap-2 p-2 rounded"
                                  style={{ backgroundColor: '#FFF7ED' }}
                                >
                                  <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                                  <p style={{ fontSize: '11px', color: '#92400E' }}>
                                    This manager already handles multiple hubs. Consider workload impact.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Options
                </h3>
                <div className="space-y-4">
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Effective From <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="notify-manager"
                      checked={notifyManager}
                      onChange={(e) => setNotifyManager(e.target.checked)}
                      style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#F24E1E' }}
                    />
                    <label htmlFor="notify-manager" style={{ fontSize: '14px', color: '#111111', cursor: 'pointer' }}>
                      Notify manager via email
                      <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                        Send assignment notification to the new manager
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Selected Manager Preview */}
              {selectedManager && (
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#F0FDF4', border: '1px solid #86EFAC' }}
                >
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#166534', marginBottom: '8px' }}>
                    Selected Manager
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#2563EB',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {getInitials(selectedManager.name)}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        {selectedManager.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>
                        {selectedManager.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer - Fixed */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0"
          style={{ borderTop: '1px solid #E5E7EB', backgroundColor: 'white' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-4 transition-colors"
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
            Cancel
          </button>
          <button
            type="submit"
            form="reassign-manager-form"
            disabled={!selectedManagerId}
            className="flex items-center gap-2 px-4 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#F24E1E',
              fontSize: '14px',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#D84315')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F24E1E')}
          >
            <Save className="w-4 h-4" />
            Confirm Reassignment
          </button>
        </div>
      </div>
    </>
  );
}