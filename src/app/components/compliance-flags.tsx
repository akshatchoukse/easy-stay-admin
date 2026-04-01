import { useState } from 'react';
import {
  Search,
  X,
  Flag,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  UserX,
  Ban,
} from 'lucide-react';

interface ComplianceFlag {
  id: string;
  riderId: string;
  riderName: string;
  flagType: 'Payment Failure' | 'Overdue Return' | 'Document Fraud' | 'Policy Violation' | 'Incident Report';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  triggerReason: string;
  linkedBookingId: string;
  flagCreatedDate: string;
  createdBy: string;
  status: 'Active' | 'Resolved';
  // Detail fields
  phone?: string;
  city?: string;
  evidenceLinks?: string[];
  relatedBookings?: string[];
  paymentFailuresCount?: number;
  incidentNotes?: Array<{ timestamp: string; note: string; author: string }>;
  resolutionNotes?: string;
}

const complianceFlagsData: ComplianceFlag[] = [
  {
    id: 'FLG-8A3D1',
    riderId: 'RDR-6D4H2J',
    riderName: 'Sneha Patel',
    flagType: 'Payment Failure',
    severity: 'Medium',
    triggerReason: 'Multiple payment failures detected during manual review',
    linkedBookingId: 'BKG-45678',
    flagCreatedDate: '2026-02-04',
    createdBy: 'Admin User',
    status: 'Active',
    phone: '+91 65432 10987',
    city: 'Pune',
    evidenceLinks: ['Payment ID: PAY-123456', 'Payment ID: PAY-123457'],
    relatedBookings: ['BKG-45678', 'BKG-45690'],
    paymentFailuresCount: 2,
    incidentNotes: [
      {
        timestamp: '2026-02-04 10:30 AM',
        note: 'Flagged during manual payment review',
        author: 'Admin User',
      },
      {
        timestamp: '2026-02-04 02:15 PM',
        note: 'Contacted rider via email. Awaiting response.',
        author: 'Admin User',
      },
    ],
  },
  {
    id: 'FLG-9B4E2',
    riderId: 'RDR-7H3J5',
    riderName: 'Karan Nair',
    flagType: 'Overdue Return',
    severity: 'High',
    triggerReason: 'Vehicle not returned after booking end time',
    linkedBookingId: 'BKG-56789',
    flagCreatedDate: '2026-02-05',
    createdBy: 'Operations Team',
    status: 'Active',
    phone: '+91 98765 11111',
    city: 'Mumbai',
    evidenceLinks: ['Booking ID: BKG-56789', 'Vehicle ID: VEH-234'],
    relatedBookings: ['BKG-56789'],
    paymentFailuresCount: 0,
    incidentNotes: [
      {
        timestamp: '2026-02-05 08:00 AM',
        note: 'Vehicle overdue. Rider not reachable.',
        author: 'Operations Team',
      },
      {
        timestamp: '2026-02-05 11:30 AM',
        note: 'Multiple calls attempted. No response.',
        author: 'Support Agent',
      },
    ],
  },
  {
    id: 'FLG-2C6F3',
    riderId: 'RDR-3K8M1',
    riderName: 'Meera Iyer',
    flagType: 'Document Fraud',
    severity: 'Critical',
    triggerReason: 'KYC documents flagged during manual verification',
    linkedBookingId: '—',
    flagCreatedDate: '2026-02-03',
    createdBy: 'KYC Reviewer',
    status: 'Active',
    phone: '+91 87654 22222',
    city: 'Bangalore',
    evidenceLinks: ['KYC Document Mismatch Report'],
    relatedBookings: [],
    paymentFailuresCount: 0,
    incidentNotes: [
      {
        timestamp: '2026-02-03 03:45 PM',
        note: 'Document inconsistencies identified during review.',
        author: 'KYC Reviewer',
      },
      {
        timestamp: '2026-02-03 04:30 PM',
        note: 'Account suspended pending investigation.',
        author: 'Compliance Manager',
      },
    ],
  },
  {
    id: 'FLG-4D7G8',
    riderId: 'RDR-1L5N9',
    riderName: 'Aman Reddy',
    flagType: 'Policy Violation',
    severity: 'Low',
    triggerReason: 'Minor vehicle damage reported',
    linkedBookingId: 'BKG-67890',
    flagCreatedDate: '2026-02-02',
    createdBy: 'Hub Manager',
    status: 'Resolved',
    phone: '+91 76543 33333',
    city: 'Hyderabad',
    evidenceLinks: ['Damage Report: DR-001', 'Damage Report: DR-002'],
    relatedBookings: ['BKG-67890', 'BKG-67901'],
    paymentFailuresCount: 0,
    incidentNotes: [
      {
        timestamp: '2026-02-02 09:15 AM',
        note: 'Minor scratches reported on vehicle.',
        author: 'Hub Manager',
      },
      {
        timestamp: '2026-02-02 05:00 PM',
        note: 'Rider accepted responsibility and paid damage fee.',
        author: 'Operations Team',
      },
      {
        timestamp: '2026-02-03 10:00 AM',
        note: 'Issue resolved. Flag closed.',
        author: 'Compliance Manager',
      },
    ],
    resolutionNotes: 'Rider paid damage fee. No further action required.',
  },
  {
    id: 'FLG-5E8H4',
    riderId: 'RDR-2M6P3',
    riderName: 'Ravi Kumar',
    flagType: 'Incident Report',
    severity: 'Medium',
    triggerReason: 'Minor accident reported during rental period',
    linkedBookingId: 'BKG-78901',
    flagCreatedDate: '2026-02-01',
    createdBy: 'Support Agent',
    status: 'Active',
    phone: '+91 65432 44444',
    city: 'Delhi',
    evidenceLinks: ['Incident Report: IR-456', 'Police Report: PR-789'],
    relatedBookings: ['BKG-78901'],
    paymentFailuresCount: 0,
    incidentNotes: [
      {
        timestamp: '2026-02-01 02:30 PM',
        note: 'Rider reported minor collision. No injuries.',
        author: 'Support Agent',
      },
      {
        timestamp: '2026-02-01 06:00 PM',
        note: 'Insurance claim initiated.',
        author: 'Insurance Team',
      },
    ],
  },
];

