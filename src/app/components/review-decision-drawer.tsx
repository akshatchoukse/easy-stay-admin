import { useState } from 'react';
import { X, AlertTriangle, Calendar } from 'lucide-react';

interface DowntimeRequest {
  id: string;
  ticketId: string;
  vehicleId: string;
  proposedStartDate: string;
  proposedEndDate: string;
  hasActiveBooking?: boolean;
}

interface ReviewDecisionDrawerProps {
  request: DowntimeRequest;
  onClose: () => void;
  onSubmit: (
    decision: 'approve' | 'reject' | 'needInfo',
    comments: string,
    approvedWindow: { start: string; end: string } | null,
    override: boolean
  ) => void;
}

export function ReviewDecisionDrawer({ request, onClose, onSubmit }: ReviewDecisionDrawerProps) {
  const [decision, setDecision] = useState<'approve' | 'reject' | 'needInfo'>('approve');
  const [comments, setComments] = useState('');
  const [approvedStartDate, setApprovedStartDate] = useState(request.proposedStartDate.split('T')[0]);
  const [approvedStartTime, setApprovedStartTime] = useState(request.proposedStartDate.split('T')[1]?.substring(0, 5) || '09:00');
  const [approvedEndDate, setApprovedEndDate] = useState(request.proposedEndDate.split('T')[0]);
  const [approvedEndTime, setApprovedEndTime] = useState(request.proposedEndDate.split('T')[1]?.substring(0, 5) || '18:00');
  const [override, setOverride] = useState(false);

  const handleSubmit = () => {
    if (!comments.trim()) return;

    const approvedWindow = decision === 'approve'
      ? {
          start: `${approvedStartDate}T${approvedStartTime}:00`,
          end: `${approvedEndDate}T${approvedEndTime}:00`,
        }
      : null;

    onSubmit(decision, comments, approvedWindow, override);
  };

  const isFormValid = comments.trim().length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full bg-white shadow-xl z-50 flex flex-col"
        style={{ width: '550px' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
              Review Downtime Request
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>
              {request.ticketId} • {request.vehicleId}
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
          {/* Proposed Window (Read-only) */}
          <div className="mb-6">
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
              Proposed Window
            </h3>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Start
                  </label>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                    {new Date(request.proposedStartDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    {new Date(request.proposedStartDate).toLocaleTimeString('en-US', {
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
                    {new Date(request.proposedEndDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    {new Date(request.proposedEndDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Selector */}
          <div className="mb-6">
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#111111', display: 'block', marginBottom: '12px' }}>
              Decision <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <div className="space-y-3">
              <label
                className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors"
                style={{
                  border: `2px solid ${decision === 'approve' ? '#F24E1E' : '#E5E7EB'}`,
                  backgroundColor: decision === 'approve' ? '#FFF1EC' : 'white',
                }}
              >
                <input
                  type="radio"
                  name="decision"
                  value="approve"
                  checked={decision === 'approve'}
                  onChange={(e) => setDecision('approve')}
                  style={{ accentColor: '#F24E1E' }}
                />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                    Approve
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>
                    Approve downtime request and schedule maintenance
                  </p>
                </div>
              </label>

              <label
                className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors"
                style={{
                  border: `2px solid ${decision === 'reject' ? '#DC2626' : '#E5E7EB'}`,
                  backgroundColor: decision === 'reject' ? '#FEE2E2' : 'white',
                }}
              >
                <input
                  type="radio"
                  name="decision"
                  value="reject"
                  checked={decision === 'reject'}
                  onChange={(e) => setDecision('reject')}
                  style={{ accentColor: '#DC2626' }}
                />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                    Reject
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>
                    Reject this downtime request
                  </p>
                </div>
              </label>

              <label
                className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors"
                style={{
                  border: `2px solid ${decision === 'needInfo' ? '#F59E0B' : '#E5E7EB'}`,
                  backgroundColor: decision === 'needInfo' ? '#FEF3C7' : 'white',
                }}
              >
                <input
                  type="radio"
                  name="decision"
                  value="needInfo"
                  checked={decision === 'needInfo'}
                  onChange={(e) => setDecision('needInfo')}
                  style={{ accentColor: '#F59E0B' }}
                />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                    Need More Info
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>
                    Request additional information before decision
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Approved Window (Editable - only if approved) */}
          {decision === 'approve' && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4" style={{ color: '#F24E1E' }} />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                  Approved Downtime Window
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Start Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={approvedStartDate}
                      onChange={(e) => setApprovedStartDate(e.target.value)}
                      className="px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                    <input
                      type="time"
                      value={approvedStartTime}
                      onChange={(e) => setApprovedStartTime(e.target.value)}
                      className="px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    End Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={approvedEndDate}
                      onChange={(e) => setApprovedEndDate(e.target.value)}
                      className="px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                    <input
                      type="time"
                      value={approvedEndTime}
                      onChange={(e) => setApprovedEndTime(e.target.value)}
                      className="px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conflict Warning */}
          {request.hasActiveBooking && decision === 'approve' && (
            <div
              className="p-4 rounded-lg mb-6 flex gap-3"
              style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }}
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#92400E', marginBottom: '4px' }}>
                  Active Booking Conflict
                </p>
                <p style={{ fontSize: '13px', color: '#92400E', marginBottom: '8px' }}>
                  This vehicle has an active booking during the proposed downtime window. Approving will require manual intervention to relocate the customer.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={override}
                    onChange={(e) => setOverride(e.target.checked)}
                    className="w-4 h-4"
                    style={{ accentColor: '#F59E0B' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#92400E' }}>
                    Override and proceed (Admin only)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Manager Comments */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#111111', display: 'block', marginBottom: '12px' }}>
              Manager Comments <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your decision notes and comments..."
              rows={5}
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
              Comments will be visible to hub manager and mechanic
            </p>
          </div>
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
            onClick={handleSubmit}
            disabled={!isFormValid || (request.hasActiveBooking && decision === 'approve' && !override)}
            className="px-4 text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: decision === 'approve' ? '#16A34A' : decision === 'reject' ? '#DC2626' : '#F59E0B',
            }}
          >
            Submit Decision
          </button>
        </div>
      </div>
    </>
  );
}
