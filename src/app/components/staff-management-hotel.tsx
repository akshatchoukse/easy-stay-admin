import { useState, useEffect } from 'react';
import { Plus, User, Phone, Pencil, Trash2, Loader2, Mail, Lock, X } from 'lucide-react';
import api from '../utils/api';

interface StaffMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  salary: number;
  status: 'active' | 'inactive';
  hotelId?: { _id: string; name: string };
}

interface Hotel {
  _id: string;
  name: string;
}

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  Admin:       { bg: '#FFF1EC', text: '#C2410C' },
  Manager:     { bg: '#EFF6FF', text: '#1D4ED8' },
  Receptionist:{ bg: '#F0FDF4', text: '#166534' },
  Housekeeping:{ bg: '#F5F3FF', text: '#6D28D9' },
  Chef:        { bg: '#FFFBEB', text: '#92400E' },
  Other:       { bg: '#F9FAFB', text: '#374151' },
};

const INPUT_STYLE = {
  width: '100%', height: '38px', padding: '0 12px',
  borderRadius: '8px', border: '1px solid #E5E7EB',
  fontSize: '14px', color: '#111111', outline: 'none',
};

const SELECT_STYLE = {
  width: '100%', height: '38px', padding: '0 12px',
  borderRadius: '8px', border: '1px solid #E5E7EB',
  fontSize: '14px', color: '#111111', outline: 'none',
  backgroundColor: 'white', cursor: 'pointer',
};

const LABEL_STYLE = {
  display: 'block', fontSize: '12px', fontWeight: '500' as const,
  color: '#374151', marginBottom: '4px',
};

const emptyForm = {
  name: '', email: '', password: '', phone: '',
  role: 'Receptionist', salary: '25000', hotelId: '',
};

