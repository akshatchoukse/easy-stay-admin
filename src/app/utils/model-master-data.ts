// Shared Model Master data for vehicle model and variant management

export interface VehicleModel {
  id: string;
  modelName: string;
  variantName: string;
  vehicleType: 'Scooter';
  batteryCapacity: number;
  range?: number;
  description?: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
}

// Centralized Model Master data
export const modelMasterData: VehicleModel[] = [
  {
    id: '1',
    modelName: 'Activa Electric',
    variantName: 'Standard',
    vehicleType: 'Scooter',
    batteryCapacity: 3000,
    range: 85,
    status: 'Active',
    createdDate: '2024-01-15',
  },
  {
    id: '2',
    modelName: 'Activa Electric',
    variantName: 'Long Range',
    vehicleType: 'Scooter',
    batteryCapacity: 4500,
    range: 116,
    status: 'Active',
    createdDate: '2024-01-20',
  },
  {
    id: '3',
    modelName: 'Activa Electric',
    variantName: 'Pro',
    vehicleType: 'Scooter',
    batteryCapacity: 5000,
    range: 125,
    status: 'Active',
    createdDate: '2024-02-01',
  },
];

// Helper function to get active models for dropdown
export function getActiveModels(): VehicleModel[] {
  return modelMasterData.filter((model) => model.status === 'Active');
}

// Helper function to format model display as "Model — Variant"
export function formatModelVariant(modelId: string): string {
  const model = modelMasterData.find((m) => m.id === modelId);
  if (!model) return 'Unknown Model';
  return `${model.modelName} — ${model.variantName}`;
}

// Helper function to get model by ID
export function getModelById(modelId: string): VehicleModel | undefined {
  return modelMasterData.find((m) => m.id === modelId);
}

// Helper function to get all model options for dropdown
export function getModelOptions(): Array<{ id: string; label: string }> {
  return getActiveModels().map((model) => ({
    id: model.id,
    label: `${model.modelName} — ${model.variantName}`,
  }));
}
