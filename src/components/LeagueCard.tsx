import type { KeyboardEvent } from 'react';
import { useSeasonBadge } from '../hooks/useSeasonBadge';
import type { League } from '../types';
import styles from './LeagueCard.module.css';

interface LeagueCardProps {
  league: League;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export default function LeagueCard({ league, isExpanded, onToggle }: LeagueCardProps) {
  const { firstSeason, isLoading, error } = useSeasonBadge(
    isExpanded ? league.idLeague : null,
  );

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
    <article
      className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
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

      {league.strLeagueAlternate && (
        <p className={styles.alternate}>{league.strLeagueAlternate}</p>
      )}

      {isExpanded && (
        <div className={styles.badgeSection}>
          {isLoading && <p className={styles.badgeStatus}>Loading badge…</p>}
          {error && <p className={styles.badgeStatus}>Could not load badge.</p>}
          {!isLoading && !error && firstSeason?.strBadge && (
            <img
              className={styles.badge}
              src={firstSeason.strBadge}
              alt={`${league.strLeague} season badge`}
              loading="lazy"
            />
          )}
          {!isLoading && !error && !firstSeason?.strBadge && (
            <p className={styles.badgeStatus}>No badge available.</p>
          )}
        </div>
      )}

      <div className={styles.toggleHint}>
        {isExpanded ? '▲ Collapse' : '▼ Show badge'}
      </div>
    </article>
  );
}
