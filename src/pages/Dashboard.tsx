import React from 'react';
import { Layout, Card, Statistic, Row, Col, Typography, Button } from 'antd';
import { 
  TeamOutlined, 
  DatabaseOutlined, 
  FileTextOutlined, 
  ApiOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { useToast } from '@/hooks/use-toast';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado da plataforma.",
    });
    navigate('/login');
  };

  const dashboardStats = [
    {
      title: 'Membros da Equipe',
      value: 8,
      icon: <TeamOutlined className="text-blue-500" />,
      color: '#1890ff'
    },
    {
      title: 'Conexões de Banco',
      value: 3,
      icon: <DatabaseOutlined className="text-green-500" />,
      color: '#52c41a'
    },
    {
      title: 'Logs de Auditoria',
      value: 247,
      icon: <FileTextOutlined className="text-orange-500" />,
      color: '#fa8c16'
    },
    {
      title: 'Endpoints API',
      value: 12,
      icon: <ApiOutlined className="text-purple-500" />,
      color: '#722ed1'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="!mb-1">Dashboard Administrativo</Title>
            <Paragraph className="text-muted-foreground">
              Visão geral da plataforma WebSolutions ETI
            </Paragraph>
          </div>
          <Button 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            danger
            type="text"
          >
            Sair
          </Button>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          {dashboardStats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.icon}
                  valueStyle={{ color: stat.color }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick Actions */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card 
              title="Gestão de Equipe"
              extra={<TeamOutlined />}
              className="h-full"
            >
              <Paragraph className="mb-4">
                Gerencie membros da equipe, cargos e permissões.
              </Paragraph>
              <Button 
                type="primary" 
                onClick={() => navigate('/admin/equipe')}
                className="w-full"
              >
                Gerenciar Equipe
              </Button>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card 
              title="Configurações de Banco"
              extra={<DatabaseOutlined />}
              className="h-full"
            >
              <Paragraph className="mb-4">
                Configure conexões de banco de dados e parâmetros.
              </Paragraph>
              <Button 
                type="primary" 
                onClick={() => navigate('/admin/configuracoes')}
                className="w-full"
              >
                Configurar Bancos
              </Button>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card 
              title="Logs de Auditoria"
              extra={<FileTextOutlined />}
              className="h-full"
            >
              <Paragraph className="mb-4">
                Visualize logs de atividades e auditoria do sistema.
              </Paragraph>
              <Button 
                type="primary" 
                onClick={() => navigate('/admin/logs')}
                className="w-full"
              >
                Ver Logs
              </Button>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card 
              title="Documentação API"
              extra={<ApiOutlined />}
              className="h-full"
            >
              <Paragraph className="mb-4">
                Acesse a documentação completa das APIs REST.
              </Paragraph>
              <Button 
                type="primary" 
                onClick={() => navigate('/admin/api-docs')}
                className="w-full"
              >
                Ver Swagger
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;