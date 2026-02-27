import { useSeasonBadge } from '../hooks/useSeasonBadge';
import { StatusMessage } from '../../../shared/components';
import styles from './SeasonBadge.module.css';

interface SeasonBadgeProps {
  leagueId: string;
  leagueName: string;
}

export default function SeasonBadge({ leagueId, leagueName }: SeasonBadgeProps) {
  const { firstSeason, isLoading, error } = useSeasonBadge(leagueId);

  return (
    <div className={styles.wrapper}>
      {isLoading && <StatusMessage message="Loading badge…" />}
      {error && <StatusMessage message="Could not load badge." isError />}
      {!isLoading && !error && !firstSeason?.strBadge && <StatusMessage message="No badge available." />}

      {!isLoading && !error && firstSeason?.strBadge && (
        <div className={styles.badgeWrapper}>
          <h4 className={styles.badgeTitle}>Season Badge: {firstSeason.strSeason}</h4>
          <img
            className={styles.badge}
            src={`${firstSeason.strBadge}/tiny`}
            alt={`${leagueName} season badge`}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
