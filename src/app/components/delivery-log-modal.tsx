import { useState } from 'react';
import { X, Search, CheckCircle, XCircle } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
}

interface DeliveryLogModalProps {
  campaign: Campaign;
  onClose: () => void;
}

interface DeliveryRecord {
  id: string;
  user: string;
  userId: string;
  channel: 'Push' | 'SMS' | 'In-App';
  deliveryStatus: 'Delivered' | 'Failed';
  deliveredTime?: string;
  opened: boolean;
  failedReason?: string;
}

// Mock delivery log data
const mockDeliveryLog: DeliveryRecord[] = [
  {
    id: '1',
    user: 'Rajesh Kumar',
    userId: 'USR-10234',
    channel: 'Push',
    deliveryStatus: 'Delivered',
    deliveredTime: '2024-02-06T08:00:15',
    opened: true,
  },
  {
    id: '2',
    user: 'Priya Sharma',
    userId: 'USR-10235',
    channel: 'SMS',
    deliveryStatus: 'Delivered',
    deliveredTime: '2024-02-06T08:00:18',
    opened: false,
  },
  {
    id: '3',
    user: 'Amit Patel',
    userId: 'USR-10236',
    channel: 'In-App',
    deliveryStatus: 'Delivered',
    deliveredTime: '2024-02-06T08:00:20',
    opened: true,
  },
  {
    id: '4',
    user: 'Anjali Reddy',
    userId: 'USR-10237',
    channel: 'Push',
    deliveryStatus: 'Failed',
    failedReason: 'Device token invalid',
  },
  {
    id: '5',
    user: 'Vikram Singh',
    userId: 'USR-10238',
    channel: 'SMS',
    deliveryStatus: 'Delivered',
    deliveredTime: '2024-02-06T08:00:25',
    opened: false,
  },
  {
    id: '6',
    user: 'Sneha Gupta',
    userId: 'USR-10239',
    channel: 'Push',
    deliveryStatus: 'Delivered',
    deliveredTime: '2024-02-06T08:00:28',
    opened: true,
  },
  {
    id: '7',
    user: 'Ramesh Kumar',
    userId: 'USR-10240',
    channel: 'In-App',
    deliveryStatus: 'Delivered',
    deliveredTime: '2024-02-06T08:00:30',
    opened: false,
  },
  {
    id: '8',
    user: 'Deepika Iyer',
    userId: 'USR-10241',
    channel: 'Push',
    deliveryStatus: 'Failed',
    failedReason: 'User opted out',
  },
];

export function DeliveryLogModal({ campaign, onClose }: DeliveryLogModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter logic
  const filteredLog = mockDeliveryLog.filter((record) => {
    const matchesSearch =
      record.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.deliveryStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedLog = filteredLog.slice(startIndex, startIndex + rowsPerPage);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Failed':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
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
          maxWidth: '1100px',
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
              Delivery Log
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

        {/* Filters */}
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <div className="grid grid-cols-12 gap-4">
            {/* Search */}
            <div className="col-span-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                <input
                  type="text"
                  placeholder="Search by user name or ID..."
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

            {/* Status Filter */}
            <div className="col-span-4">
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
                <option value="Delivered">Delivered</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 220px)' }}>
          <div className="table-scroll-container">
            <table className="w-full">
              <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                <tr>
                  <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                    User
                  </th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                    Channel
                  </th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                    Delivery Status
                  </th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                    Delivered Time
                  </th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                    Opened
                  </th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                    Failed Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedLog.map((record, index) => (
                  <tr
                    key={record.id}
                    style={{
                      borderBottom: index < paginatedLog.length - 1 ? '1px solid #F1F5F9' : 'none',
                    }}
                  >
                    <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                          {record.user}
                        </p>
                        <p style={{ fontSize: '11px', color: '#6B7280' }}>
                          {record.userId}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          fontSize: '10px',
                          fontWeight: '500',
                          ...getChannelBadgeColor(record.channel),
                        }}
                      >
                        {record.channel}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          fontSize: '11px',
                          fontWeight: '500',
                          ...getStatusColor(record.deliveryStatus),
                        }}
                      >
                        {record.deliveryStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                      {record.deliveredTime ? (
                        <div>
                          <p style={{ fontSize: '13px', color: '#111111' }}>
                            {new Date(record.deliveredTime).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p style={{ fontSize: '11px', color: '#6B7280' }}>
                            {new Date(record.deliveredTime).toLocaleTimeString('en-US', {
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
                      {record.deliveryStatus === 'Delivered' ? (
                        record.opened ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" style={{ color: '#16A34A' }} />
                            <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: '500' }}>
                              Yes
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <XCircle className="w-3 h-3" style={{ color: '#6B7280' }} />
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>
                              No
                            </span>
                          </div>
                        )
                      ) : (
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                      {record.failedReason ? (
                        <span style={{ fontSize: '12px', color: '#DC2626' }}>
                          {record.failedReason}
                        </span>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>—</span>
                      )}
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
                {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredLog.length)} of {filteredLog.length}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end px-6 py-4"
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