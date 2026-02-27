import { useState, useMemo } from 'react';

import { useLeagues } from './hooks/useLeagues';
import LeagueList from './components/LeagueList';
import { StatusMessage, PageLayout, SearchBar, SportFilter } from '../../shared/components';

import styles from './Leagues.module.css';

function Leagues() {
  const { leagues, isLoading, error, refetch } = useLeagues();

  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [expandedLeagueId, setExpandedLeagueId] = useState<string | null>(null);

  const sportOptions = useMemo<string[]>(
    () => Array.from(new Set(leagues.map((l) => l.strSport))).sort(),
    [leagues],
  );

  const filteredLeagues = useMemo(() => {
    return leagues.filter((league) => {
      const matchesSearch = league.strLeague.toLowerCase().includes(search.toLowerCase().trim());
      const matchesSport = selectedSport === '' || league.strSport === selectedSport;
      return matchesSearch && matchesSport;
    });
  }, [leagues, search, selectedSport]);

  const handleToggleLeague = (id: string) => {
    setExpandedLeagueId((prev) => (prev === id ? null : id));
  };

  return (
    <PageLayout title="Sports Leagues">
      {isLoading && <StatusMessage message="Loading leagues…" />}
      {error && <StatusMessage message="Failed to load leagues." isError onRetry={refetch} />}
      {!isLoading && !error && (
        <>
          <div className={styles.controls}>
            <div className={styles.searchBar}>
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className={styles.filter}>
              <SportFilter options={sportOptions} value={selectedSport} onChange={setSelectedSport} />
            </div>
          </div>
          <LeagueList
            leagues={filteredLeagues}
            expandedLeagueId={expandedLeagueId}
            onToggle={handleToggleLeague}
          />
        </>
      )}
    </PageLayout>
  );
}

export default Leagues;
