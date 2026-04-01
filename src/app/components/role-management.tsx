import { useState } from 'react';
import { Plus, Search, MoreVertical, X, CheckCircle, XCircle, Globe, Building2, MapPin, Edit, Copy, Archive } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  type: 'System' | 'Custom';
  scope: 'Global' | 'City' | 'Hub';
  usersAssigned: number;
  status: 'Active' | 'Retired';
  lastUpdated: string;
}

const rolesData: Role[] = [
  {
    id: 'role-001',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    type: 'System',
    scope: 'Global',
    usersAssigned: 3,
    status: 'Active',
    lastUpdated: '2024-02-01',
  },
  {
    id: 'role-002',
    name: 'Hub Manager',
    description: 'Manage hub operations, vehicles, and staff',
    type: 'System',
    scope: 'Hub',
    usersAssigned: 24,
    status: 'Active',
    lastUpdated: '2024-01-28',
  },
  {
    id: 'role-003',
    name: 'Fleet Manager',
    description: 'Manage vehicle fleet and maintenance',
    type: 'Custom',
    scope: 'City',
    usersAssigned: 12,
    status: 'Active',
    lastUpdated: '2024-01-25',
  },
  {
    id: 'role-004',
    name: 'Operations Viewer',
    description: 'Read-only access to operations data',
    type: 'Custom',
    scope: 'Global',
    usersAssigned: 45,
    status: 'Active',
    lastUpdated: '2024-01-20',
  },
  {
    id: 'role-005',
    name: 'Customer Support',
    description: 'Handle customer queries and bookings',
    type: 'System',
    scope: 'City',
    usersAssigned: 18,
    status: 'Active',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'role-006',
    name: 'Legacy Admin',
    description: 'Deprecated admin role from v1',
    type: 'System',
    scope: 'Global',
    usersAssigned: 0,
    status: 'Retired',
    lastUpdated: '2023-12-10',
  },
];

