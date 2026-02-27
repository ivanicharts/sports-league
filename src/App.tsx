import { useState, useMemo } from 'react';
import { useLeagues } from './hooks/useLeagues';
import SearchBar from './components/SearchBar';
import SportFilter from './components/SportFilter';
import LeagueList from './components/LeagueList';
import './App.css';

function App() {
  const { leagues, isLoading, error } = useLeagues();

  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [expandedLeagueId, setExpandedLeagueId] = useState<string | null>(null);

  const sportOptions = useMemo<string[]>(() => {
    const set = new Set(leagues.map((l) => l.strSport));
    return Array.from(set).sort();
  }, [leagues]);

  const filteredLeagues = useMemo(() => {
    return leagues.filter((league) => {
      const matchesSearch = league.strLeague
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesSport =
        selectedSport === '' || league.strSport === selectedSport;
      return matchesSearch && matchesSport;
    });
  }, [leagues, search, selectedSport]);

  const handleToggleLeague = (id: string) => {
    setExpandedLeagueId((prev) => (prev === id ? null : id));
  };

  if (isLoading) return <p className="status">Loading leagues…</p>;
  if (error) return <p className="status error">Failed to load leagues.</p>;

  return (
    <div className="appShell">
      <header className="appHeader">
        <h1>Sports Leagues</h1>
      </header>
      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <SportFilter
          options={sportOptions}
          value={selectedSport}
          onChange={setSelectedSport}
        />
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
