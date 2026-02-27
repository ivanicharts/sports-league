import useSWR from 'swr';
import type { LeaguesResponse, League } from '../types';

const ALL_LEAGUES_URL =
  'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';

const fetcher = (url: string): Promise<LeaguesResponse> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<LeaguesResponse>;
  });

interface UseLeaguesResult {
  leagues: League[];
  isLoading: boolean;
  error: Error | undefined;
}

export function useLeagues(): UseLeaguesResult {
  const { data, error, isLoading } = useSWR<LeaguesResponse, Error>(
    ALL_LEAGUES_URL,
    fetcher,
  );

  return {
    leagues: data?.leagues ?? [],
    isLoading,
    error,
  };
}
