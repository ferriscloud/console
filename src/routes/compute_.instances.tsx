import { createFileRoute } from '@tanstack/react-router';
import { InstancesPage } from '@/pages/compute/instances';

export const Route = createFileRoute('/compute_/instances')({
  component: InstancesPage,
});
