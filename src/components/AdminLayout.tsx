import React from 'react';
import { Layout, Menu, Typography, Avatar, Dropdown } from 'antd';
import { 
  DashboardOutlined,
  TeamOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  ApiOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/equipe',
      icon: <TeamOutlined />,
      label: 'Equipe',
    },
    {
      key: '/admin/configuracoes',
      icon: <DatabaseOutlined />,
      label: 'Configurações',
    },
    {
      key: '/admin/logs',
      icon: <FileTextOutlined />,
      label: 'Logs',
    },
    {
      key: '/admin/api-docs',
      icon: <ApiOutlined />,
      label: 'API Docs',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado da plataforma.",
    });
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Perfil',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Configurações',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sair',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        width={280}
        className="bg-sidebar border-r border-sidebar-border"
        theme="dark"
      >
        <div className="p-6">
          <Title level={4} className="!text-sidebar-foreground !mb-0">
            WebSolutions ETI
          </Title>
          <div className="text-sidebar-foreground/60 text-sm mt-1">
            Plataforma Admin
          </div>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none bg-transparent"
        />
      </Sider>

      <Layout>
        <Header className="bg-card border-b border-border px-6 flex items-center justify-between h-16">
          <div>
            <Title level={5} className="!mb-0 !text-foreground">
              Painel Administrativo
            </Title>
          </div>
          
          <Dropdown
            menu={{ items: userMenuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <div className="flex items-center cursor-pointer hover:bg-muted p-2 rounded">
              <Avatar 
                icon={<UserOutlined />} 
                className="mr-3 bg-primary"
              />
              <div>
                <div className="text-foreground font-medium">
                  {user.name || 'Usuário'}
                </div>
                <div className="text-muted-foreground text-xs">
                  {user.email}
                </div>
              </div>
            </div>
          </Dropdown>
        </Header>

        <Content className="bg-background">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;