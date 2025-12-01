import { createFileRoute } from '@tanstack/react-router';
import { CreateInstancePage } from '@/pages/compute/instances/create';

export const Route = createFileRoute('/compute_/instances_/create')({
  component: CreateInstancePage,
});
