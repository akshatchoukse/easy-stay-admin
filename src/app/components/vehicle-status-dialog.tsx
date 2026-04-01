import { useState } from 'react';
import { X, AlertTriangle, Wrench, BanIcon, Car } from 'lucide-react';

interface Vehicle {
  id: string;
  registrationNumber: string;
  model: string;
}

interface VehicleStatusDialogProps {
  vehicle: Vehicle;
  action: 'down' | 'deactivate' | 'block';
  onClose: () => void;
  onConfirm: (reason: string, effectiveDate: string) => void;
}

export function VehicleStatusDialog({ vehicle, action, onClose, onConfirm }: VehicleStatusDialogProps) {
  const [reason, setReason] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [acknowledged, setAcknowledged] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim() && acknowledged) {
      onConfirm(reason, effectiveDate);
    }
  };

  const getActionConfig = () => {
    switch (action) {
      case 'down':
        return {
          title: 'Mark Vehicle Down',
          icon: Wrench,
          color: '#F59E0B',
          bgColor: '#FEF3C7',
          borderColor: '#FDBA74',
          warningBg: '#FFF7ED',
          impacts: [
            'Vehicle will be removed from allocatable inventory',
            'All active bookings will need to be reassigned',
            'Maintenance team will be notified',
            'Vehicle will remain at current hub location',
          ],
          buttonText: 'Mark Down',
          buttonBg: '#F59E0B',
          buttonHoverBg: '#D97706',
        };
      case 'deactivate':
        return {
          title: 'Deactivate Vehicle',
          icon: BanIcon,
          color: '#DC2626',
          bgColor: '#FEE2E2',
          borderColor: '#FCA5A5',
          warningBg: '#FEF2F2',
          impacts: [
            'Vehicle will be permanently removed from active fleet',
            'Cannot be allocated for any bookings',
            'Hub assignment will be cleared',
            'Historical data will be retained for records',
          ],
          buttonText: 'Deactivate Vehicle',
          buttonBg: '#DC2626',
          buttonHoverBg: '#B91C1C',
        };
      case 'block':
        return {
          title: 'Block Vehicle',
          icon: AlertTriangle,
          color: '#DC2626',
          bgColor: '#FEE2E2',
          borderColor: '#FCA5A5',
          warningBg: '#FEF2F2',
          impacts: [
            'Vehicle will be temporarily blocked from allocation',
            'Existing bookings may continue',
            'No new bookings can be assigned',
            'Vehicle remains in hub inventory',
          ],
          buttonText: 'Block Vehicle',
          buttonBg: '#DC2626',
          buttonHoverBg: '#B91C1C',
        };
      default:
        return {
          title: 'Change Status',
          icon: AlertTriangle,
          color: '#6B7280',
          bgColor: '#F3F4F6',
          borderColor: '#E5E7EB',
          warningBg: '#F7F9FC',
          impacts: [],
          buttonText: 'Confirm',
          buttonBg: '#6B7280',
          buttonHoverBg: '#4B5563',
        };
    }
  };

  const config = getActionConfig();
  const Icon = config.icon;

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
                backgroundColor: config.bgColor,
                color: config.color,
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
              {config.title}
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
              style={{ backgroundColor: config.warningBg, border: `1px solid ${config.borderColor}` }}
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: config.color }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: config.color === '#DC2626' ? '#991B1B' : '#92400E', marginBottom: '8px' }}>
                  This action will have the following impact:
                </p>
                <ul style={{ fontSize: '13px', color: config.color === '#DC2626' ? '#991B1B' : '#92400E', paddingLeft: '20px', listStyle: 'disc', lineHeight: '1.6' }}>
                  {config.impacts.map((impact, index) => (
                    <li key={index}>{impact}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vehicle Summary */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#FFF1EC',
                    color: '#F24E1E',
                  }}
                >
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    {vehicle.registrationNumber}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B7280' }}>
                    {vehicle.model}
                  </p>
                </div>
              </div>
            </div>

            {/* Reason Input */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Reason <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <textarea
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={`Provide a reason for ${action === 'down' ? 'marking this vehicle down' : action === 'deactivate' ? 'deactivating this vehicle' : 'blocking this vehicle'}...`}
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
                This will be recorded in the vehicle status timeline
              </p>
            </div>

            {/* Effective Date */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Effective Date <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="date"
                required
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
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

            {/* Acknowledgement Checkbox */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: config.warningBg, border: `1px solid ${config.borderColor}` }}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acknowledge-impact"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  style={{ 
                    width: '16px', 
                    height: '16px', 
                    marginTop: '2px', 
                    accentColor: config.color, 
                    cursor: 'pointer' 
                  }}
                />
                <label
                  htmlFor="acknowledge-impact"
                  style={{ fontSize: '13px', color: config.color === '#DC2626' ? '#991B1B' : '#92400E', cursor: 'pointer', lineHeight: '1.5' }}
                >
                  <strong>I understand the operational impact</strong> of this action and confirm that all necessary arrangements have been made.
                </label>
              </div>
            </div>
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
                backgroundColor: config.buttonBg,
                fontSize: '14px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = config.buttonHoverBg)}
              onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = config.buttonBg)}
            >
              <Icon className="w-4 h-4" />
              {config.buttonText}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}