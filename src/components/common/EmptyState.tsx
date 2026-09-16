interface EmptyStateProps {
  title?: string;
  message?: string;
}

function EmptyState({
  title = "No data found",
  message = "There is no data to display.",
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;