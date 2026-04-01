import { useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

interface DowntimeRequest {
  id: string;
  ticketId: string;
  vehicleId: string;
  vehicleModel: string;
  workSummary?: string;
  partsUsed?: string[];
  rootCause?: string;
  resolutionNotes?: string;
}

interface ClosureApprovalDialogProps {
  request: DowntimeRequest;
  onClose: () => void;
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
}

export function ClosureApprovalDialog({ request, onClose, onApprove, onReject }: ClosureApprovalDialogProps) {
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleSubmit = () => {
    if (!resolutionNotes.trim()) return;

    if (action === 'approve') {
      onApprove(resolutionNotes);
    } else if (action === 'reject') {
      onReject(resolutionNotes);
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
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50"
        style={{ width: '90%', maxWidth: '650px' }}
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
                backgroundColor: '#DCFCE7',
              }}
            >
              <CheckCircle className="w-5 h-5" style={{ color: '#16A34A' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                Review Closure Request
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                {request.ticketId} • {request.vehicleId}
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
          {/* Vehicle Info */}
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F7F9FC' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                Vehicle
              </label>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                {request.vehicleModel} • {request.vehicleId}
              </p>
            </div>
          </div>

          {/* Work Summary */}
          {request.workSummary && (
            <div className="mb-4">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Work Summary
              </label>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.6' }}>
                  {request.workSummary}
                </p>
              </div>
            </div>
          )}

          {/* Parts Used */}
          {request.partsUsed && request.partsUsed.length > 0 && (
            <div className="mb-4">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Parts Used
              </label>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <ul className="space-y-1">
                  {request.partsUsed.map((part, index) => (
                    <li key={index} style={{ fontSize: '14px', color: '#111111' }}>
                      • {part}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Root Cause */}
          {request.rootCause && (
            <div className="mb-4">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Root Cause
              </label>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.6' }}>
                  {request.rootCause}
                </p>
              </div>
            </div>
          )}

          {/* Before/After Photos Placeholder */}
          <div className="mb-6">
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
              Before / After Photos
            </label>
            <div className="grid grid-cols-4 gap-3">
              {['Before 1', 'Before 2', 'After 1', 'After 2'].map((label) => (
                <div
                  key={label}
                  className="rounded-lg flex items-center justify-center"
                  style={{
                    aspectRatio: '1',
                    backgroundColor: '#E5E7EB',
                    border: '1px solid #D1D5DB',
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resolution Notes */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
              Resolution Notes <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <textarea
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="Enter your approval/rejection notes..."
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
              Required for both approval and rejection
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
            Cancel
          </button>
          <button
            onClick={() => {
              setAction('reject');
              handleSubmit();
            }}
            disabled={!resolutionNotes.trim()}
            className="px-4 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#DC2626',
              backgroundColor: 'white',
              border: '1px solid #DC2626',
            }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#FEE2E2')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'white')}
          >
            Send Back for Rework
          </button>
          <button
            onClick={() => {
              setAction('approve');
              handleSubmit();
            }}
            disabled={!resolutionNotes.trim()}
            className="px-4 text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: '#16A34A',
            }}
          >
            Approve Closure
          </button>
        </div>
      </div>
    </>
  );
}
