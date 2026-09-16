interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <strong>{value}</strong>
    </div>
  );
}

export default StatCard;