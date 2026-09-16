interface TenantStatisticsProps {
  totalTenants: number;
  activeTenants: number;
}

function TenantStatistics({
  totalTenants,
  activeTenants,
}: TenantStatisticsProps) {
  return (
    <section className="dashboard-section">
      <h2>Tenant Statistics</h2>

      <div className="statistics-card">
        <div className="statistics-item">
          <span>Total Tenants</span>
          <strong>{totalTenants}</strong>
        </div>

        <div className="statistics-item">
          <span>Active Tenants</span>
          <strong>{activeTenants}</strong>
        </div>
      </div>
    </section>
  );
}

export default TenantStatistics;