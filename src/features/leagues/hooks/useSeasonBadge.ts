import useSWR from 'swr';
import { useMemo } from 'react';
import type { SeasonsResponse, Season } from '../types';

const BASE = 'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=';

interface UseSeasonBadgeResult {
  season: Season | null;
  isLoading: boolean;
  error: Error | undefined;
}

export function useSeasonBadge(leagueId: string | null): UseSeasonBadgeResult {
  const key = leagueId !== null ? `${BASE}${leagueId}` : null;

  const { data, error, isLoading } = useSWR<SeasonsResponse, Error>(key);

  const season = useMemo(() => {
    return data?.seasons?.find((season) => season.strBadge) ?? null;
  }, [data]);

  return {
    season,
    isLoading,
    error,
  };
}
