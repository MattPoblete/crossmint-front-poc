import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  icon?: ReactNode;
  hint?: string;
  mono?: boolean;
}

export function Input({
  label,
  value,
  onChange,
  suffix,
  icon,
  hint,
  mono = false,
  className = '',
  ...props
}: InputProps) {
  const inputClasses = [
    styles.input,
    icon ? styles.inputWithIcon : '',
    suffix ? styles.inputWithSuffix : '',
    mono ? styles.mono : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          className={inputClasses}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
