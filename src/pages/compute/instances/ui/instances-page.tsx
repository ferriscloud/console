import {
  Server,
  Plus,
  MoreVertical,
  Power,
  PowerOff,
  Trash2,
  RefreshCw,
  Settings,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Filters, type Filter, type FilterFieldsConfig } from '@/components/ui/filters';
import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Instance {
  id: string;
  name: string;
  status: 'running' | 'stopped';
  type: string;
  zone: string;
  internalIP: string;
  externalIP: string;
  uptime: string;
  cpu: string;
  memory: string;
  disk: string;
}

const getStatusBadge = (status: string) => {
  if (status === 'running') {
    return (
      <Badge className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-900">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        En cours
      </Badge>
    );
  }
  return (
    <Badge className="bg-gray-50 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700">
      <AlertCircle className="w-3 h-3 mr-1" />
      Arrêté
    </Badge>
  );
};

const filterFields: FilterFieldsConfig = [
  {
    key: 'name',
    label: 'Nom',
    type: 'text',
    placeholder: 'Filtrer par nom...',
  },
  {
    key: 'status',
    label: 'Statut',
    type: 'select',
    options: [
      { label: 'En cours', value: 'running' },
      { label: 'Arrêté', value: 'stopped' },
    ],
  },
  {
    key: 'zone',
    label: 'Zone',
    type: 'select',
    options: [
      { label: 'eu-west-1a', value: 'eu-west-1a' },
      { label: 'eu-west-1b', value: 'eu-west-1b' },
      { label: 'eu-west-1c', value: 'eu-west-1c' },
    ],
  },
  {
    key: 'type',
    label: 'Type de machine',
    type: 'select',
    options: [
      { label: 'n1-standard-1', value: 'n1-standard-1' },
      { label: 'n1-standard-2', value: 'n1-standard-2' },
      { label: 'n1-standard-4', value: 'n1-standard-4' },
      { label: 'n1-highmem-4', value: 'n1-highmem-4' },
      { label: 'n1-highmem-8', value: 'n1-highmem-8' },
    ],
  },
];

