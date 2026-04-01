import { useState } from 'react';
import {
  Search,
  X,
  CheckCircle,
  XCircle,
  FileText,
  Image as ImageIcon,
  User,
  Calendar,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface KYCRecord {
  riderId: string;
  riderName: string;
  phone: string;
  city: string;
  kycStatus: 'Pending' | 'Rejected' | 'Expired';
  licenseStatus: 'Pending' | 'Verified' | 'Rejected';
  documentsSubmitted: string;
  lastReviewDate: string;
  reviewer: string;
  // Detail fields
  email?: string;
  submissionTimestamp?: string;
  licenseNumber?: string;
  licenseImage?: string;
  idProofType?: string;
  idProofNumber?: string;
  idProofImage?: string;
  selfieImage?: string;
  rejectionReason?: string;
}

const kycRecordsData: KYCRecord[] = [
  {
    riderId: 'RDR-9C2D4E',
    riderName: 'Priya Sharma',
    phone: '+91 87654 32109',
    city: 'Delhi',
    kycStatus: 'Pending',
    licenseStatus: 'Pending',
    documentsSubmitted: '2026-02-05',
    lastReviewDate: '—',
    reviewer: '—',
    email: 'priya.sharma@yahoo.com',
    submissionTimestamp: '2026-02-05 09:30 AM',
    licenseNumber: 'DL••••1234',
    licenseImage: 'license_image.jpg',
    idProofType: 'Aadhaar',
    idProofNumber: '••••••••5678',
    idProofImage: 'aadhaar_image.jpg',
    selfieImage: 'selfie.jpg',
  },
  {
    riderId: 'RDR-4N8P1Q',
    riderName: 'Ananya Desai',
    phone: '+91 43210 98765',
    city: 'Hyderabad',
    kycStatus: 'Pending',
    licenseStatus: 'Pending',
    documentsSubmitted: '2026-02-04',
    lastReviewDate: '—',
    reviewer: '—',
    email: 'ananya.d@gmail.com',
    submissionTimestamp: '2026-02-04 02:15 PM',
    licenseNumber: 'TS••••2345',
    licenseImage: 'license_image.jpg',
    idProofType: 'Aadhaar',
    idProofNumber: '••••••••9012',
    idProofImage: 'aadhaar_image.jpg',
    selfieImage: 'selfie.jpg',
  },
  {
    riderId: 'RDR-6D4H2J',
    riderName: 'Sneha Patel',
    phone: '+91 65432 10987',
    city: 'Pune',
    kycStatus: 'Rejected',
    licenseStatus: 'Rejected',
    documentsSubmitted: '2026-01-22',
    lastReviewDate: '2026-01-25',
    reviewer: 'Admin User',
    email: 'sneha.patel@gmail.com',
    submissionTimestamp: '2026-01-22 11:45 AM',
    licenseNumber: 'MH••••3456',
    licenseImage: 'license_image.jpg',
    idProofType: 'Aadhaar',
    idProofNumber: '••••••••7890',
    idProofImage: 'aadhaar_image.jpg',
    selfieImage: 'selfie.jpg',
    rejectionReason: 'Documents are unclear and partially obscured. Please re-upload clear images.',
  },
  {
    riderId: 'RDR-2M5N8P',
    riderName: 'Rohit Gupta',
    phone: '+91 32109 87654',
    city: 'Bangalore',
    kycStatus: 'Pending',
    licenseStatus: 'Pending',
    documentsSubmitted: '2026-02-03',
    lastReviewDate: '—',
    reviewer: '—',
    email: 'rohit.g@gmail.com',
    submissionTimestamp: '2026-02-03 04:20 PM',
    licenseNumber: 'KA••••6789',
    licenseImage: 'license_image.jpg',
    idProofType: 'PAN Card',
    idProofNumber: 'ABCD••••E',
    idProofImage: 'pan_image.jpg',
    selfieImage: 'selfie.jpg',
  },
];

export function KYCVerification() {
  const [searchTerm, setSearchTerm] = useState('');
  const [kycStatusFilter, setKycStatusFilter] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null);

  const filteredRecords = kycRecordsData.filter((record) => {
    const matchesSearch =
      record.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.riderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.phone.includes(searchTerm);

    const matchesKycStatus = kycStatusFilter === 'All' || record.kycStatus === kycStatusFilter;

    return matchesSearch && matchesKycStatus;
  });

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Pending':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Rejected':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      case 'Expired':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#F7F9FC', minHeight: '100%' }}>
      {/* Header */}
      <div>
        <h1 className="font-semibold" style={{ fontSize: '24px', color: '#111111' }}>
          Rider KYC & Verification
        </h1>
        <p className="mt-1" style={{ fontSize: '14px', color: '#6B7280' }}>
          Review and verify rider documents
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #E5E7EB' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: '#6B7280' }}
              />
              <input
                type="text"
                placeholder="Search by name, phone, or rider ID..."
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

          {/* KYC Status Filter */}
          <div>
            <select
              value={kycStatusFilter}
              onChange={(e) => setKycStatusFilter(e.target.value)}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                color: '#111111',
              }}
            >
              <option value="All">All KYC Status</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* KYC Records Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
        <div className="table-scroll-container">
          <table className="w-full" style={{ minWidth: '1200px' }}>
            <thead style={{ backgroundColor: '#F7F9FC' }}>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  Rider ID
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '180px' }}>
                  Name
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '140px' }}>
                  Phone
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  City
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  KYC Status
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '120px' }}>
                  License Status
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '140px' }}>
                  Submitted Date
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '140px' }}>
                  Last Review
                </th>
                <th className="px-4 text-left uppercase tracking-wider" style={{ height: '44px', fontSize: '11px', fontWeight: '600', color: '#6B7280', width: '140px' }}>
                  Reviewer
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredRecords.map((record, index) => (
                <tr
                  key={record.riderId}
                  style={{
                    borderBottom: index < filteredRecords.length - 1 ? '1px solid #F1F5F9' : 'none',
                    height: '48px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  onClick={() => setSelectedRecord(record)}
                >
                  <td className="px-4">
                    <code style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6B7280', fontWeight: '500' }}>
                      {record.riderId}
                    </code>
                  </td>
                  <td className="px-4" style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {record.riderName}
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#6B7280' }}>
                    {record.phone}
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#111111' }}>
                    {record.city}
                  </td>
                  <td className="px-4">
                    <span
                      className="inline-flex px-2 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        ...getKycStatusColor(record.kycStatus),
                      }}
                    >
                      {record.kycStatus}
                    </span>
                  </td>
                  <td className="px-4">
                    <span
                      className="inline-flex px-2 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        ...getKycStatusColor(record.licenseStatus),
                      }}
                    >
                      {record.licenseStatus}
                    </span>
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#6B7280' }}>
                    {record.documentsSubmitted}
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#6B7280' }}>
                    {record.lastReviewDate}
                  </td>
                  <td className="px-4" style={{ fontSize: '13px', color: '#6B7280' }}>
                    {record.reviewer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Review Drawer */}
      {selectedRecord && (
        <KYCReviewDrawer
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
}

interface KYCReviewDrawerProps {
  record: KYCRecord;
  onClose: () => void;
}

function KYCReviewDrawer({ record, onClose }: KYCReviewDrawerProps) {
  const [decision, setDecision] = useState<'approve' | 'reject' | 'request-reupload' | null>(null);
  const [notes, setNotes] = useState('');

  const handleSubmitDecision = () => {
    console.log('Decision:', decision, 'Notes:', notes);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full bg-white z-50 shadow-2xl"
        style={{
          width: '600px',
          maxWidth: '90vw',
          borderLeft: '1px solid #E5E7EB',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
              KYC Review
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
              {record.riderName} • {record.riderId}
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
        <div className="overflow-y-auto p-6 space-y-6" style={{ height: 'calc(100vh - 180px)' }}>
          {/* Rider Summary */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
              Rider Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ fontSize: '13px', color: '#6B7280' }}>Name</span>
                <span style={{ fontSize: '13px', color: '#111111', fontWeight: '500' }}>{record.riderName}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: '13px', color: '#6B7280' }}>Phone</span>
                <span style={{ fontSize: '13px', color: '#111111', fontWeight: '500' }}>{record.phone}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: '13px', color: '#6B7280' }}>Email</span>
                <span style={{ fontSize: '13px', color: '#111111', fontWeight: '500' }}>{record.email}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: '13px', color: '#6B7280' }}>City</span>
                <span style={{ fontSize: '13px', color: '#111111', fontWeight: '500' }}>{record.city}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: '13px', color: '#6B7280' }}>Submitted</span>
                <span style={{ fontSize: '13px', color: '#111111', fontWeight: '500' }}>{record.submissionTimestamp}</span>
              </div>
            </div>
          </div>

          {/* Document Previews */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
              Document Previews
            </h3>
            <div className="space-y-4">
              {/* License Image */}
              <DocumentPreviewBlock
                title="Driving License"
                subtitle={`License No: ${record.licenseNumber}`}
                icon={FileText}
              />

              {/* ID Proof */}
              <DocumentPreviewBlock
                title={`ID Proof - ${record.idProofType}`}
                subtitle={`ID No: ${record.idProofNumber}`}
                icon={FileText}
              />

              {/* Selfie */}
              <DocumentPreviewBlock
                title="Selfie Verification"
                subtitle="For face match verification"
                icon={User}
              />
            </div>
          </div>

          {/* Rejection Reason (if rejected) */}
          {record.kycStatus === 'Rejected' && record.rejectionReason && (
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                Previous Rejection Reason
              </h3>
              <div
                className="p-4 rounded-lg flex items-start gap-3"
                style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5' }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
                <p style={{ fontSize: '13px', color: '#991B1B', lineHeight: '1.5' }}>
                  {record.rejectionReason}
                </p>
              </div>
            </div>
          )}

          {/* Decision Controls */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
              Review Decision
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setDecision('approve')}
                className="w-full flex items-center justify-between p-4 rounded-lg transition-colors"
                style={{
                  border: decision === 'approve' ? '2px solid #16A34A' : '1px solid #E5E7EB',
                  backgroundColor: decision === 'approve' ? '#F0FDF4' : 'white',
                }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#16A34A' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                    Approve KYC
                  </span>
                </div>
              </button>

              <button
                onClick={() => setDecision('reject')}
                className="w-full flex items-center justify-between p-4 rounded-lg transition-colors"
                style={{
                  border: decision === 'reject' ? '2px solid #DC2626' : '1px solid #E5E7EB',
                  backgroundColor: decision === 'reject' ? '#FEF2F2' : 'white',
                }}
              >
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5" style={{ color: '#DC2626' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                    Reject KYC
                  </span>
                </div>
              </button>

              <button
                onClick={() => setDecision('request-reupload')}
                className="w-full flex items-center justify-between p-4 rounded-lg transition-colors"
                style={{
                  border: decision === 'request-reupload' ? '2px solid #F59E0B' : '1px solid #E5E7EB',
                  backgroundColor: decision === 'request-reupload' ? '#FFFBEB' : 'white',
                }}
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" style={{ color: '#F59E0B' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                    Request Re-upload
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Decision Notes */}
          {decision && (
            <div>
              <label
                htmlFor="notes"
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#111111',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Decision Notes <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter reason for your decision..."
                className="w-full px-3 py-2"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  resize: 'none',
                }}
              />
            </div>
          )}
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
            Cancel
          </button>
          <button
            onClick={handleSubmitDecision}
            disabled={!decision || !notes.trim()}
            className="px-6 transition-colors"
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: (!decision || !notes.trim()) ? '#E5E7EB' : '#F24E1E',
              color: (!decision || !notes.trim()) ? '#9CA3AF' : 'white',
              cursor: (!decision || !notes.trim()) ? 'not-allowed' : 'pointer',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              if (decision && notes.trim()) {
                e.currentTarget.style.backgroundColor = '#D84315';
              }
            }}
            onMouseLeave={(e) => {
              if (decision && notes.trim()) {
                e.currentTarget.style.backgroundColor = '#F24E1E';
              }
            }}
          >
            Submit Decision
          </button>
        </div>
      </div>
    </>
  );
}

interface DocumentPreviewBlockProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

function DocumentPreviewBlock({ title, subtitle, icon: Icon }: DocumentPreviewBlockProps) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{ border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#F7F9FC' }}
        >
          <Icon className="w-6 h-6" style={{ color: '#6B7280' }} />
        </div>
        <div className="flex-1">
          <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#111111', marginBottom: '2px' }}>
            {title}
          </h4>
          <p style={{ fontSize: '12px', color: '#6B7280' }}>{subtitle}</p>
          <button
            className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded transition-colors"
            style={{
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              color: '#111111',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            View Document
          </button>
        </div>
      </div>
    </div>
  );
}