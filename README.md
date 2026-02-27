# Sports Leagues

A single-page React app that fetches and displays sports leagues from [TheSportsDB](https://www.thesportsdb.com/), with live search, sport filtering, and an expandable card that loads a season badge on demand.

## Stack

- **React 19** + TypeScript, bundled by **Vite 7**
- **SWR** — data fetching and caching
- **CSS Modules** + **clsx** — scoped styles with conditional class composition

## Features

- Fetches all leagues from `all_leagues.php` on mount; result is cached — no refetch on tab focus or reconnect
- Search box filters by league name (case-insensitive, trimmed)
- Sport dropdown derived from the live data via `useMemo`; resets automatically when leagues load
- Click any card to expand it; a second SWR call to `search_all_seasons.php?badge=1&id=` is made lazily and cached per league
- Expanded card shows the first season that has a badge image; gracefully handles loading, error, and no-badge states

## Running locally

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # type-check then bundle to dist/
npm run preview  # serve the dist/ build
npm run lint     # ESLint
```

## Architecture

```
src/
  app-router/       # AppRouter shell
  features/
    leagues/
      components/   # LeagueCard, LeagueList, SeasonBadge
      hooks/        # useLeagues, useSeasonBadge
      types/        # League, Season, response interfaces
      Leagues.tsx   # feature root — owns all state
  shared/
    components/     # PageLayout, SearchBar, SportFilter, StatusMessage
  config.ts         # global SWRConfig (fetcher, retry, revalidation flags)
  main.tsx          # mounts app, wraps with SWRConfig
```

## Design decisions

### SWR caching strategy

All revalidation triggers are disabled (`revalidateOnFocus`, `revalidateOnReconnect`, `revalidateIfStale`). The leagues list is static data from a free-tier API with no auth — aggressive revalidation would hammer the rate limit and provide no benefit. `shouldRetryOnError: false` is set for the same reason: if the API returns an error, retrying immediately won't help.

Badge fetches are keyed by league ID (`search_all_seasons.php?badge=1&id=<id>`). SWR caches each key independently, so expanding the same card a second time is instant with no network request.

### Conditional badge fetching

`SeasonBadge` only mounts when a card is expanded, so `useSeasonBadge` always receives a real league ID — the `null` key pattern (which tells SWR to skip the fetch) is kept in the hook signature for correctness but is never triggered from the component. This avoids fetching badge data for leagues the user never opens.

### State ownership

All interactive state (`search`, `selectedSport`, `expandedLeagueId`) lives in `Leagues.tsx`, the feature root. Child components are fully controlled — they receive values and callbacks as props. This makes data flow explicit and keeps components individually testable without any context setup.

`sportOptions` and `filteredLeagues` are derived via `useMemo` rather than stored as separate state, avoiding the class of bugs where derived state goes stale after a primary state update.

### Accordion as a native `<button>`

The expandable card uses a native `<button>` element rather than a `<div role="button">`. A native button gives keyboard focus, Enter/Space handling, and correct AT announcement for free, with no manual `tabIndex` or `onKeyDown` required. The panel (`role="region"`) is a sibling inside the card wrapper, not a descendant of the button, so screen readers compute the button's accessible name only from the header and sport badge — not from the expanded content.

### Feature-based folder structure

Code is grouped by feature (`features/leagues/`) rather than by type (`components/`, `hooks/`). All the types, hooks, and components for a feature live together, so deleting or moving a feature is a single folder operation. Shared infrastructure (`StatusMessage`, `PageLayout`, etc.) lives in `shared/` and is exported through a barrel file.

### CSS Modules over a utility framework

Each component owns its styles in a co-located `.module.css` file. There is no global class pollution and no build-time purge configuration to maintain. `clsx` handles conditional class composition without string concatenation.

---

## How I used AI for this task

I used **Claude Code** (Anthropic's CLI agent, `claude-sonnet-4-6`) throughout the task as a pair programmer. The workflow had three distinct phases.

### Phase 1 — initial build from spec

I gave Claude the full feature spec in a single prompt (fetch leagues, search/filter, SWR caching, expandable card with badge, CSS Modules). Claude scaffolded the entire working app: installed SWR, defined TypeScript interfaces, wrote the hooks, components, and styles in one pass. This saved the boilerplate setup time and gave me a working base to iterate from immediately.

My role at this stage was to write the spec precisely enough that the output matched intent, then review the generated code before continuing.

### Phase 2 — iterative refinement through targeted prompts

Rather than asking for a big rewrite, I drove the evolution through small, focused instructions — each one a single concern:

| Prompt                                               | What changed                                            |
| ---------------------------------------------------- | ------------------------------------------------------- |
| "move loading/error to reusable component"           | extracted `StatusMessage`                               |
| "add refetch option"                                 | threaded SWR `mutate` out as `onRetry` prop             |
| "convert to CSS module"                              | replaced plain CSS with scoped module                   |
| "use clsx"                                           | replaced string concatenation with `clsx` calls         |
| "create reusable component" (badge section selected) | extracted `SeasonBadge`                                 |
| "convert to compact list"                            | changed grid layout to flex column                      |
| "update architecture to feature-based"               | restructured into `features/`, `shared/`, `app-router/` |

This approach kept each diff reviewable and meant I could reject or adjust any step without losing prior work.

### Phase 3 — AI-assisted code review

Once the app was feature-complete I prompted Claude to act as a **senior frontend engineer doing a strict code review**, asking it to focus on SWR caching correctness, edge cases, responsiveness, and accessibility for the accordion pattern. It returned a prioritised issue list (P0 / P1 / P2) with exact file references and patch-level snippets.

### Limits and caveats

- Claude generated code that I reviewed; I caught and corrected a path error in re-export stubs during the architecture migration
- The user revised the accordion implementation after my fix (switching the `div[role=button]` to a native `<button>`) — demonstrating that AI output is a starting point, not a final answer
- The AI had no visibility into runtime behaviour; all functional verification was manual
