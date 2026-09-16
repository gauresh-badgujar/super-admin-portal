interface UserStatisticsProps {
  activeUsers: number;
  inactiveUsers: number;
}

function UserStatistics({
  activeUsers,
  inactiveUsers,
}: UserStatisticsProps) {
  return (
    <section className="dashboard-section">
      <h2>User Statistics</h2>

      <div className="statistics-card">
        <div className="statistics-item">
          <span>Active Users</span>
          <strong>{activeUsers}</strong>
        </div>

        <div className="statistics-item">
          <span>Inactive Users</span>
          <strong>{inactiveUsers}</strong>
        </div>
      </div>
    </section>
  );
}

export default UserStatistics;