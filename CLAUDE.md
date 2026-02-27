# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Type-check (tsc -b) then bundle to dist/
npm run lint     # Run ESLint
npm run preview  # Serve the dist/ build locally
```

There is no test runner configured.

## Stack

- **React 19** with TypeScript, bundled by **Vite 7**
- ESLint flat config (`eslint.config.js`) with typescript-eslint, react-hooks, and react-refresh plugins
- TypeScript project references: `tsconfig.app.json` (source) and `tsconfig.node.json` (vite config)

## Architecture

This is a minimal React + TypeScript + Vite starter. The entire app lives in `src/`:

- `main.tsx` — mounts `<App />` inside `React.StrictMode` on `#root`
- `App.tsx` — the single top-level component

There is no routing, state management library, or backend integration. New features should be added as components under `src/`.
