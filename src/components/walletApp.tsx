import { useState } from "react";
import { StellarWallet, useAuth, useWallet, type Balances, type Chain } from "@crossmint/client-sdk-react-ui";

export function WalletApp() {
    const { login, logout, status } = useAuth();
    const { wallet } = useWallet();
    const [balances, setBalances] = useState<Balances<Chain>>();

    const checkBalances = async () => {
        if (!wallet) return;
        const balances = await wallet.balances();
        console.log("🚀 | checkBalances | balances:", balances)
        
        setBalances(balances);
    };

    if (status === "initializing") {
        return <div>Loading...</div>;
    }

    if (wallet == null || status === "logged-out") {
        return <button onClick={login}>Login</button>;
    }

    const doSwap = async () => {
        if (!wallet) return;

        const stellarWallet = StellarWallet.from(wallet)

        const tx = await stellarWallet.sendTransaction({
            contractId: "CCMAPXWVZD4USEKDWRYS7DA4Y3D7E2SDMGBFJUCEXTC7VN6CUBGWPFUS", // Soroswap Router Testnet
            method: "swap_exact_tokens_for_tokens",
            args: {
                amount_in: "10000000",   // string for i128
                amount_out_min: "0",                         // string for i128
                path: [                                      // array of strings for Vec<Address>
                    "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",  // XLM Testnet
                    "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA"   // USDC Circle Testnet
                ],
                to: wallet.address,                          // string for Address
                deadline: Math.floor(Date.now() / 1000) + 3600
            },
        });
        console.log("🚀 | doSwap | tx:", tx)
    };

    const defindexDeposit = async () => {
        if (!wallet) return;

        const stellarWallet = StellarWallet.from(wallet)
        const tx = await stellarWallet.sendTransaction({
            contractId: "CB4DY5JJNT6H56YAPIMN3HMPNW3RIH5RTN463XRCJEDG3AMRHFP23GSS", // Example Contract ID
            method: "deposit",
            args: {
                amounts_desired: [50000000], // string for i128
                amounts_min: [50000000],           // string for i128
                from: wallet.address,        // string for Address
                invest: true,                 // bool
            },
        });
        console.log("🚀 | defindexDeposit | tx:", tx)
    }

    return (
        <div>
            <h2>💼 Wallet: {wallet?.address}</h2>
            <h3>👤 {wallet?.owner}</h3><br />
            <button onClick={checkBalances}>🔍 Check Balance</button><br />
            <button onClick={logout}>🚪 Logout</button>
            {balances && <p>💳 XLM Balance: {balances.nativeToken.amount}</p>}
            {balances && <p>💳 USDC Balance: {balances.usdc.amount}</p>}
            <button onClick={doSwap}>Swap XLM to USDC Soroswap</button>
            <br />
            <br />
            <button onClick={defindexDeposit}>Deposit to Defindex</button>
        </div>
    );
}