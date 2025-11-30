import {
  Plus,
  Server,
  Database,
  HardDrive,
  Network,
  Shield,
  Box,
  CreditCard,
  Upload,
  Download,
  Play,
  Pause,
  Settings,
  Users,
  FileText,
  BarChart
} from 'lucide-react';
import { ActionButton } from './action-button';
import { ServiceCard } from './service-card';

/**
 * Exemples d'utilisation des composants Welcome
 *
 * Ces exemples montrent comment utiliser ActionButton et ServiceCard
 * dans différents contextes.
 */

// ============================================================================
// Exemple 1: Actions rapides de création
// ============================================================================
export function CreateActionsExample() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Quick Actions</h3>
      <div className="flex flex-wrap gap-3">
        <ActionButton icon={Plus} onClick={() => console.log('Create VM')}>
          Create a VM
        </ActionButton>
        <ActionButton icon={Plus} onClick={() => console.log('Create Database')}>
          Create a Database
        </ActionButton>
        <ActionButton icon={Plus} onClick={() => console.log('Create Bucket')}>
          Create a Bucket
        </ActionButton>
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 2: Actions de gestion
// ============================================================================
export function ManagementActionsExample() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Management Actions</h3>
      <div className="flex flex-wrap gap-3">
        <ActionButton icon={Upload}>Upload Files</ActionButton>
        <ActionButton icon={Download}>Export Data</ActionButton>
        <ActionButton icon={Play}>Start Service</ActionButton>
        <ActionButton icon={Pause}>Pause Service</ActionButton>
        <ActionButton icon={Settings}>Configure</ActionButton>
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 3: Grille de services complète (4 colonnes)
// ============================================================================
export function FullServicesGridExample() {
  const services = [
    { icon: Box, title: 'APIs and services' },
    { icon: Shield, title: 'IAM and admin' },
    { icon: CreditCard, title: 'Billing' },
    { icon: Server, title: 'Compute Engine' },
    { icon: HardDrive, title: 'Cloud Storage' },
    { icon: Database, title: 'BigQuery' },
    { icon: Network, title: 'VPC network' },
    { icon: Box, title: 'Kubernetes Engine' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Quick Access</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            onClick={() => console.log(`Navigate to ${service.title}`)}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 4: Grille de services réduite (3 colonnes)
// ============================================================================
export function CompactServicesGridExample() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Core Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ServiceCard icon={Server} title="Compute Engine" />
        <ServiceCard icon={Database} title="BigQuery" />
        <ServiceCard icon={HardDrive} title="Cloud Storage" />
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 5: Services d'administration
// ============================================================================
export function AdminServicesExample() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Administration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ServiceCard icon={Shield} title="IAM and admin" />
        <ServiceCard icon={Users} title="User Management" />
        <ServiceCard icon={Settings} title="Settings" />
        <ServiceCard icon={FileText} title="Audit Logs" />
        <ServiceCard icon={CreditCard} title="Billing" />
        <ServiceCard icon={BarChart} title="Analytics" />
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 6: Combinaison Actions + Services
// ============================================================================
export function CombinedExample() {
  return (
    <div className="space-y-8">
      {/* Section Actions */}
      <div className="space-y-3">
        <h3 className="text-xl font-normal">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <ActionButton icon={Plus}>Create a VM</ActionButton>
          <ActionButton icon={Plus}>Deploy an application</ActionButton>
          <ActionButton icon={Upload}>Upload data</ActionButton>
        </div>
      </div>

      {/* Section Services */}
      <div className="space-y-4">
        <h3 className="text-xl font-normal">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ServiceCard icon={Server} title="Compute Engine" />
          <ServiceCard icon={Database} title="BigQuery" />
          <ServiceCard icon={HardDrive} title="Cloud Storage" />
          <ServiceCard icon={Network} title="VPC network" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 7: Layout responsive complet
// ============================================================================
export function ResponsiveLayoutExample() {
  return (
    <div className="max-w-[1400px] mx-auto p-8 space-y-8">
      {/* Actions sur plusieurs lignes */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <ActionButton icon={Plus}>Create a VM</ActionButton>
          <ActionButton icon={Plus}>Run a query</ActionButton>
          <ActionButton icon={Plus}>Deploy app</ActionButton>
        </div>
        <div>
          <ActionButton icon={Plus}>Create storage bucket</ActionButton>
        </div>
      </div>

      {/* Grille 2x4 de services */}
      <div className="space-y-4">
        <h2 className="text-xl font-normal">Quick access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ServiceCard icon={Box} title="APIs and services" />
          <ServiceCard icon={Shield} title="IAM and admin" />
          <ServiceCard icon={CreditCard} title="Billing" />
          <ServiceCard icon={Server} title="Compute Engine" />
          <ServiceCard icon={HardDrive} title="Cloud Storage" />
          <ServiceCard icon={Database} title="BigQuery" />
          <ServiceCard icon={Network} title="VPC network" />
          <ServiceCard icon={Box} title="Kubernetes Engine" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 8: Avec handlers onClick
// ============================================================================
export function WithHandlersExample() {
  const handleCreateVM = () => {
    console.log('Creating VM...');
    // Navigation ou action
  };

  const handleNavigateToService = (serviceName: string) => {
    console.log(`Navigating to ${serviceName}`);
    // Navigation
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <ActionButton icon={Plus} onClick={handleCreateVM}>
          Create a VM
        </ActionButton>
        <ActionButton icon={Plus} onClick={() => console.log('Deploy')}>
          Deploy an application
        </ActionButton>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <ServiceCard
          icon={Server}
          title="Compute Engine"
          onClick={() => handleNavigateToService('Compute Engine')}
        />
        <ServiceCard
          icon={Database}
          title="BigQuery"
          onClick={() => handleNavigateToService('BigQuery')}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 9: Thème personnalisé (dark mode)
// ============================================================================
export function DarkModeExample() {
  return (
    <div className="dark bg-gray-950 min-h-screen p-8 space-y-8">
      <div className="flex flex-wrap gap-3">
        <ActionButton icon={Plus}>Create a VM</ActionButton>
        <ActionButton icon={Upload}>Upload Files</ActionButton>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <ServiceCard icon={Server} title="Compute Engine" />
        <ServiceCard icon={Database} title="BigQuery" />
        <ServiceCard icon={HardDrive} title="Cloud Storage" />
        <ServiceCard icon={Network} title="VPC network" />
      </div>
    </div>
  );
}

// ============================================================================
// Exemple 10: Page complète style Google Cloud
// ============================================================================
export function GoogleCloudStylePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950">
      <div className="max-w-[1400px] mx-auto p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-normal text-gray-900 dark:text-white mb-2">
            Welcome
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You're working in <span className="text-blue-600 dark:text-blue-400 font-medium">my-project</span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <ActionButton icon={Plus}>Create a VM</ActionButton>
            <ActionButton icon={Plus}>Run a query in BigQuery</ActionButton>
            <ActionButton icon={Plus}>Deploy an application</ActionButton>
          </div>
          <div>
            <ActionButton icon={Plus}>Create a storage bucket</ActionButton>
          </div>
        </div>

        {/* Quick Access */}
        <div className="space-y-4">
          <h2 className="text-xl font-normal text-gray-900 dark:text-white">
            Quick access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ServiceCard icon={Box} title="APIs and services" />
            <ServiceCard icon={Shield} title="IAM and admin" />
            <ServiceCard icon={CreditCard} title="Billing" />
            <ServiceCard icon={Server} title="Compute Engine" />
            <ServiceCard icon={HardDrive} title="Cloud Storage" />
            <ServiceCard icon={Database} title="BigQuery" />
            <ServiceCard icon={Network} title="VPC network" />
            <ServiceCard icon={Box} title="Kubernetes Engine" />
          </div>
        </div>
      </div>
    </div>
  );
}
