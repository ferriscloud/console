# FerrisCloud Console

Console web pour FerrisCloud - Cloud open source.

## Stack

- React 19 + TypeScript
- Tanstack Router + Query
- TailwindCSS 4 + ShadCN/ui
- Vite (rolldown)

## Installation

```bash
pnpm install
pnpm routes:generate
pnpm dev
```

## Structure

```
src/
├── routes/              # Routes Tanstack Router
├── pages/               # Domaines par fonctionnalité
│   └── [domain]/
│       ├── features/    # Composants "smart" (logique + API)
│       ├── ui/          # Composants "dumb" (présentation)
│       └── index.tsx    # Export du Feature
└── components/ui/       # Composants partagés (ShadCN)
```

## Convention

Chaque domaine suit ce pattern :

```typescript
// ui/my-page.tsx - Présentation pure
export function MyPage({ data, loading }: MyPageProps) {
  return <div>{data}</div>;
}

// features/my-page-feature.tsx - Logique métier
export function MyPageFeature() {
  const { data, isLoading } = useQuery(...);
  return <MyPage data={data} loading={isLoading} />;
}

// index.tsx - Export
export { MyPageFeature as MyPage } from './features/my-page-feature';
```

## Créer un domaine

```bash
./scripts/create-domain.sh compute
pnpm routes:generate
```

## Commandes

```bash
pnpm dev                 # Dev server
pnpm build              # Build production
pnpm routes:generate    # Générer les routes
pnpm routes:watch       # Watch mode routes
```
