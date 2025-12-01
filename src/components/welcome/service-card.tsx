import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

export function ServiceCard({ icon: Icon, title, onClick }: ServiceCardProps) {
  return (
    <Card
      onClick={onClick}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md shadow-2xs transition-shadow cursor-pointer group"
    >
      <div className="p-5 flex items-start gap-3">
        <div className="w-6 h-6 flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Card>
  );
}
