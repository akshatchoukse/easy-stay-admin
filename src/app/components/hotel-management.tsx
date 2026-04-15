import React, { useState, useEffect, ChangeEvent } from 'react';
import { Plus, Pencil, Trash2, MapPin, Loader2, Hotel, X, Image as ImageIcon } from 'lucide-react';
import api from '../utils/api';

interface Amenity {
  name: string;
  icon?: string;
}

interface HotelImage {
  url: string;
  public_id: string;
  isCover?: boolean;
}

interface HotelItem {
  _id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsappNumber: string;
  mapLink: string;
  embedMapLink: string;
  images: HotelImage[];
  amenities: Amenity[];
  startingPrice: number;
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px',
  padding: '0 12px',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  fontSize: '14px',
  color: '#111111',
  outline: 'none',
};

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '4px',
};

const emptyForm = {
  name: '', description: '', address: '', city: '', state: '',
  pincode: '', phone: '', whatsappNumber: '', mapLink: '', embedMapLink: '', startingPrice: '',
};

export function HotelManagement() {
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HotelItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => { fetchHotels(); }, []);

  const fetchHotels = async () => {
    try {
      const { data } = await api.get('/hotels');
      setHotels(data);
    } catch {
      showToast('Failed to load hotels', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setImages([]);
    setPreviewImages([]);
    setCoverIndex(0);
    setEditing(null);
  };

  const openAdd = () => { resetForm(); setModalOpen(true); };

  const openEdit = (hotel: HotelItem) => {
    setEditing(hotel);
    setForm({
      name: hotel.name,
      description: hotel.description,
      address: hotel.address || '',
      city: hotel.city,
      state: hotel.state || '',
      pincode: hotel.pincode || '',
      phone: hotel.phone || '',
      whatsappNumber: hotel.whatsappNumber || '',
      mapLink: hotel.mapLink || '',
      embedMapLink: hotel.embedMapLink || '',
      startingPrice: hotel.startingPrice?.toString() || '',
    });
    setPreviewImages(hotel.images.map((img: HotelImage) => img.url));
    const idx = hotel.images.findIndex((img: HotelImage) => img.isCover);
    setCoverIndex(idx >= 0 ? idx : 0);
    setImages([]);
    setModalOpen(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setImages((prev: File[]) => [...prev, ...files]);
    const newPreviews = files.map((f: File) => URL.createObjectURL(f));
    setPreviewImages((prev: string[]) => [...prev, ...newPreviews]);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.city.trim() || !form.description.trim()) {
      showToast('Name, city and description are required', 'error');
      return;
    }
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v as string | Blob));
    formData.append('coverIndex', coverIndex.toString());
    images.forEach((img: File) => formData.append('images', img));

    try {
      if (editing) {
        await api.put(`/hotels/${editing._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showToast('Hotel updated successfully');
      } else {
        await api.post('/hotels', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showToast('Hotel created successfully');
      }
      fetchHotels();
      setModalOpen(false);
      resetForm();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to save hotel', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    try {
      await api.delete(`/hotels/${id}`);
      setHotels((prev: HotelItem[]) => prev.filter((h: HotelItem) => h._id !== id));
      showToast('Hotel deleted');
    } catch {
      showToast('Failed to delete hotel', 'error');
    }
  };

  const handleRemoveImage = async (index: number) => {
    if (editing && editing.images && index < editing.images.length) {
      if (!window.confirm('Delete this image from server?')) return;
      try {
        const public_id = editing.images[index].public_id;
        await api.post(`/hotels/${editing._id}/remove-image`, { public_id });
        
        const updatedImages = editing.images.filter((_: HotelImage, i: number) => i !== index);
        setEditing({ ...editing, images: updatedImages });
        setPreviewImages(updatedImages.map((img: HotelImage) => img.url));
        
        if (coverIndex === index) setCoverIndex(0);
        else if (coverIndex > index) setCoverIndex((prev: number) => prev - 1);
        
        showToast('Image removed from server');
        fetchHotels();
      } catch {
        showToast('Failed to delete image', 'error');
      }
      return;
    }

    let localIdx = index;
    if (editing) {
      localIdx = index - editing.images.length;
    }

    setPreviewImages((prev: string[]) => prev.filter((_: string, i: number) => i !== index));
    setImages((prev: File[]) => prev.filter((_: File, i: number) => i !== localIdx));
    
    if (coverIndex === index) setCoverIndex(0);
    else if (coverIndex > index) setCoverIndex((prev: number) => prev - 1);
  };

  const fields: (keyof typeof emptyForm)[] = [
    'name', 'address', 'city', 'state', 'pincode', 'phone', 'whatsappNumber',
  ];

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
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>Hotel Management</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
            {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            backgroundColor: '#F24E1E', color: 'white',
            border: 'none', borderRadius: '8px', padding: '8px 16px',
            fontSize: '14px', fontWeight: '500', cursor: 'pointer',
          }}
        >
          <Plus style={{ width: '16px', height: '16px' }} />
          Add Hotel
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 0' }}>
          <Loader2 style={{ width: '32px', height: '32px', color: '#F24E1E', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {hotels.map((h: HotelItem) => (
            <div key={h._id} style={{
              backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB',
              overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <div style={{ aspectRatio: '16/9', position: 'relative', backgroundColor: '#F3F4F6' }}>
                {h.images && h.images.length > 0 ? (
                  <img 
                    src={h.images.find((img: HotelImage) => img.isCover)?.url || h.images[0].url} 
                    alt={h.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', color: '#9CA3AF' }}>
                    <Hotel style={{ width: '32px', height: '32px' }} />
                    <span style={{ fontSize: '12px' }}>No image</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>{h.name}</h3>
                <p style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  <MapPin style={{ width: '12px', height: '12px' }} />
                  {h.city}{h.state ? `, ${h.state}` : ''}
                </p>
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {h.description}
                </p>
                {h.startingPrice > 0 && (
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#F24E1E', marginBottom: '12px' }}>
                    From ₹{h.startingPrice.toLocaleString('en-IN')}/night
                  </p>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openEdit(h)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      border: '1px solid #E5E7EB', borderRadius: '6px', padding: '7px 12px',
                      fontSize: '13px', cursor: 'pointer', backgroundColor: 'white', color: '#374151',
                    }}
                  >
                    <Pencil style={{ width: '13px', height: '13px' }} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(h._id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid #FECACA', borderRadius: '6px', padding: '7px 12px',
                      fontSize: '13px', cursor: 'pointer', backgroundColor: 'white', color: '#DC2626',
                    }}
                  >
                    <Trash2 style={{ width: '13px', height: '13px' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {hotels.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: '#9CA3AF' }}>
              <Hotel style={{ width: '48px', height: '48px', margin: '0 auto 12px' }} />
              <p style={{ fontSize: '15px' }}>No hotels found. Start by adding one!</p>
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)', padding: '16px',
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '520px',
            maxHeight: '85vh', overflowY: 'auto', padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                {editing ? 'Edit Hotel' : 'Add Hotel'}
              </h3>
              <button onClick={() => { setModalOpen(false); resetForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {fields.map((field) => (
                <div key={field}>
                  <label style={LABEL_STYLE}>{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input
                    style={INPUT_STYLE}
                    value={form[field]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  />
                </div>
              ))}

              <div>
                <label style={LABEL_STYLE}>Description</label>
                <textarea
                  style={{ ...INPUT_STYLE, height: '80px', padding: '8px 12px', resize: 'none' }}
                  value={form.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  maxLength={1000}
                />
              </div>

              <div>
                <label style={LABEL_STYLE}>Google Maps Link (Direct)</label>
                <input
                  style={INPUT_STYLE}
                  value={form.mapLink}
                  placeholder="e.g. https://maps.app.goo.gl/..."
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, mapLink: e.target.value }))}
                />
              </div>

              <div>
                <label style={LABEL_STYLE}>Embed Map Link (Iframe Src)</label>
                <input
                  style={INPUT_STYLE}
                  value={form.embedMapLink}
                  placeholder="e.g. https://www.google.com/maps/embed?..."
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = e.target.value;
                    if (val.includes('<iframe')) {
                      const match = val.match(/src="([^"]+)"/);
                      if (match && match[1]) val = match[1];
                    }
                    setForm((f) => ({ ...f, embedMapLink: val }));
                  }}
                />
                <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '4px' }}>
                  Copy the 'src' value from Google Maps &gt; Share &gt; Embed a map
                </p>
              </div>

              <div>
                <label style={LABEL_STYLE}>Starting Room Price (₹)</label>
                <input
                  type="number"
                  style={INPUT_STYLE}
                  value={form.startingPrice}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, startingPrice: e.target.value }))}
                />
              </div>

              <div>
                <label style={LABEL_STYLE}>Hotel Images</label>
                <input type="file" multiple accept="image/*,.heic,.heif" onChange={handleImageChange} style={{ fontSize: '13px' }} />
                {previewImages.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                      {previewImages.map((src: string, i: number) => (
                        <div
                          key={i}
                          style={{
                            position: 'relative', width: '80px', height: '80px',
                            borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                            border: `2px solid ${coverIndex === i ? '#F24E1E' : '#E5E7EB'}`,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <img 
                            src={src} 
                            onClick={() => setCoverIndex(i)}
                            alt="" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                          
                          <button
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              handleRemoveImage(i);
                            }}
                            style={{
                              position: 'absolute', top: '2px', right: '2px',
                              backgroundColor: 'rgba(255,255,255,0.9)', color: '#DC2626',
                              border: 'none', borderRadius: '50%', width: '20px', height: '20px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              zIndex: 10
                            }}
                          >
                            <X style={{ width: '12px', height: '12px' }} />
                          </button>

                          {coverIndex === i && (
                            <div 
                              onClick={() => setCoverIndex(i)}
                              style={{
                                position: 'absolute', inset: 0, backgroundColor: 'rgba(242,78,30,0.2)',
                                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                                paddingBottom: '4px'
                              }}
                            >
                              <span style={{ 
                                fontSize: '8px', fontWeight: 'bold', color: 'white', 
                                backgroundColor: '#F24E1E', padding: '1px 6px', borderRadius: '4px',
                                textTransform: 'uppercase', letterSpacing: '0.05em'
                              }}>
                                COVER
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                )}
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  width: '100%', height: '42px', borderRadius: '8px', border: 'none',
                  backgroundColor: saving ? '#D1D5DB' : '#F24E1E',
                  color: saving ? '#6B7280' : 'white',
                  fontSize: '14px', fontWeight: '500', cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {saving && <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />}
                {editing ? 'Update Hotel' : 'Create Hotel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
