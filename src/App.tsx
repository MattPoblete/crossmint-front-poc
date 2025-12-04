import './styles/globals.css';
import { WalletApp } from './components/walletApp';
import { NavigationProvider } from './contexts/NavigationContext';

function App() {
  return (
    <NavigationProvider>
      <WalletApp />
    </NavigationProvider>
  );
}

export default App;
