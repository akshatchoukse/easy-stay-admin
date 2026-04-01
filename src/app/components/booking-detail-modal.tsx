import { X, User, Calendar, Car, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';

interface Booking {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  userPhone: string;
  userRole?: string;
  vehicleId: string;
  vehicleModel: string;
  hubName: string;
  hubCode: string;
  planType: 'Daily' | 'Weekly' | 'Monthly';
  startDateTime: string;
  endDateTime: string;
  status: 'Reserved' | 'Active' | 'Completed' | 'Cancelled' | 'Overdue' | 'Failed Payment';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  amount: number;
  settlementType: 'Prepaid' | 'Daily';
  createdAt: string;
  actualReturnDateTime?: string;
  paymentMethod?: string;
  transactionId?: string;
  pickupInspectionDone: boolean;
  returnInspectionDone: boolean;
  damageFlagged: boolean;
}

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
}

export function BookingDetailModal({ booking, onClose }: BookingDetailModalProps) {
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
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50 overflow-hidden"
        style={{
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
              Booking Details
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
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* User Info */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    User Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Name
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.userName}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Phone
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.userPhone}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      User ID
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.userId}
                    </p>
                  </div>
                  {booking.userRole && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Role Type
                      </label>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        {booking.userRole}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Info */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Booking Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Booking ID
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.bookingId}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Plan
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.planType}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Status
                    </label>
                    <span
                      className="px-2 py-1 rounded-full inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: booking.status === 'Active' ? '#DCFCE7' : '#F7F9FC',
                        color: booking.status === 'Active' ? '#16A34A' : '#6B7280',
                      }}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Created At
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}{' '}
                      {new Date(booking.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Car className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Vehicle Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Vehicle ID
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.vehicleId}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Model
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.vehicleModel}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Hub
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.hubName}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6B7280' }}>
                      {booking.hubCode}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Allocation Status
                    </label>
                    <span
                      className="px-2 py-1 rounded-full inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: '#DCFCE7',
                        color: '#16A34A',
                      }}
                    >
                      Allocated
                    </span>
                  </div>
                </div>
              </div>

              {/* Trip Window */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Trip Window
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Start
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {new Date(booking.startDateTime).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}{' '}
                      {new Date(booking.startDateTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      End
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {new Date(booking.endDateTime).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}{' '}
                      {new Date(booking.endDateTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {booking.actualReturnDateTime && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Actual Return
                      </label>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        {new Date(booking.actualReturnDateTime).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        {new Date(booking.actualReturnDateTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment */}
              <div
                className="p-4 rounded-lg col-span-2"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Payment Details
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Amount
                    </label>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                      ₹{booking.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Payment Status
                    </label>
                    <span
                      className="px-2 py-1 rounded-full inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: booking.paymentStatus === 'Paid' ? '#DCFCE7' : '#FEF3C7',
                        color: booking.paymentStatus === 'Paid' ? '#16A34A' : '#F59E0B',
                      }}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Method
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.paymentMethod || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Transaction ID
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {booking.transactionId || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checklist Flags */}
              <div
                className="p-4 rounded-lg col-span-2"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Checklist Status
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    {booking.pickupInspectionDone ? (
                      <CheckCircle className="w-5 h-5" style={{ color: '#16A34A' }} />
                    ) : (
                      <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />
                    )}
                    <span style={{ fontSize: '13px', color: '#111111' }}>
                      Pickup Inspection
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {booking.returnInspectionDone ? (
                      <CheckCircle className="w-5 h-5" style={{ color: '#16A34A' }} />
                    ) : (
                      <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />
                    )}
                    <span style={{ fontSize: '13px', color: '#111111' }}>
                      Return Inspection
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {booking.damageFlagged ? (
                      <AlertTriangle className="w-5 h-5" style={{ color: '#DC2626' }} />
                    ) : (
                      <CheckCircle className="w-5 h-5" style={{ color: '#16A34A' }} />
                    )}
                    <span style={{ fontSize: '13px', color: '#111111' }}>
                      {booking.damageFlagged ? 'Damage Flagged' : 'No Damage'}
                    </span>
                  </div>
                </div>
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
            Close
          </button>
        </div>
      </div>
    </>
  );
}