import { GlassCard } from '../ui';
import styles from './BalanceCard.module.css';

interface BalanceCardProps {
  xlmBalance?: string;
  usdcBalance?: string;
}

export function BalanceCard({ xlmBalance = '0', usdcBalance = '0' }: BalanceCardProps) {
  return (
    <GlassCard>
      <div className={styles.balanceItem}>
        <div className={styles.balanceInfo}>
          <p className={styles.balanceLabel}>XLM Balance</p>
          <p className={styles.balanceAmount}>{xlmBalance}</p>
        </div>
        <div className={`${styles.tokenIcon} ${styles.xlmIcon}`}>XLM</div>
      </div>
      <div className={styles.balanceItem}>
        <div className={styles.balanceInfo}>
          <p className={styles.balanceLabel}>USDC Balance</p>
          <p className={styles.balanceAmount}>{usdcBalance}</p>
        </div>
        <div className={`${styles.tokenIcon} ${styles.usdcIcon}`}>USDC</div>
      </div>
    </GlassCard>
  );
}
