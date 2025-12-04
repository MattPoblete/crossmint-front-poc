import { useState, useEffect, type FormEvent } from 'react';
import { GlassCard, Button, Input } from '../ui';
import { useNavigation } from '../../contexts/NavigationContext';
import type { SwapParams } from '../../types';
import styles from './SwapView.module.css';

interface SwapViewProps {
  defaultParams: SwapParams;
  onSwap: (params: SwapParams) => Promise<void>;
  loading?: boolean;
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

function ArrowLeftIcon() {
  return (
    <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function truncateAddress(address: string): string {
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}...${address.slice(-4)}`;
}

export function SwapView({ defaultParams, onSwap, loading }: SwapViewProps) {
  const { navigate } = useNavigation();
  const [amountIn, setAmountIn] = useState(defaultParams.amountIn);
  const [amountOutMin, setAmountOutMin] = useState(defaultParams.amountOutMin);
  const [path, setPath] = useState(defaultParams.path.map(truncateAddress).join(', '));
  const [to, setTo] = useState(truncateAddress(defaultParams.to));
  const [deadline, setDeadline] = useState(String(defaultParams.deadline));

  useEffect(() => {
    setTo(truncateAddress(defaultParams.to));
  }, [defaultParams.to]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSwap({
      amountIn,
      amountOutMin,
      path: defaultParams.path,
      to: defaultParams.to,
      deadline: Number(deadline),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Swap Tokens</h1>
        <p className={styles.subtitle}>Swap XLM to USDC via Soroswap</p>
      </div>

      <GlassCard className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <Input
              label="Amount In"
              value={amountIn}
              onChange={setAmountIn}
              suffix="XLM"
              placeholder="0"
            />
            <Input
              label="Minimum Amount Out"
              value={amountOutMin}
              onChange={setAmountOutMin}
              suffix="USDC"
              placeholder="0"
            />
            <Input
              label="Path"
              value={path}
              onChange={setPath}
              icon={<RouteIcon />}
              mono
              disabled
            />
            <Input
              label="To"
              value={to}
              onChange={setTo}
              icon={<WalletIcon />}
              mono
              disabled
            />
            <Input
              label="Deadline"
              value={deadline}
              onChange={setDeadline}
              icon={<TimerIcon />}
              hint="Transaction must be confirmed by this time."
              placeholder="Unix Timestamp"
            />
          </div>
          <div className={styles.submitButton}>
            <Button type="submit" fullWidth icon={<SwapIcon />} disabled={loading}>
              {loading ? 'Swapping...' : 'Swap'}
            </Button>
          </div>
        </form>
      </GlassCard>

      <button className={styles.backLink} onClick={() => navigate('dashboard')}>
        <ArrowLeftIcon />
        Back to Dashboard
      </button>
    </div>
  );
}
