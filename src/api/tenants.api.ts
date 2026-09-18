const TENANTS_STORAGE_KEY = "super-admin-tenants";

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: "Active" | "Inactive";
}

interface TenantsResponse {
  tenants: Tenant[];
  total: number;
}

function readTenants(): Tenant[] {
  const storedTenants = localStorage.getItem(
    TENANTS_STORAGE_KEY
  );

  if (!storedTenants) {
    return [];
  }

  try {
    return JSON.parse(storedTenants) as Tenant[];
  } catch {
    return [];
  }
}

function saveTenants(tenants: Tenant[]): void {
  localStorage.setItem(
    TENANTS_STORAGE_KEY,
    JSON.stringify(tenants)
  );
}

export async function getTenants(
  _signal?: AbortSignal
): Promise<TenantsResponse> {
  const tenants = readTenants();

  return {
    tenants,
    total: tenants.length,
  };
}

export async function createTenant(
  tenant: Omit<Tenant, "id">
): Promise<Tenant> {
  const tenants = readTenants();

  const newTenant: Tenant = {
    id: Date.now(),
    ...tenant,
  };

  const updatedTenants = [
    ...tenants,
    newTenant,
  ];

  saveTenants(updatedTenants);

  return newTenant;
}

export async function updateTenant(
  id: number,
  tenant: Omit<Tenant, "id">
): Promise<Tenant> {
  const tenants = readTenants();

  const existingTenant = tenants.find(
    (currentTenant) => currentTenant.id === id
  );

  if (!existingTenant) {
    throw new Error("Tenant not found.");
  }

  const updatedTenant: Tenant = {
    id,
    ...tenant,
  };

  const updatedTenants = tenants.map(
    (currentTenant) =>
      currentTenant.id === id
        ? updatedTenant
        : currentTenant
  );

  saveTenants(updatedTenants);

  return updatedTenant;
}

export async function deleteTenant(
  id: number
): Promise<void> {
  const tenants = readTenants();

  const updatedTenants = tenants.filter(
    (tenant) => tenant.id !== id
  );

  saveTenants(updatedTenants);
}