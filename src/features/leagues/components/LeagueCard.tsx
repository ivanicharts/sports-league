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
  const panelId = `league-panel-${league.idLeague}`;
  const buttonId = `league-btn-${league.idLeague}`;

  const handleClick = () => {
    onToggle(league.idLeague);
  };

  return (
    <button
      id={buttonId}
      className={clsx(styles.card, isExpanded && styles.expanded)}
      onClick={handleClick}
      type="button"
      aria-expanded={isExpanded}
      aria-controls={panelId}
    >
      <div className={styles.header}>
        <p className={styles.leagueName}>{league.strLeague}</p>
        <span className={styles.sport}>{league.strSport}</span>
      </div>

      <div className={styles.info}>
        {league.strLeagueAlternate && <p className={styles.alternate}>{league.strLeagueAlternate}</p>}
        <div className={styles.toggleHint}>{isExpanded ? '▲ Collapse' : '▼ Show badge'}</div>
      </div>

      {isExpanded && (
        <div id={panelId} role="region" aria-labelledby={buttonId}>
          <SeasonBadge leagueId={league.idLeague} leagueName={league.strLeague} />
        </div>
      )}
    </button>
  );
}
