import { useQuery } from "@tanstack/react-query";

import Header from "../../components/common/Header";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

import { analyticsQueries } from "../../queries/analyticsQueries";

function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(analyticsQueries.dashboard());

  if (isLoading) {
    return <Loader message="Loading dashboard..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error
            ? error.message
            : "Unable to load dashboard."
        }
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="No dashboard data"
        message="Dashboard information is not available."
      />
    );
  }

  return (
    <div className="dashboard-page">
      <Header title="Dashboard" />

      <main className="dashboard-content">
        <section className="dashboard-welcome">
          <div>
            <h2>Welcome back, Super Admin!</h2>

            <p>
              Here&apos;s what&apos;s happening with your
              platform today.
            </p>
          </div>

          <div className="dashboard-date">
            <span>Today</span>

            <strong>
              {new Date().toLocaleDateString()}
            </strong>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon users-icon">
              👤
            </div>

            <div className="stat-info">
              <span>Total Users</span>
              <strong>{data.totalUsers}</strong>
              <small>All registered users</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon active-icon">
              ✓
            </div>

            <div className="stat-info">
              <span>Active Users</span>
              <strong>{data.activeUsers}</strong>
              <small>Currently active</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon inactive-icon">
              ◷
            </div>

            <div className="stat-info">
              <span>Inactive Users</span>
              <strong>{data.inactiveUsers}</strong>
              <small>Currently inactive</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon tenant-icon">
              🏢
            </div>

            <div className="stat-info">
              <span>Total Tenants</span>
              <strong>{data.totalTenants}</strong>
              <small>Registered tenants</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue-icon">
              $
            </div>

            <div className="stat-info">
              <span>Revenue</span>

              <strong>
                ${data.revenue.toLocaleString()}
              </strong>

              <small>Total revenue</small>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>Overview</h3>
                <p>Platform statistics</p>
              </div>
            </div>

            <div className="overview-list">
              <div className="overview-item">
                <div>
                  <span>Total Users</span>
                  <small>Registered accounts</small>
                </div>

                <strong>{data.totalUsers}</strong>
              </div>

              <div className="overview-item">
                <div>
                  <span>Active Users</span>
                  <small>Active accounts</small>
                </div>

                <strong>{data.activeUsers}</strong>
              </div>

              <div className="overview-item">
                <div>
                  <span>Inactive Users</span>
                  <small>Inactive accounts</small>
                </div>

                <strong>{data.inactiveUsers}</strong>
              </div>

              <div className="overview-item">
                <div>
                  <span>Total Tenants</span>
                  <small>Registered organizations</small>
                </div>

                <strong>{data.totalTenants}</strong>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>Quick Actions</h3>
                <p>Manage your platform</p>
              </div>
            </div>

            <div className="quick-actions">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/users";
                }}
              >
                <span className="quick-action-icon">
                  👥
                </span>

                <span>
                  <strong>Manage Users</strong>

                  <small>
                    View and manage all users
                  </small>
                </span>

                <span className="quick-arrow">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/tenants";
                }}
              >
                <span className="quick-action-icon">
                  🏢
                </span>

                <span>
                  <strong>Manage Tenants</strong>

                  <small>
                    View and manage tenants
                  </small>
                </span>

                <span className="quick-arrow">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/audit-logs";
                }}
              >
                <span className="quick-action-icon">
                  📋
                </span>

                <span>
                  <strong>Audit Logs</strong>

                  <small>
                    Review system activity
                  </small>
                </span>

                <span className="quick-arrow">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  void refetch();
                }}
              >
                <span className="quick-action-icon">
                  ↻
                </span>

                <span>
                  <strong>Refresh Dashboard</strong>

                  <small>
                    Get the latest information
                  </small>
                </span>

                <span className="quick-arrow">
                  →
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-card activity-card">
          <div className="card-header">
            <div>
              <h3>Recent Activity</h3>
              <p>Latest platform activity</p>
            </div>
          </div>

          {data.recentActivity.length === 0 ? (
            <div className="activity-empty">
              <span>📋</span>

              <p>
                No recent activity available.
              </p>
            </div>
          ) : (
            <div className="activity-list">
              {data.recentActivity.map(
                (activity, index) => (
                  <div
                    className="activity-item"
                    key={index}
                  >
                    <div className="activity-dot" />

                    <div>
                      <strong>
                        {String(activity)}
                      </strong>

                      <small>
                        Recent system activity
                      </small>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;