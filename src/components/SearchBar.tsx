import type { ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="league-search" className={styles.label}>
        Search leagues
      </label>
      <input
        id="league-search"
        type="search"
        className={styles.input}
        placeholder="e.g. Premier League"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
