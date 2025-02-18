"use client";

import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Moon, Play, Plus, ShieldCheck, Workflow } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useVaults } from "@/hooks/use-vaults";
import { useCurrentVault } from "@/hooks/use-current-vault";
import { useWorkflows } from "@/hooks/use-workflows";
import { useRegisterVault } from "@/hooks/use-register-vault";
import { useCreateWorkflow } from "@/hooks/use-create-workflow";
import { max } from "lodash";
import { Vault } from "@/api/vaults";
import { Button } from "../ui/button";
import { useExecuteWorkflow } from "@/hooks/use-execute-workflow";

export function DashboardSidebar() {
  const router = useRouter();

  const { data: vaults = [], refetch: refetchVaults } = useVaults();
  const { data: vault } = useCurrentVault();
  const { data: workflows, refetch: refetchWorkflows } = useWorkflows(vault?.id);

  const nextVaultIndex = max(vaults.map((v) => v.index + 1)) ?? 0;
  const { mutate: registerVault, isPending: isRegisterVaultPending } = useRegisterVault({
    onSuccess: (vault: Vault) => {
      refetchVaults();
      router.push(`/dashboard/vaults/${vault.id}`);
    },
  });

  const { mutate: createWorkflow, isPending: isCreateWorkflowPending } = useCreateWorkflow({
    onSuccess: () => refetchWorkflows(),
  });

  const { mutate: executeWorkflow } = useExecuteWorkflow();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Moon className="h-6 w-6" />
              </div>
              <div className="grid flex-1 text-left text-lg leading-tight">
                <span className="truncate font-semibold">Moonflower</span>
                <span className="truncate text-xs">Automated smart vaults</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">{vault ? vault.title : "Select Vault"}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
              >
                {vaults.map((v) => (
                  <DropdownMenuItem key={v.id} onSelect={() => router.push(`/dashboard/vaults/${v.id}`)}>
                    {v.title} {v.id === vault?.id && <Check className="ml-auto" />}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 p-2"
                  onClick={() => registerVault(nextVaultIndex)}
                  disabled={isRegisterVaultPending}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium">New Vault</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {workflows && (
          <SidebarGroup>
            <SidebarGroupLabel>Workflows</SidebarGroupLabel>
            <SidebarMenu>
              {workflows.map((workflow) => (
                <SidebarMenuItem key={workflow.id}>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-6 items-center justify-center rounded-lg">
                      <Workflow className="h-4 w-4" />
                    </div>
                    <div className="grid flex-1 text-left text-md leading-tight">
                      <span className="truncate font-semibold">{workflow.id}</span>
                    </div>
                    <div
                      onClick={() => executeWorkflow(workflow.id)}
                      className="ml-auto flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                    >
                      <Play className="h-4 w-4" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => vault && createWorkflow(vault.id)}
                  disabled={!vault || isCreateWorkflowPending}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-6 items-center justify-center rounded-lg">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div className="grid flex-1 text-left text-md leading-tight">
                    <span className="truncate font-semibold">New Workflow</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      {/* <SidebarFooter></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

export default DashboardSidebar;
