import { useState } from 'react';
import {
  Search,
  Download,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  RotateCcw,
  Wrench,
  Plus,
  Bell,
  Copy,
  FileText,
} from 'lucide-react';
import { CreateNotificationDrawer } from './create-notification-drawer';
import { CampaignDetailModal } from './campaign-detail-modal';
import { CancelCampaignDialog } from './cancel-campaign-dialog';
import { DeliveryLogModal } from './delivery-log-modal';

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

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Weekend Discount - Bangalore',
    type: 'Promotional',
    channels: ['Push', 'In-App'],
    targetScope: 'City',
    targetSummary: '1 City (Bangalore)',
    status: 'Scheduled',
    scheduledTime: '2024-02-10T09:00:00',
    deliveryCount: 0,
    openRate: 0,
    createdBy: 'Priya Sharma',
    createdAt: '2024-02-06T14:30:00',
    messageBody: 'Get 20% off on all weekend rides! Book now and save big.',
    deepLink: '/offers/weekend-discount',
    targetDetails: {
      cities: ['Bangalore'],
    },
  },
  {
    id: '2',
    name: 'Hub Maintenance Alert - MG Road',
    type: 'System',
    channels: ['Push', 'SMS', 'In-App'],
    targetScope: 'Hub',
    targetSummary: '1 Hub (MG Road)',
    status: 'Sent',
    scheduledTime: '2024-02-06T08:00:00',
    sentTime: '2024-02-06T08:00:12',
    deliveryCount: 342,
    openRate: 87.4,
    createdBy: 'Ramesh Kumar',
    createdAt: '2024-02-05T16:20:00',
    messageBody: 'MG Road Hub will be under maintenance on 07 Feb 2024, 10:00 AM - 02:00 PM. Plan your trips accordingly.',
    targetDetails: {
      hubs: ['MG Road Hub'],
    },
    deliveryStats: {
      sent: 342,
      delivered: 340,
      failed: 2,
      opened: 298,
    },
  },
  {
    id: '3',
    name: 'New Year Offer - All Users',
    type: 'Promotional',
    channels: ['Push', 'SMS', 'In-App'],
    targetScope: 'Global',
    targetSummary: 'All Active Users',
    status: 'Sent',
    scheduledTime: '2024-01-01T00:00:00',
    sentTime: '2024-01-01T00:00:05',
    deliveryCount: 12847,
    openRate: 64.2,
    createdBy: 'Admin',
    createdAt: '2023-12-28T10:00:00',
    messageBody: 'Happy New Year! Enjoy 30% off on your first 5 rides this month. Use code: NEWYEAR2024',
    deepLink: '/offers/new-year',
    targetDetails: {},
    deliveryStats: {
      sent: 12847,
      delivered: 12780,
      failed: 67,
      opened: 8205,
    },
  },
  {
    id: '4',
    name: 'Payment Failed Reminder',
    type: 'System',
    channels: ['Push', 'In-App'],
    targetScope: 'Segment',
    targetSummary: 'Segment: Payment Failed Users',
    status: 'Sent',
    scheduledTime: '2024-02-05T12:00:00',
    sentTime: '2024-02-05T12:00:03',
    deliveryCount: 43,
    openRate: 95.3,
    createdBy: 'System Auto',
    createdAt: '2024-02-05T11:55:00',
    messageBody: 'Your recent payment failed. Please update your payment method to continue using our service.',
    deepLink: '/profile/payment',
    targetDetails: {
      segment: 'Payment Failed Users',
    },
    deliveryStats: {
      sent: 43,
      delivered: 43,
      failed: 0,
      opened: 41,
    },
  },
  {
    id: '5',
    name: 'Flash Sale - Delhi NCR',
    type: 'Promotional',
    channels: ['Push', 'SMS'],
    targetScope: 'City',
    targetSummary: '1 City (Delhi)',
    status: 'Failed',
    scheduledTime: '2024-02-04T10:00:00',
    sentTime: '2024-02-04T10:00:00',
    deliveryCount: 0,
    openRate: 0,
    createdBy: 'Anjali Reddy',
    createdAt: '2024-02-03T18:00:00',
    messageBody: 'Flash Sale! 50% off for the next 2 hours. Hurry!',
    targetDetails: {
      cities: ['Delhi'],
    },
    deliveryStats: {
      sent: 0,
      delivered: 0,
      failed: 5420,
      opened: 0,
    },
  },
  {
    id: '6',
    name: 'Referral Program Launch',
    type: 'Promotional',
    channels: ['Push', 'In-App'],
    targetScope: 'Global',
    targetSummary: 'All Active Users',
    status: 'Draft',
    deliveryCount: 0,
    openRate: 0,
    createdBy: 'Priya Sharma',
    createdAt: '2024-02-06T11:00:00',
    messageBody: 'Refer a friend and both get ₹100 credit! Share your unique referral code now.',
    deepLink: '/referral',
  },
  {
    id: '7',
    name: 'App Update Required',
    type: 'System',
    channels: ['Push', 'In-App'],
    targetScope: 'Segment',
    targetSummary: 'Segment: Old App Version Users',
    status: 'Cancelled',
    scheduledTime: '2024-02-08T09:00:00',
    deliveryCount: 0,
    openRate: 0,
    createdBy: 'Tech Team',
    createdAt: '2024-02-05T15:00:00',
    messageBody: 'Please update your app to the latest version for improved performance and new features.',
    deepLink: '/update',
    targetDetails: {
      segment: 'Old App Version Users',
    },
  },
];

