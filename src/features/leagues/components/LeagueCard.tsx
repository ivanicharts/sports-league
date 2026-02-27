import type { KeyboardEvent } from 'react';
import clsx from 'clsx';
import type { League } from '../types';
import SeasonBadge from './SeasonBadge';
import styles from './LeagueCard.module.css';

interface LeagueCardProps {
  league: League;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export default function LeagueCard({ league, isExpanded, onToggle }: LeagueCardProps) {
  const handleClick = () => {
    onToggle(league.idLeague);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={clsx(styles.card, isExpanded && styles.expanded)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <h2 className={styles.leagueName}>{league.strLeague}</h2>
        <span className={styles.sport}>{league.strSport}</span>
      </div>

      <div className={styles.info}>
        {league.strLeagueAlternate && <p className={styles.alternate}>{league.strLeagueAlternate}</p>}
        <div className={styles.toggleHint}>{isExpanded ? '▲ Collapse' : '▼ Show badge'}</div>
      </div>

      {isExpanded && <SeasonBadge leagueId={league.idLeague} leagueName={league.strLeague} />}
    </div>
  );
}
