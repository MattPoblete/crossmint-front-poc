import { useAuth } from '@crossmint/client-sdk-react-ui';
import { useNavigation } from '../contexts/NavigationContext';
import { useWalletOperations } from '../hooks/useWalletOperations';
import { Layout } from './layout';
import { LoginView, Dashboard, SwapView, DepositView } from './views';

function LoadingView() {
  return (
    <Layout showWalletHeader={false}>
      <div style={{ color: 'var(--text-primary)', fontSize: '1rem', textAlign: 'center' }}>
        Loading...
      </div>
    </Layout>
  );
}

export function WalletApp() {
  const { login, logout, status } = useAuth();
  const { currentView, navigate } = useNavigation();
  const {
    wallet,
    balances,
    loading,
    checkBalances,
    doSwap,
    defindexDeposit,
    getDefaultSwapParams,
    getDefaultDepositParams,
    constants,
  } = useWalletOperations();

  if (status === 'initializing') {
    return <LoadingView />;
  }

  if (wallet == null || status === 'logged-out') {
    return (
      <Layout showWalletHeader={false}>
        <LoginView onLogin={login} />
      </Layout>
    );
  }

  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
    }
  };

  const xlmBalance = balances?.nativeToken?.amount ?? '—';
  const usdcBalance = balances?.usdc?.amount ?? '—';

  const renderView = () => {
    switch (currentView) {
      case 'swap':
        return (
          <SwapView
            defaultParams={getDefaultSwapParams()}
            onSwap={async (params) => {
              await doSwap(params);
              navigate('dashboard');
            }}
            loading={loading}
          />
        );

      case 'deposit':
        return (
          <DepositView
            defaultParams={getDefaultDepositParams()}
            vaultAddress={constants.DEFINDEX_CONTRACT}
            onDeposit={async (params) => {
              await defindexDeposit(params);
              navigate('dashboard');
            }}
            loading={loading}
          />
        );

      case 'dashboard':
      default:
        return (
          <Dashboard
            xlmBalance={xlmBalance}
            usdcBalance={usdcBalance}
            loading={loading}
            onCheckBalance={checkBalances}
            onLogout={logout}
          />
        );
    }
  };

  return (
    <Layout
      address={wallet.address}
      email={wallet.owner}
      onCopyAddress={handleCopyAddress}
    >
      {renderView()}
    </Layout>
  );
}
