import { useState } from 'react';
import { X, Car, AlertTriangle, CheckCircle } from 'lucide-react';

interface Booking {
  id: string;
  bookingId: string;
  vehicleId: string;
  vehicleModel: string;
  hubName: string;
  hubCode: string;
}

interface ReassignVehicleDrawerProps {
  booking: Booking;
  onClose: () => void;
  onSave: (vehicleId: string) => void;
}

// Mock available vehicles
const availableVehicles = [
  {
    id: 'BHG-EV-0010',
    model: 'Ather 450X Gen 3',
    hubName: 'MG Road Hub',
    hubCode: 'BLR-MGR-01',
    available: true,
    batteryLevel: 95,
  },
  {
    id: 'BHG-EV-0011',
    model: 'Ola S1 Pro',
    hubName: 'MG Road Hub',
    hubCode: 'BLR-MGR-01',
    available: true,
    batteryLevel: 88,
  },
  {
    id: 'BHG-EV-0012',
    model: 'TVS iQube',
    hubName: 'Whitefield Hub',
    hubCode: 'BLR-WHF-02',
    available: true,
    batteryLevel: 92,
  },
  {
    id: 'BHG-EV-0013',
    model: 'Ather 450X Gen 3',
    hubName: 'Koramangala Hub',
    hubCode: 'BLR-KRM-03',
    available: true,
    batteryLevel: 100,
  },
];

export function ReassignVehicleDrawer({ booking, onClose, onSave }: ReassignVehicleDrawerProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  const selectedVehicle = availableVehicles.find(v => v.id === selectedVehicleId);
  const hubMismatch = selectedVehicle && selectedVehicle.hubCode !== booking.hubCode;

  const handleSave = () => {
    if (selectedVehicleId) {
      onSave(selectedVehicleId);
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
        className="fixed right-0 top-0 h-full bg-white shadow-xl z-50 flex flex-col"
        style={{ width: '500px' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
              Reassign Vehicle
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>
              {booking.bookingId}
            </p>
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
        <div className="flex-1 overflow-y-auto p-6">
          {/* Current Vehicle */}
          <div className="mb-6">
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
              Current Assignment
            </h3>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center rounded flex-shrink-0"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#FFF1EC',
                    color: '#F24E1E',
                  }}
                >
                  <Car className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
                    {booking.vehicleModel}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                    {booking.vehicleId}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: '#DBEAFE',
                        color: '#2563EB',
                      }}
                    >
                      {booking.hubName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Select New Vehicle */}
          <div className="mb-6">
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#111111', display: 'block', marginBottom: '12px' }}>
              Select New Vehicle <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                color: '#111111',
              }}
            >
              <option value="">Select a vehicle...</option>
              {availableVehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.model} - {vehicle.id} ({vehicle.hubName})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Vehicle Details */}
          {selectedVehicle && (
            <div className="mb-6">
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                New Vehicle Details
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Vehicle ID
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {selectedVehicle.id}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Model
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {selectedVehicle.model}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Hub
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {selectedVehicle.hubName}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6B7280' }}>
                      {selectedVehicle.hubCode}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Battery Level
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1" style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${selectedVehicle.batteryLevel}%`,
                            backgroundColor: selectedVehicle.batteryLevel >= 80 ? '#16A34A' : '#F59E0B',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                        {selectedVehicle.batteryLevel}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Availability
                    </label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" style={{ color: '#16A34A' }} />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#16A34A' }}>
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hub Mismatch Warning */}
          {hubMismatch && (
            <div
              className="p-4 rounded-lg flex gap-3"
              style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }}
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#92400E', marginBottom: '4px' }}>
                  Hub Mismatch Warning
                </p>
                <p style={{ fontSize: '13px', color: '#92400E' }}>
                  The selected vehicle is from a different hub. User may need to pick up from{' '}
                  <strong>{selectedVehicle.hubName}</strong> instead of <strong>{booking.hubName}</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 flex-shrink-0 flex justify-end gap-3"
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
            onClick={handleSave}
            disabled={!selectedVehicleId}
            className="px-4 text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: '#F24E1E',
            }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#D84315')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F24E1E')}
          >
            Confirm Reassignment
          </button>
        </div>
      </div>
    </>
  );
}