import { useState } from 'react';
import { StellarWallet, useWallet, type Balances, type Chain } from '@crossmint/client-sdk-react-ui';
import type { SwapParams, DepositParams } from '../types';

const SOROSWAP_ROUTER_TESTNET = 'CCMAPXWVZD4USEKDWRYS7DA4Y3D7E2SDMGBFJUCEXTC7VN6CUBGWPFUS';
const DEFINDEX_CONTRACT = 'CB4DY5JJNT6H56YAPIMN3HMPNW3RIH5RTN463XRCJEDG3AMRHFP23GSS';
const XLM_TESTNET = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC';
const USDC_TESTNET = 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA';

export function useWalletOperations() {
  const { wallet } = useWallet();
  const [balances, setBalances] = useState<Balances<Chain>>();
  const [loading, setLoading] = useState(false);

  const checkBalances = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const result = await wallet.balances();
      setBalances(result);
    } finally {
      setLoading(false);
    }
  };

  const doSwap = async (params: SwapParams) => {
    if (!wallet) return;
    setLoading(true);
    try {
      const stellarWallet = StellarWallet.from(wallet);
      const tx = await stellarWallet.sendTransaction({
        contractId: SOROSWAP_ROUTER_TESTNET,
        method: 'swap_exact_tokens_for_tokens',
        args: {
          amount_in: params.amountIn,
          amount_out_min: params.amountOutMin,
          path: params.path,
          to: params.to,
          deadline: params.deadline,
        },
      });
      console.log('Swap tx:', tx);
      return tx;
    } finally {
      setLoading(false);
    }
  };

  const defindexDeposit = async (params: DepositParams) => {
    if (!wallet) return;
    setLoading(true);
    try {
      const stellarWallet = StellarWallet.from(wallet);
      const tx = await stellarWallet.sendTransaction({
        contractId: DEFINDEX_CONTRACT,
        method: 'deposit',
        args: {
          amounts_desired: params.amountsDesired,
          amounts_min: params.amountsMin,
          from: params.from,
          invest: params.invest,
        },
      });
      console.log('Deposit tx:', tx);
      return tx;
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSwapParams = (): SwapParams => ({
    amountIn: '10000000',
    amountOutMin: '0',
    path: [XLM_TESTNET, USDC_TESTNET],
    to: wallet?.address || '',
    deadline: Math.floor(Date.now() / 1000) + 3600,
  });

  const getDefaultDepositParams = (): DepositParams => ({
    amountsDesired: [50000000],
    amountsMin: [50000000],
    from: wallet?.address || '',
    invest: true,
  });

  return {
    wallet,
    balances,
    loading,
    checkBalances,
    doSwap,
    defindexDeposit,
    getDefaultSwapParams,
    getDefaultDepositParams,
    constants: {
      XLM_TESTNET,
      USDC_TESTNET,
      DEFINDEX_CONTRACT,
    },
  };
}
