import { useSeasonBadge } from '../hooks/useSeasonBadge';
import { StatusMessage } from '../../../shared/components';
import styles from './SeasonBadge.module.css';

interface SeasonBadgeProps {
  leagueId: string;
  leagueName: string;
}

export default function SeasonBadge({ leagueId, leagueName }: SeasonBadgeProps) {
  const { season, isLoading, error } = useSeasonBadge(leagueId);

  return (
    <div className={styles.wrapper}>
      {isLoading && <StatusMessage message="Loading badge…" />}
      {error && <StatusMessage message="Could not load badge." isError />}
      {!isLoading && !error && !season?.strBadge && <StatusMessage message="No badge available." />}

      {!isLoading && !error && season?.strBadge && (
        <div className={styles.badgeWrapper}>
          <p className={styles.badgeTitle}>Season Badge: {season.strSeason}</p>
          <img
            className={styles.badge}
            src={`${season.strBadge}/tiny`}
            alt={`${leagueName} season badge`}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
