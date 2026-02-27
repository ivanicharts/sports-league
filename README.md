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