export function InstancesPage() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const instances: Instance[] = [
    {
      id: '1',
      name: 'web-server-prod-01',
      status: 'running',
      type: 'n1-standard-4',
      zone: 'eu-west-1a',
      internalIP: '10.0.1.10',
      externalIP: '203.0.113.45',
      uptime: '15 jours 8h',
      cpu: '4 vCPUs',
      memory: '15 GB',
      disk: '100 GB',
    },
    {
      id: '2',
      name: 'api-backend-02',
      status: 'running',
      type: 'n1-standard-2',
      zone: 'eu-west-1b',
      internalIP: '10.0.1.11',
      externalIP: '203.0.113.46',
      uptime: '8 jours 3h',
      cpu: '2 vCPUs',
      memory: '7.5 GB',
      disk: '50 GB',
    },
    {
      id: '3',
      name: 'database-primary',
      status: 'running',
      type: 'n1-highmem-8',
      zone: 'eu-west-1a',
      internalIP: '10.0.1.20',
      externalIP: '203.0.113.47',
      uptime: '45 jours 12h',
      cpu: '8 vCPUs',
      memory: '52 GB',
      disk: '500 GB',
    },
    {
      id: '4',
      name: 'worker-queue-01',
      status: 'stopped',
      type: 'n1-standard-1',
      zone: 'eu-west-1c',
      internalIP: '10.0.1.30',
      externalIP: '-',
      uptime: 'Arrêté',
      cpu: '1 vCPU',
      memory: '3.75 GB',
      disk: '30 GB',
    },
    {
      id: '5',
      name: 'cache-redis-01',
      status: 'running',
      type: 'n1-highmem-4',
      zone: 'eu-west-1a',
      internalIP: '10.0.1.40',
      externalIP: '-',
      uptime: '22 jours 6h',
      cpu: '4 vCPUs',
      memory: '26 GB',
      disk: '100 GB',
    },
    {
      id: '6',
      name: 'monitoring-grafana',
      status: 'running',
      type: 'n1-standard-2',
      zone: 'eu-west-1b',
      internalIP: '10.0.1.50',
      externalIP: '203.0.113.48',
      uptime: '30 jours 15h',
      cpu: '2 vCPUs',
      memory: '7.5 GB',
      disk: '50 GB',
    },
    {
      id: '7',
      name: 'backup-server',
      status: 'stopped',
      type: 'n1-standard-1',
      zone: 'eu-west-1c',
      internalIP: '10.0.1.60',
      externalIP: '-',
      uptime: 'Arrêté',
      cpu: '1 vCPU',
      memory: '3.75 GB',
      disk: '200 GB',
    },
    {
      id: '8',
      name: 'test-environment',
      status: 'running',
      type: 'n1-standard-1',
      zone: 'eu-west-1a',
      internalIP: '10.0.1.70',
      externalIP: '203.0.113.49',
      uptime: '2 jours 4h',
      cpu: '1 vCPU',
      memory: '3.75 GB',
      disk: '30 GB',
    },
  ];

  const filteredInstances = useMemo(() => {
    if (filters.length === 0) return instances;

    return instances.filter((instance) => {
      return filters.every((filter) => {
        const fieldValue = instance[filter.field as keyof Instance];
        const filterValues = filter.values;

        switch (filter.operator) {
          case 'is':
            return filterValues.includes(String(fieldValue));
          case 'isNot':
            return !filterValues.includes(String(fieldValue));
          case 'contains':
            return filterValues.some((val) =>
              String(fieldValue).toLowerCase().includes(String(val).toLowerCase())
            );
          case 'notContains':
            return !filterValues.some((val) =>
              String(fieldValue).toLowerCase().includes(String(val).toLowerCase())
            );
          case 'startsWith':
            return filterValues.some((val) =>
              String(fieldValue).toLowerCase().startsWith(String(val).toLowerCase())
            );
          case 'endsWith':
            return filterValues.some((val) =>
              String(fieldValue).toLowerCase().endsWith(String(val).toLowerCase())
            );
          case 'isAnyOf':
            return filterValues.some((val) => String(fieldValue) === val);
          default:
            return true;
        }
      });
    });
  }, [instances, filters]);

  const paginatedInstances = useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return filteredInstances.slice(start, end);
  }, [filteredInstances, currentPage]);

  const totalPages = Math.ceil(filteredInstances.length / pageSize);
  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < totalPages - 1;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950">
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-center">
              <Server className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <h1 className="text-4xl font-normal text-gray-900 dark:text-white mb-2">
                Instances
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gérez vos machines virtuelles et instances de calcul
              </p>
            </div>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/compute/instances/create">
              <Plus className="w-4 h-4 mr-2" />
              Créer une instance
            </Link>
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Total instances
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                    {filteredInstances.length}
                  </p>
                </div>
                <Server className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    En cours
                  </p>
                  <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">
                    {filteredInstances.filter((i) => i.status === 'running').length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Arrêtées
                  </p>
                  <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mt-1">
                    {filteredInstances.filter((i) => i.status === 'stopped').length}
                  </p>
                </div>
                <PowerOff className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Total vCPUs
                  </p>
                  <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    23
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instances Table with Filters */}
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <CardContent className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Instances
                </h2>
                {filters.length > 0 && (
                  <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900">
                    {filters.length} {filters.length === 1 ? 'filtre' : 'filtres'}
                  </Badge>
                )}
              </div>
              {filters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters([])}
                  className="h-8 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Réinitialiser les filtres
                </Button>
              )}
            </div>

            {/* Filters */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-5">
              <Filters
                filters={filters}
                onChange={setFilters}
                fields={filterFields}
                variant="outline"
                size="sm"
              />
            </div>

            {/* Results Counter */}
            {filteredInstances.length < instances.length && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Affichage de <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredInstances.length}</span> sur{' '}
                  <span className="font-medium text-gray-900 dark:text-white">{instances.length}</span> instances
                </span>
              </div>
            )}

            {/* Table */}
            <div className="space-y-4">
              {filteredInstances.length === 0 && filters.length > 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    Aucune instance ne correspond aux filtres appliqués.
                    <br />
                    Essayez de modifier ou supprimer certains filtres.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters([])}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Effacer tous les filtres
                  </Button>
                </div>
              ) : (
                <>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                        <TableRow>
                          <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Nom
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Statut
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Zone
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Type de machine
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            IP interne
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            IP externe
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Uptime
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedInstances.map((instance) => (
                          <TableRow key={instance.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Server className="w-4 h-4 text-gray-400" />
                                <span className="font-mono text-sm text-gray-900 dark:text-white font-medium">
                                  {instance.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(instance.status)}</TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {instance.zone}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <span className="text-sm font-mono text-gray-700 dark:text-gray-300 block">
                                  {instance.type}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {instance.cpu} • {instance.memory}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                {instance.internalIP}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                {instance.externalIP}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {instance.uptime}
                              </span>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  {instance.status === 'running' ? (
                                    <DropdownMenuItem>
                                      <PowerOff className="w-4 h-4 mr-2" />
                                      Arrêter
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem>
                                      <Power className="w-4 h-4 mr-2" />
                                      Démarrer
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Redémarrer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Paramètres
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between px-2 py-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Affichage de{' '}
                      <span className="font-medium">
                        {currentPage * pageSize + 1}
                      </span>{' '}
                      à{' '}
                      <span className="font-medium">
                        {Math.min((currentPage + 1) * pageSize, filteredInstances.length)}
                      </span>{' '}
                      sur{' '}
                      <span className="font-medium">{filteredInstances.length}</span>{' '}
                      résultats
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={!canPreviousPage}
                        className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                      >
                        Précédent
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={!canNextPage}
                        className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
