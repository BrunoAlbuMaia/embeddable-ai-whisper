import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  MessageSquare, 
  FileText, 
  Target, 
  Bot,
  CreditCard
} from 'lucide-react';


export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t('nav.chats'),
      url: '/dashboard',
      icon: MessageSquare,
      description: 'Histórico de conversas',
      tutorial: 'dashboard'
    },
    {
      title: t('nav.documents'),
      url: '/dashboard/documents',
      icon: FileText,
      description: 'Treinar a IA',
      tutorial: 'documents'
    },
    {
      title: t('nav.segments'),
      url: '/dashboard/segments',
      icon: Target,
      description: 'Gerenciar segmentos',
      tutorial: 'segments'
    },
    {
      title: t('nav.plans'),
      url: '/dashboard/plans',
      icon: CreditCard,
      description: 'Gerenciar assinatura',
      tutorial: 'plans'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r bg-sidebar-background">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">AI Dashboard</span>
              <span className="text-xs text-muted-foreground">Versão 2.0</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="group"
                  >
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3"
                      data-tutorial={item.tutorial}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}