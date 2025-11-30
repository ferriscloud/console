import * as React from "react"
import {
  Cloud,
  Home,
  Server,
  HardDrive,
  Network,
  Database,
  BarChart3,
  Shield,
  Settings,
  LifeBuoy,
  FileText,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Utilisateur",
    email: "user@ferriscloud.io",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Accueil",
      url: "/welcome",
      icon: Home,
      isActive: true,
    },
    {
      title: "Compute",
      url: "/compute",
      icon: Server,
      items: [
        {
          title: "Instances",
          url: "/compute/instances",
        },
        {
          title: "Images",
          url: "/compute/images",
        },
        {
          title: "Snapshots",
          url: "/compute/snapshots",
        },
      ],
    },
    {
      title: "Stockage",
      url: "/storage",
      icon: HardDrive,
      items: [
        {
          title: "Buckets",
          url: "/storage/buckets",
        },
        {
          title: "Volumes",
          url: "/storage/volumes",
        },
      ],
    },
    {
      title: "Réseau",
      url: "/network",
      icon: Network,
      items: [
        {
          title: "VPC",
          url: "/network/vpc",
        },
        {
          title: "Pare-feu",
          url: "/network/firewall",
        },
        {
          title: "Load Balancers",
          url: "/network/load-balancers",
        },
      ],
    },
    {
      title: "Bases de données",
      url: "/database",
      icon: Database,
      items: [
        {
          title: "Instances",
          url: "/database/instances",
        },
        {
          title: "Backups",
          url: "/database/backups",
        },
      ],
    },
    {
      title: "Monitoring",
      url: "/monitoring",
      icon: BarChart3,
      items: [
        {
          title: "Métriques",
          url: "/monitoring/metrics",
        },
        {
          title: "Logs",
          url: "/monitoring/logs",
        },
        {
          title: "Alertes",
          url: "/monitoring/alerts",
        },
      ],
    },
    {
      title: "Sécurité",
      url: "/security",
      icon: Shield,
      items: [
        {
          title: "IAM",
          url: "/security/iam",
        },
        {
          title: "Clés SSH",
          url: "/security/ssh-keys",
        },
        {
          title: "API Keys",
          url: "/security/api-keys",
        },
      ],
    },
    {
      title: "Paramètres",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Profil",
          url: "/settings/profile",
        },
        {
          title: "Facturation",
          url: "/settings/billing",
        },
        {
          title: "Équipe",
          url: "/settings/team",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Documentation",
      url: "#",
      icon: FileText,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/welcome">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Cloud className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">FerrisCloud</span>
                  <span className="truncate text-xs">v0.1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
