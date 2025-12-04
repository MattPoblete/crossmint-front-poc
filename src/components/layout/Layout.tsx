import type { ReactNode } from 'react';
import { WalletHeader } from '../wallet';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  address?: string;
  email?: string;
  onCopyAddress?: () => void;
  showWalletHeader?: boolean;
}

export function Layout({
  children,
  address,
  email,
  onCopyAddress,
  showWalletHeader = true
}: LayoutProps) {
  return (
    <div className={styles.container}>
      {showWalletHeader && address && onCopyAddress && (
        <div className={styles.header}>
          <WalletHeader address={address} email={email} onCopy={onCopyAddress} />
        </div>
      )}

      <div className={styles.content}>
        {children}
      </div>

      <div className={styles.disclaimer}>
        <strong>Proof of Concept</strong> — Integration of Soroswap and Defindex with Crossmint wallets on Stellar. Not for production use.
      </div>
    </div>
  );
}
