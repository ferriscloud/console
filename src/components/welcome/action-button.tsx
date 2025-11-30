import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
}

export function ActionButton({ icon: Icon, children, onClick }: ActionButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="bg-blue-100/20 text-blue-600  dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-blue-300 dark:border-gray-700 shadow-2xs"
    >
      <Icon className="w-4 h-4" />
      {children}
    </Button>
  );
}
