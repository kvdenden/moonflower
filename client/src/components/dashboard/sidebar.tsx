import { Moon } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
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
      </SidebarHeader>

      {/* <SidebarContent></SidebarContent> */}
      {/* <SidebarFooter></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

export default DashboardSidebar;
