import { createFileRoute } from '@tanstack/react-router';
import { ComputePage } from '@/pages/compute';

export const Route = createFileRoute('/compute')({
  component: ComputePage,
});
