import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  targetSummary: string;
}

interface CancelCampaignDialogProps {
  campaign: Campaign;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function CancelCampaignDialog({ campaign, onClose, onConfirm }: CancelCampaignDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
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
                Cancel Campaign
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                This action cannot be undone
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
          {/* Campaign Info */}
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F7F9FC' }}>
            <div className="mb-3">
              <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                Campaign Name
              </label>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                {campaign.name}
              </p>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                Target
              </label>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                {campaign.targetSummary}
              </p>
            </div>
          </div>

          {/* Warning */}
          <div
            className="p-4 rounded-lg mb-6 flex gap-3"
            style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#92400E', marginBottom: '4px' }}>
                Warning
              </p>
              <p style={{ fontSize: '13px', color: '#92400E' }}>
                Cancelling this scheduled campaign will prevent it from being sent. Users will not receive any notifications.
              </p>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
              Cancellation Reason <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for cancelling this campaign..."
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
            <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
              This reason will be logged for audit purposes
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
            Keep Campaign
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
            Cancel Campaign
          </button>
        </div>
      </div>
    </>
  );
}
