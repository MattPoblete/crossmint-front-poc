import { Badge, Button } from '../ui';
import { BalanceCard, ActionButtons } from '../wallet';
import { useNavigation } from '../../contexts/NavigationContext';
import styles from './Dashboard.module.css';

interface DashboardProps {
  xlmBalance?: string;
  usdcBalance?: string;
  loading?: boolean;
  onCheckBalance: () => void;
  onLogout: () => void;
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="M5 6l7-3 7 3" />
      <path d="M4 10v11" />
      <path d="M20 10v11" />
      <path d="M8 14v3" />
      <path d="M12 14v3" />
      <path d="M16 14v3" />
    </svg>
  );
}

export function Dashboard({
  xlmBalance,
  usdcBalance,
  loading,
  onCheckBalance,
  onLogout,
}: DashboardProps) {
  const { navigate } = useNavigation();

  return (
    <div className={styles.container}>
      <div className={styles.badge}>
        <Badge variant="success">Testnet</Badge>
      </div>

      <div className={styles.balances}>
        <BalanceCard xlmBalance={xlmBalance} usdcBalance={usdcBalance} />
      </div>

      <div className={styles.actions}>
        <Button fullWidth icon={<SwapIcon />} onClick={() => navigate('swap')}>
          Swap XLM to USDC
        </Button>
        <Button fullWidth variant="secondary" icon={<BankIcon />} onClick={() => navigate('deposit')}>
          Deposit to Defindex
        </Button>
      </div>

      <div className={styles.footerActions}>
        <ActionButtons onCheckBalance={onCheckBalance} onLogout={onLogout} loading={loading} />
      </div>
    </div>
  );
}
