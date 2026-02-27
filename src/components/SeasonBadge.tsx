import { useSeasonBadge } from '../hooks/useSeasonBadge';
import styles from './SeasonBadge.module.css';

interface SeasonBadgeProps {
  leagueId: string;
  leagueName: string;
}

export default function SeasonBadge({ leagueId, leagueName }: SeasonBadgeProps) {
  const { firstSeason, isLoading, error } = useSeasonBadge(leagueId);

  return (
    <div className={styles.wrapper}>
      {isLoading && <p className={styles.status}>Loading badge…</p>}
      {error && <p className={styles.status}>Could not load badge.</p>}
      {!isLoading && !error && !firstSeason?.strBadge && <p className={styles.status}>No badge available.</p>}

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
