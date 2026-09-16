import type { UserActivity } from "../../types/user.types";

interface RecentActivityProps {
  activities: UserActivity[];
}

function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <section className="dashboard-section">
      <h2>Recent Activity</h2>

      {activities.length === 0 ? (
        <div className="activity-empty">
          <p>No recent activity available.</p>
        </div>
      ) : (
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div
              className="activity-item"
              key={index}
            >
              <pre>
                {JSON.stringify(activity, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentActivity;