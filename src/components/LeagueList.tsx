import type { League } from '../types';
import LeagueCard from './LeagueCard';
import styles from './LeagueList.module.css';

interface LeagueListProps {
  leagues: League[];
  expandedLeagueId: string | null;
  onToggle: (id: string) => void;
}

export default function LeagueList({
  leagues,
  expandedLeagueId,
  onToggle,
}: LeagueListProps) {
  if (leagues.length === 0) {
    return <p className={styles.empty}>No leagues match your search.</p>;
  }

  return (
    <ul className={styles.grid} role="list">
      {leagues.map((league) => (
        <li key={league.idLeague}>
          <LeagueCard
            league={league}
            isExpanded={expandedLeagueId === league.idLeague}
            onToggle={onToggle}
          />
        </li>
      ))}
    </ul>
  );
}
