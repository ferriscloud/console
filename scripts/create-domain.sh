#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }

if [ -z "$1" ]; then
    log_error "Usage: ./scripts/create-domain.sh <domain-name>"
    exit 1
fi

DOMAIN_NAME=$1
DOMAIN_PATH="src/pages/${DOMAIN_NAME}"
ROUTE_PATH="src/routes/${DOMAIN_NAME}.tsx"

if [ -d "$DOMAIN_PATH" ]; then
    log_error "Le domaine '${DOMAIN_NAME}' existe déjà!"
    exit 1
fi

DOMAIN_CAPITALIZED="$(tr '[:lower:]' '[:upper:]' <<< ${DOMAIN_NAME:0:1})${DOMAIN_NAME:1}"

log_info "Création du domaine '${DOMAIN_NAME}'..."

mkdir -p "${DOMAIN_PATH}/features"
mkdir -p "${DOMAIN_PATH}/ui"

# UI Component
cat > "${DOMAIN_PATH}/ui/${DOMAIN_NAME}-page.tsx" << EOF
import { Card } from '@/components/ui/card';

interface ${DOMAIN_CAPITALIZED}PageProps {
  items?: Array<{ id: string; name: string }>;
  loading?: boolean;
}

export function ${DOMAIN_CAPITALIZED}Page({ items = [], loading }: ${DOMAIN_CAPITALIZED}PageProps) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
        ${DOMAIN_CAPITALIZED}
      </h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-6">
              <p className="text-lg">{item.name}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
EOF

# Feature Component
cat > "${DOMAIN_PATH}/features/${DOMAIN_NAME}-page-feature.tsx" << EOF
import { useQuery } from '@tanstack/react-query';
import { ${DOMAIN_CAPITALIZED}Page } from '../ui/${DOMAIN_NAME}-page';

async function fetch${DOMAIN_CAPITALIZED}Data() {
  // TODO: Replace with real API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
  ];
}

export function ${DOMAIN_CAPITALIZED}PageFeature() {
  const { data, isLoading } = useQuery({
    queryKey: ['${DOMAIN_NAME}'],
    queryFn: fetch${DOMAIN_CAPITALIZED}Data,
  });

  return <${DOMAIN_CAPITALIZED}Page items={data} loading={isLoading} />;
}
EOF

# Index
cat > "${DOMAIN_PATH}/index.tsx" << EOF
export { ${DOMAIN_CAPITALIZED}PageFeature as ${DOMAIN_CAPITALIZED}Page } from './features/${DOMAIN_NAME}-page-feature';
EOF

# Route
cat > "$ROUTE_PATH" << EOF
import { createFileRoute } from '@tanstack/react-router';
import { ${DOMAIN_CAPITALIZED}Page } from '@/pages/${DOMAIN_NAME}';

export const Route = createFileRoute('/${DOMAIN_NAME}')({
  component: ${DOMAIN_CAPITALIZED}Page,
});
EOF

log_success "Domaine '${DOMAIN_NAME}' créé!"
echo ""
log_info "Prochaines étapes:"
echo "  1. ${GREEN}pnpm routes:generate${NC}"
echo "  2. Accéder à ${GREEN}http://localhost:5173/${DOMAIN_NAME}${NC}"
