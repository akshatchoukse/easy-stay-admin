import { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  Calendar,
  FileText,
  Wrench,
  Image as ImageIcon,
  MessageSquare,
  RotateCw,
  Upload,
  Download,
  Edit,
} from 'lucide-react';
import { ScooterIcon } from './ui/scooter-icon';

interface MaintenanceCaseProfileProps {
  request: any;
  onClose: () => void;
}

// Mock data - this would come from API/props in real implementation
const mockCaseData = {
  id: '1',
  ticketId: 'DT-2024-0001',
  registrationNumber: 'KA-01-MH-1234',
  vehicleModel: 'Activa Electric',
  hubName: 'MG Road Hub',
  hubCode: 'BLR-MGR-01',
  hubStreetAddress: '123, MG Road, Near Metro Station',
  hubLandmark: 'Opposite Phoenix Mall',
  hubArea: 'MG Road',
  hubCity: 'Bangalore',
  hubState: 'Karnataka',
  hubPincode: '560001',
  city: 'Bangalore',
  issueCategory: 'Battery Fault',
  severity: 'Critical' as const,
  requestedBy: 'Ramesh Kumar',
  requestedByRole: 'Hub Manager',
  requestedOn: '2024-02-06T10:30:00',
  proposedStartDate: '2024-02-06T14:00:00',
  proposedEndDate: '2024-02-07T18:00:00',
  status: 'Pending Approval' as const,
  assignedTechnician: 'Not Assigned',
  lastUpdated: '2024-02-06T10:30:00',
  issueDescription: 'Battery not charging beyond 45%. Customer reported sudden battery drain during last ride. Vehicle showing error code E-BAT-045. Immediate inspection required as this affects vehicle availability.',
  hasActiveBooking: true,
  estimatedDowntime: '1-2 days',
  priority: 'High',
  repairActions: [
    {
      id: '1',
      timestamp: '2024-02-06T11:00:00',
      technician: 'Suresh Patil',
      action: 'Initial Diagnosis',
      notes: 'Battery voltage reading shows 38V instead of expected 48V. Running capacity test.',
      status: 'Completed',
    },
    {
      id: '2',
      timestamp: '2024-02-06T12:30:00',
      technician: 'Suresh Patil',
      action: 'Battery Test',
      notes: 'Capacity test confirms battery degradation. Cells 3-6 showing irregular voltage. Recommend battery replacement.',
      status: 'Completed',
    },
  ],
  evidencePhotos: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c7?w=400',
  ],
  timeline: [
    {
      id: '1',
      timestamp: '2024-02-06T10:30:00',
      user: 'Ramesh Kumar',
      action: 'Request Created',
      description: 'Downtime request initiated for battery fault',
    },
    {
      id: '2',
      timestamp: '2024-02-06T10:45:00',
      user: 'System',
      action: 'Notification Sent',
      description: 'Alert sent to maintenance team',
    },
    {
      id: '3',
      timestamp: '2024-02-06T11:00:00',
      user: 'Suresh Patil',
      action: 'Inspection Started',
      description: 'Initial diagnosis begun',
    },
  ],
};

// Mock system users - technicians
const systemTechnicians = [
  { id: '1', name: 'Suresh Patil', role: 'Senior Technician' },
  { id: '2', name: 'Rajesh Kumar', role: 'Technician' },
  { id: '3', name: 'Amit Singh', role: 'Senior Technician' },
  { id: '4', name: 'Vijay Sharma', role: 'Technician' },
  { id: '5', name: 'Prakash Reddy', role: 'Lead Technician' },
  { id: '6', name: 'Anil Mehta', role: 'Technician' },
];

