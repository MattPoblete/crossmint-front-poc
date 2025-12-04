export type View = 'dashboard' | 'swap' | 'deposit';

export interface SwapParams {
  amountIn: string;
  amountOutMin: string;
  path: string[];
  to: string;
  deadline: number;
}

export interface DepositParams {
  amountsDesired: number[];
  amountsMin: number[];
  from: string;
  invest: boolean;
}
