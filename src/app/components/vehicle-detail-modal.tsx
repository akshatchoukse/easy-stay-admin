import { X, Car, Edit, MapPin, Battery, Calendar, FileText, Shield, Wrench, Clock } from 'lucide-react';

interface Vehicle {
  id: string;
  registrationNumber: string;
  model: string;
  variant?: string;
  hubAssigned: string;
  hubCode: string;
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

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onEdit: () => void;
}

export function VehicleDetailModal({ vehicle, onClose, onEdit }: VehicleDetailModalProps) {
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

  const getWarrantyColor = (status: string) => {
    switch (status) {
      case 'Valid':
        return { backgroundColor: '#DCFCE7', color: '#16A34A', border: '1px solid #16A34A' };
      case 'Expiring Soon':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B', border: '1px solid #F59E0B' };
      case 'Expired':
        return { backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid #DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280', border: '1px solid #6B7280' };
    }
  };

  const getBatteryHealthColor = (health: number) => {
    if (health >= 90) return '#16A34A';
    if (health >= 70) return '#F59E0B';
    return '#DC2626';
  };

  // Mock status timeline
  const statusTimeline = [
    { date: '2024-02-06', status: 'Available', note: 'Vehicle made available for operations', user: 'System' },
    { date: '2024-02-03', status: 'Hold', note: 'Held for routine maintenance check', user: 'Rajesh Kumar' },
    { date: '2024-01-28', status: 'Available', note: 'Returned to active fleet', user: 'System' },
    { date: '2024-01-15', status: 'Down', note: 'Battery replacement completed', user: 'Priya Sharma' },
  ];

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
          width: '900px',
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
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                {vehicle.registrationNumber}
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                {vehicle.registrationNumber}
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

        {/* Content - Scrollable */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <div className="p-6 space-y-6">
            {/* Vehicle Info */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Vehicle Information
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Registration Number
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {vehicle.registrationNumber}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Manufacturing Year
                    </p>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {vehicle.manufacturingYear}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Model
                    </p>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {vehicle.model}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Variant
                    </p>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {vehicle.variant || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Assignment */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Hub Assignment
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Hub Assigned
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: '#F24E1E' }} />
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        {vehicle.hubAssigned}
                      </p>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                      {vehicle.hubCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Technical Details
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Odometer
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {vehicle.odometer.toLocaleString()} km
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Battery Capacity
                    </p>
                    <div className="flex items-center gap-1">
                      <Battery className="w-4 h-4" style={{ color: '#F24E1E' }} />
                      <p style={{ fontSize: '14px', color: '#111111' }}>
                        {vehicle.batteryCapacity} Wh
                      </p>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Last Inspection
                    </p>
                    <div className="flex items-center gap-1">
                      <Wrench className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <p style={{ fontSize: '13px', color: '#111111' }}>
                        {new Date(vehicle.lastInspectionDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Availability */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Current Status
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>
                      Status
                    </p>
                    <span
                      className="px-3 py-1.5 rounded-full inline-block"
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        ...getStatusColor(vehicle.status),
                      }}
                    >
                      {vehicle.status}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>
                      Warranty Status
                    </p>
                    <span
                      className="px-3 py-1.5 rounded-full inline-block"
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        ...getWarrantyColor(vehicle.warrantyStatus),
                      }}
                    >
                      {vehicle.warrantyStatus}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Warranty Expiry
                    </p>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <p style={{ fontSize: '13px', color: '#111111' }}>
                        {new Date(vehicle.warrantyExpiryDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Insurance Expiry
                    </p>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <p style={{ fontSize: '13px', color: '#111111' }}>
                        {vehicle.insuranceExpiryDate
                          ? new Date(vehicle.insuranceExpiryDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Documents */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Compliance Documents
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                        RC (Registration Certificate)
                      </p>
                    </div>
                    <span
                      className="px-2 py-1 rounded-full inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: vehicle.documents.rc ? '#DCFCE7' : '#FEE2E2',
                        color: vehicle.documents.rc ? '#16A34A' : '#DC2626',
                        border: vehicle.documents.rc ? '1px solid #16A34A' : '1px solid #DC2626',
                      }}
                    >
                      {vehicle.documents.rc ? 'Valid' : 'Missing'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                        Insurance
                      </p>
                    </div>
                    <span
                      className="px-2 py-1 rounded-full inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: vehicle.documents.insurance ? '#DCFCE7' : '#FEE2E2',
                        color: vehicle.documents.insurance ? '#16A34A' : '#DC2626',
                        border: vehicle.documents.insurance ? '1px solid #16A34A' : '1px solid #DC2626',
                      }}
                    >
                      {vehicle.documents.insurance ? 'Valid' : 'Missing'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>
                        Fitness Certificate
                      </p>
                    </div>
                    <span
                      className="px-2 py-1 rounded-full inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: vehicle.documents.fitness ? '#DCFCE7' : '#FEE2E2',
                        color: vehicle.documents.fitness ? '#16A34A' : '#DC2626',
                        border: vehicle.documents.fitness ? '1px solid #16A34A' : '1px solid #DC2626',
                      }}
                    >
                      {vehicle.documents.fitness ? 'Valid' : 'Missing'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Status Timeline
              </h3>
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: '1px solid #E5E7EB' }}
              >
                {statusTimeline.map((entry, index) => (
                  <div
                    key={index}
                    className="p-4"
                    style={{
                      backgroundColor: index % 2 === 0 ? 'white' : '#F7F9FC',
                      borderBottom: index < statusTimeline.length - 1 ? '1px solid #E5E7EB' : 'none',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#FFF1EC',
                          color: '#F24E1E',
                        }}
                      >
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="px-2 py-0.5 rounded-full"
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              ...getStatusColor(entry.status),
                            }}
                          >
                            {entry.status}
                          </span>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#111111', marginBottom: '4px' }}>
                          {entry.note}
                        </p>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>
                          Updated by {entry.user}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Info */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                Audit Information
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Last Updated
                    </p>
                    <p style={{ fontSize: '13px', color: '#111111' }}>
                      {new Date(vehicle.lastUpdated).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>
                      Vehicle Age
                    </p>
                    <p style={{ fontSize: '13px', color: '#111111' }}>
                      {new Date().getFullYear() - vehicle.manufacturingYear} year{new Date().getFullYear() - vehicle.manufacturingYear !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: '1px solid #E5E7EB', backgroundColor: 'white' }}
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
            Edit Vehicle
          </button>
        </div>
      </div>
    </>
  );
}