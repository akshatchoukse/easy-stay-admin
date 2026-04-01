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
} from 'lucide-react';
import { MaintenanceCaseProfile } from './maintenance-case-profile';
import { ClosureApprovalDialog } from './closure-approval-dialog';

interface DowntimeRequest {
  id: string;
  ticketId: string;
  registrationNumber: string;
  vehicleModel: string;
  hubName: string;
  hubCode: string;
  city: string;
  issueCategory: string;
  severity: 'Minor' | 'Major' | 'Critical';
  requestedBy: string;
  requestedOn: string;
  proposedStartDate: string;
  proposedEndDate: string;
  status: 'Pending Approval' | 'Approved' | 'In Repair' | 'Awaiting Closure' | 'Closed' | 'Rejected';
  jobCardLinked: boolean;
  slaDeadline: string;
  lastUpdated: string;
  issueDescription: string;
  mechanicNotes?: string;
  managerNotes?: string;
  evidencePhotos?: string[];
  jobCardId?: string;
  workSummary?: string;
  partsUsed?: string[];
  rootCause?: string;
  resolutionNotes?: string;
  hasActiveBooking?: boolean;
}

// Mock data
const mockDowntimeRequests: DowntimeRequest[] = [
  {
    id: '1',
    ticketId: 'DT-2024-0001',
    registrationNumber: 'KA-01-MH-1234',
    vehicleModel: 'Activa Electric',
    hubName: 'MG Road Hub',
    hubCode: 'BLR-MGR-01',
    city: 'Bangalore',
    issueCategory: 'Battery Fault',
    severity: 'Critical',
    requestedBy: 'Ramesh Kumar',
    requestedOn: '2024-02-06T10:30:00',
    proposedStartDate: '2024-02-06T14:00:00',
    proposedEndDate: '2024-02-07T18:00:00',
    status: 'Pending Approval',
    jobCardLinked: false,
    slaDeadline: '2024-02-06T16:00:00',
    lastUpdated: '2024-02-06T10:30:00',
    issueDescription: 'Battery not charging beyond 45%. Customer reported sudden battery drain.',
    hasActiveBooking: true,
  },
  {
    id: '2',
    ticketId: 'DT-2024-0002',
    registrationNumber: 'KA-02-AB-5678',
    vehicleModel: 'Activa Electric',
    hubName: 'Whitefield Hub',
    hubCode: 'BLR-WHF-02',
    city: 'Bangalore',
    issueCategory: 'Brake System',
    severity: 'Major',
    requestedBy: 'Suresh Patil',
    requestedOn: '2024-02-05T09:15:00',
    proposedStartDate: '2024-02-06T09:00:00',
    proposedEndDate: '2024-02-06T17:00:00',
    status: 'Approved',
    jobCardLinked: true,
    jobCardId: 'JC-2024-0045',
    slaDeadline: '2024-02-06T12:00:00',
    lastUpdated: '2024-02-05T14:20:00',
    issueDescription: 'Rear brake disc worn out, needs replacement.',
    mechanicNotes: 'Brake pads at 20% life. Recommend full brake service.',
    managerNotes: 'Approved. Priority maintenance.',
  },
  {
    id: '3',
    ticketId: 'DT-2024-0003',
    registrationNumber: 'KA-03-CD-9012',
    vehicleModel: 'Activa Electric',
    hubName: 'Koramangala Hub',
    hubCode: 'BLR-KRM-03',
    city: 'Bangalore',
    issueCategory: 'Electrical Issue',
    severity: 'Major',
    requestedBy: 'Anjali Reddy',
    requestedOn: '2024-02-04T16:00:00',
    proposedStartDate: '2024-02-05T10:00:00',
    proposedEndDate: '2024-02-05T16:00:00',
    status: 'In Repair',
    jobCardLinked: true,
    jobCardId: 'JC-2024-0042',
    slaDeadline: '2024-02-05T18:00:00',
    lastUpdated: '2024-02-05T10:15:00',
    issueDescription: 'Dashboard display not working. Error code E102.',
    mechanicNotes: 'Display module replacement required.',
  },
  {
    id: '4',
    ticketId: 'DT-2024-0004',
    registrationNumber: 'KA-04-EF-3456',
    vehicleModel: 'Activa Electric',
    hubName: 'Indiranagar Hub',
    hubCode: 'BLR-IND-04',
    city: 'Bangalore',
    issueCategory: 'Tire Replacement',
    severity: 'Minor',
    requestedBy: 'Vikram Singh',
    requestedOn: '2024-02-03T11:00:00',
    proposedStartDate: '2024-02-04T09:00:00',
    proposedEndDate: '2024-02-04T12:00:00',
    status: 'Awaiting Closure',
    jobCardLinked: true,
    jobCardId: 'JC-2024-0038',
    slaDeadline: '2024-02-05T09:00:00',
    lastUpdated: '2024-02-04T11:45:00',
    issueDescription: 'Rear tire puncture. Needs replacement.',
    mechanicNotes: 'Tire replaced with OEM spec.',
    workSummary: 'Replaced rear tire. Aligned both wheels. Checked tire pressure.',
    partsUsed: ['Rear Tire 90/90-12', 'Tube', 'Valve Cap'],
    rootCause: 'Sharp object puncture',
    resolutionNotes: 'Tire replaced successfully. Vehicle tested and ready for service.',
  },
  {
    id: '5',
    ticketId: 'DT-2024-0005',
    registrationNumber: 'KA-05-GH-7890',
    vehicleModel: 'Activa Electric',
    hubName: 'Electronic City Hub',
    hubCode: 'BLR-ELC-05',
    city: 'Bangalore',
    issueCategory: 'Motor Issue',
    severity: 'Critical',
    requestedBy: 'Priya Sharma',
    requestedOn: '2024-02-02T14:30:00',
    proposedStartDate: '2024-02-03T08:00:00',
    proposedEndDate: '2024-02-04T18:00:00',
    status: 'Closed',
    jobCardLinked: true,
    jobCardId: 'JC-2024-0035',
    slaDeadline: '2024-02-03T18:00:00',
    lastUpdated: '2024-02-04T17:30:00',
    issueDescription: 'Abnormal motor noise and reduced power output.',
    mechanicNotes: 'Motor bearings damaged. Full motor service performed.',
    managerNotes: 'Work completed within SLA. Approved closure.',
    workSummary: 'Motor disassembled, bearings replaced, reassembled and tested.',
    partsUsed: ['Motor Bearing Set', 'Motor Gasket', 'Lubricant'],
    rootCause: 'Worn motor bearings due to high usage',
    resolutionNotes: 'Motor serviced successfully. Power output restored to 100%. No abnormal noise detected.',
  },
  {
    id: '6',
    ticketId: 'DT-2024-0006',
    registrationNumber: 'KA-06-JK-2345',
    vehicleModel: 'Activa Electric',
    hubName: 'MG Road Hub',
    hubCode: 'BLR-MGR-01',
    city: 'Bangalore',
    issueCategory: 'Suspension',
    severity: 'Minor',
    requestedBy: 'Karthik Iyer',
    requestedOn: '2024-02-01T13:00:00',
    proposedStartDate: '2024-02-02T10:00:00',
    proposedEndDate: '2024-02-02T15:00:00',
    status: 'Rejected',
    jobCardLinked: false,
    slaDeadline: '2024-02-02T18:00:00',
    lastUpdated: '2024-02-01T15:45:00',
    issueDescription: 'Slight squeaking noise from front suspension.',
    managerNotes: 'Issue not confirmed during inspection. Request rejected. Monitor for 1 week.',
  },
];

