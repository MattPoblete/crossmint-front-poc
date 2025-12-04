import { useState, type FormEvent } from 'react';
import { GlassCard, Button, Input, Toggle } from '../ui';
import { useNavigation } from '../../contexts/NavigationContext';
import type { DepositParams } from '../../types';
import styles from './DepositView.module.css';

interface DepositViewProps {
  defaultParams: DepositParams;
  vaultAddress: string;
  onDeposit: (params: DepositParams) => Promise<void>;
  loading?: boolean;
}

function ArrowLeftIcon() {
  return (
    <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function DepositView({ defaultParams, vaultAddress, onDeposit, loading }: DepositViewProps) {
  const { navigate } = useNavigation();
  const [amountDesired, setAmountDesired] = useState(String(defaultParams.amountsDesired[0]));
  const [amountMin, setAmountMin] = useState(String(defaultParams.amountsMin[0]));
  const [invest, setInvest] = useState(defaultParams.invest);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onDeposit({
      amountsDesired: [Number(amountDesired)],
      amountsMin: [Number(amountMin)],
      from: defaultParams.from,
      invest,
    });
  };

  return (
    <div className={styles.container}>
      <GlassCard className={styles.form}>
        <div className={styles.header}>
          <h1 className={styles.title}>Deposit XLM to Defindex</h1>
          <p className={styles.subtitle}>Enter the details to deposit your assets.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <Input
              label="Amount Desired"
              value={amountDesired}
              onChange={setAmountDesired}
              placeholder="0"
            />
            <Input
              label="Amount Minimum"
              value={amountMin}
              onChange={setAmountMin}
              placeholder="0"
            />
            <Input
              label="Vault"
              value={vaultAddress}
              onChange={() => { }}
              mono
              disabled
            />
            <Toggle
              label="Invest after deposit"
              checked={invest}
              onChange={setInvest}
            />
          </div>
          <div className={styles.submitButton}>
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Depositing...' : 'Deposit'}
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
