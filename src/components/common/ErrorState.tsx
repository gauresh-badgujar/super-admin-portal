interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="error-state">
      <h3>Unable to load data</h3>

      <p>{message}</p>

      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;