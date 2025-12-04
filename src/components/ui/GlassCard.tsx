import type { ReactNode } from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export function GlassCard({ children, className = '', compact = false }: GlassCardProps) {
  const cardClasses = [
    styles.card,
    compact ? styles.cardCompact : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}
