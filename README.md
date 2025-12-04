# Crossmint + Soroswap + Defindex Integration POC

A proof of concept demonstrating the integration of [Soroswap](https://soroswap.finance/) and [Defindex](https://defindex.io/) with [Crossmint](https://crossmint.com/) wallets on the Stellar network.

## Overview

This POC showcases how to:

- **Authenticate users** using Crossmint's embedded wallet solution
- **Swap tokens** (XLM to USDC) via Soroswap's DEX on Stellar Testnet
- **Deposit assets** into Defindex vaults for DeFi strategies

## Tech Stack

- **React 19** + TypeScript + Vite
- **Crossmint SDK** - Wallet authentication and transaction signing
- **Stellar SDK** - Blockchain interactions
- **CSS Modules** - Scoped styling with glassmorphism UI

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A Crossmint API key ([get one here](https://crossmint.com/))

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd crossmint-front-poc
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file and add your Crossmint API key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your API key:

   ```
   VITE_CROSSMINT_API_KEY=your_crossmint_api_key_here
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open in browser**

   Navigate to `http://localhost:5173`

## Usage

1. Click "Connect Wallet" to authenticate via Crossmint
2. View your XLM and USDC balances on the dashboard
3. Use "Swap XLM to USDC" to exchange tokens via Soroswap
4. Use "Deposit to Defindex" to invest in DeFi strategies

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (GlassCard, Button, Input, etc.)
│   ├── wallet/       # Wallet-specific components (WalletHeader, BalanceCard)
│   └── views/        # Page views (Dashboard, SwapView, DepositView)
├── contexts/         # React contexts (NavigationContext)
├── hooks/            # Custom hooks (useWalletOperations)
├── styles/           # Global styles
└── types/            # TypeScript type definitions
```

## Network

This POC runs on **Stellar Testnet**. The following contract addresses are used:

- **Soroswap Router**: `CCMAPXWVZD4USEKDWRYS7DA4Y3D7E2SDMGBFJUCEXTC7VN6CUBGWPFUS`
- **Defindex Vault**: `CB4DY5JJNT6H56YAPIMN3HMPNW3RIH5RTN463XRCJEDG3AMRHFP23GSS`
- **XLM Token**: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`
- **USDC Token**: `CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA`

## Disclaimer

This is a **proof of concept** and is not intended for production use. Use at your own risk.

## Built by

**[PaltaLabs](https://paltalabs.io)** - Building on Stellar & Soroban

---

## License

MIT
