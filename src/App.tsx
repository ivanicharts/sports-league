import { useState, useMemo } from 'react';
import { useLeagues } from './hooks/useLeagues';
import SearchBar from './components/SearchBar';
import SportFilter from './components/SportFilter';
import LeagueList from './components/LeagueList';
import StatusMessage from './components/StatusMessage';
import styles from './App.module.css';

function App() {
  const { leagues, isLoading, error, refetch } = useLeagues();

  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [expandedLeagueId, setExpandedLeagueId] = useState<string | null>(null);

  const sportOptions = useMemo<string[]>(() => {
    const set = new Set(leagues.map((l) => l.strSport));
    return Array.from(set).sort();
  }, [leagues]);

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

  if (isLoading) {
    return <StatusMessage message="Loading leagues…" />;
  }

  if (error) {
    return <StatusMessage message="Failed to load leagues." isError onRetry={refetch} />;
  }

  return (
    <div className={styles.appShell}>
      <header>
        <h1 className={styles.appHeaderTitle}>Sports Leagues</h1>
      </header>
      <div className={styles.controls}>
        <SearchBar value={search} onChange={setSearch} />
        <SportFilter options={sportOptions} value={selectedSport} onChange={setSelectedSport} />
      </div>
      <main>
        <LeagueList
          leagues={filteredLeagues}
          expandedLeagueId={expandedLeagueId}
          onToggle={handleToggleLeague}
        />
      </main>
    </div>
  );
}

export default App;
