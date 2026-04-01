import { useState } from 'react';
import { X, Search, Users, RotateCcw } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  shift: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

interface Hub {
  id: string;
  name: string;
}

interface ViewStaffModalProps {
  hub: Hub;
  onClose: () => void;
  onViewStaffDetail?: (staffId: string) => void;
}

// Mock staff data
const mockStaff: StaffMember[] = [
  { id: '1', name: 'Arjun Mehta', role: 'Technician', phone: '+91 98765 11111', shift: 'Morning (6 AM - 2 PM)', status: 'Active' },
  { id: '2', name: 'Deepa Rao', role: 'Customer Support', phone: '+91 98765 22222', shift: 'Morning (6 AM - 2 PM)', status: 'Active' },
  { id: '3', name: 'Karan Singh', role: 'Technician', phone: '+91 98765 33333', shift: 'Afternoon (2 PM - 10 PM)', status: 'Active' },
  { id: '4', name: 'Meera Iyer', role: 'Operations Associate', phone: '+91 98765 44444', shift: 'Morning (6 AM - 2 PM)', status: 'Active' },
  { id: '5', name: 'Rahul Nair', role: 'Technician', phone: '+91 98765 55555', shift: 'Night (10 PM - 6 AM)', status: 'On Leave' },
  { id: '6', name: 'Pooja Sharma', role: 'Customer Support', phone: '+91 98765 66666', shift: 'Afternoon (2 PM - 10 PM)', status: 'Active' },
  { id: '7', name: 'Sanjay Verma', role: 'Operations Associate', phone: '+91 98765 77777', shift: 'Morning (6 AM - 2 PM)', status: 'Active' },
  { id: '8', name: 'Ananya Kapoor', role: 'Security', phone: '+91 98765 88888', shift: 'Night (10 PM - 6 AM)', status: 'Active' },
];

export function ViewStaffModal({ hub, onClose, onViewStaffDetail }: ViewStaffModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          backgroundColor: '#DCFCE7',
          color: '#16A34A',
          border: '1px solid #16A34A',
        };
      case 'On Leave':
        return {
          backgroundColor: '#FEF3C7',
          color: '#F59E0B',
          border: '1px solid #F59E0B',
        };
      case 'Inactive':
        return {
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          border: '1px solid #DC2626',
        };
      default:
        return {
          backgroundColor: '#F7F9FC',
          color: '#6B7280',
          border: '1px solid #6B7280',
        };
    }
  };

  // Get unique roles for filter
  const roles = Array.from(new Set(mockStaff.map(s => s.role)));

  // Filter logic
  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || staff.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
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
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl overflow-hidden z-50"
        style={{
          width: '900px',
          maxHeight: '90vh',
          border: '1px solid #E5E7EB',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FFF1EC',
                color: '#F24E1E',
              }}
            >
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                Hub Staff
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                Staff mapped to {hub.name}
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
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <div className="p-6">
            {/* Staff Count Badge */}
            <div className="mb-4">
              <span
                className="px-3 py-1.5 rounded-full inline-flex items-center gap-2"
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  backgroundColor: '#F7F9FC',
                  color: '#111111',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Users className="w-4 h-4" />
                {filteredStaff.length} Staff Member{filteredStaff.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-12 gap-4 mb-4">
              {/* Search */}
              <div className="col-span-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                  <input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

              {/* Role Filter */}
              <div className="col-span-4">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    color: '#111111',
                  }}
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <div className="col-span-2">
                <button
                  onClick={handleResetFilters}
                  className="flex items-center justify-center gap-2 w-full transition-colors"
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

            {/* Staff Table */}
            {filteredStaff.length === 0 ? (
              <div className="text-center py-12">
                <div
                  className="mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
                >
                  <Users className="w-8 h-8" style={{ color: '#6B7280' }} />
                </div>
                <h3 className="font-semibold mb-1" style={{ fontSize: '16px', color: '#111111' }}>
                  No staff found
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: '1px solid #E5E7EB' }}
              >
                <table className="w-full">
                  <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                    <tr>
                      <th
                        className="px-4 py-3 text-left uppercase tracking-wider"
                        style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                      >
                        Name
                      </th>
                      <th
                        className="px-4 py-3 text-left uppercase tracking-wider"
                        style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                      >
                        Role
                      </th>
                      <th
                        className="px-4 py-3 text-left uppercase tracking-wider"
                        style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                      >
                        Phone
                      </th>
                      <th
                        className="px-4 py-3 text-left uppercase tracking-wider"
                        style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                      >
                        Shift
                      </th>
                      <th
                        className="px-4 py-3 text-left uppercase tracking-wider"
                        style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((staff, index) => (
                      <tr
                        key={staff.id}
                        className="cursor-pointer"
                        style={{
                          borderBottom: index < filteredStaff.length - 1 ? '1px solid #F1F5F9' : 'none',
                        }}
                        onClick={() => onViewStaffDetail?.(staff.id)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <div className="flex items-center gap-3">
                            <div
                              className="flex items-center justify-center rounded-full flex-shrink-0"
                              style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#2563EB',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: '600',
                              }}
                            >
                              {getInitials(staff.name)}
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                              {staff.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span
                            className="px-2 py-1 rounded"
                            style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              backgroundColor: '#F7F9FC',
                              color: '#6B7280',
                            }}
                          >
                            {staff.role}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>
                            {staff.phone}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>
                            {staff.shift}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                          <span
                            className="px-2 py-1 rounded-full"
                            style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              ...getStatusColor(staff.status),
                            }}
                          >
                            {staff.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end px-6 py-4"
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
              color: '#6B7280',
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
