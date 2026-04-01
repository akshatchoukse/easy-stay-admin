import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  X, 
  Eye, 
  Edit, 
  Key, 
  UserCog, 
  BanIcon, 
  CheckCircle,
  RotateCcw,
  Save,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { UserDetailModal } from './user-detail-modal';

interface User {
  id: string;
  name: string;
  userType: 'Admin' | 'Hub Manager' | 'Mechanic' | 'Staff';
  phone: string;
  email: string;
  role: string;
  scope: 'Global' | 'City' | 'Hub';
  mapping: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  createdDate: string;
  avatar?: string;
  createdBy?: string;
  lastModified?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    userType: 'Admin',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@bhago.com',
    role: 'Super Admin',
    scope: 'Global',
    mapping: 'All Locations',
    status: 'Active',
    lastLogin: '2024-02-06',
    createdDate: '2023-01-15',
    createdBy: 'system',
    lastModified: '2024-02-01',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    userType: 'Hub Manager',
    phone: '+91 98765 43211',
    email: 'priya.sharma@bhago.com',
    role: 'Hub Manager',
    scope: 'Hub',
    mapping: 'Bangalore Hub 1',
    status: 'Active',
    lastLogin: '2024-02-05',
    createdDate: '2023-03-20',
    createdBy: 'rajesh.kumar@bhago.com',
    lastModified: '2024-01-28',
  },
  {
    id: '3',
    name: 'Amit Patel',
    userType: 'Mechanic',
    phone: '+91 98765 43212',
    email: 'amit.patel@bhago.com',
    role: 'Fleet Manager',
    scope: 'City',
    mapping: 'Bangalore',
    status: 'Active',
    lastLogin: '2024-02-04',
    createdDate: '2023-05-10',
    createdBy: 'priya.sharma@bhago.com',
    lastModified: '2024-01-20',
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    userType: 'Hub Manager',
    phone: '+91 98765 43213',
    email: 'sneha.reddy@bhago.com',
    role: 'Hub Manager',
    scope: 'Hub',
    mapping: 'Mumbai Hub 2',
    status: 'Active',
    lastLogin: '2024-02-03',
    createdDate: '2023-06-15',
    createdBy: 'rajesh.kumar@bhago.com',
    lastModified: '2024-01-15',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    userType: 'Staff',
    phone: '+91 98765 43214',
    email: 'vikram.singh@bhago.com',
    role: 'Operations Viewer',
    scope: 'City',
    mapping: 'Delhi',
    status: 'Inactive',
    lastLogin: '2024-01-20',
    createdDate: '2023-07-22',
    createdBy: 'rajesh.kumar@bhago.com',
    lastModified: '2024-01-10',
  },
  {
    id: '6',
    name: 'Anjali Desai',
    userType: 'Mechanic',
    phone: '+91 98765 43215',
    email: 'anjali.desai@bhago.com',
    role: 'Fleet Manager',
    scope: 'Hub',
    mapping: 'Pune Hub 1',
    status: 'Suspended',
    lastLogin: '2023-12-15',
    createdDate: '2023-08-05',
    createdBy: 'priya.sharma@bhago.com',
    lastModified: '2024-01-05',
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [scopeFilter, setScopeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setIsDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsModalOpen(false);
    setIsDrawerOpen(true);
    setOpenMenuId(null);
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setUserTypeFilter('all');
    setStatusFilter('all');
    setScopeFilter('all');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: '#DCFCE7', color: '#16A34A' };
      case 'Inactive':
        return { bg: '#F3F4F6', color: '#6B7280' };
      case 'Suspended':
        return { bg: '#FEE2E2', color: '#DC2626' };
      default:
        return { bg: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'Global':
        return { bg: '#EEF2FF', color: '#4F46E5' };
      case 'City':
        return { bg: '#FEF3C7', color: '#F59E0B' };
      case 'Hub':
        return { bg: '#FFF1EC', color: '#F24E1E' };
      default:
        return { bg: '#F7F9FC', color: '#6B7280' };
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return { bg: '#FEE2E2', color: '#991B1B', border: '#FCA5A5' };
      case 'Hub Manager':
        return { bg: '#FFF1EC', color: '#C2410C', border: '#FED7AA' };
      case 'Fleet Manager':
        return { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' };
      case 'Operations Viewer':
        return { bg: '#DBEAFE', color: '#1E40AF', border: '#93C5FD' };
      case 'Customer Support':
        return { bg: '#D1FAE5', color: '#065F46', border: '#6EE7B7' };
      default:
        return { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' };
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesUserType = userTypeFilter === 'all' || user.userType === userTypeFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesScope = scopeFilter === 'all' || user.scope === scopeFilter;
    
    return matchesSearch && matchesRole && matchesUserType && matchesStatus && matchesScope;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#F7F9FC', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-semibold" style={{ fontSize: '24px', color: '#111111' }}>
            User Management
          </h1>
          <p className="mt-1" style={{ fontSize: '14px', color: '#6B7280' }}>
            Manage system users and role assignments
          </p>
        </div>
        <button
          onClick={handleCreateUser}
          className="flex items-center gap-2 px-4 text-white transition-colors"
          style={{
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#F24E1E',
            fontSize: '14px',
            fontWeight: '500',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
        >
          <Plus className="w-4 h-4" />
          Create User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #E5E7EB' }}>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: '#6B7280' }}
              />
              <input
                type="text"
                placeholder="Search by name, phone, email..."
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

          {/* Role Filter */}
          <div>
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
              <option value="Super Admin">Super Admin</option>
              <option value="Hub Manager">Hub Manager</option>
              <option value="Fleet Manager">Fleet Manager</option>
              <option value="Operations Viewer">Operations Viewer</option>
            </select>
          </div>

          {/* User Type Filter */}
          <div>
            <select
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
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
              <option value="Admin">Admin</option>
              <option value="Hub Manager">Hub Manager</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          {/* Status Filter */}
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
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {/* Scope Filter */}
          <div>
            <select
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value)}
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
            </select>
          </div>
        </div>

        {/* Reset Filters */}
        {(searchTerm || roleFilter !== 'all' || userTypeFilter !== 'all' || statusFilter !== 'all' || scopeFilter !== 'all') && (
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid #E5E7EB' }}>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 px-3 py-1.5 transition-colors"
              style={{
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#F24E1E',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF1EC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
        {paginatedUsers.length === 0 ? (
          <div className="text-center py-12">
            <div
              className="mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ width: '64px', height: '64px', backgroundColor: '#F7F9FC' }}
            >
              <Search className="w-8 h-8" style={{ color: '#6B7280' }} />
            </div>
            <h3 className="font-semibold mb-1" style={{ fontSize: '16px', color: '#111111' }}>
              {searchTerm || roleFilter !== 'all' || userTypeFilter !== 'all' || statusFilter !== 'all' || scopeFilter !== 'all'
                ? 'No users found'
                : 'No users yet'}
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              {searchTerm || roleFilter !== 'all' || userTypeFilter !== 'all' || statusFilter !== 'all' || scopeFilter !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Get started by creating your first user'}
            </p>
            {!(searchTerm || roleFilter !== 'all' || userTypeFilter !== 'all' || statusFilter !== 'all' || scopeFilter !== 'all') && (
              <button
                onClick={handleCreateUser}
                className="mt-4 flex items-center gap-2 px-4 text-white transition-colors mx-auto"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#F24E1E',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
              >
                <Plus className="w-4 h-4" />
                Create User
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="table-scroll-container">
              <table className="w-full" style={{ minWidth: '1400px' }}>
                <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
                  <tr>
                    <th
                      className="px-6 py-3 text-left uppercase tracking-wider"
                      style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                    >
                      User Name
                    </th>
                    <th
                      className="px-4 py-3 text-left uppercase tracking-wider"
                      style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                    >
                      User Type
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
                      Email
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
                      Scope
                    </th>
                    <th
                      className="px-4 py-3 text-left uppercase tracking-wider"
                      style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                    >
                      Mapping
                    </th>
                    <th
                      className="px-4 py-3 text-left uppercase tracking-wider"
                      style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                    >
                      Status
                    </th>
                    <th
                      className="px-4 py-3 text-left uppercase tracking-wider"
                      style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                    >
                      Last Login
                    </th>
                    <th
                      className="px-4 py-3 text-left uppercase tracking-wider"
                      style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', whiteSpace: 'nowrap' }}
                    >
                      Created
                    </th>
                    <th
                      className="px-4 py-3 text-center uppercase tracking-wider"
                      style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', width: '60px', whiteSpace: 'nowrap' }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="cursor-pointer"
                      style={{
                        borderBottom: index < paginatedUsers.length - 1 ? '1px solid #F1F5F9' : 'none',
                      }}
                      onClick={() => handleViewDetails(user)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <td className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <div className="flex items-center gap-3">
                          <div
                            className="flex items-center justify-center rounded-full flex-shrink-0"
                            style={{
                              width: '32px',
                              height: '32px',
                              backgroundColor: '#F24E1E',
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: '600',
                            }}
                          >
                            {getInitials(user.name)}
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '14px', color: '#111111' }}>
                          {user.userType}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '14px', color: '#6B7280' }}>
                          {user.phone}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '14px', color: '#6B7280' }}>
                          {user.email}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span
                          className="px-2 py-1 rounded-full inline-block"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: getRoleColor(user.role).bg,
                            color: getRoleColor(user.role).color,
                            border: `1px solid ${getRoleColor(user.role).border}`,
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span
                          className="px-2 py-1 rounded-full"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            ...getScopeColor(user.scope),
                          }}
                        >
                          {user.scope}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '13px', color: '#6B7280' }}>
                          {user.mapping}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span
                          className="px-2 py-1 rounded-full"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            ...getStatusColor(user.status),
                          }}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '13px', color: '#6B7280' }}>
                          {new Date(user.lastLogin).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '13px', color: '#6B7280' }}>
                          {new Date(user.createdDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === user.id ? null : user.id);
                            }}
                            className="p-1 rounded transition-colors"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <MoreVertical className="w-4 h-4" style={{ color: '#6B7280' }} />
                          </button>
                          {openMenuId === user.id && (
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
                                  onClick={() => handleViewDetails(user)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                  style={{ fontSize: '14px', color: '#111111' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleEditUser(user)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                  style={{ fontSize: '14px', color: '#111111' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit User
                                </button>
                                <button
                                  onClick={() => {
                                    console.log('Change role:', user.id);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                  style={{ fontSize: '14px', color: '#111111' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                  <UserCog className="w-4 h-4" />
                                  Change Role
                                </button>
                                <button
                                  onClick={() => {
                                    console.log('Reset password:', user.id);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                  style={{ fontSize: '14px', color: '#111111' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                  <Key className="w-4 h-4" />
                                  Reset Password
                                </button>
                                <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '4px 0' }} />
                                {user.status === 'Active' ? (
                                  <button
                                    onClick={() => {
                                      console.log('Suspend user:', user.id);
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                    style={{ fontSize: '14px', color: '#DC2626' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    <BanIcon className="w-4 h-4" />
                                    Suspend User
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      console.log('Activate user:', user.id);
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                    style={{ fontSize: '14px', color: '#16A34A' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DCFCE7'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Activate User
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
                  {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredUsers.length)} of {filteredUsers.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ border: '1px solid #E5E7EB' }}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <ChevronLeft className="w-4 h-4" style={{ color: '#6B7280' }} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ border: '1px solid #E5E7EB' }}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <ChevronRight className="w-4 h-4" style={{ color: '#6B7280' }} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* User Detail/Edit Drawer */}
      {isDrawerOpen && (
        <UserDrawer
          user={selectedUser}
          isEditMode={isEditMode}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      {/* User Detail Modal */}
      {isModalOpen && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onEdit={handleEditUser}
        />
      )}
    </div>
  );
}

interface UserDrawerProps {
  user: User | null;
  isEditMode: boolean;
  onClose: () => void;
}

function UserDrawer({ user, isEditMode, onClose }: UserDrawerProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    userType: user?.userType || 'Staff',
    role: user?.role || '',
    scope: user?.scope || 'Hub',
    status: user?.status || 'Active',
    city: '',
    hubs: [] as string[],
  });

  const handleSave = () => {
    console.log('Save user:', formData);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full bg-white z-50 shadow-xl overflow-y-auto"
        style={{ width: '560px', maxWidth: '100vw' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-10"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <h2 className="font-semibold" style={{ fontSize: '18px', color: '#111111' }}>
            {!user ? 'Create New User' : isEditMode ? 'Edit User' : 'User Details'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-5 h-5" style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3
              className="font-semibold mb-4 pb-2"
              style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
            >
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditMode && !!user}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditMode && !!user}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditMode && !!user}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                  placeholder="user@bhago.com"
                />
              </div>

              <div>
                <label
                  htmlFor="userType"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  User Type
                </label>
                <select
                  id="userType"
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value as User['userType'] })}
                  disabled={!isEditMode && !!user}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                >
                  <option value="Admin">Admin</option>
                  <option value="Hub Manager">Hub Manager</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>
          </div>

          {/* Access Control */}
          <div>
            <h3
              className="font-semibold mb-4 pb-2"
              style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
            >
              Access Control
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={!isEditMode && !!user}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                >
                  <option value="">Select role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Hub Manager">Hub Manager</option>
                  <option value="Fleet Manager">Fleet Manager</option>
                  <option value="Operations Viewer">Operations Viewer</option>
                  <option value="Customer Support">Customer Support</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="scope"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Data Scope
                </label>
                <select
                  id="scope"
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value as User['scope'] })}
                  disabled={!isEditMode && !!user}
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                >
                  <option value="Global">Global</option>
                  <option value="City">City</option>
                  <option value="Hub">Hub</option>
                </select>
              </div>

              {formData.scope === 'City' && (
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2"
                    style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                  >
                    City
                  </label>
                  <select
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditMode && !!user}
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                    }}
                  >
                    <option value="">Select city</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
              )}

              {formData.scope === 'Hub' && (
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                  >
                    Hub Assignment
                  </label>
                  <div
                    className="p-3 rounded-lg"
                    style={{ border: '1px solid #E5E7EB', backgroundColor: '#F7F9FC' }}
                  >
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>
                      {user?.mapping || 'Select hub(s) for this user'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3
              className="font-semibold mb-4 pb-2"
              style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
            >
              Status
            </h3>
            <div>
              <label
                htmlFor="status"
                className="block mb-2"
                style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
              >
                User Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                disabled={!isEditMode && !!user}
                className="w-full px-3"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Security */}
          {(isEditMode || user) && (
            <div>
              <h3
                className="font-semibold mb-4 pb-2"
                style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
              >
                Security
              </h3>
              <button
                onClick={() => console.log('Reset password')}
                className="flex items-center gap-2 px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111111',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <Key className="w-4 h-4" />
                Reset Password
              </button>
            </div>
          )}

          {/* Audit Info (only in edit mode) */}
          {user && (
            <div>
              <h3
                className="font-semibold mb-4 pb-2"
                style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
              >
                Audit Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Created By</span>
                  <span style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {user.createdBy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Created Date</span>
                  <span style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {new Date(user.createdDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                {user.lastModified && (
                  <div className="flex justify-between">
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>Last Modified</span>
                    <span style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                      {new Date(user.lastModified).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {(isEditMode || !user) && (
          <div
            className="sticky bottom-0 bg-white px-6 py-4 flex gap-3 justify-end"
            style={{ borderTop: '1px solid #E5E7EB' }}
          >
            <button
              onClick={onClose}
              className="px-4 transition-colors"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
                fontSize: '14px',
                fontWeight: '500',
                color: '#111111',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 text-white transition-colors"
              style={{
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#F24E1E',
                fontSize: '14px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
            >
              <Save className="w-4 h-4" />
              Save User
            </button>
          </div>
        )}
      </div>
    </>
  );
}

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

function UserModal({ user, onClose }: UserModalProps) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div
        className="fixed top-0 right-0 h-full bg-white z-50 shadow-xl overflow-y-auto"
        style={{ width: '560px', maxWidth: '100vw' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-10"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <h2 className="font-semibold" style={{ fontSize: '18px', color: '#111111' }}>
            User Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-5 h-5" style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3
              className="font-semibold mb-4 pb-2"
              style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
            >
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={user?.phone || ''}
                  disabled
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                  placeholder="user@bhago.com"
                />
              </div>

              <div>
                <label
                  htmlFor="userType"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  User Type
                </label>
                <select
                  id="userType"
                  value={user?.userType || 'Staff'}
                  disabled
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                >
                  <option value="Admin">Admin</option>
                  <option value="Hub Manager">Hub Manager</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>
          </div>

          {/* Access Control */}
          <div>
            <h3
              className="font-semibold mb-4 pb-2"
              style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
            >
              Access Control
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Role
                </label>
                <select
                  id="role"
                  value={user?.role || ''}
                  disabled
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                >
                  <option value="">Select role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Hub Manager">Hub Manager</option>
                  <option value="Fleet Manager">Fleet Manager</option>
                  <option value="Operations Viewer">Operations Viewer</option>
                  <option value="Customer Support">Customer Support</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="scope"
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                >
                  Data Scope
                </label>
                <select
                  id="scope"
                  value={user?.scope || 'Hub'}
                  disabled
                  className="w-full px-3"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                  }}
                >
                  <option value="Global">Global</option>
                  <option value="City">City</option>
                  <option value="Hub">Hub</option>
                </select>
              </div>

              {user?.scope === 'City' && (
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2"
                    style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                  >
                    City
                  </label>
                  <select
                    id="city"
                    value={user?.city || ''}
                    disabled
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                    }}
                  >
                    <option value="">Select city</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
              )}

              {user?.scope === 'Hub' && (
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
                  >
                    Hub Assignment
                  </label>
                  <div
                    className="p-3 rounded-lg"
                    style={{ border: '1px solid #E5E7EB', backgroundColor: '#F7F9FC' }}
                  >
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>
                      {user?.mapping || 'Select hub(s) for this user'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3
              className="font-semibold mb-4 pb-2"
              style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
            >
              Status
            </h3>
            <div>
              <label
                htmlFor="status"
                className="block mb-2"
                style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
              >
                User Status
              </label>
              <select
                id="status"
                value={user?.status || 'Active'}
                disabled
                className="w-full px-3"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Security */}
          {user && (
            <div>
              <h3
                className="font-semibold mb-4 pb-2"
                style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
              >
                Security
              </h3>
              <button
                onClick={() => console.log('Reset password')}
                className="flex items-center gap-2 px-4 transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111111',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <Key className="w-4 h-4" />
                Reset Password
              </button>
            </div>
          )}

          {/* Audit Info */}
          {user && (
            <div>
              <h3
                className="font-semibold mb-4 pb-2"
                style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
              >
                Audit Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Created By</span>
                  <span style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {user.createdBy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Created Date</span>
                  <span style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {new Date(user.createdDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                {user.lastModified && (
                  <div className="flex justify-between">
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>Last Modified</span>
                    <span style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                      {new Date(user.lastModified).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 bg-white px-6 py-4 flex gap-3 justify-end"
          style={{ borderTop: '1px solid #E5E7EB' }}
        >
          <button
            onClick={onClose}
            className="px-4 transition-colors"
            style={{
              height: '40px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              backgroundColor: 'white',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111111',
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