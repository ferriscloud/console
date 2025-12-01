import { Link } from '@tanstack/react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <Link to="/welcome">
            <Button>
              <Home className="w-4 h-4" />
              Accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
