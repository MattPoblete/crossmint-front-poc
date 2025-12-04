import { Button } from '../ui';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  onCheckBalance: () => void;
  onLogout: () => void;
  loading?: boolean;
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function ActionButtons({ onCheckBalance, onLogout, loading }: ActionButtonsProps) {
  return (
    <div className={styles.container}>
      <Button variant="ghost" icon={<RefreshIcon />} onClick={onCheckBalance} disabled={loading}>
        Check Balance
      </Button>
      <div className={styles.divider} />
      <Button variant="danger" icon={<LogoutIcon />} onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