export function ComplianceFlags() {
  const [searchTerm, setSearchTerm] = useState('');
  const [flagTypeFilter, setFlagTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedFlag, setSelectedFlag] = useState<ComplianceFlag | null>(null);

  const filteredFlags = complianceFlagsData.filter((flag) => {
    const matchesSearch =
      flag.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.riderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFlagType = flagTypeFilter === 'All' || flag.flagType === flagTypeFilter;
    const matchesSeverity = severityFilter === 'All' || flag.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' || flag.status === statusFilter;

    return matchesSearch && matchesFlagType && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return { backgroundColor: '#EFF6FF', color: '#2563EB' };
      case 'Medium':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'High':
        return { backgroundColor: '#FED7AA', color: '#EA580C' };
      case 'Critical':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Resolved':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#F7F9FC', minHeight: '100%' }}>
      {/* Header */}
      <div>
        <h1 className="font-semibold" style={{ fontSize: '24px', color: '#111111' }}>
          Rider Compliance Flags
        </h1>
        <p className="mt-1" style={{ fontSize: '14px', color: '#6B7280' }}>
          Riders with risk or policy flags
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #E5E7EB' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: '#6B7280' }}
              />
              <input
                type="text"
                placeholder="Search by rider or flag ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          {/* Flag Type */}
          <div>
            <select
              value={flagTypeFilter}
              onChange={(e) => setFlagTypeFilter(e.target.value)}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                color: '#111111',
              }}
            >
              <option value="All">All Flag Types</option>
              <option value="Payment Failure">Payment Failure</option>
              <option value="Overdue Return">Overdue Return</option>
              <option value="Document Fraud">Document Fraud</option>
              <option value="Policy Violation">Policy Violation</option>
              <option value="Incident Report">Incident Report</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                color: '#111111',
              }}
            >
              <option value="All">All Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                color: '#111111',
              }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Flags Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
        <div className="table-scroll-container">
          <table className="w-full" style={{ minWidth: '1400px' }}>
            <thead style={{ backgroundColor: '#F7F9FC' }}>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Flag ID
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Rider ID
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '160px' }}>
                  Rider Name
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '140px' }}>
                  Flag Type
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '100px' }}>
                  Severity
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '280px' }}>
                  Trigger Reason
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Booking ID
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Created Date
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '140px' }}>
                  Created By
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '100px' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredFlags.map((flag, index) => (
                <tr
                  key={flag.id}
                  style={{
                    borderBottom: index < filteredFlags.length - 1 ? '1px solid #F1F5F9' : 'none',
                    height: '48px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  onClick={() => setSelectedFlag(flag)}
                >
                  <td className="px-4">
                    <code style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6B7280', fontWeight: '500' }}>
                      {flag.id}
                    </code>
                  </td>
                  <td className="px-4">
                    <code style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6B7280', fontWeight: '500' }}>
                      {flag.riderId}
                    </code>
                  </td>
                  <td className="px-4" style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {flag.riderName}
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#111111' }}>
                    {flag.flagType}
                  </td>
                  <td className="px-4">
                    <span
                      className="inline-flex px-2 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        ...getSeverityColor(flag.severity),
                      }}
                    >
                      {flag.severity}
                    </span>
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#6B7280' }}>
                    {flag.triggerReason}
                  </td>
                  <td className="px-4">
                    <code style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6B7280' }}>
                      {flag.linkedBookingId}
                    </code>
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#6B7280' }}>
                    {flag.flagCreatedDate}
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#6B7280' }}>
                    {flag.createdBy}
                  </td>
                  <td className="px-4">
                    <span
                      className="inline-flex px-2 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        ...getStatusColor(flag.status),
                      }}
                    >
                      {flag.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flag Detail Modal */}
      {selectedFlag && (
        <FlagDetailModal
          flag={selectedFlag}
          onClose={() => setSelectedFlag(null)}
        />
      )}
    </div>
  );
}

