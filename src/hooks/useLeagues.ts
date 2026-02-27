import useSWR from 'swr';
import type { LeaguesResponse, League } from '../types';

const ALL_LEAGUES_URL =
  'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';

interface UseLeaguesResult {
  leagues: League[];
  isLoading: boolean;
  error: Error | undefined;
  refetch: () => void;
}

export function useLeagues(): UseLeaguesResult {
  const { data, error, isLoading, mutate } = useSWR<LeaguesResponse, Error>(
    ALL_LEAGUES_URL,
  );

  return {
    leagues: data?.leagues ?? [],
    isLoading,
    error,
    refetch: () => void mutate(),
  };
}
