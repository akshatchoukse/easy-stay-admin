import { X, Edit } from 'lucide-react';

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
  createdBy?: string;
  lastModified?: string;
}

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
  onEdit: (user: User) => void;
}

export function UserDetailModal({ user, onClose, onEdit }: UserDetailModalProps) {
  if (!user) return null;

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

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={onClose}>
        {/* Modal - Centered */}
        <div
          className="bg-white rounded-xl shadow-2xl overflow-hidden"
          style={{ width: '640px', maxWidth: '100%', maxHeight: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between px-6 py-4"
            style={{ borderBottom: '1px solid #E5E7EB' }}
          >
            <div>
              <h2 className="font-semibold" style={{ fontSize: '18px', color: '#111111' }}>
                User Details
              </h2>
              <p className="mt-1" style={{ fontSize: '13px', color: '#6B7280' }}>
                View user profile and access configuration
              </p>
            </div>
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

          {/* Content - Scrollable */}
          <div className="overflow-y-auto px-6 py-6 space-y-6" style={{ maxHeight: 'calc(90vh - 180px)' }}>
            {/* Basic Information */}
            <div>
              <h3
                className="font-semibold mb-4 pb-2"
                style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
              >
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Full Name
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {user.name}
                  </p>
                </div>
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    User Type
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {user.userType}
                  </p>
                </div>
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Phone Number
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {user.phone}
                  </p>
                </div>
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Email
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Access */}
            <div>
              <h3
                className="font-semibold mb-4 pb-2"
                style={{ fontSize: '14px', color: '#111111', borderBottom: '1px solid #E5E7EB' }}
              >
                Access
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Role
                  </label>
                  <span
                    className="inline-block px-2 py-1 rounded-full mt-1"
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
                </div>
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Scope
                  </label>
                  <span
                    className="inline-block px-2 py-1 rounded-full mt-1"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      ...getScopeColor(user.scope),
                    }}
                  >
                    {user.scope}
                  </span>
                </div>
                <div className="col-span-2">
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Hub / City Mapping
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {user.mapping}
                  </p>
                </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    User Status
                  </label>
                  <span
                    className="inline-block px-2 py-1 rounded-full mt-1"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      ...getStatusColor(user.status),
                    }}
                  >
                    {user.status}
                  </span>
                </div>
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Last Login
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {new Date(user.lastLogin).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Created Date
                  </label>
                  <p style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                    {new Date(user.createdDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                {user.createdBy && (
                  <div>
                    <label className="block mb-1" style={{ fontSize: '12px', color: '#6B7280' }}>
                      Created By
                    </label>
                    <p style={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}>
                      {user.createdBy}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 flex gap-3 justify-end"
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
            <button
              onClick={() => {
                onEdit(user);
                onClose();
              }}
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
              <Edit className="w-4 h-4" />
              Edit User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}