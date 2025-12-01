import {
  Server,
  Plus,
  HardDrive,
  Camera,
  Activity,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export function ComputePage() {
  const stats = [
    {
      title: 'Instances actives',
      value: '12',
      icon: Server,
      description: '8 en cours d\'exécution',
      trend: '+2 ce mois',
      trendUp: true,
    },
    {
      title: 'CPU total',
      value: '48',
      icon: Activity,
      description: 'vCPUs alloués',
      trend: '65% utilisés',
      trendUp: false,
    },
    {
      title: 'Mémoire totale',
      value: '96 GB',
      icon: HardDrive,
      description: 'RAM allouée',
      trend: '52% utilisée',
      trendUp: false,
    },
    {
      title: 'Snapshots',
      value: '24',
      icon: Camera,
      description: 'Sauvegardes disponibles',
      trend: '148 GB',
      trendUp: false,
    },
  ];

  const quickActions = [
    {
      title: 'Gérer les instances',
      description: 'Voir et gérer toutes vos machines virtuelles',
      icon: Server,
      href: '/compute/instances',
      color: 'blue',
    },
    {
      title: 'Images système',
      description: 'Consulter et créer des images système',
      icon: HardDrive,
      href: '/compute/images',
      color: 'purple',
    },
    {
      title: 'Snapshots',
      description: 'Gérer vos sauvegardes d\'instances',
      icon: Camera,
      href: '/compute/snapshots',
      color: 'green',
    },
  ];

  const recentActivity = [
    {
      action: 'Instance créée',
      resource: 'web-server-prod-01',
      time: 'Il y a 2 heures',
      status: 'success',
    },
    {
      action: 'Instance arrêtée',
      resource: 'backup-server',
      time: 'Il y a 5 heures',
      status: 'info',
    },
    {
      action: 'Snapshot créé',
      resource: 'database-primary',
      time: 'Il y a 1 jour',
      status: 'success',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950">
      <div className="max-w-[1400px] mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-center">
              <Server className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <h1 className="text-4xl font-normal text-gray-900 dark:text-white mb-2">
                Compute Engine
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vue d'ensemble de vos ressources de calcul
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardDescription>
                  <stat.icon className="w-4 h-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-3xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium">
                    {stat.trendUp && <TrendingUp className="w-3 h-3 text-green-500" />}
                    <span className={stat.trendUp ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-normal text-gray-900 dark:text-white">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.href}>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                        <action.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <CardTitle className="text-base font-medium text-gray-900 dark:text-white mt-3">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-normal text-gray-900 dark:text-white">
            Activité récente
          </h2>
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.resource}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30">
          <CardHeader>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">
                  Optimisation des ressources
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Vos instances utilisent actuellement 58% de leurs ressources allouées.
                  Nous avons détecté 3 instances sous-utilisées.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 p-0 h-auto font-medium"
            >
              Voir les recommandations
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
