import { X, MapPin, Clock, Car, Users, Phone, Mail, Edit } from 'lucide-react';

interface Hub {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  managerName: string;
  managerAvatar?: string;
  contactPhone: string;
  vehicleCapacity: number;
  currentVehicles: number;
  staffCount: number;
  operatingHours: string;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
}

interface HubDetailModalProps {
  hub: Hub;
  onClose: () => void;
  onEdit: () => void;
}

export function HubDetailModal({ hub, onClose, onEdit }: HubDetailModalProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Active') {
      return {
        backgroundColor: '#DCFCE7',
        color: '#16A34A',
        border: '1px solid #16A34A',
      };
    }
    return {
      backgroundColor: '#FEE2E2',
      color: '#DC2626',
      border: '1px solid #DC2626',
    };
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl overflow-hidden z-50"
        style={{
          width: '720px',
          maxHeight: '90vh',
          border: '1px solid #E5E7EB',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
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
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                {hub.name}
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                {hub.code}
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

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <div className="p-6">
            {/* Status */}
            <div className="mb-6">
              <span
                className="px-3 py-1.5 rounded-full inline-block"
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  ...getStatusColor(hub.status),
                }}
              >
                {hub.status}
              </span>
            </div>

            {/* Hub Information */}
            <div className="mb-6">
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Hub Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Hub Name
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111' }}>
                    {hub.name}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Hub Code
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111' }}>
                    {hub.code}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    City
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111' }}>
                    {hub.city}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Operating Hours
                  </label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#6B7280' }} />
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {hub.operatingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Location
              </h3>
              <div className="mb-4">
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Address
                </label>
                <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.5' }}>
                  {hub.address}
                </p>
              </div>
              {/* Map Preview Placeholder */}
              <div
                className="rounded-lg flex items-center justify-center"
                style={{
                  height: '180px',
                  backgroundColor: '#F7F9FC',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#F24E1E' }} />
                  <p style={{ fontSize: '13px', color: '#6B7280' }}>
                    Map Preview
                  </p>
                </div>
              </div>
            </div>

            {/* Capacity & Utilization */}
            <div className="mb-6">
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Capacity & Utilization
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="w-4 h-4" style={{ color: '#F24E1E' }} />
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Vehicle Capacity
                    </span>
                  </div>
                  <p style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                    {hub.vehicleCapacity}
                  </p>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="w-4 h-4" style={{ color: '#16A34A' }} />
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Current Vehicles
                    </span>
                  </div>
                  <p style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                    {hub.currentVehicles}
                  </p>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4" style={{ color: '#2563EB' }} />
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                      Staff Count
                    </span>
                  </div>
                  <p style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
                    {hub.staffCount}
                  </p>
                </div>
              </div>

              {/* Utilization Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                    Capacity Utilization
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#111111' }}>
                    {Math.round((hub.currentVehicles / hub.vehicleCapacity) * 100)}%
                  </span>
                </div>
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{ height: '8px', backgroundColor: '#E5E7EB' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(hub.currentVehicles / hub.vehicleCapacity) * 100}%`,
                      backgroundColor: (hub.currentVehicles / hub.vehicleCapacity) >= 0.9 ? '#DC2626' : 
                                      (hub.currentVehicles / hub.vehicleCapacity) >= 0.7 ? '#F59E0B' : '#16A34A',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Assigned Manager */}
            <div className="mb-6">
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Assigned Manager
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
                </div>
              </div>
            </div>

            {/* Audit Information */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Audit Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Last Updated
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111' }}>
                    {new Date(hub.lastUpdated).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Hub ID
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111' }}>
                    {hub.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4"
          style={{ borderTop: '1px solid #E5E7EB' }}
        >
          <button
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
            Close
          </button>
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
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
          >
            <Edit className="w-4 h-4" />
            Edit Hub
          </button>
        </div>
      </div>
    </>
  );
}