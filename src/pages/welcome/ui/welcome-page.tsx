import { Server, Database, HardDrive, Network } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ResourceStats {
  instances: number;
  storage: number;
  networks: number;
  databases: number;
}

interface WelcomePageProps {
  stats?: ResourceStats;
  loading?: boolean;
}

export function WelcomePage({ stats, loading }: WelcomePageProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Bienvenue sur FerrisCloud
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Votre plateforme cloud open source
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Instances</p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              ) : (
                <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {stats?.instances ?? 0}
                </p>
              )}
            </div>
            <Server className="w-8 h-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Stockage (GB)</p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              ) : (
                <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {stats?.storage ?? 0}
                </p>
              )}
            </div>
            <HardDrive className="w-8 h-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Réseaux</p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              ) : (
                <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {stats?.networks ?? 0}
                </p>
              )}
            </div>
            <Network className="w-8 h-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Bases de données</p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              ) : (
                <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {stats?.databases ?? 0}
                </p>
              )}
            </div>
            <Database className="w-8 h-8 text-gray-400" />
          </div>
        </Card>
      </div>
    </div>
  );
}