interface FlagDetailModalProps {
  flag: ComplianceFlag;
  onClose: () => void;
}

function FlagDetailModal({ flag, onClose }: FlagDetailModalProps) {
  const [newNote, setNewNote] = useState('');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return { backgroundColor: '#EFF6FF', color: '#2563EB' };
      case 'Medium':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'High':
        return { backgroundColor: '#FED7AA', color: '#EA580C' };
      case 'Critical':
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
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
              Compliance Flag Details
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
              {flag.id} • {flag.riderName}
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
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <div className="space-y-6">
            {/* Rider Summary */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                Rider Summary
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <InfoField label="Rider Name" value={flag.riderName} />
                <InfoField label="Rider ID" value={flag.riderId} mono />
                <InfoField label="Phone" value={flag.phone || '—'} />
                <InfoField label="City" value={flag.city || '—'} />
              </div>
            </div>

            {/* Flag Details */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                Flag Information
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                    FLAG TYPE
                  </label>
                  <span style={{ fontSize: '13px', color: '#111111' }}>{flag.flagType}</span>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                    SEVERITY
                  </label>
                  <span
                    className="inline-flex px-2 py-1 rounded-full"
                    style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      ...getSeverityColor(flag.severity),
                    }}
                  >
                    {flag.severity}
                  </span>
                </div>
                <InfoField label="Trigger Reason" value={flag.triggerReason} />
                <InfoField label="Linked Booking ID" value={flag.linkedBookingId} mono />
                <InfoField label="Flag Created" value={flag.flagCreatedDate} />
                <InfoField label="Created By" value={flag.createdBy} />
              </div>
            </div>

            {/* Evidence Links */}
            {flag.evidenceLinks && flag.evidenceLinks.length > 0 && (
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Evidence Links
                </h3>
                <div className="space-y-2">
                  {flag.evidenceLinks.map((evidence, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg flex items-center gap-2"
                      style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                    >
                      <Flag className="w-4 h-4" style={{ color: '#6B7280' }} />
                      <span style={{ fontSize: '13px', color: '#111111' }}>{evidence}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Bookings */}
            {flag.relatedBookings && flag.relatedBookings.length > 0 && (
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Related Bookings
                </h3>
                <div className="flex flex-wrap gap-2">
                  {flag.relatedBookings.map((bookingId, index) => (
                    <code
                      key={index}
                      className="px-3 py-1.5 rounded"
                      style={{
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        backgroundColor: '#F7F9FC',
                        border: '1px solid #E5E7EB',
                        color: '#6B7280',
                      }}
                    >
                      {bookingId}
                    </code>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Failures */}
            {flag.paymentFailuresCount !== undefined && flag.paymentFailuresCount > 0 && (
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Payment Failures
                </h3>
                <div
                  className="p-4 rounded-lg flex items-center gap-3"
                  style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5' }}
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#DC2626' }} />
                  <span style={{ fontSize: '14px', color: '#991B1B', fontWeight: '500' }}>
                    {flag.paymentFailuresCount} payment failure(s) recorded
                  </span>
                </div>
              </div>
            )}

            {/* Incident Notes Timeline */}
            {flag.incidentNotes && flag.incidentNotes.length > 0 && (
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Incident Notes Timeline
                </h3>
                <div className="space-y-3">
                  {flag.incidentNotes.map((note, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#6B7280' }} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>{note.timestamp}</span>
                            <span style={{ fontSize: '12px', fontWeight: '500', color: '#111111' }}>{note.author}</span>
                          </div>
                          <p style={{ fontSize: '13px', color: '#111111', lineHeight: '1.5' }}>
                            {note.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resolution Notes (if resolved) */}
            {flag.status === 'Resolved' && flag.resolutionNotes && (
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Resolution Notes
                </h3>
                <div
                  className="p-4 rounded-lg flex items-start gap-3"
                  style={{ backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0' }}
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }} />
                  <p style={{ fontSize: '13px', color: '#166534', lineHeight: '1.5' }}>
                    {flag.resolutionNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Add Compliance Note (if active) */}
            {flag.status === 'Active' && (
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Add Compliance Note
                </h3>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note to the incident timeline..."
                  className="w-full px-3 py-2 mb-3"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    resize: 'none',
                  }}
                />
                <button
                  onClick={() => {
                    console.log('Add note:', newNote);
                    setNewNote('');
                  }}
                  disabled={!newNote.trim()}
                  className="flex items-center gap-2 px-4 transition-colors"
                  style={{
                    height: '36px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '500',
                    backgroundColor: !newNote.trim() ? '#E5E7EB' : '#F24E1E',
                    color: !newNote.trim() ? '#9CA3AF' : 'white',
                    cursor: !newNote.trim() ? 'not-allowed' : 'pointer',
                    border: 'none',
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Add Note
                </button>
              </div>
            )}
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
          {flag.status === 'Active' && (
            <div className="flex gap-3">
              <button
                onClick={() => console.log('Resolve flag')}
                className="px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #16A34A',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#16A34A',
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#DCFCE7';
                  e.currentTarget.style.color = '#15803D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#16A34A';
                }}
              >
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Resolve Flag
              </button>
              <button
                onClick={() => console.log('Escalate')}
                className="px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #F59E0B',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#F59E0B',
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEF3C7';
                  e.currentTarget.style.color = '#92400E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#F59E0B';
                }}
              >
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Escalate
              </button>
              <button
                onClick={() => console.log('Suspend rider')}
                className="px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #DC2626',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#DC2626',
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEE2E2';
                  e.currentTarget.style.color = '#991B1B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#DC2626';
                }}
              >
                <Ban className="w-4 h-4 inline mr-2" />
                Suspend Rider
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

interface InfoFieldProps {
  label: string;
  value: string;
  mono?: boolean;
}

function InfoField({ label, value, mono }: InfoFieldProps) {
  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
        {label.toUpperCase()}
      </label>
      <p
        style={{
          fontSize: '13px',
          color: '#111111',
          fontFamily: mono ? 'monospace' : 'inherit',
        }}
      >
        {value}
      </p>
    </div>
  );
}