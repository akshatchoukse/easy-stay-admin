import { useState, useEffect } from 'react';
import { Plus, Loader2, X, CalendarDays, User, Phone, CreditCard } from 'lucide-react';
import api from '../utils/api';

interface Hotel {
  _id: string;
  name: string;
}

interface Room {
  _id: string;
  hotelId: string;
  roomNumber: string;
  type: string;
  pricePerNight: number;
  status: string;
}

interface Booking {
  _id?: string;
  id?: string;
  hotelId: string;
  roomId: string;
  guestName: string;
  guestPhone: string;
  guestGender: string;
  guestAadhar: string;
  secondGuestName?: string;
  secondGuestPhone?: string;
  checkIn: string;
  checkOut: string;
  paymentMode: 'cash' | 'upi';
  status: 'active' | 'checked-out';
  createdBy?: string;
}

const STATUS_COLORS = {
  active:       { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' },
  'checked-out':{ bg: '#F9FAFB', text: '#6B7280', border: '#E5E7EB' },
};

const PAY_COLORS = {
  cash: { bg: '#FFFBEB', text: '#92400E' },
  upi:  { bg: '#EEF2FF', text: '#4338CA' },
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

export function HotelBookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    hotelId: '', roomId: '', guestName: '', guestPhone: '',
    guestGender: 'Male', guestAadhar: '', secondGuestName: '', secondGuestPhone: '',
    checkIn: new Date().toISOString().slice(0, 16), checkOut: '',
    paymentMode: 'cash' as 'cash' | 'upi',
  });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [hotelsRes, roomsRes] = await Promise.all([api.get('/hotels'), api.get('/rooms')]);
      setHotels(hotelsRes.data);
      setRooms(roomsRes.data);
      if (hotelsRes.data.length > 0) {
        setForm((f) => ({ ...f, hotelId: hotelsRes.data[0]._id }));
      }
      // Bookings from mock since we don't have an /api/bookings endpoint necessarily
      setBookings([
        {
          id: 'b1', hotelId: hotelsRes.data[0]?._id || '', roomId: roomsRes.data[0]?._id || '',
          guestName: 'Rahul Sharma', guestPhone: '9876543210', guestGender: 'Male',
          guestAadhar: '1234-5678-9012', checkIn: '2025-04-01T14:00', checkOut: '2025-04-03T11:00',
          paymentMode: 'upi', status: 'active', createdBy: 'Admin',
        },
        {
          id: 'b2', hotelId: hotelsRes.data[0]?._id || '', roomId: roomsRes.data[1]?._id || '',
          guestName: 'Priya Mehta', guestPhone: '9988776655', guestGender: 'Female',
          guestAadhar: '9876-5432-1098', checkIn: '2025-03-28T12:00', checkOut: '2025-03-30T10:00',
          paymentMode: 'cash', status: 'checked-out', createdBy: 'Receptionist',
        },
      ]);
    } catch {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const availableRooms = rooms.filter(
    (r) => {
      const rHotelId = typeof r.hotelId === 'string' ? r.hotelId : (r.hotelId as any)?._id;
      return rHotelId === form.hotelId && r.status === 'available';
    }
  );

  const handleAdd = () => {
    if (!form.guestName.trim() || !form.roomId || !form.checkOut) {
      showToast('Guest name, room and check-out date required', 'error');
      return;
    }
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      ...form,
      status: 'active',
      createdBy: 'Admin',
    };
    setBookings((prev) => [newBooking, ...prev]);
    showToast('Booking created');
    setModalOpen(false);
    setForm((f) => ({ ...f, guestName: '', guestPhone: '', guestAadhar: '', roomId: '', checkOut: '', secondGuestName: '', secondGuestPhone: '' }));
  };

  const checkout = (id: string) => {
    setBookings((prev) => prev.map((b) => ((b._id || b.id) === id ? { ...b, status: 'checked-out' } : b)));
    showToast('Guest checked out');
  };

  const getHotelName = (hId: string) => hotels.find((h) => h._id === hId)?.name || '—';
  const getRoomNumber = (rId: string) => rooms.find((r) => r._id === rId)?.roomNumber || '—';

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
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>Hotel Bookings</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
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
          <Plus style={{ width: '16px', height: '16px' }} /> New Booking
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB' }}>
                {['Guest', 'Room / Hotel', 'Check-in', 'Check-out', 'Payment', 'Status', 'Action'].map((h) => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left',
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
              ) : bookings.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '60px', textAlign: 'center', color: '#9CA3AF' }}>No bookings found.</td></tr>
              ) : bookings.map((b) => {
                const bId = b._id || b.id || '';
                const sc = STATUS_COLORS[b.status] || STATUS_COLORS['active'];
                const pc = PAY_COLORS[b.paymentMode];
                return (
                  <tr key={bId} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User style={{ width: '14px', height: '14px', color: '#9CA3AF' }} />
                        <div>
                          <p style={{ fontWeight: '600', color: '#111111' }}>{b.guestName}</p>
                          <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{b.guestPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontWeight: '500', color: '#111111' }}>#{getRoomNumber(b.roomId)}</p>
                      <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{getHotelName(b.hotelId)}</p>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#374151' }}>
                        <CalendarDays style={{ width: '12px', height: '12px' }} />
                        <span style={{ fontSize: '13px' }}>{new Date(b.checkIn).toLocaleDateString('en-IN')}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#374151', fontSize: '13px' }}>
                      {new Date(b.checkOut).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '999px',
                        backgroundColor: pc.bg, color: pc.text, textTransform: 'uppercase',
                      }}>{b.paymentMode}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        fontSize: '11px', fontWeight: '500', padding: '3px 8px', borderRadius: '999px',
                        backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                      }}>{b.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {b.status === 'active' && (
                        <button onClick={() => checkout(bId)} style={{
                          border: '1px solid #E5E7EB', borderRadius: '6px', padding: '5px 12px',
                          fontSize: '12px', cursor: 'pointer', backgroundColor: 'white', color: '#374151',
                        }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                        >
                          Check Out
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
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
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '520px',
            maxHeight: '90vh', overflowY: 'auto', padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>Create Booking</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={LABEL_STYLE}>Hotel</label>
                <select value={form.hotelId} onChange={(e) => setForm((f) => ({ ...f, hotelId: e.target.value, roomId: '' }))} style={SELECT_STYLE}>
                  {hotels.map((h) => <option key={h._id} value={h._id}>{h.name}</option>)}
                </select>
              </div>
              <div>
                <label style={LABEL_STYLE}>Available Room *</label>
                <select value={form.roomId} onChange={(e) => setForm((f) => ({ ...f, roomId: e.target.value }))} style={SELECT_STYLE}>
                  <option value="">Select room</option>
                  {availableRooms.length === 0 ? (
                    <option disabled>No available rooms</option>
                  ) : availableRooms.map((r) => (
                    <option key={r._id} value={r._id}>#{r.roomNumber} ({r.type}) - ₹{r.pricePerNight}/night</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={LABEL_STYLE}>Guest Name *</label>
                  <input style={INPUT_STYLE} value={form.guestName} onChange={(e) => setForm((f) => ({ ...f, guestName: e.target.value }))} maxLength={100}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Phone *</label>
                  <input style={INPUT_STYLE} value={form.guestPhone} onChange={(e) => setForm((f) => ({ ...f, guestPhone: e.target.value }))} maxLength={15}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={LABEL_STYLE}>Gender</label>
                  <select value={form.guestGender} onChange={(e) => setForm((f) => ({ ...f, guestGender: e.target.value }))} style={SELECT_STYLE}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={LABEL_STYLE}>Aadhar *</label>
                  <input style={INPUT_STYLE} value={form.guestAadhar} onChange={(e) => setForm((f) => ({ ...f, guestAadhar: e.target.value }))}
                    placeholder="1234-5678-9012" maxLength={14}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={LABEL_STYLE}>Check-in</label>
                  <input type="datetime-local" style={INPUT_STYLE} value={form.checkIn}
                    onChange={(e) => setForm((f) => ({ ...f, checkIn: e.target.value }))}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Check-out *</label>
                  <input type="datetime-local" style={INPUT_STYLE} value={form.checkOut}
                    onChange={(e) => setForm((f) => ({ ...f, checkOut: e.target.value }))}
                    onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
              </div>
              <div style={{ border: '1px solid #F3F4F6', borderRadius: '8px', padding: '12px' }}>
                <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '10px' }}>Optional: Second Guest</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={LABEL_STYLE}>Name</label>
                    <input style={INPUT_STYLE} value={form.secondGuestName} onChange={(e) => setForm((f) => ({ ...f, secondGuestName: e.target.value }))} maxLength={100}
                      onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Phone</label>
                    <input style={INPUT_STYLE} value={form.secondGuestPhone} onChange={(e) => setForm((f) => ({ ...f, secondGuestPhone: e.target.value }))} maxLength={15}
                      onFocus={(e) => (e.target.style.borderColor = '#F24E1E')} onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')} />
                  </div>
                </div>
              </div>
              <div>
                <label style={LABEL_STYLE}>Payment Mode</label>
                <select value={form.paymentMode} onChange={(e) => setForm((f) => ({ ...f, paymentMode: e.target.value as 'cash' | 'upi' }))} style={SELECT_STYLE}>
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
              {form.paymentMode === 'upi' && (
                <div style={{ backgroundColor: '#F9FAFB', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>Show QR Code to Guest</p>
                  <div style={{
                    width: '120px', height: '120px', margin: '0 auto', border: '2px dashed #E5E7EB',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CreditCard style={{ width: '32px', height: '32px', color: '#D1D5DB' }} />
                  </div>
                </div>
              )}
              <button onClick={handleAdd} style={{
                width: '100%', height: '42px', borderRadius: '8px', border: 'none',
                backgroundColor: '#F24E1E', color: 'white',
                fontSize: '14px', fontWeight: '500', cursor: 'pointer',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
