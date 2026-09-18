import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import Header from "../../components/common/Header";
import {
  tenantQueries,
  tenantKeys,
  addTenant,
} from "../../queries/tenantQueries";
import {
  deleteTenant,
  updateTenant,
  type Tenant,
} from "../../api/tenants.api";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
}

function TenantPage() {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editingTenantId, setEditingTenantId] =
    useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | "Active" | "Inactive">("All");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [formErrors, setFormErrors] =
    useState<FormErrors>({});

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(tenantQueries.list());

  const createTenantMutation = useMutation({
    mutationFn: addTenant,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tenantKeys.lists(),
      });

      resetForm();
    },
  });

  const updateTenantMutation = useMutation({
    mutationFn: ({
      id,
      tenant,
    }: {
      id: number;
      tenant: Omit<Tenant, "id">;
    }) => updateTenant(id, tenant),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tenantKeys.lists(),
      });

      resetForm();
    },
  });

  const deleteTenantMutation = useMutation({
    mutationFn: deleteTenant,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tenantKeys.lists(),
      });
    },
  });

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
    });

    setFormErrors({});
    setEditingTenantId(null);
    setShowForm(false);
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFormErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const city = formData.city.trim();

    if (!name) {
      errors.name = "Tenant name is required.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        errors.email =
          "Please enter a valid email address.";
      }
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (
      phone.replace(/\D/g, "").length < 10
    ) {
      errors.phone =
        "Phone number must contain at least 10 digits.";
    }

    if (!city) {
      errors.city = "City is required.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const tenant: Omit<Tenant, "id"> = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      status: "Active",
    };

    if (editingTenantId !== null) {
      updateTenantMutation.mutate({
        id: editingTenantId,
        tenant,
      });

      return;
    }

    createTenantMutation.mutate(tenant);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setEditingTenantId(tenant.id);

    setFormData({
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      city: tenant.city,
    });

    setFormErrors({});
    setShowForm(true);
  };

  const handleDeleteTenant = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tenant?"
    );

    if (!confirmed) {
      return;
    }

    deleteTenantMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="tenant-page">
        <Header title="Tenant Management" />

        <main className="tenant-content">
          <div className="tenant-loading">
            <div className="loader-spinner" />
            <p>Loading tenants...</p>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="tenant-page">
        <Header title="Tenant Management" />

        <main className="tenant-content">
          <div className="tenant-error">
            <div className="tenant-error-icon">
              !
            </div>

            <h2>Unable to load tenants</h2>

            <p>
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading tenants."}
            </p>

            <button
              type="button"
              onClick={() => {
                void refetch();
              }}
              className="tenant-primary-button"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  const tenants = data?.tenants ?? [];

  const filteredTenants = tenants.filter(
    (tenant) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        tenant.name
          .toLowerCase()
          .includes(searchValue) ||
        tenant.email
          .toLowerCase()
          .includes(searchValue) ||
        tenant.city
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        tenant.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const activeTenants = tenants.filter(
    (tenant) => tenant.status === "Active"
  ).length;

  const inactiveTenants = tenants.filter(
    (tenant) => tenant.status === "Inactive"
  ).length;

  const isSaving =
    createTenantMutation.isPending ||
    updateTenantMutation.isPending;

  return (
    <div className="tenant-page">
      <Header title="Tenant Management" />

      <main className="tenant-content">
        <section className="tenant-page-header">
          <div>
            <span className="tenant-page-eyebrow">
              ORGANIZATION MANAGEMENT
            </span>

            <h1>Tenants</h1>

            <p>
              Manage organizations, contact details and
              tenant status from one place.
            </p>
          </div>

          <button
            type="button"
            className="tenant-primary-button"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
          >
            <span className="tenant-button-icon">
              +
            </span>

            {showForm
              ? "Close"
              : "Add Tenant"}
          </button>
        </section>

        <section className="tenant-stat-grid">
          <div className="tenant-stat-card">
            <div className="tenant-stat-icon tenant-stat-icon-total">
              T
            </div>

            <div>
              <span>Total Tenants</span>
              <strong>{tenants.length}</strong>
            </div>
          </div>

          <div className="tenant-stat-card">
            <div className="tenant-stat-icon tenant-stat-icon-active">
              ✓
            </div>

            <div>
              <span>Active Tenants</span>
              <strong>{activeTenants}</strong>
            </div>
          </div>

          <div className="tenant-stat-card">
            <div className="tenant-stat-icon tenant-stat-icon-inactive">
              !
            </div>

            <div>
              <span>Inactive Tenants</span>
              <strong>{inactiveTenants}</strong>
            </div>
          </div>
        </section>

        {showForm && (
          <section className="tenant-form-card">
            <div className="tenant-form-card-header">
              <div>
                <h2>
                  {editingTenantId !== null
                    ? "Edit Tenant"
                    : "Add New Tenant"}
                </h2>

                <p>
                  {editingTenantId !== null
                    ? "Update the tenant information below."
                    : "Enter the tenant information below."}
                </p>
              </div>

              <button
                type="button"
                className="tenant-close-button"
                onClick={resetForm}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form
              className="tenant-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="tenant-form-field">
                <label htmlFor="tenant-name">
                  Tenant Name
                </label>

                <input
                  id="tenant-name"
                  type="text"
                  name="name"
                  placeholder="Enter tenant name"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                {formErrors.name && (
                  <span className="field-error">
                    {formErrors.name}
                  </span>
                )}
              </div>

              <div className="tenant-form-field">
                <label htmlFor="tenant-email">
                  Email Address
                </label>

                <input
                  id="tenant-email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                {formErrors.email && (
                  <span className="field-error">
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div className="tenant-form-field">
                <label htmlFor="tenant-phone">
                  Phone Number
                </label>

                <input
                  id="tenant-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />

                {formErrors.phone && (
                  <span className="field-error">
                    {formErrors.phone}
                  </span>
                )}
              </div>

              <div className="tenant-form-field">
                <label htmlFor="tenant-city">
                  City
                </label>

                <input
                  id="tenant-city"
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleInputChange}
                />

                {formErrors.city && (
                  <span className="field-error">
                    {formErrors.city}
                  </span>
                )}
              </div>

              <div className="tenant-form-actions">
                <button
                  type="button"
                  className="tenant-secondary-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="tenant-primary-button"
                  disabled={isSaving}
                >
                  {isSaving
                    ? "Saving..."
                    : editingTenantId !== null
                    ? "Save Changes"
                    : "Create Tenant"}
                </button>
              </div>
            </form>
          </section>
        )}

        {createTenantMutation.isError && (
          <div className="toast toast-error">
            Unable to add tenant. Please try again.
          </div>
        )}

        {updateTenantMutation.isError && (
          <div className="toast toast-error">
            Unable to update tenant. Please try again.
          </div>
        )}

        {deleteTenantMutation.isError && (
          <div className="toast toast-error">
            Unable to delete tenant. Please try again.
          </div>
        )}

        <section className="tenant-table-card">
          <div className="tenant-table-toolbar">
            <div>
              <h2>All Tenants</h2>

              <span>
                {filteredTenants.length} tenant
                {filteredTenants.length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>

            <div className="tenant-filters">
              <div className="tenant-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search tenants..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as
                      | "All"
                      | "Active"
                      | "Inactive"
                  )
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>
          </div>

          {filteredTenants.length === 0 ? (
            <div className="tenant-empty">
              <div className="tenant-empty-icon">
                T
              </div>

              <h3>No tenants found</h3>

              <p>
                {search || statusFilter !== "All"
                  ? "Try changing your search or filter."
                  : "Add your first tenant to get started."}
              </p>

              {!search &&
                statusFilter === "All" && (
                  <button
                    type="button"
                    className="tenant-primary-button"
                    onClick={() =>
                      setShowForm(true)
                    }
                  >
                    + Add Tenant
                  </button>
                )}
            </div>
          ) : (
            <div className="tenant-table-wrapper">
              <table className="tenant-table">
                <thead>
                  <tr>
                    <th>Tenant</th>
                    <th>Contact</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTenants.map(
                    (tenant) => (
                      <tr key={tenant.id}>
                        <td>
                          <div className="tenant-name-cell">
                            <div className="tenant-avatar">
                              {tenant.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {tenant.name}
                              </strong>

                              <span>
                                ID #{tenant.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="tenant-email">
                            {tenant.email}
                          </span>
                        </td>

                        <td>
                          {tenant.phone}
                        </td>

                        <td>
                          {tenant.city}
                        </td>

                        <td>
                          <span
                            className={`tenant-status tenant-status-${tenant.status.toLowerCase()}`}
                          >
                            <span />
                            {tenant.status}
                          </span>
                        </td>

                        <td>
                          <div className="tenant-actions">
                            <button
                              type="button"
                              className="tenant-action-edit"
                              onClick={() =>
                                handleEditTenant(
                                  tenant
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="tenant-action-delete"
                              disabled={
                                deleteTenantMutation.isPending
                              }
                              onClick={() =>
                                handleDeleteTenant(
                                  tenant.id
                                )
                              }
                            >
                              {deleteTenantMutation.isPending
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TenantPage;