import { useState } from 'react';
import { X, Car, AlertTriangle, Wrench, FileText, Clock, User } from 'lucide-react';
import { ReviewDecisionDrawer } from './review-decision-drawer';

interface DowntimeRequest {
  id: string;
  ticketId: string;
  vehicleId: string;
  vehicleModel: string;
  hubName: string;
  hubCode: string;
  issueCategory: string;
  severity: 'Minor' | 'Major' | 'Critical';
  requestedBy: string;
  requestedOn: string;
  proposedStartDate: string;
  proposedEndDate: string;
  status: string;
  issueDescription: string;
  mechanicNotes?: string;
  managerNotes?: string;
  jobCardId?: string;
  hasActiveBooking?: boolean;
}

interface DowntimeDetailModalProps {
  request: DowntimeRequest;
  onClose: () => void;
}

// Mock timeline data
const mockTimeline = [
  { timestamp: '2024-02-06T10:30:00', action: 'Request Created', user: 'Ramesh Kumar', role: 'Hub Manager' },
  { timestamp: '2024-02-06T10:35:00', action: 'Issue Categorized', user: 'System', role: 'Auto' },
  { timestamp: '2024-02-06T10:45:00', action: 'Mechanic Assigned', user: 'Suresh Patil', role: 'Ops Manager' },
];

export function DowntimeDetailModal({ request, onClose }: DowntimeDetailModalProps) {
  const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false);

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
          maxWidth: '900px',
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
              Downtime Request Details
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>
              {request.ticketId}
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
              {/* Vehicle Summary */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Car className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Vehicle Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Vehicle ID
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {request.vehicleId}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Model
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {request.vehicleModel}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Hub
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {request.hubName}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6B7280' }}>
                      {request.hubCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Issue Details
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Category
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {request.issueCategory}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Severity
                    </label>
                    <span
                      className="px-2 py-1 rounded-full inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: request.severity === 'Critical' ? '#FEE2E2' : '#FEF3C7',
                        color: request.severity === 'Critical' ? '#DC2626' : '#F59E0B',
                      }}
                    >
                      {request.severity}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Requested By
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {request.requestedBy}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6B7280' }}>
                      {new Date(request.requestedOn).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div
                className="p-4 rounded-lg col-span-2"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Issue Description
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.6' }}>
                  {request.issueDescription}
                </p>
              </div>

              {/* Evidence Photos */}
              <div
                className="p-4 rounded-lg col-span-2"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Evidence Photos
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg flex items-center justify-center"
                      style={{
                        aspectRatio: '1',
                        backgroundColor: '#E5E7EB',
                        border: '1px solid #D1D5DB',
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>Photo {i}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Downtime Window */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Proposed Downtime Window
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Start
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {new Date(request.proposedStartDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
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
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Card Info */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Linked Job Card
                  </h3>
                </div>
                {request.jobCardId ? (
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#16A34A' }}>
                      {request.jobCardId}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                      Job card linked and active
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    No job card linked yet
                  </p>
                )}
              </div>

              {/* Mechanic Notes */}
              {request.mechanicNotes && (
                <div
                  className="p-4 rounded-lg col-span-2"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4" style={{ color: '#F24E1E' }} />
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                      Mechanic Notes
                    </h3>
                  </div>
                  <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.6' }}>
                    {request.mechanicNotes}
                  </p>
                </div>
              )}

              {/* Manager Notes */}
              {request.managerNotes && (
                <div
                  className="p-4 rounded-lg col-span-2"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4" style={{ color: '#F24E1E' }} />
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                      Manager Notes
                    </h3>
                  </div>
                  <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.6' }}>
                    {request.managerNotes}
                  </p>
                </div>
              )}

              {/* Timeline */}
              <div
                className="p-4 rounded-lg col-span-2"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Timeline & Audit Trail
                  </h3>
                </div>
                <div className="space-y-3">
                  {mockTimeline.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className="rounded-full"
                          style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#F24E1E',
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                            {event.action}
                          </p>
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>
                            {new Date(event.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>
                          {event.user} • {event.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-between gap-3 px-6 py-4"
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
          {request.status === 'Pending Approval' && (
            <button
              onClick={() => setIsReviewDrawerOpen(true)}
              className="px-4 text-white transition-colors"
              style={{
                height: '40px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: '#F24E1E',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
            >
              Review Decision
            </button>
          )}
        </div>
      </div>

      {/* Review Drawer */}
      {isReviewDrawerOpen && (
        <ReviewDecisionDrawer
          request={request}
          onClose={() => setIsReviewDrawerOpen(false)}
          onSubmit={(decision, comments, approvedWindow, override) => {
            console.log('Decision submitted:', decision, comments, approvedWindow, override);
            setIsReviewDrawerOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