export function MaintenanceCaseProfile({ request, onClose }: MaintenanceCaseProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'repair-actions' | 'evidence' | 'timeline'>('overview');
  const [caseData, setCaseData] = useState(mockCaseData);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [noteForm, setNoteForm] = useState({
    action: '',
    notes: '',
    technician: '',
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Minor':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      case 'Major':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Critical':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return { backgroundColor: '#DBEAFE', color: '#2563EB' };
      case 'Approved':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'In Repair':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'Awaiting Closure':
        return { backgroundColor: '#FFF1EC', color: '#F24E1E' };
      case 'Closed':
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
      case 'Rejected':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      default:
        return { backgroundColor: '#F7F9FC', color: '#6B7280' };
    }
  };

  const calculateOpenDuration = () => {
    const start = new Date(caseData.requestedOn);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    return `${hours}h`;
  };

  const handleAddRepairNote = () => {
    if (!noteForm.action || !noteForm.notes || !noteForm.technician) {
      alert('Please fill in all fields');
      return;
    }

    const newRepairAction = {
      id: String(caseData.repairActions.length + 1),
      timestamp: new Date().toISOString(),
      technician: noteForm.technician,
      action: noteForm.action,
      notes: noteForm.notes,
      status: 'Completed',
    };

    setCaseData({
      ...caseData,
      repairActions: [...caseData.repairActions, newRepairAction],
    });

    setNoteForm({ action: '', notes: '', technician: '' });
    setIsAddNoteModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-8">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 mb-6 transition-colors"
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#6B7280',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Maintenance Governance
        </button>

        {/* Header Section */}
        <div className="bg-white p-6 mb-6" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* Ticket ID */}
              <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '8px' }}>
                {caseData.ticketId}
              </h1>
              
              {/* Registration Number, Status, Severity */}
              <div className="flex items-center gap-3 mb-3">
                <button
                  className="flex items-center gap-2 transition-colors"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#F24E1E' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  <ScooterIcon className="w-4 h-4" />
                  {caseData.registrationNumber}
                </button>
                <span style={{ color: '#E5E7EB' }}>•</span>
                <span
                  className="px-2 py-1 rounded-full"
                  style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    ...getStatusColor(caseData.status),
                  }}
                >
                  {caseData.status}
                </span>
                <span
                  className="px-2 py-1 rounded-full"
                  style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    ...getSeverityColor(caseData.severity),
                  }}
                >
                  {caseData.severity}
                </span>
              </div>

              {/* Category and Date */}
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                  {caseData.issueCategory}
                </span>
                <span style={{ color: '#E5E7EB' }}>•</span>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                  Created {new Date(caseData.requestedOn).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <MessageSquare className="w-4 h-4" />
                Add Note
              </button>
              {caseData.status === 'Pending Approval' && (
                <>
                  <button
                    className="flex items-center gap-2 px-4 transition-colors"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #DC2626',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#DC2626',
                      backgroundColor: 'white',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 text-white transition-colors"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      backgroundColor: '#16A34A',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                </>
              )}
              {caseData.status === 'Approved' && (
                <button
                  className="flex items-center gap-2 px-4 text-white transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#F24E1E',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
                >
                  <Wrench className="w-4 h-4" />
                  Mark In Repair
                </button>
              )}
              {caseData.status === 'In Repair' && (
                <button
                  className="flex items-center gap-2 px-4 text-white transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#F24E1E',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Completed
                </button>
              )}
              {caseData.status === 'Awaiting Closure' && (
                <button
                  className="flex items-center gap-2 px-4 text-white transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#16A34A',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
                >
                  <CheckCircle className="w-4 h-4" />
                  Close Case
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary Info Cards */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          {/* Vehicle + Hub */}
          <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-2">
              <ScooterIcon className="w-4 h-4" style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                Vehicle & Hub
              </span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
              {caseData.registrationNumber}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
              {caseData.vehicleModel}
            </p>
            <p style={{ fontSize: '13px', color: '#111111' }}>
              {caseData.hubName}
            </p>
          </div>

          {/* Requested By */}
          <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4" style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                Requested By
              </span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
              {caseData.requestedBy}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>
              {caseData.requestedByRole}
            </p>
          </div>

          {/* Severity */}
          

          {/* Status */}
          

          {/* Assigned Technician */}
          <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-4 h-4" style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                Technician
              </span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: caseData.assignedTechnician === 'Not Assigned' ? '#6B7280' : '#111111' }}>
              {caseData.assignedTechnician}
            </p>
            {caseData.assignedTechnician === 'Not Assigned' && (
              <button
                style={{ fontSize: '12px', color: '#F24E1E', marginTop: '4px' }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                Assign Now
              </button>
            )}
          </div>

          {/* Open Duration */}
          <div className="bg-white p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                Open Duration
              </span>
            </div>
            <p style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>
              {calculateOpenDuration()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
          {/* Tab Headers */}
          <div className="flex items-center gap-1 px-6 pt-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className="px-4 py-2 transition-colors"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'overview' ? '#F24E1E' : '#6B7280',
                borderBottom: activeTab === 'overview' ? '2px solid #F24E1E' : '2px solid transparent',
                marginBottom: '-1px',
              }}
              onMouseEnter={(e) => activeTab !== 'overview' && (e.currentTarget.style.color = '#111111')}
              onMouseLeave={(e) => activeTab !== 'overview' && (e.currentTarget.style.color = '#6B7280')}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setActiveTab('repair-actions')}
              className="px-4 py-2 transition-colors"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'repair-actions' ? '#F24E1E' : '#6B7280',
                borderBottom: activeTab === 'repair-actions' ? '2px solid #F24E1E' : '2px solid transparent',
                marginBottom: '-1px',
              }}
              onMouseEnter={(e) => activeTab !== 'repair-actions' && (e.currentTarget.style.color = '#111111')}
              onMouseLeave={(e) => activeTab !== 'repair-actions' && (e.currentTarget.style.color = '#6B7280')}
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Repair Actions
              </div>
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className="px-4 py-2 transition-colors"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'evidence' ? '#F24E1E' : '#6B7280',
                borderBottom: activeTab === 'evidence' ? '2px solid #F24E1E' : '2px solid transparent',
                marginBottom: '-1px',
              }}
              onMouseEnter={(e) => activeTab !== 'evidence' && (e.currentTarget.style.color = '#111111')}
              onMouseLeave={(e) => activeTab !== 'evidence' && (e.currentTarget.style.color = '#6B7280')}
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Evidence & Documents
              </div>
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className="px-4 py-2 transition-colors"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'timeline' ? '#F24E1E' : '#6B7280',
                borderBottom: activeTab === 'timeline' ? '2px solid #F24E1E' : '2px solid transparent',
                marginBottom: '-1px',
              }}
              onMouseEnter={(e) => activeTab !== 'timeline' && (e.currentTarget.style.color = '#111111')}
              onMouseLeave={(e) => activeTab !== 'timeline' && (e.currentTarget.style.color = '#6B7280')}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timeline
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Issue Description */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                      Issue Description
                    </h3>
                    <button
                      className="flex items-center gap-1 transition-colors"
                      style={{ fontSize: '13px', color: '#F24E1E' }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                  </div>
                  <p style={{ fontSize: '14px', color: '#111111', lineHeight: '1.6' }}>
                    {caseData.issueDescription}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Category
                    </h4>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {caseData.issueCategory}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Priority
                    </h4>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {caseData.priority}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Proposed Start Date
                    </h4>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {new Date(caseData.proposedStartDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Proposed End Date
                    </h4>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {new Date(caseData.proposedEndDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Estimated Downtime
                    </h4>
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {caseData.estimatedDowntime}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Has Active Booking
                    </h4>
                    <span
                      className="inline-block px-2 py-1 rounded-full"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: caseData.hasActiveBooking ? '#FEE2E2' : '#DCFCE7',
                        color: caseData.hasActiveBooking ? '#DC2626' : '#16A34A',
                      }}
                    >
                      {caseData.hasActiveBooking ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                {/* Location Details */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                    Hub Location
                  </h3>
                  <div>
                    {/* Hub Name and Code */}
                    <p style={{ fontSize: '15px', fontWeight: '600', color: '#111111', marginBottom: '8px' }}>
                      {caseData.hubName} — {caseData.hubCode}
                    </p>
                    
                    {/* Street Address */}
                    <p style={{ fontSize: '14px', color: '#111111', marginBottom: '4px' }}>
                      {caseData.hubStreetAddress}
                    </p>
                    
                    {/* Landmark */}
                    {caseData.hubLandmark && (
                      <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                        {caseData.hubLandmark}
                      </p>
                    )}
                    
                    {/* City, State, Pincode */}
                    <p style={{ fontSize: '14px', color: '#111111' }}>
                      {caseData.hubCity}, {caseData.hubState} — {caseData.hubPincode}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'repair-actions' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Repair Action Log
                  </h3>
                  <button
                    onClick={() => setIsAddNoteModalOpen(true)}
                    className="flex items-center gap-2 px-4 transition-colors"
                    style={{
                      height: '36px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#111111',
                      backgroundColor: 'white',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Add Repair Note
                  </button>
                </div>

                {caseData.repairActions.length === 0 ? (
                  <div className="text-center py-12" style={{ backgroundColor: '#F7F9FC', borderRadius: '6px' }}>
                    <Wrench className="w-12 h-12 mx-auto mb-3" style={{ color: '#6B7280' }} />
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                      No repair actions recorded yet
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '6px' }}>
                    <table className="w-full">
                      <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                        <tr>
                          <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                            Timestamp
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                            Technician
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                            Action
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                            Notes
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {caseData.repairActions.map((action, index) => (
                          <tr
                            key={action.id}
                            style={{
                              borderBottom: index < caseData.repairActions.length - 1 ? '1px solid #F1F5F9' : 'none',
                            }}
                          >
                            <td className="px-4 py-3" style={{ fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                              {new Date(action.timestamp).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>
                              {action.technician}
                            </td>
                            <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111', whiteSpace: 'nowrap' }}>
                              {action.action}
                            </td>
                            <td className="px-4 py-3" style={{ fontSize: '13px', color: '#111111' }}>
                              {action.notes}
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span
                                className="px-2 py-1 rounded-full"
                                style={{
                                  fontSize: '11px',
                                  fontWeight: '500',
                                  backgroundColor: '#DCFCE7',
                                  color: '#16A34A',
                                }}
                              >
                                {action.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'evidence' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                    Evidence Photos & Documents
                  </h3>
                  <button
                    className="flex items-center gap-2 px-4 transition-colors"
                    style={{
                      height: '36px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#111111',
                      backgroundColor: 'white',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Files
                  </button>
                </div>

                {caseData.evidencePhotos.length === 0 ? (
                  <div className="text-center py-12" style={{ backgroundColor: '#F7F9FC', borderRadius: '6px' }}>
                    <ImageIcon className="w-12 h-12 mx-auto mb-3" style={{ color: '#6B7280' }} />
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                      No files uploaded yet
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    {caseData.evidencePhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden group"
                        style={{ aspectRatio: '1', border: '1px solid #E5E7EB' }}
                      >
                        <img
                          src={photo}
                          alt={`Evidence ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center"
                        >
                          <button
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-3 py-2 text-white"
                            style={{
                              borderRadius: '6px',
                              backgroundColor: 'rgba(0, 0, 0, 0.6)',
                              fontSize: '13px',
                            }}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'timeline' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Activity Timeline
                </h3>

                <div className="space-y-4">
                  {caseData.timeline.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div
                          className="rounded-full flex items-center justify-center"
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#FFF1EC',
                            border: '2px solid #F24E1E',
                          }}
                        >
                          <Clock className="w-4 h-4" style={{ color: '#F24E1E' }} />
                        </div>
                        {index < caseData.timeline.length - 1 && (
                          <div
                            style={{
                              width: '2px',
                              height: '48px',
                              backgroundColor: '#E5E7EB',
                            }}
                          />
                        )}
                      </div>

                      {/* Event Content */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                            {event.action}
                          </span>
                          <span style={{ color: '#E5E7EB' }}>•</span>
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>
                            {event.user}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                          {event.description}
                        </p>
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                          {new Date(event.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Repair Note Modal */}
      {isAddNoteModalOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={() => setIsAddNoteModalOpen(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50"
            style={{ width: '560px', maxHeight: '90vh', overflow: 'auto', borderRadius: '6px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                Add Repair Note
              </h3>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-4">
              {/* Technician Name */}
              <div>
                <label
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#111111',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Technician Name *
                </label>
                <select
                  value={noteForm.technician}
                  onChange={(e) => setNoteForm({ ...noteForm, technician: e.target.value })}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    color: noteForm.technician ? '#111111' : '#6B7280',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" disabled>Select a technician</option>
                  {systemTechnicians.map((tech) => (
                    <option key={tech.id} value={tech.name}>
                      {tech.name} - {tech.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action/Title */}
              <div>
                <label
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#111111',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Action Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Battery Replacement, Oil Change"
                  value={noteForm.action}
                  onChange={(e) => setNoteForm({ ...noteForm, action: e.target.value })}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    color: '#111111',
                  }}
                />
              </div>

              {/* Notes/Description */}
              <div>
                <label
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#111111',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Notes *
                </label>
                <textarea
                  placeholder="Enter detailed notes about the repair action..."
                  value={noteForm.notes}
                  onChange={(e) => setNoteForm({ ...noteForm, notes: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    color: '#111111',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 flex items-center justify-end gap-3"
              style={{ borderTop: '1px solid #E5E7EB' }}
            >
              <button
                onClick={() => {
                  setIsAddNoteModalOpen(false);
                  setNoteForm({ action: '', notes: '', technician: '' });
                }}
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                Cancel
              </button>
              <button
                onClick={handleAddRepairNote}
                className="px-4 text-white transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: '#F24E1E',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
              >
                Add Repair Note
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}