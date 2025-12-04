import type { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'info';
}

export function Badge({ children, variant = 'success' }: BadgeProps) {
  const badgeClasses = [styles.badge, styles[variant]].join(' ');

  return <span className={badgeClasses}>{children}</span>;
}