export function StaffManagementHotel() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StaffMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchStaff();
    fetchHotels();
  }, []);

  const fetchStaff = async () => {
    try {
      const { data } = await api.get('/staff');
      setStaff(data);
    } catch {
      showToast('Failed to load staff', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchHotels = async () => {
    try {
      const { data } = await api.get('/hotels');
      setHotels(data);
      if (data.length > 0) setForm((f) => ({ ...f, hotelId: data[0]._id }));
    } catch {}
  };

  const resetForm = () => {
    setForm({ ...emptyForm, hotelId: hotels[0]?._id || '' });
    setEditing(null);
  };

  const openEdit = (s: StaffMember) => {
    setEditing(s);
    setForm({
      name: s.name, email: s.email || '', password: '',
      phone: s.phone || '', role: s.role,
      salary: s.salary?.toString() || '0', hotelId: s.hotelId?._id || '',
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim() || (!editing && !form.password.trim()) || !form.hotelId) {
      showToast('Name, email, password and hotel required', 'error');
      return;
    }
    setSaving(true);
    const staffData: any = {
      name: form.name, email: form.email, role: form.role,
      phone: form.phone, salary: parseInt(form.salary) || 0, hotelId: form.hotelId,
    };
    if (form.password) staffData.password = form.password;

    try {
      if (editing) {
        await api.put(`/staff/${editing._id}`, staffData);
        showToast('Staff member updated');
      } else {
        await api.post('/staff', staffData);
        showToast('Staff member created with login access');
      }
      fetchStaff();
      setModalOpen(false);
      resetForm();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to save staff', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this staff member? This will also remove their login access.')) return;
    try {
      await api.delete(`/staff/${id}`);
      setStaff((prev) => prev.filter((s) => s._id !== id));
      showToast('Staff member removed');
    } catch {
      showToast('Failed to delete staff member', 'error');
    }
  };

  const toggleStatus = async (s: StaffMember) => {
    const newStatus = s.status === 'active' ? 'inactive' : 'active';
    try {
      await api.put(`/staff/${s._id}`, { status: newStatus });
      setStaff((prev) => prev.map((m) => (m._id === s._id ? { ...m, status: newStatus } : m)));
      showToast(`Staff ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '500',
          backgroundColor: toast.type === 'success' ? '#ECFDF5' : '#FEF2F2',
          color: toast.type === 'success' ? '#065F46' : '#991B1B',
          border: `1px solid ${toast.type === 'success' ? '#A7F3D0' : '#FECACA'}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          {toast.msg}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>Staff Management</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{staff.length} staff member{staff.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { resetForm(); setModalOpen(true); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            backgroundColor: '#F24E1E', color: 'white', border: 'none',
            borderRadius: '8px', padding: '8px 16px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
        >
          <Plus style={{ width: '16px', height: '16px' }} /> Add Staff
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
          <Loader2 style={{ width: '32px', height: '32px', color: '#F24E1E', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {staff.map((s) => {
            const rc = ROLE_COLORS[s.role] || ROLE_COLORS.Other;
            return (
              <div key={s._id} style={{
                backgroundColor: 'white', borderRadius: '10px', border: '1px solid #E5E7EB',
                padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <User style={{ width: '20px', height: '20px', color: '#9CA3AF' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: '#111111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</p>
                    <span style={{
                      fontSize: '11px', fontWeight: '500', padding: '2px 8px', borderRadius: '999px',
                      backgroundColor: rc.bg, color: rc.text,
                    }}>{s.role}</span>
                  </div>
                  <button
                    onClick={() => toggleStatus(s)}
                    style={{
                      fontSize: '11px', fontWeight: '500', padding: '3px 10px', borderRadius: '999px', cursor: 'pointer', border: 'none',
                      backgroundColor: s.status === 'active' ? '#ECFDF5' : '#F3F4F6',
                      color: s.status === 'active' ? '#065F46' : '#6B7280',
                    }}
                  >
                    {s.status}
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail style={{ width: '11px', height: '11px' }} />{s.email}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone style={{ width: '11px', height: '11px' }} />{s.phone || 'No phone'}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>Hotel: {s.hotelId?.name || 'Unassigned'}</p>
                  {s.salary > 0 && (
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#111111' }}>₹{s.salary.toLocaleString('en-IN')}/month</p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
                  <button
                    onClick={() => openEdit(s)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      border: '1px solid #E5E7EB', borderRadius: '6px', padding: '7px',
                      fontSize: '12px', cursor: 'pointer', backgroundColor: 'white', color: '#374151',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  >
                    <Pencil style={{ width: '12px', height: '12px' }} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid #FECACA', borderRadius: '6px', padding: '7px 10px',
                      fontSize: '12px', cursor: 'pointer', backgroundColor: 'white', color: '#DC2626',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  >
                    <Trash2 style={{ width: '12px', height: '12px' }} />
                  </button>
                </div>
              </div>
            );
          })}
          {staff.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: '#9CA3AF' }}>
              <User style={{ width: '48px', height: '48px', margin: '0 auto 12px' }} />
              <p>No staff members found.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)', padding: '16px',
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '480px',
            maxHeight: '90vh', overflowY: 'auto', padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                {editing ? 'Edit Staff Member' : 'Add Staff Member'}
              </h3>
              <button onClick={() => { setModalOpen(false); resetForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={LABEL_STYLE}>Name *</label>
                  <input style={INPUT_STYLE} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} maxLength={100}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Phone</label>
                  <input style={INPUT_STYLE} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} maxLength={15}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <div>
                <label style={LABEL_STYLE}>Email (Login ID) *</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', color: '#9CA3AF' }} />
                  <input type="email" style={{ ...INPUT_STYLE, paddingLeft: '36px' }} value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="email@example.com"
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <div>
                <label style={LABEL_STYLE}>{editing ? 'New Password (leave blank to keep)' : 'Password *'}</label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', color: '#9CA3AF' }} />
                  <input type="password" style={{ ...INPUT_STYLE, paddingLeft: '36px' }} value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder="••••••••"
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={LABEL_STYLE}>Role</label>
                  <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} style={SELECT_STYLE}>
                    <option value="Manager">Manager</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Chef">Chef</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={LABEL_STYLE}>Salary (₹)</label>
                  <input type="number" style={INPUT_STYLE} value={form.salary} onChange={(e) => setForm((f) => ({ ...f, salary: e.target.value }))}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <div>
                <label style={LABEL_STYLE}>Assign Hotel</label>
                <select value={form.hotelId} onChange={(e) => setForm((f) => ({ ...f, hotelId: e.target.value }))} style={SELECT_STYLE}>
                  <option value="">Select a hotel</option>
                  {hotels.map((h) => <option key={h._id} value={h._id}>{h.name}</option>)}
                </select>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  width: '100%', height: '42px', borderRadius: '8px', border: 'none',
                  backgroundColor: saving ? '#D1D5DB' : '#F24E1E', color: saving ? '#6B7280' : 'white',
                  fontSize: '14px', fontWeight: '500', cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {saving && <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />}
                {editing ? 'Update Account' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
