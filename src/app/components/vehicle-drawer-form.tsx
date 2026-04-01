import { useState } from 'react';
import { X, Save, Car, Upload, Check, AlertCircle } from 'lucide-react';
import { getModelOptions, formatModelVariant, getModelById } from '../utils/model-master-data';

interface Vehicle {
  id: string;
  registrationNumber: string;
  modelVariantId: string; // Changed from model/variant
  hubAssigned: string;
  hubCode: string;
  status: string;
  odometer: number;
  lastInspectionDate: string;
  warrantyStatus: string;
  warrantyExpiryDate: string;
  insuranceExpiryDate: string;
  documents: {
    rc: boolean;
    insurance: boolean;
    fitness: boolean;
  };
  lastUpdated: string;
  manufacturingYear: number;
  batteryCapacity: number;
}

interface VehicleDrawerFormProps {
  mode: 'create' | 'edit';
  vehicle: Vehicle | null;
  onClose: () => void;
  onSave: (vehicleData: any) => void;
}

export function VehicleDrawerForm({ mode, vehicle, onClose, onSave }: VehicleDrawerFormProps) {
  const [formData, setFormData] = useState({
    registrationNumber: vehicle?.registrationNumber || '',
    modelVariantId: vehicle?.modelVariantId || '',
    manufacturingYear: vehicle?.manufacturingYear || new Date().getFullYear(),
    hubAssigned: vehicle?.hubAssigned || '',
    batteryCapacity: vehicle?.batteryCapacity || 0,
    odometer: vehicle?.odometer || 0,
    warrantyExpiryDate: vehicle?.warrantyExpiryDate || '',
    insuranceExpiryDate: vehicle?.insuranceExpiryDate || '',
  });

  const [documentUploads, setDocumentUploads] = useState({
    rc: vehicle?.documents.rc || false,
    insurance: vehicle?.documents.insurance || false,
    fitness: vehicle?.documents.fitness || false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle model selection and auto-populate battery capacity
  const handleModelChange = (modelVariantId: string) => {
    setFormData(prev => {
      const selectedModel = getModelById(modelVariantId);
      return {
        ...prev,
        modelVariantId,
        batteryCapacity: selectedModel ? selectedModel.batteryCapacity : 0,
      };
    });
  };

  const handleFileUpload = (docType: 'rc' | 'insurance' | 'fitness') => {
    // In real implementation, this would handle file upload
    setDocumentUploads(prev => ({ ...prev, [docType]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      documents: documentUploads,
    });
  };

  // Mock data
  const hubs = ['MG Road Hub', 'Whitefield Hub', 'Koramangala Hub', 'Indiranagar Hub', 'Electronic City Hub'];
  const models = ['Ather 450X', 'Ola S1 Pro', 'TVS iQube', 'Bounce Infinity E1'];
  const vendors = ['Ather Energy', 'Ola Electric', 'TVS Motor', 'Bounce Infinity'];

  // Hub master data with full details
  const hubDetails: Record<string, { name: string; city: string; state: string; address: string; pincode: string; code: string }> = {
    'MG Road Hub': {
      name: 'MG Road Hub',
      city: 'Bangalore',
      state: 'Karnataka',
      address: 'MG Road, Near Metro Station',
      pincode: '560001',
      code: 'BLR-MGR-01',
    },
    'Whitefield Hub': {
      name: 'Whitefield Hub',
      city: 'Bangalore',
      state: 'Karnataka',
      address: 'ITPL Main Road, Whitefield',
      pincode: '560066',
      code: 'BLR-WHF-02',
    },
    'Koramangala Hub': {
      name: 'Koramangala Hub',
      city: 'Bangalore',
      state: 'Karnataka',
      address: '5th Block, Koramangala',
      pincode: '560095',
      code: 'BLR-KRM-03',
    },
    'Indiranagar Hub': {
      name: 'Indiranagar Hub',
      city: 'Bangalore',
      state: 'Karnataka',
      address: '100 Feet Road, Indiranagar',
      pincode: '560038',
      code: 'BLR-IND-04',
    },
    'Electronic City Hub': {
      name: 'Electronic City Hub',
      city: 'Bangalore',
      state: 'Karnataka',
      address: 'Hosur Road, Electronic City Phase 1',
      pincode: '560100',
      code: 'BLR-ELC-05',
    },
  };

  const selectedHub = formData.hubAssigned ? hubDetails[formData.hubAssigned] : null;

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
          width: '640px',
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
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                {mode === 'create' ? 'Register New Vehicle' : 'Edit Vehicle'}
              </h2>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                {mode === 'create' ? 'Add a new vehicle to the fleet registry' : `Editing ${vehicle?.registrationNumber}`}
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
          <form onSubmit={handleSubmit} id="vehicle-form">
            <div className="p-6 space-y-6">
              {/* Basic Info Section */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Basic Information
                </h3>
                <div className="space-y-4">
                  {/* Row 1: Registration Number and Manufacturing Year */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Registration Number <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.registrationNumber}
                        onChange={(e) => handleInputChange('registrationNumber', e.target.value.toUpperCase())}
                        placeholder="KA-01-AB-1234"
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
                        Manufacturing Year <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="2020"
                        max={new Date().getFullYear() + 1}
                        value={formData.manufacturingYear}
                        onChange={(e) => handleInputChange('manufacturingYear', Number(e.target.value))}
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

                  {/* Row 2: Model & Variant and Battery Capacity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Model & Variant <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <select
                        required
                        value={formData.modelVariantId}
                        onChange={(e) => handleModelChange(e.target.value)}
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      >
                        <option value="">Select model and variant</option>
                        {getModelOptions().map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                        Models are managed in Masters → Model Master
                      </p>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Battery Capacity (Wh) <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        disabled
                        value={formData.batteryCapacity}
                        onChange={(e) => handleInputChange('batteryCapacity', Number(e.target.value))}
                        placeholder="Auto-filled from model"
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#6B7280',
                          backgroundColor: '#F7F9FC',
                          cursor: 'not-allowed',
                        }}
                      />
                      <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                        Auto-filled based on selected model
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div
                className="pt-6"
                style={{ borderTop: '1px solid #E5E7EB' }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Hub Assignment
                </h3>
                <div className="space-y-4">
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Hub <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <select
                      required
                      value={formData.hubAssigned}
                      onChange={(e) => handleInputChange('hubAssigned', e.target.value)}
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    >
                      <option value="">Select hub</option>
                      {hubs.map(hub => {
                        const details = hubDetails[hub];
                        return (
                          <option key={hub} value={hub}>
                            {details.name} — {details.city}, {details.state}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Hub Details Card - Shows when hub is selected */}
                  {selectedHub && (
                    <div
                      className="p-4"
                      style={{
                        backgroundColor: '#F7F9FC',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                      }}
                    >
                      <p style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Hub Details
                      </p>
                      <p style={{ fontSize: '14px', color: '#111111', marginBottom: '4px' }}>
                        {selectedHub.address}
                      </p>
                      <p style={{ fontSize: '14px', color: '#111111', marginBottom: '8px' }}>
                        {selectedHub.city}, {selectedHub.state} — {selectedHub.pincode}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>
                        Hub Code: {selectedHub.code}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Section */}
              <div
                className="pt-6"
                style={{ borderTop: '1px solid #E5E7EB' }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Technical Details
                </h3>
                <div className="space-y-4">
                  {/* Single row with 3 fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Initial Odometer (km) <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.odometer}
                        onChange={(e) => handleInputChange('odometer', Number(e.target.value))}
                        placeholder="0"
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
                        Warranty Expiry Date <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.warrantyExpiryDate}
                        onChange={(e) => handleInputChange('warrantyExpiryDate', e.target.value)}
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
                        Insurance Expiry Date <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.insuranceExpiryDate}
                        onChange={(e) => handleInputChange('insuranceExpiryDate', e.target.value)}
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

              {/* Compliance Documents Section */}
              <div
                className="pt-6"
                style={{ borderTop: '1px solid #E5E7EB' }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '16px' }}>
                  Compliance Documents
                </h3>
                <div className="space-y-4">
                  {/* RC Upload */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      RC (Registration Certificate)
                    </label>
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        border: `2px dashed ${documentUploads.rc ? '#16A34A' : '#E5E7EB'}`,
                        backgroundColor: documentUploads.rc ? '#F0FDF4' : '#FAFAFA',
                      }}
                    >
                      {documentUploads.rc ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="flex items-center justify-center rounded-full"
                              style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#DCFCE7',
                                color: '#16A34A',
                              }}
                            >
                              <Check className="w-4 h-4" />
                            </div>
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                                RC document uploaded
                              </p>
                              <p style={{ fontSize: '12px', color: '#6B7280' }}>
                                rc_certificate.pdf
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDocumentUploads(prev => ({ ...prev, rc: false }))}
                            style={{ fontSize: '12px', color: '#DC2626' }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#6B7280' }} />
                          <p style={{ fontSize: '13px', color: '#111111', marginBottom: '4px' }}>
                            Click to upload or drag and drop
                          </p>
                          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>
                            PDF, JPG, PNG up to 10MB
                          </p>
                          <button
                            type="button"
                            onClick={() => handleFileUpload('rc')}
                            className="px-3 py-1.5 rounded transition-colors"
                            style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              border: '1px solid #E5E7EB',
                              backgroundColor: 'white',
                              color: '#111111',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            Choose File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Insurance Upload */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Insurance
                    </label>
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        border: `2px dashed ${documentUploads.insurance ? '#16A34A' : '#E5E7EB'}`,
                        backgroundColor: documentUploads.insurance ? '#F0FDF4' : '#FAFAFA',
                      }}
                    >
                      {documentUploads.insurance ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="flex items-center justify-center rounded-full"
                              style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#DCFCE7',
                                color: '#16A34A',
                              }}
                            >
                              <Check className="w-4 h-4" />
                            </div>
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                                Insurance document uploaded
                              </p>
                              <p style={{ fontSize: '12px', color: '#6B7280' }}>
                                insurance_policy.pdf
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDocumentUploads(prev => ({ ...prev, insurance: false }))}
                            style={{ fontSize: '12px', color: '#DC2626' }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#6B7280' }} />
                          <p style={{ fontSize: '13px', color: '#111111', marginBottom: '4px' }}>
                            Click to upload or drag and drop
                          </p>
                          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>
                            PDF, JPG, PNG up to 10MB
                          </p>
                          <button
                            type="button"
                            onClick={() => handleFileUpload('insurance')}
                            className="px-3 py-1.5 rounded transition-colors"
                            style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              border: '1px solid #E5E7EB',
                              backgroundColor: 'white',
                              color: '#111111',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            Choose File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Fitness Certificate Upload */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Fitness Certificate
                    </label>
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        border: `2px dashed ${documentUploads.fitness ? '#16A34A' : '#E5E7EB'}`,
                        backgroundColor: documentUploads.fitness ? '#F0FDF4' : '#FAFAFA',
                      }}
                    >
                      {documentUploads.fitness ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="flex items-center justify-center rounded-full"
                              style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#DCFCE7',
                                color: '#16A34A',
                              }}
                            >
                              <Check className="w-4 h-4" />
                            </div>
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                                Fitness certificate uploaded
                              </p>
                              <p style={{ fontSize: '12px', color: '#6B7280' }}>
                                fitness_certificate.pdf
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDocumentUploads(prev => ({ ...prev, fitness: false }))}
                            style={{ fontSize: '12px', color: '#DC2626' }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#6B7280' }} />
                          <p style={{ fontSize: '13px', color: '#111111', marginBottom: '4px' }}>
                            Click to upload or drag and drop
                          </p>
                          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>
                            PDF, JPG, PNG up to 10MB
                          </p>
                          <button
                            type="button"
                            onClick={() => handleFileUpload('fitness')}
                            className="px-3 py-1.5 rounded transition-colors"
                            style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              border: '1px solid #E5E7EB',
                              backgroundColor: 'white',
                              color: '#111111',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            Choose File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Upload Note */}
                  <div
                    className="flex items-start gap-2 p-3 rounded-lg"
                    style={{ backgroundColor: '#FFF7ED', border: '1px solid #FDBA74' }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                    <p style={{ fontSize: '12px', color: '#92400E', lineHeight: '1.5' }}>
                      All documents should be valid and up-to-date. Vehicles with incomplete documentation will be marked as "Blocked" for allocation.
                    </p>
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
            form="vehicle-form"
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
            {mode === 'create' ? 'Register Vehicle' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
}