export function MaintenanceGovernance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hubFilter, setHubFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [slaRisk, setSlaRisk] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [isClosureDialogOpen, setIsClosureDialogOpen] = useState(false);
  const [closureRequest, setClosureRequest] = useState<DowntimeRequest | null>(null);

  // Get unique values for filters
  const hubs = Array.from(new Set(mockDowntimeRequests.map(r => r.hubName)));
  const cities = Array.from(new Set(mockDowntimeRequests.map(r => r.city)));
  const categories = Array.from(new Set(mockDowntimeRequests.map(r => r.issueCategory)));

  // Check if SLA is at risk
  const isSlaAtRisk = (deadline: string) => {
    const now = new Date();
    const slaTime = new Date(deadline);
    const hoursRemaining = (slaTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursRemaining < 2 && hoursRemaining > 0;
  };

  // Calculate SLA timer
  const getSlaTimer = (deadline: string) => {
    const now = new Date();
    const slaTime = new Date(deadline);
    const diff = slaTime.getTime() - now.getTime();

    if (diff < 0) return 'Overdue';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Filter logic
  const filteredRequests = mockDowntimeRequests.filter((request) => {
    const matchesSearch =
      request.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHub = hubFilter === 'all' || request.hubName === hubFilter;
    const matchesCity = cityFilter === 'all' || request.city === cityFilter;
    const matchesCategory = categoryFilter === 'all' || request.issueCategory === categoryFilter;
    const matchesSeverity = severityFilter === 'all' || request.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesSlaRisk = !slaRisk || isSlaAtRisk(request.slaDeadline);

    return matchesSearch && matchesHub && matchesCity && matchesCategory && matchesSeverity && matchesStatus && matchesSlaRisk;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + rowsPerPage);

  const handleResetFilters = () => {
    setSearchTerm('');
    setHubFilter('all');
    setCityFilter('all');
    setCategoryFilter('all');
    setSeverityFilter('all');
    setStatusFilter('all');
    setSlaRisk(false);
    setCurrentPage(1);
  };

  const handleViewDetails = (request: DowntimeRequest) => {
    setSelectedRequestId(request.id);
    setOpenMenuId(null);
  };

  const handleExport = () => {
    console.log('Export records');
  };

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

  return (
    <>
      {selectedRequestId ? (
        <MaintenanceCaseProfile
          request={mockDowntimeRequests.find(r => r.id === selectedRequestId) as any}
          onClose={() => setSelectedRequestId(null)}
        />
      ) : (
        <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9FC' }}>
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                  Downtime & Maintenance Governance
                </h1>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  Review and control vehicle downtime and repair lifecycle
                </p>
              </div>
              <button
                onClick={handleExport}
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
                <Download className="w-4 h-4" />
                Export Records
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
                      placeholder="Registration Number, Ticket ID..."
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

                {/* Hub Filter */}
                <div className="col-span-2">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Hub
                  </label>
                  <select
                    value={hubFilter}
                    onChange={(e) => {
                      setHubFilter(e.target.value);
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
                    <option value="all">All Hubs</option>
                    {hubs.map(hub => (
                      <option key={hub} value={hub}>{hub}</option>
                    ))}
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
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Approved">Approved</option>
                    <option value="In Repair">In Repair</option>
                    <option value="Awaiting Closure">Awaiting Closure</option>
                    <option value="Closed">Closed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="col-span-2">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Issue Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => {
                      setCategoryFilter(e.target.value);
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
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Severity Filter */}
                <div className="col-span-2">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Severity
                  </label>
                  <select
                    value={severityFilter}
                    onChange={(e) => {
                      setSeverityFilter(e.target.value);
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
                    <option value="all">All Severity</option>
                    <option value="Minor">Minor</option>
                    <option value="Major">Major</option>
                    <option value="Critical">Critical</option>
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
                Showing <span style={{ fontWeight: '500', color: '#111111' }}>{filteredRequests.length}</span> request{filteredRequests.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
              {paginatedRequests.length === 0 ? (
                <div className="text-center py-12">
                  <div
                    className="mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
                  >
                    <Wrench className="w-8 h-8" style={{ color: '#6B7280' }} />
                  </div>
                  <h3 className="font-semibold mb-1" style={{ fontSize: '16px', color: '#111111' }}>
                    No downtime requests found
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <>
                  <div className="table-scroll-container">
                    <table className="w-full" style={{ minWidth: '1200px' }}>
                      <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                        <tr>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Ticket ID
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Vehicle
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Hub
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Issue Category
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Severity
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Requested By
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Requested On
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Status
                          </th>
                          <th className="px-4 py-3 text-left uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}>
                            Last Updated
                          </th>
                          <th className="px-4 py-3 text-center uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '60px', whiteSpace: 'nowrap' }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedRequests.map((request, index) => (
                          <tr
                            key={request.id}
                            className="cursor-pointer"
                            style={{
                              borderBottom: index < paginatedRequests.length - 1 ? '1px solid #F1F5F9' : 'none',
                            }}
                            onClick={() => handleViewDetails(request)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '13px', fontWeight: '500', color: '#F24E1E' }}>
                                {request.ticketId}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <div>
                                <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                                  {request.registrationNumber}
                                </p>
                                <p style={{ fontSize: '11px', color: '#6B7280' }}>
                                  {request.vehicleModel}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <div>
                                <p style={{ fontSize: '13px', color: '#111111' }}>
                                  {request.hubName}
                                </p>
                                <p style={{ fontSize: '11px', color: '#6B7280' }}>
                                  {request.hubCode}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '13px', color: '#111111' }}>
                                {request.issueCategory}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span
                                className="px-2 py-1 rounded-full"
                                style={{
                                  fontSize: '11px',
                                  fontWeight: '500',
                                  ...getSeverityColor(request.severity),
                                }}
                              >
                                {request.severity}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '13px', color: '#111111' }}>
                                {request.requestedBy}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '12px', color: '#6B7280' }}>
                                {new Date(request.requestedOn).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                }).replace(/ /g, ' ')}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span
                                className="px-2 py-1 rounded-full"
                                style={{
                                  fontSize: '11px',
                                  fontWeight: '500',
                                  ...getStatusColor(request.status),
                                }}
                              >
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '12px', color: '#6B7280' }}>
                                {new Date(request.lastUpdated).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                }).replace(/ /g, ' ')}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(openMenuId === request.id ? null : request.id);
                                  }}
                                  className="p-1 rounded transition-colors"
                                  style={{ backgroundColor: 'transparent' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                  <Eye className="w-4 h-4" style={{ color: '#6B7280' }} />
                                </button>
                                {openMenuId === request.id && (
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
                                        onClick={() => handleViewDetails(request)}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                        style={{ fontSize: '14px', color: '#111111' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                      >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                      </button>
                                      {request.status === 'Awaiting Closure' && (
                                        <button
                                          onClick={() => {
                                            setClosureRequest(request);
                                            setIsClosureDialogOpen(true);
                                            setOpenMenuId(null);
                                          }}
                                          className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                          style={{ fontSize: '14px', color: '#16A34A' }}
                                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DCFCE7'}
                                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                          <CheckCircle className="w-4 h-4" />
                                          Approve Closure
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
                        {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredRequests.length)} of {filteredRequests.length}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Modals & Dialogs */}
          {isClosureDialogOpen && closureRequest && (
            <ClosureApprovalDialog
              request={closureRequest}
              onClose={() => {
                setIsClosureDialogOpen(false);
                setClosureRequest(null);
              }}
              onApprove={(notes) => {
                console.log('Approve closure:', closureRequest.id, notes);
                setIsClosureDialogOpen(false);
                setClosureRequest(null);
              }}
              onReject={(notes) => {
                console.log('Send back for rework:', closureRequest.id, notes);
                setIsClosureDialogOpen(false);
                setClosureRequest(null);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}