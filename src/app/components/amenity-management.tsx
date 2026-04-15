import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Plus, Diamond, Loader2, Trash2, X } from 'lucide-react';
import api from '../utils/api';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';

const iconLibraries: Record<string, any> = {
  ai: AiIcons,
  bs: BsIcons,
  bi: BiIcons,
  fa: FaIcons,
  md: MdIcons,
  hi: HiIcons,
  ri: RiIcons,
  si: SiIcons,
};

const DynamicIcon = ({ iconName, className }: { iconName?: string, className?: string }) => {
  if (!iconName) return <Diamond className={className} />;
  
  const prefix = iconName.substring(0, 2).toLowerCase();
  const lib = iconLibraries[prefix];
  
  if (lib && lib[iconName]) {
    const IconComponent = lib[iconName];
    return <IconComponent className={className} />;
  }
  
  return <Diamond className={className} />;
};

interface Amenity {
  name: string;
  icon?: string;
}

interface Hotel {
  _id: string;
  name: string;
  amenities: Amenity[];
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

const SELECT_STYLE: React.CSSProperties = {
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

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '4px',
};

export function AmenityManagement() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotelId, setSelectedHotelId] = useState<string>('');
  const [newAmenity, setNewAmenity] = useState('');
  const [amenityIcon, setAmenityIcon] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await api.get('/hotels');
      setHotels(res.data);
      if (res.data.length > 0 && !selectedHotelId) {
        setSelectedHotelId(res.data[0]._id);
      }
    } catch {
      showToast('Failed to load hotels', 'error');
    } finally {
      setLoading(false);
    }
  };

  const selectedHotel = hotels.find(h => h._id === selectedHotelId);

  const handleAddAmenity = async () => {
    if (!selectedHotelId) return;
    if (!newAmenity.trim()) {
      showToast('Please enter an amenity name', 'error');
      return;
    }

    const currentAmenities = selectedHotel?.amenities || [];
    if (currentAmenities.some(a => (typeof a === 'string' ? a === newAmenity.trim() : a.name === newAmenity.trim()))) {
      showToast('Amenity already exists', 'error');
      return;
    }

    setSaving(true);
    try {
      const updatedAmenities = [...currentAmenities, { name: newAmenity.trim(), icon: amenityIcon.trim() }];
      await api.put(`/hotels/${selectedHotelId}`, {
        amenities: JSON.stringify(updatedAmenities)
      });
      
      setHotels(prev => prev.map(h => 
        h._id === selectedHotelId ? { ...h, amenities: updatedAmenities } : h
      ));
      
      setNewAmenity('');
      setAmenityIcon('');
      showToast('Amenity added successfully');
    } catch (error: any) {
      showToast('Failed to add amenity', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAmenity = async (amenityToDelete: string) => {
    if (!selectedHotelId) return;
    
    setSaving(true);
    try {
      const updatedAmenities = (selectedHotel?.amenities || []).filter(a => (typeof a === 'string' ? a !== amenityToDelete : a.name !== amenityToDelete));
      await api.put(`/hotels/${selectedHotelId}`, {
        amenities: JSON.stringify(updatedAmenities)
      });
      
      setHotels(prev => prev.map(h => 
        h._id === selectedHotelId ? { ...h, amenities: updatedAmenities } : h
      ));
      
      showToast('Amenity removed');
    } catch {
      showToast('Failed to remove amenity', 'error');
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <Loader2 style={{ width: '32px', height: '32px', color: '#F24E1E', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

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

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111' }}>Hotel Amenities</h2>
        <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Manage features and facilities for each hotel</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Hotel Selection */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          border: '1px solid #E5E7EB',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>
          <label style={LABEL_STYLE}>Select Hotel</label>
          <select 
            value={selectedHotelId} 
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedHotelId(e.target.value)}
            style={{ ...SELECT_STYLE, marginBottom: '16px' }}
          >
            {hotels.map((h) => (
              <option key={h._id} value={h._id}>{h.name}</option>
            ))}
          </select>

          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px', marginTop: '16px' }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={LABEL_STYLE}>Amenity Name</label>
              <input 
                style={INPUT_STYLE}
                placeholder="e.g. Free WiFi, Spa..."
                value={newAmenity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewAmenity(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={LABEL_STYLE}>React Icon Code (e.g. FaWifi, MdPool)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  style={{...INPUT_STYLE, flex: 1}}
                  placeholder="Paste icon code here..."
                  value={amenityIcon}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAmenityIcon(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddAmenity()}
                />
                <button
                  onClick={handleAddAmenity}
                  disabled={saving || !selectedHotelId}
                  style={{
                    backgroundColor: '#F24E1E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: (saving || !selectedHotelId) ? 'not-allowed' : 'pointer',
                    opacity: (saving || !selectedHotelId) ? 0.7 : 1,
                  }}
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px' }}>
                Copy the icon name from <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noreferrer" style={{ color: '#F24E1E', textDecoration: 'underline' }}>react-icons website</a>
              </p>
            </div>
          </div>

        </div>

        {/* Amenities List */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          border: '1px solid #E5E7EB',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          minHeight: '300px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111111', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {selectedHotel?.name || 'Hotel'} Amenities
          </h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {selectedHotel?.amenities && selectedHotel.amenities.length > 0 ? (
              selectedHotel.amenities.map((amenity, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    transition: 'all 0.2s'
                  }}
                >
                  <DynamicIcon iconName={typeof amenity === 'string' ? '' : amenity.icon} className="w-4 h-4 text-primary" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    {typeof amenity === 'string' ? amenity : amenity.name}
                  </span>
                  <button
                    onClick={() => handleDeleteAmenity(typeof amenity === 'string' ? amenity : amenity.name)}
                    disabled={saving}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '2px',
                      borderRadius: '4px',
                    }}
                  >
                    <X style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', width: '100%', color: '#9CA3AF' }}>
                <Diamond style={{ width: '32px', height: '32px', margin: '0 auto 12px', opacity: 0.3 }} />
                <p style={{ fontSize: '14px' }}>No amenities added yet for this hotel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


