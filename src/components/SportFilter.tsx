import type { ChangeEvent } from 'react';
import styles from './SportFilter.module.css';

interface SportFilterProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SportFilter({ options, value, onChange }: SportFilterProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="sport-filter" className={styles.label}>
        Filter by sport
      </label>
      <select
        id="sport-filter"
        className={styles.select}
        value={value}
        onChange={handleChange}
      >
        <option value="">All sports</option>
        {options.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  );
}
