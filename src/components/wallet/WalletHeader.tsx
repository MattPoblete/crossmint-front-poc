import { GlassCard } from '../ui';
import styles from './WalletHeader.module.css';

interface WalletHeaderProps {
  address: string;
  email?: string;
  onCopy: () => void;
}

function truncateAddress(address: string): string {
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

function PersonIcon() {
  return (
    <svg className={styles.avatarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className={styles.copyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function WalletHeader({ address, email, onCopy }: WalletHeaderProps) {
  return (
    <GlassCard compact>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <PersonIcon />
        </div>
        <div className={styles.info}>
          <p className={styles.address}>{truncateAddress(address)}</p>
          {email && <p className={styles.email}>{email}</p>}
        </div>
        <button className={styles.copyButton} onClick={onCopy} title="Copy address">
          <CopyIcon />
        </button>
      </div>
    </GlassCard>
  );
}