export function NotificationCampaignManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [scopeFilter, setScopeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isDeliveryLogModalOpen, setIsDeliveryLogModalOpen] = useState(false);
  const [duplicatedCampaignName, setDuplicatedCampaignName] = useState<string | null>(null);

  // Filter logic
  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.messageBody.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
    const matchesChannel = channelFilter === 'all' || campaign.channels.includes(channelFilter as any);
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesScope = scopeFilter === 'all' || campaign.targetScope === scopeFilter;

    return matchesSearch && matchesType && matchesChannel && matchesStatus && matchesScope;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + rowsPerPage);

  const handleResetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setChannelFilter('all');
    setStatusFilter('all');
    setScopeFilter('all');
    setCurrentPage(1);
  };

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDuplicate = (campaign: Campaign) => {
    setDuplicatedCampaignName(campaign.name);
    setOpenMenuId(null);
  };

  const handleCancelCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsCancelDialogOpen(true);
    setOpenMenuId(null);
  };

  const handleViewLog = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDeliveryLogModalOpen(true);
    setOpenMenuId(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'System':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'Promotional':
        return { backgroundColor: '#FFF1EC', color: '#F24E1E' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      case 'Scheduled':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'Sent':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Cancelled':
        return { backgroundColor: '#E5E7EB', color: '#6B7280' };
      case 'Failed':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

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
    <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
              Notifications & Campaigns
            </h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              Create and manage system and promotional notifications
            </p>
          </div>
          <button
            onClick={() => setIsCreateDrawerOpen(true)}
            className="flex items-center gap-2 px-4 text-white transition-colors"
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
            <Plus className="w-4 h-4" />
            Create Notification
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 mb-6" style={{ border: '1px solid #E5E7EB' }}>
          <div className="grid grid-cols-12 gap-4">
            {/* Search */}
            <div className="col-span-3">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                <input
                  type="text"
                  placeholder="Campaign name or message..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-3"
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

            {/* Type Filter */}
            <div className="col-span-2">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  color: '#111111',
                }}
              >
                <option value="all">All Types</option>
                <option value="System">System</option>
                <option value="Promotional">Promotional</option>
              </select>
            </div>

            {/* Channel Filter */}
            <div className="col-span-2">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Channel
              </label>
              <select
                value={channelFilter}
                onChange={(e) => {
                  setChannelFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  color: '#111111',
                }}
              >
                <option value="all">All Channels</option>
                <option value="Push">Push</option>
                <option value="SMS">SMS</option>
                <option value="In-App">In-App</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-span-2">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  color: '#111111',
                }}
              >
                <option value="all">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Sent">Sent</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* Scope Filter */}
            <div className="col-span-2">
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                Target Scope
              </label>
              <select
                value={scopeFilter}
                onChange={(e) => {
                  setScopeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  color: '#111111',
                }}
              >
                <option value="all">All Scopes</option>
                <option value="Global">Global</option>
                <option value="City">City</option>
                <option value="Hub">Hub</option>
                <option value="Segment">Segment</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="col-span-1 flex items-end">
              <button
                onClick={handleResetFilters}
                className="flex items-center justify-center w-full transition-colors"
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
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            Showing <span style={{ fontWeight: '500', color: '#111111' }}>{filteredCampaigns.length}</span> campaign{filteredCampaigns.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          {paginatedCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <div
                className="mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
              >
                <Bell className="w-8 h-8" style={{ color: '#6B7280' }} />
              </div>
              <h3 className="font-semibold mb-1" style={{ fontSize: '16px', color: '#111111' }}>
                No campaigns found
              </h3>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                Try adjusting your filters or create a new notification
              </p>
            </div>
          ) : (
            <>
              <div className="table-scroll-container">
                <table className="w-full" style={{ minWidth: '1600px' }}>
                  <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                    <tr>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Campaign Name
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Type
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Channels
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Target Scope
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Status
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Scheduled
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Delivery
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Open Rate
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Created By
                      </th>
                      <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        Created At
                      </th>
                      <th className="px-4 py-3 text-center uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '60px', whiteSpace: 'nowrap' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCampaigns.map((campaign, index) => (
                      <tr
                        key={campaign.id}
                        className="cursor-pointer"
                        style={{
                          borderBottom: index < paginatedCampaigns.length - 1 ? '1px solid #F1F5F9' : 'none',
                        }}
                        onClick={() => handleViewDetails(campaign)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                            {campaign.name}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span
                            className="px-2 py-1 rounded-full"
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              ...getTypeColor(campaign.type),
                            }}
                          >
                            {campaign.type}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
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
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <div>
                            <span
                              className="px-2 py-1 rounded"
                              style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                backgroundColor: '#F7F9FC',
                                color: '#6B7280',
                              }}
                            >
                              {campaign.targetScope}
                            </span>
                            <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                              {campaign.targetSummary}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span
                            className="px-2 py-1 rounded-full"
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              ...getStatusColor(campaign.status),
                            }}
                          >
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          {campaign.scheduledTime ? (
                            <div>
                              <p style={{ fontSize: '13px', color: '#111111' }}>
                                {new Date(campaign.scheduledTime).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </p>
                              <p style={{ fontSize: '11px', color: '#6B7280' }}>
                                {new Date(campaign.scheduledTime).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                          ) : (
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>—</span>
                          )}
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          {campaign.deliveryCount > 0 ? (
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                                {campaign.deliveryCount.toLocaleString()}
                              </p>
                              {campaign.sentTime && (
                                <p style={{ fontSize: '11px', color: '#6B7280' }}>
                                  {new Date(campaign.sentTime).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>—</span>
                          )}
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          {campaign.openRate > 0 ? (
                            <span style={{ fontSize: '13px', fontWeight: '500', color: '#16A34A' }}>
                              {campaign.openRate.toFixed(1)}%
                            </span>
                          ) : (
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>—</span>
                          )}
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '13px', color: '#111111' }}>
                            {campaign.createdBy}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            {new Date(campaign.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === campaign.id ? null : campaign.id);
                              }}
                              className="p-1 rounded transition-colors"
                              style={{ backgroundColor: 'transparent' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <MoreVertical className="w-4 h-4" style={{ color: '#6B7280' }} />
                            </button>
                            {openMenuId === campaign.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(null);
                                  }}
                                />
                                <div
                                  className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-20"
                                  style={{
                                    border: '1px solid #E5E7EB',
                                    minWidth: '180px',
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    onClick={() => handleViewDetails(campaign)}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                    style={{ fontSize: '14px', color: '#111111' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => handleDuplicate(campaign)}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                    style={{ fontSize: '14px', color: '#111111' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    <Copy className="w-4 h-4" />
                                    Duplicate
                                  </button>
                                  {campaign.status === 'Scheduled' && (
                                    <button
                                      onClick={() => handleCancelCampaign(campaign)}
                                      className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                      style={{ fontSize: '14px', color: '#DC2626' }}
                                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                    >
                                      <XCircle className="w-4 h-4" />
                                      Cancel Campaign
                                    </button>
                                  )}
                                  {(campaign.status === 'Sent' || campaign.status === 'Failed') && (
                                    <button
                                      onClick={() => handleViewLog(campaign)}
                                      className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                      style={{ fontSize: '14px', color: '#111111' }}
                                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                    >
                                      <FileText className="w-4 h-4" />
                                      View Delivery Log
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderTop: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Rows per page:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1"
                    style={{
                      borderRadius: '6px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>
                    {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Drawer */}
      {isCreateDrawerOpen && (
        <CreateNotificationDrawer
          onClose={() => setIsCreateDrawerOpen(false)}
          onSubmit={(data) => {
            console.log('Create notification:', data);
            setIsCreateDrawerOpen(false);
          }}
        />
      )}

      {/* Duplicate Drawer */}
      {duplicatedCampaignName && selectedCampaign && (
        <CreateNotificationDrawer
          onClose={() => {
            setDuplicatedCampaignName(null);
            setSelectedCampaign(null);
          }}
          onSubmit={(data) => {
            console.log('Duplicate notification:', data);
            setDuplicatedCampaignName(null);
            setSelectedCampaign(null);
          }}
          initialData={{
            title: selectedCampaign.name,
            message: selectedCampaign.messageBody,
            type: selectedCampaign.type,
            targetType: selectedCampaign.targetScope.toLowerCase(),
            targetDetails: selectedCampaign.targetDetails,
            channels: {
              push: selectedCampaign.channels.includes('Push'),
              sms: selectedCampaign.channels.includes('SMS'),
              inApp: selectedCampaign.channels.includes('In-App'),
            },
            deepLink: selectedCampaign.deepLink,
            compliance: {
              promotionalConsent: true,
              quietHours: true,
            },
          }}
          duplicatedFrom={duplicatedCampaignName}
        />
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && selectedCampaign && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedCampaign(null);
          }}
          onDuplicate={() => {
            handleDuplicate(selectedCampaign);
            setIsDetailModalOpen(false);
          }}
        />
      )}

      {/* Cancel Dialog */}
      {isCancelDialogOpen && selectedCampaign && (
        <CancelCampaignDialog
          campaign={selectedCampaign}
          onClose={() => {
            setIsCancelDialogOpen(false);
            setSelectedCampaign(null);
          }}
          onConfirm={(reason) => {
            console.log('Cancel campaign:', selectedCampaign.id, reason);
            setIsCancelDialogOpen(false);
            setSelectedCampaign(null);
          }}
        />
      )}

      {/* Delivery Log Modal */}
      {isDeliveryLogModalOpen && selectedCampaign && (
        <DeliveryLogModal
          campaign={selectedCampaign}
          onClose={() => {
            setIsDeliveryLogModalOpen(false);
            setSelectedCampaign(null);
          }}
        />
      )}
    </div>
  );
}