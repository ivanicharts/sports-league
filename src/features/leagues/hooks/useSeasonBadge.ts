import useSWR from 'swr';
import type { SeasonsResponse, Season } from '../types';

const BASE = 'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=';

interface UseSeasonBadgeResult {
  firstSeason: Season | null;
  isLoading: boolean;
  error: Error | undefined;
}

export function useSeasonBadge(leagueId: string | null): UseSeasonBadgeResult {
  const key = leagueId !== null ? `${BASE}${leagueId}` : null;

  const { data, error, isLoading } = useSWR<SeasonsResponse, Error>(key);

  return {
    firstSeason: data?.seasons?.[0] ?? null,
    isLoading,
    error,
  };
}
