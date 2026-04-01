import { X, Copy, Bell, Users, BarChart3, Clock } from 'lucide-react';
import { useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  type: 'System' | 'Promotional';
  channels: ('Push' | 'SMS' | 'In-App')[];
  targetScope: 'Global' | 'City' | 'Hub' | 'Segment';
  targetSummary: string;
  status: 'Draft' | 'Scheduled' | 'Sent' | 'Cancelled' | 'Failed';
  scheduledTime?: string;
  sentTime?: string;
  deliveryCount: number;
  openRate: number;
  createdBy: string;
  createdAt: string;
  messageBody: string;
  deepLink?: string;
  targetDetails?: {
    cities?: string[];
    hubs?: string[];
    segment?: string;
  };
  deliveryStats?: {
    sent: number;
    delivered: number;
    failed: number;
    opened: number;
  };
}

interface CampaignDetailModalProps {
  campaign: Campaign;
  onClose: () => void;
  onDuplicate: () => void;
}

// Mock timeline data
const mockTimeline = [
  { timestamp: '2024-02-06T08:00:12', event: 'Campaign Sent', description: 'Push notifications queued' },
  { timestamp: '2024-02-06T08:00:45', event: 'Delivery Started', description: 'Messages being delivered' },
  { timestamp: '2024-02-06T08:05:20', event: 'Delivery Complete', description: '340/342 delivered successfully' },
];

export function CampaignDetailModal({ campaign, onClose, onDuplicate }: CampaignDetailModalProps) {
  const getChannelBadgeColor = (channel: string) => {
    switch (channel) {
      case 'Push':
        return { backgroundColor: '#FFF1EC', color: '#F24E1E' };
      case 'SMS':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'In-App':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
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
              Campaign Details
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>
              {campaign.name}
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
              {/* Content Preview */}
              <div
                className="p-4 rounded-lg col-span-2"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Content Preview
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Title
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {campaign.name}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Message
                    </label>
                    <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.6' }}>
                      {campaign.messageBody}
                    </p>
                  </div>
                  {campaign.deepLink && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Deep Link
                      </label>
                      <p style={{ fontSize: '13px', fontWeight: '500', color: '#2563EB' }}>
                        {campaign.deepLink}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Campaign Settings */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Campaign Settings
                </h3>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Type
                    </label>
                    <span
                      className="px-2 py-1 rounded-full inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: campaign.type === 'System' ? '#DBEAFE' : '#FFF1EC',
                        color: campaign.type === 'System' ? '#2563EB' : '#F24E1E',
                      }}
                    >
                      {campaign.type}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Channels
                    </label>
                    <div className="flex gap-1">
                      {campaign.channels.map((channel) => (
                        <span
                          key={channel}
                          className="px-2 py-1 rounded-full"
                          style={{
                            fontSize: '10px',
                            fontWeight: '500',
                            ...getChannelBadgeColor(channel),
                          }}
                        >
                          {channel}
                        </span>
                      ))}
                    </div>
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
                        backgroundColor: campaign.status === 'Sent' ? '#DCFCE7' : '#DBEAFE',
                        color: campaign.status === 'Sent' ? '#16A34A' : '#2563EB',
                      }}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Created By
                    </label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                      {campaign.createdBy}
                    </p>
                  </div>
                  {campaign.scheduledTime && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Scheduled Time
                      </label>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        {new Date(campaign.scheduledTime).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Targeting Summary */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4" style={{ color: '#F24E1E' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Targeting Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Scope
                    </label>
                    <span
                      className="px-2 py-1 rounded inline-block"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: '#E5E7EB',
                        color: '#6B7280',
                      }}
                    >
                      {campaign.targetScope}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      Target Details
                    </label>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {campaign.targetSummary}
                    </p>
                  </div>
                  {campaign.targetDetails?.cities && campaign.targetDetails.cities.length > 0 && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Cities
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>
                        {campaign.targetDetails.cities.join(', ')}
                      </p>
                    </div>
                  )}
                  {campaign.targetDetails?.hubs && campaign.targetDetails.hubs.length > 0 && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Hubs
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>
                        {campaign.targetDetails.hubs.join(', ')}
                      </p>
                    </div>
                  )}
                  {campaign.targetDetails?.segment && (
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Segment
                      </label>
                      <p style={{ fontSize: '14px', color: '#111111' }}>
                        {campaign.targetDetails.segment}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Stats */}
              {campaign.deliveryStats && (
                <div
                  className="p-4 rounded-lg col-span-2"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-4 h-4" style={{ color: '#F24E1E' }} />
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                      Delivery Statistics
                    </h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Sent
                      </label>
                      <p style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                        {campaign.deliveryStats.sent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Delivered
                      </label>
                      <p style={{ fontSize: '18px', fontWeight: '600', color: '#16A34A' }}>
                        {campaign.deliveryStats.delivered.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Failed
                      </label>
                      <p style={{ fontSize: '18px', fontWeight: '600', color: '#DC2626' }}>
                        {campaign.deliveryStats.failed.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Opened
                      </label>
                      <p style={{ fontSize: '18px', fontWeight: '600', color: '#2563EB' }}>
                        {campaign.deliveryStats.opened.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E5E7EB' }}>
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: '13px', color: '#6B7280' }}>
                        Delivery Rate
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#16A34A' }}>
                        {((campaign.deliveryStats.delivered / campaign.deliveryStats.sent) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span style={{ fontSize: '13px', color: '#6B7280' }}>
                        Open Rate
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#2563EB' }}>
                        {campaign.openRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              {campaign.status === 'Sent' && (
                <div
                  className="p-4 rounded-lg col-span-2"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: '#F24E1E' }} />
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                      Timeline
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
                              {event.event}
                            </p>
                            <span style={{ fontSize: '11px', color: '#6B7280' }}>
                              {new Date(event.timestamp).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p style={{ fontSize: '12px', color: '#6B7280' }}>
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
          <button
            onClick={() => {
              onDuplicate();
              onClose();
            }}
            className="flex items-center gap-2 px-4 transition-colors"
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
            <Copy className="w-4 h-4" />
            Duplicate Campaign
          </button>
        </div>
      </div>
    </>
  );
}