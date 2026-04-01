import { useState } from 'react';
import { X, AlertTriangle, Upload } from 'lucide-react';

interface Booking {
  id: string;
  bookingId: string;
  userName: string;
  vehicleId: string;
  vehicleModel: string;
}

interface ForceCloseTripDialogProps {
  booking: Booking;
  onClose: () => void;
  onConfirm: (data: {
    odometer: string;
    conditionNotes: string;
    damageDetected: boolean;
  }) => void;
}

export function ForceCloseTripDialog({ booking, onClose, onConfirm }: ForceCloseTripDialogProps) {
  const [odometer, setOdometer] = useState('');
  const [conditionNotes, setConditionNotes] = useState('');
  const [damageDetected, setDamageDetected] = useState(false);

  const handleConfirm = () => {
    if (odometer.trim() && conditionNotes.trim()) {
      onConfirm({
        odometer,
        conditionNotes,
        damageDetected,
      });
    }
  };

  const isFormValid = odometer.trim() && conditionNotes.trim();

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
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50"
        style={{ width: '90%', maxWidth: '550px' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FEF3C7',
              }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                Force Close Trip
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                {booking.bookingId}
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
        <div className="p-6">
          {/* Warning Box */}
          <div
            className="p-4 rounded-lg mb-6"
            style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }}
          >
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#92400E', marginBottom: '4px' }}>
                  Admin Override
                </p>
                <p style={{ fontSize: '13px', color: '#92400E' }}>
                  This action will forcefully close an active trip. Ensure vehicle inspection is completed before proceeding.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F7F9FC' }}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  User
                </label>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                  {booking.userName}
                </p>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Vehicle
                </label>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                  {booking.vehicleModel}
                </p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>
                  {booking.vehicleId}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Odometer */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Final Odometer Reading <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                  placeholder="Enter odometer reading in km"
                  className="w-full px-3 pr-12"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    color: '#111111',
                  }}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ fontSize: '14px', color: '#6B7280' }}
                >
                  km
                </span>
              </div>
            </div>

            {/* Condition Notes */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Vehicle Condition Notes <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <textarea
                value={conditionNotes}
                onChange={(e) => setConditionNotes(e.target.value)}
                placeholder="Describe the current condition of the vehicle..."
                rows={3}
                className="w-full px-3 py-2"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  color: '#111111',
                  resize: 'none',
                }}
              />
            </div>

            {/* Damage Toggle */}
            <div
              className="p-4 rounded-lg"
              style={{ border: '1px solid #E5E7EB' }}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={damageDetected}
                  onChange={(e) => setDamageDetected(e.target.checked)}
                  className="w-4 h-4"
                  style={{ accentColor: '#DC2626' }}
                />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                    Damage Detected
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>
                    Check if vehicle has sustained any damage during the trip
                  </p>
                </div>
              </label>
            </div>

            {/* Evidence Upload Placeholder */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Evidence (Optional)
              </label>
              <div
                className="flex flex-col items-center justify-center py-6 rounded-lg cursor-pointer transition-colors"
                style={{
                  border: '2px dashed #E5E7EB',
                  backgroundColor: '#F7F9FC',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
              >
                <Upload className="w-8 h-8 mb-2" style={{ color: '#6B7280' }} />
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  Click to upload photos or documents
                </p>
                <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end gap-3 px-6 py-4"
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
              color: '#111111',
              backgroundColor: 'white',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isFormValid}
            className="px-4 text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: '#F59E0B',
            }}
          >
            Close Trip
          </button>
        </div>
      </div>
    </>
  );
}