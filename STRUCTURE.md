# Structure du projet

## Arborescence complète

```
console/
├── src/
│   ├── routes/                           # Routes Tanstack Router
│   │   ├── __root.tsx                   # Layout racine
│   │   ├── index.tsx                    # / → /welcome
│   │   └── welcome.tsx                  # /welcome
│   │
│   ├── pages/                            # Domaines
│   │   └── welcome/
│   │       ├── features/
│   │       │   └── welcome-page-feature.tsx    # Smart component
│   │       ├── ui/
│   │       │   └── welcome-page.tsx            # Dumb component
│   │       └── index.tsx                       # Export
│   │
│   ├── components/ui/                    # ShadCN components
│   ├── lib/utils.ts                      # Utilitaires
│   └── main.tsx                          # Entry point
│
├── scripts/
│   └── create-domain.sh                  # Générateur de domaines
│
└── Configuration
    ├── vite.config.ts
    ├── tsconfig.json
    └── tsr.config.json
```

## Convention feature/ui

### Feature (Smart)
- Gère la logique métier
- Fait les appels API (React Query)
- Gère l'état
- Appelle le composant UI

### UI (Dumb)
- Affichage uniquement
- Props typées
- Pas de logique métier
- Réutilisable

### Exemple

```typescript
// ui/welcome-page.tsx
export function WelcomePage({ stats, loading }: Props) {
  return <div>...</div>;
}

// features/welcome-page-feature.tsx
export function WelcomePageFeature() {
  const { data, isLoading } = useQuery(...);
  return <WelcomePage stats={data} loading={isLoading} />;
}

// index.tsx
export { WelcomePageFeature as WelcomePage } from './features/welcome-page-feature';
```
