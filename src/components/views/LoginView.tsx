import { GlassCard, Button } from '../ui';
import styles from './LoginView.module.css';

interface LoginViewProps {
  onLogin: () => void;
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

export function LoginView({ onLogin }: LoginViewProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stellar Wallet</h1>
      <p className={styles.subtitle}>Connect your wallet to get started</p>
      <GlassCard className={styles.card}>
        <Button fullWidth icon={<WalletIcon />} onClick={onLogin}>
          Connect Wallet
        </Button>
      </GlassCard>
    </div>
  );
}
