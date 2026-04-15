import { useState, useEffect } from 'react';
import { Plus, BedDouble, Loader2, Trash2, X } from 'lucide-react';
import api from '../utils/api';

interface Hotel {
  _id: string;
  name: string;
}

interface Room {
  _id: string;
  hotelId: any;
  roomNumber: string;
  type: 'AC' | 'Non-AC';
  maxOccupancy: number;
  status: 'available' | 'occupied' | 'cleaning' | 'dirty';
  pricePerNight: number;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  available: { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' },
  occupied:  { bg: '#FFF1EC', text: '#C2410C', border: '#FDBA74' },
  cleaning:  { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  dirty:     { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' },
};

const INPUT_STYLE = {
  width: '100%',
  height: '38px',
  padding: '0 12px',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  fontSize: '14px',
  color: '#111111',
  outline: 'none',
};

const SELECT_STYLE = {
  width: '100%',
  height: '38px',
  padding: '0 12px',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  fontSize: '14px',
  color: '#111111',
  outline: 'none',
  backgroundColor: 'white',
  cursor: 'pointer',
};

const LABEL_STYLE = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '500' as const,
  color: '#374151',
  marginBottom: '4px',
};

export function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterHotel, setFilterHotel] = useState('all');
  const [form, setForm] = useState({
    hotelId: '', roomNumber: '', type: 'AC' as 'AC' | 'Non-AC',
    maxOccupancy: '2', status: 'available' as Room['status'], pricePerNight: '800',
  });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [roomsRes, hotelsRes] = await Promise.all([api.get('/rooms'), api.get('/hotels')]);
      setRooms(roomsRes.data);
      setHotels(hotelsRes.data);
      if (hotelsRes.data.length > 0) {
        setForm((f) => ({ ...f, hotelId: hotelsRes.data[0]._id }));
      }
    } catch {
      showToast('Failed to load rooms', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filtered = filterHotel === 'all'
    ? rooms
    : rooms.filter((r) => {
        const hId = typeof r.hotelId === 'string' ? r.hotelId : r.hotelId?._id;
        return hId === filterHotel;
      });

  const handleAdd = async () => {
    if (!form.hotelId || !form.roomNumber.trim()) {
      showToast('Hotel and room number required', 'error');
      return;
    }
    if (parseFloat(form.pricePerNight) <= 0) {
      showToast('Valid price required', 'error');
      return;
    }
    setSaving(true);
    try {
      await api.post('/rooms', {
        ...form,
        maxOccupancy: parseInt(form.maxOccupancy),
        pricePerNight: parseFloat(form.pricePerNight),
      });
      showToast('Room added successfully');
      setModalOpen(false);
      setForm((f) => ({ ...f, roomNumber: '' }));
      fetchData();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to add room', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, status: Room['status']) => {
    try {
      await api.put(`/rooms/${id}/status`, { status });
      setRooms((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
      showToast(`Room status updated to ${status}`);
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await api.delete(`/rooms/${id}`);
      setRooms((prev) => prev.filter((r) => r._id !== id));
      showToast('Room deleted');
    } catch {
      showToast('Failed to delete room', 'error');
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>Room Management</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{filtered.length} room{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={filterHotel}
            onChange={(e) => setFilterHotel(e.target.value)}
            style={{ ...SELECT_STYLE, width: '180px' }}
          >
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
            <Plus style={{ width: '16px', height: '16px' }} /> Add Room
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
          <Loader2 style={{ width: '32px', height: '32px', color: '#F24E1E', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {filtered.map((room) => {
            const hotelName = typeof room.hotelId === 'string' ? 'Unknown' : room.hotelId?.name;
            const sc = STATUS_COLORS[room.status];
            return (
              <div key={room._id} style={{
                backgroundColor: 'white', borderRadius: '10px', border: '1px solid #E5E7EB',
                padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BedDouble style={{ width: '18px', height: '18px', color: '#F24E1E' }} />
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#111111' }}>#{room.roomNumber}</span>
                  </div>
                  <span style={{
                    fontSize: '11px', fontWeight: '500', padding: '3px 8px', borderRadius: '999px',
                    backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                  }}>
                    {room.status}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>{hotelName}</p>
                <p style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
                  {room.type} • Max {room.maxOccupancy} guests
                </p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#F24E1E', marginBottom: '12px' }}>
                  ₹{room.pricePerNight?.toLocaleString('en-IN')}/night
                </p>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <select
                    value={room.status}
                    onChange={(e) => updateStatus(room._id, e.target.value as Room['status'])}
                    style={{ ...SELECT_STYLE, flex: 1, height: '32px', fontSize: '12px' }}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="dirty">Dirty</option>
                  </select>
                  <button
                    onClick={() => handleDelete(room._id)}
                    style={{
                      width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: 'none', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FECACA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                  >
                    <Trash2 style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: '#9CA3AF' }}>
              <BedDouble style={{ width: '48px', height: '48px', margin: '0 auto 12px' }} />
              <p>No rooms found.</p>
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
            backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '440px',
            maxHeight: '85vh', overflowY: 'auto', padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>Add Room</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={LABEL_STYLE}>Hotel</label>
                <select value={form.hotelId} onChange={(e) => setForm((f) => ({ ...f, hotelId: e.target.value }))} style={SELECT_STYLE}>
                  <option value="">Select hotel</option>
                  {hotels.map((h) => <option key={h._id} value={h._id}>{h.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={LABEL_STYLE}>Room Number</label>
                  <input style={INPUT_STYLE} value={form.roomNumber} onChange={(e) => setForm((f) => ({ ...f, roomNumber: e.target.value }))} maxLength={10}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Type</label>
                  <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as 'AC' | 'Non-AC' }))} style={SELECT_STYLE}>
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={LABEL_STYLE}>Max Occupancy</label>
                  <input type="number" min="1" max="10" style={INPUT_STYLE} value={form.maxOccupancy} onChange={(e) => setForm((f) => ({ ...f, maxOccupancy: e.target.value }))}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Price/Night (₹)</label>
                  <input type="number" min="0" style={INPUT_STYLE} value={form.pricePerNight} onChange={(e) => setForm((f) => ({ ...f, pricePerNight: e.target.value }))}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <button
                onClick={handleAdd}
                disabled={saving}
                style={{
                  width: '100%', height: '42px', borderRadius: '8px', border: 'none',
                  backgroundColor: saving ? '#D1D5DB' : '#F24E1E', color: saving ? '#6B7280' : 'white',
                  fontSize: '14px', fontWeight: '500', cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {saving && <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />}
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
