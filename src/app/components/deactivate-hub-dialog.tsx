import { useState } from 'react';
import { X, AlertTriangle, MapPin, Car, Users } from 'lucide-react';

interface Hub {
  id: string;
  name: string;
  code: string;
  city: string;
  managerName: string;
  currentVehicles: number;
  staffCount: number;
}

interface DeactivateHubDialogProps {
  hub: Hub;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function DeactivateHubDialog({ hub, onClose, onConfirm }: DeactivateHubDialogProps) {
  const [reason, setReason] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim() && acknowledged) {
      onConfirm(reason);
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

      {/* Dialog */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl overflow-hidden z-50"
        style={{
          width: '560px',
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
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
              }}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
              Deactivate Hub
            </h2>
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
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Warning Message */}
            <div
              className="flex gap-3 p-4 rounded-lg"
              style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#DC2626' }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#991B1B', marginBottom: '8px' }}>
                  Deactivating this hub will:
                </p>
                <ul style={{ fontSize: '13px', color: '#991B1B', paddingLeft: '20px', listStyle: 'disc', lineHeight: '1.6' }}>
                  <li>Prevent new vehicle allocations to this hub</li>
                  <li>Block new bookings from this location</li>
                  <li>Require existing vehicle reassignment</li>
                  <li>Impact staff assignments and operations</li>
                </ul>
              </div>
            </div>

            {/* Hub Summary Card */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
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
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    {hub.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B7280' }}>
                    {hub.code} • {hub.city}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                    Manager
                  </p>
                  <p style={{ fontSize: '13px', color: '#111111' }}>
                    {hub.managerName}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                    Active Vehicles
                  </p>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" style={{ color: '#F24E1E' }} />
                    <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                      {hub.currentVehicles}
                    </p>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                    Staff Count
                  </p>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" style={{ color: '#2563EB' }} />
                    <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                      {hub.staffCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reason Input */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Reason for Deactivation <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <textarea
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Provide a reason for deactivating this hub..."
                rows={4}
                className="w-full px-3 py-2 resize-none"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  color: '#111111',
                }}
              />
              <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                This will be recorded in the hub activity log
              </p>
            </div>

            {/* Acknowledgement Checkbox */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acknowledge-impact"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#DC2626', cursor: 'pointer' }}
                />
                <label
                  htmlFor="acknowledge-impact"
                  style={{ fontSize: '13px', color: '#991B1B', cursor: 'pointer', lineHeight: '1.5' }}
                >
                  <strong>I understand the operational impact</strong> of deactivating this hub and confirm that all necessary reassignments will be handled.
                </label>
              </div>
            </div>

            {/* Additional Warning */}
            {hub.currentVehicles > 0 && (
              <div
                className="flex items-start gap-3 p-4 rounded-lg"
                style={{ backgroundColor: '#FFF7ED', border: '1px solid #FDBA74' }}
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '500', color: '#92400E', marginBottom: '4px' }}>
                    Active Vehicles Detected
                  </p>
                  <p style={{ fontSize: '12px', color: '#92400E', lineHeight: '1.5' }}>
                    This hub currently has {hub.currentVehicles} active vehicle{hub.currentVehicles !== 1 ? 's' : ''}. Please ensure all vehicles are reassigned before deactivation to avoid operational disruption.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-end gap-3 px-6 py-4"
            style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}
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
              disabled={!reason.trim() || !acknowledged}
              className="flex items-center gap-2 px-4 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#DC2626',
                fontSize: '14px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#B91C1C')}
              onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#DC2626')}
            >
              <AlertTriangle className="w-4 h-4" />
              Deactivate Hub
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