export function RoleManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [scopeFilter, setScopeFilter] = useState<string>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredRoles = rolesData.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || role.status === statusFilter;
    const matchesScope = scopeFilter === 'all' || role.scope === scopeFilter;
    return matchesSearch && matchesStatus && matchesScope;
  });

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setScopeFilter('all');
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setDrawerOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setDrawerOpen(true);
    setActiveMenuId(null);
  };

  const handleCloneRole = (role: Role) => {
    console.log('Clone role:', role);
    setActiveMenuId(null);
  };

  const handleRetireRole = (role: Role) => {
    console.log('Retire role:', role);
    setActiveMenuId(null);
  };

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#F7F9FC', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-semibold" style={{ fontSize: '24px', color: '#111111' }}>
            Role Management
          </h1>
          <p className="mt-1" style={{ fontSize: '14px', color: '#6B7280' }}>
            Manage system roles and access levels
          </p>
        </div>
        <button
          onClick={handleCreateRole}
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
          Create Role
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #E5E7EB' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: '#6B7280' }}
              />
              <input
                type="text"
                placeholder="Search by role name..."
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
              <option value="Retired">Retired</option>
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

        {/* Reset Button */}
        {(searchTerm || statusFilter !== 'all' || scopeFilter !== 'all') && (
          <div className="mt-4">
            <button
              onClick={handleReset}
              className="px-4 transition-colors"
              style={{
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
                fontSize: '13px',
                color: '#6B7280',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl" style={{ border: '1px solid #E5E7EB' }}>
        {filteredRoles.length > 0 ? (
          <>
            <div className="table-scroll-container">
              <table className="w-full">
                <thead style={{ backgroundColor: '#F7F9FC' }}>
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <th
                      className="px-6 text-left uppercase tracking-wider"
                      style={{ height: '44px', fontSize: '12px', fontWeight: '500', color: '#6B7280' }}
                    >
                      Role Name
                    </th>
                    <th
                      className="px-6 text-left uppercase tracking-wider"
                      style={{ height: '44px', fontSize: '12px', fontWeight: '500', color: '#6B7280' }}
                    >
                      Description
                    </th>
                    <th
                      className="px-6 text-left uppercase tracking-wider"
                      style={{ height: '44px', fontSize: '12px', fontWeight: '500', color: '#6B7280' }}
                    >
                      Role Type
                    </th>
                    <th
                      className="px-6 text-left uppercase tracking-wider"
                      style={{ height: '44px', fontSize: '12px', fontWeight: '500', color: '#6B7280' }}
                    >
                      Scope
                    </th>
                    <th
                      className="px-6 text-left uppercase tracking-wider"
                      style={{ height: '44px', fontSize: '12px', fontWeight: '500', color: '#6B7280' }}
                    >
                      Users Assigned
                    </th>
                    <th
                      className="px-6 text-left uppercase tracking-wider"
                      style={{ height: '44px', fontSize: '12px', fontWeight: '500', color: '#6B7280' }}
                    >
                      Status
                    </th>
                    <th
                      className="px-6 text-left uppercase tracking-wider"
                      style={{ height: '44px', fontSize: '12px', fontWeight: '500', color: '#6B7280' }}
                    >
                      Last Updated
                    </th>
                    <th
                      className="px-6 text-right uppercase tracking-wider"
                      style={{ height: '44px', fontSize: '12px', fontWeight: '500', color: '#6B7280' }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredRoles.map((role, index) => (
                    <tr
                      key={role.id}
                      style={{
                        borderBottom: index < filteredRoles.length - 1 ? '1px solid #E5E7EB' : 'none',
                        height: '48px',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <td className="px-6 whitespace-nowrap font-medium" style={{ fontSize: '14px', color: '#111111' }}>
                        {role.name}
                      </td>
                      <td className="px-6" style={{ fontSize: '14px', color: '#6B7280', maxWidth: '300px' }}>
                        {role.description}
                      </td>
                      <td className="px-6 whitespace-nowrap">
                        <span
                          className="inline-flex px-2 py-1 rounded-full"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: role.type === 'System' ? '#F3F4F6' : '#FEF3C7',
                            color: role.type === 'System' ? '#374151' : '#92400E',
                          }}
                        >
                          {role.type}
                        </span>
                      </td>
                      <td className="px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2" style={{ fontSize: '14px', color: '#111111' }}>
                          {role.scope === 'Global' && <Globe className="w-4 h-4" style={{ color: '#6B7280' }} />}
                          {role.scope === 'City' && <Building2 className="w-4 h-4" style={{ color: '#6B7280' }} />}
                          {role.scope === 'Hub' && <MapPin className="w-4 h-4" style={{ color: '#6B7280' }} />}
                          {role.scope}
                        </div>
                      </td>
                      <td className="px-6 whitespace-nowrap">
                        <span
                          className="inline-flex items-center justify-center px-2 py-1 rounded-full"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: '#F7F9FC',
                            color: '#111111',
                            minWidth: '32px',
                          }}
                        >
                          {role.usersAssigned}
                        </span>
                      </td>
                      <td className="px-6 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: role.status === 'Active' ? '#DCFCE7' : '#FEE2E2',
                            color: role.status === 'Active' ? '#16A34A' : '#DC2626',
                          }}
                        >
                          {role.status === 'Active' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {role.status}
                        </span>
                      </td>
                      <td className="px-6 whitespace-nowrap" style={{ fontSize: '14px', color: '#6B7280' }}>
                        {new Date(role.lastUpdated).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 whitespace-nowrap text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === role.id ? null : role.id)}
                            className="p-1 rounded"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <MoreVertical className="w-4 h-4" style={{ color: '#6B7280' }} />
                          </button>

                          {activeMenuId === role.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveMenuId(null)}
                              />
                              <div
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20"
                                style={{ border: '1px solid #E5E7EB' }}
                              >
                                <button
                                  onClick={() => handleEditRole(role)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                  style={{ fontSize: '14px', color: '#111111' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                  <Edit className="w-4 h-4" style={{ color: '#6B7280' }} />
                                  Edit Role
                                </button>
                                <button
                                  onClick={() => handleCloneRole(role)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                  style={{ fontSize: '14px', color: '#111111' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                  <Copy className="w-4 h-4" style={{ color: '#6B7280' }} />
                                  Clone Role
                                </button>
                                {role.status === 'Active' && (
                                  <button
                                    onClick={() => handleRetireRole(role)}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                                    style={{ fontSize: '14px', color: '#DC2626' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  >
                                    <Archive className="w-4 h-4" />
                                    Retire Role
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
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                Showing <span style={{ fontWeight: '500', color: '#111111' }}>1-{filteredRoles.length}</span> of{' '}
                <span style={{ fontWeight: '500', color: '#111111' }}>{filteredRoles.length}</span> roles
              </p>
              <div className="flex gap-2">
                <button
                  className="px-4 transition-colors"
                  style={{
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: 'white',
                    fontSize: '13px',
                    color: '#6B7280',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  disabled
                >
                  Previous
                </button>
                <button
                  className="px-4 transition-colors"
                  style={{
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: 'white',
                    fontSize: '13px',
                    color: '#6B7280',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#F7F9FC' }}
            >
              <Archive className="w-8 h-8" style={{ color: '#6B7280' }} />
            </div>
            <h3 className="font-medium mb-1" style={{ fontSize: '16px', color: '#111111' }}>
              No roles found
            </h3>
            <p className="text-center mb-6" style={{ fontSize: '14px', color: '#6B7280' }}>
              No roles match your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={handleReset}
              className="px-4 transition-colors"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
                fontSize: '14px',
                color: '#111111',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Role Drawer */}
      {drawerOpen && (
        <RoleDrawer
          role={editingRole}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}

interface RoleDrawerProps {
  role: Role | null;
  onClose: () => void;
}

function RoleDrawer({ role, onClose }: RoleDrawerProps) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    type: role?.type || 'Custom',
    scope: role?.scope || 'Hub',
    status: role?.status || 'Active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save role:', formData);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full bg-white z-50 shadow-xl overflow-y-auto"
        style={{ width: '480px', maxWidth: '100vw' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-10"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <h2 className="font-semibold" style={{ fontSize: '18px', color: '#111111' }}>
            {role ? 'Edit Role' : 'Create New Role'}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Role Name */}
          <div>
            <label
              htmlFor="roleName"
              className="block mb-2"
              style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
            >
              Role Name
            </label>
            <input
              id="roleName"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
              }}
              placeholder="Enter role name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2"
              style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 resize-none"
              style={{
                minHeight: '80px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
              }}
              placeholder="Describe the role and its responsibilities"
              required
            />
          </div>

          {/* Role Type */}
          <div>
            <label
              htmlFor="roleType"
              className="block mb-2"
              style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
            >
              Role Type
            </label>
            <select
              id="roleType"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'System' | 'Custom' })}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
              }}
            >
              <option value="Custom">Custom</option>
              <option value="System">System</option>
            </select>
          </div>

          {/* Default Scope */}
          <div>
            <label
              htmlFor="scope"
              className="block mb-2"
              style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
            >
              Default Scope
            </label>
            <select
              id="scope"
              value={formData.scope}
              onChange={(e) => setFormData({ ...formData, scope: e.target.value as 'Global' | 'City' | 'Hub' })}
              className="w-full px-3"
              style={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
              }}
            >
              <option value="Hub">Hub</option>
              <option value="City">City</option>
              <option value="Global">Global</option>
            </select>
          </div>

          {/* Status Toggle */}
          <div>
            <label
              htmlFor="status"
              className="block mb-2"
              style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}
            >
              Status
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: formData.status === 'Active' ? 'Retired' : 'Active' })}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                style={{
                  backgroundColor: formData.status === 'Active' ? '#F24E1E' : '#E5E7EB',
                }}
              >
                <span
                  className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  style={{
                    transform: formData.status === 'Active' ? 'translateX(28px)' : 'translateX(4px)',
                  }}
                />
              </button>
              <span style={{ fontSize: '14px', color: '#111111' }}>
                {formData.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid #E5E7EB' }}>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 transition-colors"
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
              type="submit"
              className="flex-1 px-4 text-white transition-colors"
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
              {role ? 'Save Changes' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}