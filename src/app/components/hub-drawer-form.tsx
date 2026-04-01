import { useState } from 'react';
import { X, MapPin, Save } from 'lucide-react';

interface Hub {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  managerName: string;
  contactPhone: string;
  vehicleCapacity: number;
  currentVehicles: number;
  staffCount: number;
  operatingHours: string;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
}

interface HubDrawerFormProps {
  mode: 'create' | 'edit';
  hub: Hub | null;
  onClose: () => void;
  onSave: (hubData: any) => void;
}

export function HubDrawerForm({ mode, hub, onClose, onSave }: HubDrawerFormProps) {
  const [formData, setFormData] = useState({
    name: hub?.name || '',
    code: hub?.code || '',
    city: hub?.city || '',
    status: hub?.status || 'Active',
    addressLine: hub?.address.split(',')[0] || '',
    area: hub?.address.split(',')[1]?.trim() || '',
    state: 'Karnataka',
    pin: '560001',
    openingTime: '06:00',
    closingTime: '22:00',
    vehicleCapacity: hub?.vehicleCapacity || 50,
    parkingSlots: hub?.vehicleCapacity || 50,
    manager: hub?.managerName || '',
    contactPhone: hub?.contactPhone || '',
    contactEmail: hub?.managerName ? `${hub.managerName.toLowerCase().replace(' ', '.')}@bhagomobility.com` : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const cities = ['Bangalore', 'Delhi', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune'];
  const managers = ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Anita Desai'];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full bg-white overflow-hidden flex flex-col z-50"
        style={{
          width: '560px',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FFF1EC',
                color: '#F24E1E',
              }}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                {mode === 'create' ? 'Create New Hub' : 'Edit Hub'}
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                {mode === 'create' ? 'Add a new operational hub' : 'Update hub information'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-5 h-5" style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} id="hub-form">
            <div className="p-6 space-y-6">
              {/* Basic Info Section */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Hub Name <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., MG Road Hub"
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Hub Code <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g., BLR-MGR-01"
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        City <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <select
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Status <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <select
                        required
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Location
                </h3>
                <div className="space-y-4">
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Address Line <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.addressLine}
                      onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                      placeholder="Street address, building number"
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Area / Locality <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="Area or locality name"
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        State <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="State"
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        PIN Code <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pin}
                        onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                        placeholder="PIN code"
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>

                  {/* Map Preview Placeholder */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Location on Map
                    </label>
                    <div
                      className="rounded-lg flex items-center justify-center"
                      style={{
                        height: '140px',
                        backgroundColor: '#F7F9FC',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <div className="text-center">
                        <MapPin className="w-6 h-6 mx-auto mb-1" style={{ color: '#F24E1E' }} />
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>
                          Map preview with pin marker
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operations Section */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Operations
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Opening Time <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.openingTime}
                        onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Closing Time <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.closingTime}
                        onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Vehicle Capacity <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.vehicleCapacity}
                        onChange={(e) => setFormData({ ...formData, vehicleCapacity: parseInt(e.target.value) })}
                        placeholder="e.g., 50"
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Parking Slots
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.parkingSlots}
                        onChange={(e) => setFormData({ ...formData, parkingSlots: parseInt(e.target.value) })}
                        placeholder="Optional"
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Assignment
                </h3>
                <div className="space-y-4">
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Hub Manager <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <select
                      required
                      value={formData.manager}
                      onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    >
                      <option value="">Select Manager</option>
                      {managers.map(manager => (
                        <option key={manager} value={manager}>{manager}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Contact Phone <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Contact Email <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="manager@bhagomobility.com"
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer - Fixed */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0"
          style={{ borderTop: '1px solid #E5E7EB', backgroundColor: 'white' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-4 transition-colors"
            style={{
              height: '40px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              backgroundColor: 'white',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="hub-form"
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
            {mode === 'create' ? 'Create Hub' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
}