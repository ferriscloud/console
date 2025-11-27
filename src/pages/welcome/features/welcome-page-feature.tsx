import { useQuery } from '@tanstack/react-query';
import { WelcomePage } from '../ui/welcome-page';

interface ResourceStats {
  instances: number;
  storage: number;
  networks: number;
  databases: number;
}

async function fetchResourceStats(): Promise<ResourceStats> {
  // TODO: Replace with real API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    instances: 12,
    storage: 256,
    networks: 8,
    databases: 4,
  };
}

export function WelcomePageFeature() {
  const { data, isLoading } = useQuery({
    queryKey: ['resource-stats'],
    queryFn: fetchResourceStats,
    staleTime: 5 * 60 * 1000,
  });

  return <WelcomePage stats={data} loading={isLoading} />;
}
