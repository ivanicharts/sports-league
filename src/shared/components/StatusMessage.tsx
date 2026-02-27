import clsx from 'clsx';
import styles from './StatusMessage.module.css';

interface StatusMessageProps {
  message: string;
  isError?: boolean;
  onRetry?: () => void;
}

export function StatusMessage({ message, isError = false, onRetry }: StatusMessageProps) {
  return (
    <div className={clsx(styles.status, isError && styles.error)}>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}
