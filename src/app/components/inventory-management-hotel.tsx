import { useState, useEffect } from 'react';
import { Plus, Package, Loader2, Trash2, X } from 'lucide-react';
import api from '../utils/api';

interface InventoryItem {
  _id: string;
  name: string;
  hotel: { _id: string; name: string };
  available: number;
  inRooms: number;
  inLaundry: number;
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

const NUM_INPUT = {
  width: '64px', height: '32px', padding: '0 8px', textAlign: 'center' as const,
  borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '13px',
  color: '#111111', outline: 'none',
};

export function InventoryManagementHotel() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterHotel, setFilterHotel] = useState('all');
  const [form, setForm] = useState({ name: '', hotelId: '', available: '10', inRooms: '0', inLaundry: '0' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => { fetchItems(); fetchHotels(); }, [filterHotel]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/inventory', {
        params: filterHotel !== 'all' ? { hotelId: filterHotel } : {},
      });
      setItems(data);
    } catch {
      showToast('Failed to load inventory', 'error');
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
    if (!form.name.trim() || !form.hotelId) {
      showToast('Name and hotel required', 'error');
      return;
    }
    setSaving(true);
    try {
      await api.post('/inventory', {
        name: form.name, hotelId: form.hotelId,
        available: parseInt(form.available) || 0,
        inRooms: parseInt(form.inRooms) || 0,
        inLaundry: parseInt(form.inLaundry) || 0,
      });
      showToast('Item added');
      setModalOpen(false);
      setForm((f) => ({ ...f, name: '' }));
      fetchItems();
    } catch {
      showToast('Failed to add item', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateCount = async (id: string, field: 'available' | 'inRooms' | 'inLaundry', value: number) => {
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, [field]: Math.max(0, value) } : i)));
    try {
      await api.put(`/inventory/${id}`, { [field]: Math.max(0, value) });
    } catch {
      showToast('Failed to update count', 'error');
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/inventory/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      showToast('Item removed');
    } catch {
      showToast('Failed to delete item', 'error');
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>Inventory</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{items.length} items</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select value={filterHotel} onChange={(e) => setFilterHotel(e.target.value)} style={{ ...SELECT_STYLE, width: '180px' }}>
            <option value="all">All Hotels</option>
            {hotels.map((h) => <option key={h._id} value={h._id}>{h.name}</option>)}
          </select>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              backgroundColor: '#F24E1E', color: 'white', border: 'none',
              borderRadius: '8px', padding: '8px 16px', fontSize: '14px',
              fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
          >
            <Plus style={{ width: '16px', height: '16px' }} /> Add Item
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB' }}>
                {['Item', 'Hotel', 'Available', 'In Rooms', 'In Laundry', 'Total', 'Action'].map((h) => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: h === 'Item' || h === 'Hotel' ? 'left' : 'center',
                    fontSize: '12px', fontWeight: '600', color: '#6B7280',
                    borderBottom: '1px solid #E5E7EB', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: '60px', textAlign: 'center' }}>
                  <Loader2 style={{ width: '24px', height: '24px', color: '#F24E1E', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                </td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '60px', textAlign: 'center', color: '#9CA3AF' }}>No items found.</td></tr>
              ) : items.map((item) => (
                <tr key={item._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Package style={{ width: '16px', height: '16px', color: '#F24E1E' }} />
                      <span style={{ fontWeight: '500', color: '#111111' }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6B7280' }}>{item.hotel?.name || 'Unassigned'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <input type="number" min="0" value={item.available}
                      onChange={(e) => updateCount(item._id, 'available', parseInt(e.target.value) || 0)}
                      style={NUM_INPUT} />
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <input type="number" min="0" value={item.inRooms}
                      onChange={(e) => updateCount(item._id, 'inRooms', parseInt(e.target.value) || 0)}
                      style={NUM_INPUT} />
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <input type="number" min="0" value={item.inLaundry}
                      onChange={(e) => updateCount(item._id, 'inLaundry', parseInt(e.target.value) || 0)}
                      style={NUM_INPUT} />
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#111111' }}>
                    {(item.available || 0) + (item.inRooms || 0) + (item.inLaundry || 0)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <button onClick={() => handleDelete(item._id)} style={{
                      width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: 'none', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer', margin: '0 auto',
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FECACA')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                    >
                      <Trash2 style={{ width: '14px', height: '14px' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)', padding: '16px',
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '420px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>Add Inventory Item</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={LABEL_STYLE}>Item Name</label>
                <input style={INPUT_STYLE} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Bedsheet, Blanket, etc." maxLength={50}
                  onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Hotel</label>
                <select value={form.hotelId} onChange={(e) => setForm((f) => ({ ...f, hotelId: e.target.value }))} style={SELECT_STYLE}>
                  <option value="">Select hotel</option>
                  {hotels.map((h) => <option key={h._id} value={h._id}>{h.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {(['available', 'inRooms', 'inLaundry'] as const).map((f) => (
                  <div key={f}>
                    <label style={LABEL_STYLE}>{f === 'available' ? 'Available' : f === 'inRooms' ? 'In Rooms' : 'In Laundry'}</label>
                    <input type="number" min="0" style={INPUT_STYLE} value={form[f]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f]: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                  </div>
                ))}
              </div>
              <button onClick={handleAdd} disabled={saving} style={{
                width: '100%', height: '42px', borderRadius: '8px', border: 'none',
                backgroundColor: saving ? '#D1D5DB' : '#F24E1E', color: saving ? '#6B7280' : 'white',
                fontSize: '14px', fontWeight: '500', cursor: saving ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                {saving && <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />}
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
