import { useState } from 'react';
import {
  Server,
  ArrowLeft,
  HardDrive,
  Network,
  Shield,
  Settings,
  Cpu,
  MemoryStick,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@tanstack/react-router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function CreateInstancePage() {
  const [formData, setFormData] = useState({
    name: '',
    zone: '',
    machineType: '',
    image: '',
    bootDiskSize: '100',
    enableExternalIP: true,
  });

  const zones = [
    { value: 'eu-west-1a', label: 'eu-west-1a' },
    { value: 'eu-west-1b', label: 'eu-west-1b' },
    { value: 'eu-west-1c', label: 'eu-west-1c' },
  ];

  const machineTypes = [
    { value: 'n1-standard-1', label: 'n1-standard-1', cpu: '1 vCPU', memory: '3.75 GB', price: '0.0475' },
    { value: 'n1-standard-2', label: 'n1-standard-2', cpu: '2 vCPUs', memory: '7.5 GB', price: '0.0950' },
    { value: 'n1-standard-4', label: 'n1-standard-4', cpu: '4 vCPUs', memory: '15 GB', price: '0.1900' },
    { value: 'n1-highmem-4', label: 'n1-highmem-4', cpu: '4 vCPUs', memory: '26 GB', price: '0.2372' },
    { value: 'n1-highmem-8', label: 'n1-highmem-8', cpu: '8 vCPUs', memory: '52 GB', price: '0.4744' },
  ];

  const images = [
    { value: 'ubuntu-22.04', label: 'Ubuntu 22.04 LTS', family: 'ubuntu' },
    { value: 'ubuntu-20.04', label: 'Ubuntu 20.04 LTS', family: 'ubuntu' },
    { value: 'debian-11', label: 'Debian 11', family: 'debian' },
    { value: 'centos-8', label: 'CentOS 8', family: 'centos' },
    { value: 'rocky-9', label: 'Rocky Linux 9', family: 'rocky' },
  ];

  const selectedMachineType = machineTypes.find((mt) => mt.value === formData.machineType);

  const estimatedMonthlyCost = selectedMachineType
    ? (parseFloat(selectedMachineType.price) * 730).toFixed(2)
    : '0.00';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating instance:', formData);
    // TODO: Implement instance creation logic
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950">
      <div className="max-w-[1200px] mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-gray-600 dark:text-gray-400"
            >
              <Link to="/compute/instances">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-center">
            <Server className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <h1 className="text-4xl font-normal text-gray-900 dark:text-white mb-2">
              Créer une instance
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Configurez et déployez une nouvelle machine virtuelle
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Configuration */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-500" />
                    Configuration de base
                  </CardTitle>
                  <CardDescription>
                    Définissez le nom et l'emplacement de votre instance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'instance *</Label>
                    <Input
                      id="name"
                      placeholder="ex: web-server-01"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Le nom doit être unique et contenir uniquement des lettres, chiffres et tirets
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zone">Zone *</Label>
                    <Select
                      value={formData.zone}
                      onValueChange={(value) => setFormData({ ...formData, zone: value })}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                        <SelectValue placeholder="Sélectionnez une zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {zones.map((zone) => (
                          <SelectItem key={zone.value} value={zone.value}>
                            {zone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      La zone détermine l'emplacement physique de votre instance
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Machine Type */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-500" />
                    Type de machine
                  </CardTitle>
                  <CardDescription>
                    Choisissez la puissance de calcul et la mémoire
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="machineType">Type de machine *</Label>
                    <Select
                      value={formData.machineType}
                      onValueChange={(value) => setFormData({ ...formData, machineType: value })}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                        <SelectValue placeholder="Sélectionnez un type de machine" />
                      </SelectTrigger>
                      <SelectContent>
                        {machineTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center justify-between gap-4">
                              <span className="font-mono">{type.label}</span>
                              <span className="text-xs text-gray-500">
                                {type.cpu} • {type.memory}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedMachineType && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              CPU
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMachineType.cpu}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MemoryStick className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              Mémoire
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMachineType.memory}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Boot Disk */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-blue-500" />
                    Disque de démarrage
                  </CardTitle>
                  <CardDescription>
                    Sélectionnez le système d'exploitation et la taille du disque
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Image système *</Label>
                    <Select
                      value={formData.image}
                      onValueChange={(value) => setFormData({ ...formData, image: value })}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                        <SelectValue placeholder="Sélectionnez une image" />
                      </SelectTrigger>
                      <SelectContent>
                        {images.map((image) => (
                          <SelectItem key={image.value} value={image.value}>
                            {image.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bootDiskSize">Taille du disque (GB) *</Label>
                    <Input
                      id="bootDiskSize"
                      type="number"
                      min="10"
                      max="10000"
                      value={formData.bootDiskSize}
                      onChange={(e) => setFormData({ ...formData, bootDiskSize: e.target.value })}
                      required
                      className="bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Minimum 10 GB, maximum 10 000 GB
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Networking */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Network className="w-5 h-5 text-blue-500" />
                    Réseau
                  </CardTitle>
                  <CardDescription>
                    Configurez les paramètres réseau de l'instance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          IP externe éphémère
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Attribuer une adresse IP publique à cette instance
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.enableExternalIP}
                        onChange={(e) =>
                          setFormData({ ...formData, enableExternalIP: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Nom</span>
                      <span className="font-medium text-gray-900 dark:text-white font-mono">
                        {formData.name || '-'}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Zone</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formData.zone || '-'}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Type</span>
                      <span className="font-medium text-gray-900 dark:text-white font-mono">
                        {formData.machineType || '-'}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Image</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formData.image ? images.find((i) => i.value === formData.image)?.label : '-'}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Disque</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formData.bootDiskSize} GB
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">IP externe</span>
                      <Badge
                        variant={formData.enableExternalIP ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {formData.enableExternalIP ? 'Activée' : 'Désactivée'}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Coût estimé
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${estimatedMonthlyCost}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">/mois</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Estimation basée sur 730 heures d'utilisation
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Créer l'instance
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700"
                      asChild
                    >
                      <Link to="/compute/instances">Annuler</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
