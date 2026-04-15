import { useState, useEffect } from 'react';
import { Plus, IndianRupee, Trash2, Loader2, X } from 'lucide-react';
import api from '../utils/api';

interface Expense {
  _id: string;
  title: string;
  amount: number;
  hotel: { _id: string; name: string };
  addedBy: { _id: string; name: string };
  timestamp: string;
}

interface Hotel {
  _id: string;
  name: string;
}

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

export function ExpenseManagementHotel() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', amount: '', hotelId: '' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchExpenses();
    fetchHotels();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/expenses');
      setExpenses(data);
    } catch {
      showToast('Failed to load expenses', 'error');
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

  const handleAdd = async () => {
    if (!form.title.trim() || !form.amount || !form.hotelId) {
      showToast('Title, amount and hotel required', 'error');
      return;
    }
    setSaving(true);
    try {
      const { data } = await api.post('/expenses', {
        title: form.title,
        amount: parseFloat(form.amount) || 0,
        hotelId: form.hotelId,
      });
      setExpenses((prev) => [data, ...prev]);
      showToast('Expense added');
      setModalOpen(false);
      setForm((f) => ({ ...f, title: '', amount: '' }));
    } catch {
      showToast('Failed to add expense', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      showToast('Expense deleted');
    } catch {
      showToast('Failed to delete expense', 'error');
    }
  };

  const total = expenses.reduce((s, e) => s + e.amount, 0);

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
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>Expenses</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
            Total: <span style={{ fontWeight: '700', color: '#111111' }}>₹{total.toLocaleString('en-IN')}</span>
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            backgroundColor: '#F24E1E', color: 'white', border: 'none',
            borderRadius: '8px', padding: '8px 16px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
        >
          <Plus style={{ width: '16px', height: '16px' }} /> Add Expense
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} style={{ height: '72px', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #E5E7EB', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))
        ) : expenses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9CA3AF' }}>
            <IndianRupee style={{ width: '48px', height: '48px', margin: '0 auto 12px' }} />
            <p>No expenses found.</p>
          </div>
        ) : expenses.map((e) => (
          <div key={e._id} style={{
            backgroundColor: 'white', borderRadius: '10px', border: '1px solid #E5E7EB',
            padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IndianRupee style={{ width: '18px', height: '18px', color: '#DC2626' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#111111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title}</p>
                <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                  {e.hotel?.name || 'Unassigned'} • {new Date(e.timestamp).toLocaleDateString('en-IN')} • by {e.addedBy?.name || 'Unknown'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#111111' }}>₹{e.amount.toLocaleString('en-IN')}</span>
              <button onClick={() => handleDelete(e._id)} style={{
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', borderRadius: '6px', backgroundColor: 'transparent', color: '#DC2626', cursor: 'pointer',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Trash2 style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)', padding: '16px',
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '400px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>Add Expense</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={LABEL_STYLE}>Title</label>
                <input style={INPUT_STYLE} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Plumbing repair, electricity bill, etc." maxLength={200}
                  onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Amount (₹)</label>
                <div style={{ position: 'relative' }}>
                  <IndianRupee style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', color: '#9CA3AF' }} />
                  <input type="number" min="0" style={{ ...INPUT_STYLE, paddingLeft: '36px' }} value={form.amount}
                    onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <div>
                <label style={LABEL_STYLE}>Hotel</label>
                <select value={form.hotelId} onChange={(e) => setForm((f) => ({ ...f, hotelId: e.target.value }))} style={SELECT_STYLE}>
                  <option value="">Select a hotel</option>
                  {hotels.map((h) => <option key={h._id} value={h._id}>{h.name}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} disabled={saving} style={{
                width: '100%', height: '42px', borderRadius: '8px', border: 'none',
                backgroundColor: saving ? '#D1D5DB' : '#F24E1E', color: saving ? '#6B7280' : 'white',
                fontSize: '14px', fontWeight: '500', cursor: saving ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                {saving && <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />}
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
