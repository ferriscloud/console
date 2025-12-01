import {
  Cloud,
  Server,
  Database,
  HardDrive,
  Network,
  Shield,
  Box,
  ArrowRight,
  Plus,
  CreditCard,
  LayoutGrid
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ActionButton } from '@/components/welcome/action-button';
import { ServiceCard } from '@/components/welcome/service-card';

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950">
      <div className="max-w-[1400px] mx-auto p-8 space-y-8">
        {/* Header Section avec icône cloud */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-center">
            <Cloud className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <h1 className="text-4xl font-normal text-gray-900 dark:text-white mb-2">
              Welcome
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span>You're working in</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">nathael</span>
            </div>
            <div className="mt-3 flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Project number:</span>
                <span className="font-mono">5103372144</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Project ID:</span>
                <span className="font-mono">gen-lang-client-0712175876</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <ActionButton icon={Plus}>Create a VM</ActionButton>

            <ActionButton icon={Plus}>Deploy an application</ActionButton>
            <ActionButton icon={Plus}>Create a storage bucket</ActionButton>
          </div>
        </div>

        {/* Quick Access Section */}
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
            <ServiceCard icon={Database} title="Database" />
            <ServiceCard icon={Network} title="VPC network" />
            <ServiceCard icon={Box} title="Kubernetes Engine" />
          </div>

          {/* View All Products Button */}
          <div className="pt-2">
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
            >
              <LayoutGrid className="w-4 h-4" />
              View all products
            </Button>
          </div>
        </div>


        <div className="mt-8">
          <Card className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30">
            <div className="p-8 flex items-start justify-between">
              <div className="space-y-3 max-w-xl">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Support FerrisCloud
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get expert help for all your FerrisCloud needs with our
                </p>
                <Button
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 p-0 h-auto font-medium"
                >
                  Explore Support Plans
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="hidden lg:block">
                {/* Decorative geometric shapes */}
                <div className="relative w-32 h-32">
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-blue-400/40"></div>
                  <div className="absolute bottom-8 left-4 w-16 h-16 border-2 border-gray-300/50 dark:border-gray-600/50 rotate-45"></div>
                  <div className="absolute top-12 right-8 w-12 h-12 bg-green-400/40 rounded-full"></div>
                  <div className="absolute bottom-0 right-12 w-6 h-6 bg-yellow-400/40 rounded-full"></div>
                  <div className="absolute top-6 left-0 w-10 h-10 border border-red-400/40"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
