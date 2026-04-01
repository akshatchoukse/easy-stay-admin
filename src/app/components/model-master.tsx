import { useState } from 'react';
import { Plus, Search, Edit, Power, Database } from 'lucide-react';
import { modelMasterData, VehicleModel } from '../utils/model-master-data';

// Mock data (using centralized data)
const mockModels: VehicleModel[] = [...modelMasterData];

export function ModelMaster() {
  const [models, setModels] = useState<VehicleModel[]>(mockModels);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [editingModel, setEditingModel] = useState<VehicleModel | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    modelName: '',
    variantName: '',
    vehicleType: 'Scooter' as const,
    batteryCapacity: '',
    range: '',
    description: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      searchTerm === '' ||
      model.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.variantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || model.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingModel(null);
    setFormData({
      modelName: '',
      variantName: '',
      vehicleType: 'Scooter',
      batteryCapacity: '',
      range: '',
      description: '',
      status: 'Active',
    });
    setShowAddEditForm(true);
  };

  const handleEdit = (model: VehicleModel) => {
    setEditingModel(model);
    setFormData({
      modelName: model.modelName,
      variantName: model.variantName,
      vehicleType: model.vehicleType,
      batteryCapacity: model.batteryCapacity.toString(),
      range: model.range?.toString() || '',
      description: model.description || '',
      status: model.status,
    });
    setShowAddEditForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicate Model + Variant combination
    const isDuplicate = models.some(
      (m) =>
        m.modelName === formData.modelName &&
        m.variantName === formData.variantName &&
        m.id !== editingModel?.id
    );

    if (isDuplicate) {
      alert('This Model + Variant combination already exists!');
      return;
    }

    if (editingModel) {
      // Update existing
      setModels(
        models.map((m) =>
          m.id === editingModel.id
            ? {
                ...m,
                modelName: formData.modelName,
                variantName: formData.variantName,
                batteryCapacity: parseInt(formData.batteryCapacity),
                range: formData.range ? parseInt(formData.range) : undefined,
                description: formData.description || undefined,
                status: formData.status,
              }
            : m
        )
      );
    } else {
      // Add new
      const newModel: VehicleModel = {
        id: `model-${Date.now()}`,
        modelName: formData.modelName,
        variantName: formData.variantName,
        vehicleType: formData.vehicleType,
        batteryCapacity: parseInt(formData.batteryCapacity),
        range: formData.range ? parseInt(formData.range) : undefined,
        description: formData.description || undefined,
        status: formData.status,
        createdDate: new Date().toISOString().split('T')[0],
      };
      setModels([newModel, ...models]);
    }

    setShowAddEditForm(false);
  };

  const handleToggleStatus = (modelId: string) => {
    setModels(
      models.map((m) =>
        m.id === modelId ? { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' } : m
      )
    );
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Database className="w-6 h-6" style={{ color: '#F24E1E' }} />
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111' }}>Model Master</h1>
        </div>
        <p style={{ fontSize: '14px', color: '#6B7280' }}>
          Manage vehicle models and variants for the fleet registry
        </p>
      </div>

      {/* Filters & Actions */}
      <div className="mb-6">
        <div
          className="bg-white p-4"
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ width: '18px', height: '18px', color: '#6B7280' }}
              />
              <input
                type="text"
                placeholder="Search model or variant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4"
                style={{
                  height: '40px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#111111',
                  outline: 'none',
                }}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Active' | 'Inactive')}
                style={{
                  height: '40px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#111111',
                  paddingLeft: '12px',
                  paddingRight: '32px',
                  outline: 'none',
                  backgroundColor: 'white',
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 text-white transition-colors"
                style={{
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#F24E1E',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
              >
                <Plus className="w-4 h-4" />
                Add Model
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white overflow-hidden"
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F7F9FC', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th
                  className="px-6 py-3 text-left"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Model Name
                </th>
                <th
                  className="px-6 py-3 text-left"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Variant Name
                </th>
                <th
                  className="px-6 py-3 text-left"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Vehicle Type
                </th>
                <th
                  className="px-6 py-3 text-left"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Battery Capacity (Wh)
                </th>
                <th
                  className="px-6 py-3 text-left"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Range (km)
                </th>
                <th
                  className="px-6 py-3 text-left"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Status
                </th>
                <th
                  className="px-6 py-3 text-left"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Created Date
                </th>
                <th
                  className="px-6 py-3 text-right"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <Database className="w-12 h-12 mx-auto mb-3" style={{ color: '#6B7280' }} />
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>No models found</p>
                  </td>
                </tr>
              ) : (
                filteredModels.map((model, index) => (
                  <tr
                    key={model.id}
                    className="transition-colors"
                    style={{
                      borderBottom:
                        index < filteredModels.length - 1 ? '1px solid #F1F5F9' : 'none',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#F7F9FC')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <td className="px-6 py-4" style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                      {model.modelName}
                    </td>
                    <td className="px-6 py-4" style={{ fontSize: '14px', color: '#111111' }}>
                      {model.variantName}
                    </td>
                    <td className="px-6 py-4" style={{ fontSize: '14px', color: '#6B7280' }}>
                      {model.vehicleType}
                    </td>
                    <td className="px-6 py-4" style={{ fontSize: '14px', color: '#111111' }}>
                      {model.batteryCapacity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4" style={{ fontSize: '14px', color: '#111111' }}>
                      {model.range || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: model.status === 'Active' ? '#DCFCE7' : '#F3F4F6',
                          color: model.status === 'Active' ? '#16A34A' : '#6B7280',
                        }}
                      >
                        {model.status}
                      </span>
                    </td>
                    <td className="px-6 py-4" style={{ fontSize: '14px', color: '#6B7280' }}>
                      {new Date(model.createdDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(model)}
                          className="p-2 rounded-md transition-colors"
                          style={{ color: '#F24E1E', backgroundColor: 'transparent' }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = '#FFF1EC')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                          }
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(model.id)}
                          className="p-2 rounded-md transition-colors"
                          style={{
                            color: model.status === 'Active' ? '#DC2626' : '#16A34A',
                            backgroundColor: 'transparent',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              model.status === 'Active' ? '#FEE2E2' : '#DCFCE7')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                          }
                          title={model.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddEditForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddEditForm(false)}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              borderRadius: '6px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="p-6" style={{ borderBottom: '1px solid #E5E7EB' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
                  {editingModel ? 'Edit Model' : 'Add New Model'}
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
                  {editingModel
                    ? 'Update model and variant details'
                    : 'Create a new vehicle model and variant'}
                </p>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-5">
                {/* Model Name */}
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}
                  >
                    Model Name <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.modelName}
                    onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                    placeholder="e.g., Activa Electric"
                    style={{
                      width: '100%',
                      height: '40px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#111111',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Variant Name */}
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}
                  >
                    Variant Name <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.variantName}
                    onChange={(e) => setFormData({ ...formData, variantName: e.target.value })}
                    placeholder="e.g., Standard, Long Range, Pro"
                    style={{
                      width: '100%',
                      height: '40px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#111111',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Vehicle Category */}
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}
                  >
                    Vehicle Category
                  </label>
                  <input
                    type="text"
                    value="Scooter"
                    disabled
                    style={{
                      width: '100%',
                      height: '40px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#6B7280',
                      backgroundColor: '#F7F9FC',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                    }}
                  />
                </div>

                {/* Battery Capacity */}
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}
                  >
                    Battery Capacity (Wh) <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.batteryCapacity}
                    onChange={(e) => setFormData({ ...formData, batteryCapacity: e.target.value })}
                    placeholder="e.g., 3000"
                    style={{
                      width: '100%',
                      height: '40px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#111111',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Estimated Range */}
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}
                  >
                    Estimated Range (km)
                  </label>
                  <input
                    type="number"
                    value={formData.range}
                    onChange={(e) => setFormData({ ...formData, range: e.target.value })}
                    placeholder="e.g., 85"
                    style={{
                      width: '100%',
                      height: '40px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#111111',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Additional details about this model variant..."
                    rows={3}
                    style={{
                      width: '100%',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#111111',
                      padding: '12px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Status Toggle */}
                <div>
                  <label
                    className="flex items-center gap-3 cursor-pointer"
                    style={{ fontSize: '14px', color: '#111111' }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.status === 'Active'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.checked ? 'Active' : 'Inactive',
                        })
                      }
                      className="w-5 h-5"
                      style={{ accentColor: '#F24E1E' }}
                    />
                    <span style={{ fontWeight: '500' }}>Active Status</span>
                  </label>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', marginLeft: '32px' }}>
                    Only active models will appear in vehicle registration
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div
                className="p-6 flex items-center justify-end gap-3"
                style={{ borderTop: '1px solid #E5E7EB' }}
              >
                <button
                  type="button"
                  onClick={() => setShowAddEditForm(false)}
                  className="px-4 transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#111111',
                    backgroundColor: 'white',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F9FC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 text-white transition-colors"
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#F24E1E',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F24E1E')}
                >
                  {editingModel ? 'Update Model' : 'Create Model'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}