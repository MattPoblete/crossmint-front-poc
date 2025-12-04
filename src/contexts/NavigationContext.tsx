import { createContext, useContext, useState, type ReactNode } from 'react';
import type { View } from '../types';

interface NavigationContextType {
  currentView: View;
  navigate: (view: View) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const navigate = (view: View) => {
    setCurrentView(view);
  };

  return (
    <NavigationContext.Provider value={{ currentView, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
