import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface Booking {
  id: string;
  bookingId: string;
  userName: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
}

interface CancelBookingDialogProps {
  booking: Booking;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function CancelBookingDialog({ booking, onClose, onConfirm }: CancelBookingDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
    }
  };

  const isRefundApplicable = booking.paymentStatus === 'Paid';

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
        style={{ width: '90%', maxWidth: '500px' }}
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
                backgroundColor: '#FEE2E2',
              }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: '#DC2626' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                Cancel Booking
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
                  Impact Warning
                </p>
                <ul style={{ fontSize: '13px', color: '#92400E', paddingLeft: '16px' }}>
                  <li>Vehicle will be released from allocation</li>
                  <li>User will be notified immediately</li>
                  {isRefundApplicable && (
                    <li>Refund will be processed as per cancellation policy</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#F7F9FC' }}>
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
                  Amount
                </label>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                  ₹{booking.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Refund Indicator */}
          {isRefundApplicable && (
            <div className="mb-4 p-3 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#DCFCE7' }}>
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#16A34A',
                }}
              >
                <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>✓</span>
              </div>
              <p style={{ fontSize: '13px', color: '#166534', fontWeight: '500' }}>
                Refund will be processed
              </p>
            </div>
          )}

          {/* Reason Input */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
              Cancellation Reason <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for cancellation..."
              rows={4}
              className="w-full px-3 py-2"
              style={{
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                color: '#111111',
                resize: 'none',
              }}
            />
            <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              This reason will be visible to the user
            </p>
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
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="px-4 text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: '#DC2626',
            }}
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </>
  );
}