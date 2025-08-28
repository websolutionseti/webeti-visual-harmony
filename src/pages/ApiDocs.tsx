import React, { useState } from 'react';
import { Card, Typography, Tabs, Button, Tag, Collapse, Space } from 'antd';
import { ApiOutlined, CopyOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/AdminLayout';
import { useToast } from '@/hooks/use-toast';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const ApiDocs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência.",
    });
  };

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/auth/me',
      description: 'Obtém informações do usuário autenticado',
      response: `{
  "id": "user_123",
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "role": "ADMIN"
}`
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      description: 'Autentica usuário no sistema',
      body: `{
  "email": "user@example.com",
  "password": "senha123"
}`,
      response: `{
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "Nome do Usuário",
    "role": "ADMIN"
  }
}`
    },
    {
      method: 'GET',
      path: '/api/team-members',
      description: 'Lista todos os membros da equipe',
      response: `[
  {
    "id": "member_123",
    "name": "João Silva",
    "position": "Desenvolvedor",
    "email": "joao@example.com",
    "phone": "(11) 99999-9999",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]`
    },
    {
      method: 'POST',
      path: '/api/team-members',
      description: 'Cria um novo membro da equipe',
      body: `{
  "name": "Maria Silva",
  "position": "Designer",
  "email": "maria@example.com",
  "phone": "(11) 88888-8888"
}`,
      response: `{
  "id": "member_124",
  "name": "Maria Silva",
  "position": "Designer",
  "email": "maria@example.com",
  "phone": "(11) 88888-8888",
  "createdAt": "2024-12-28T15:30:00Z"
}`
    },
    {
      method: 'GET',
      path: '/api/db-configs',
      description: 'Lista configurações de banco de dados',
      response: `[
  {
    "id": "config_123",
    "name": "Banco Principal",
    "host": "db.example.com",
    "port": 5432,
    "database": "main_db",
    "username": "db_user",
    "cname": "db.empresa.com",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]`
    },
    {
      method: 'GET',
      path: '/api/logs',
      description: 'Lista logs de auditoria do sistema',
      response: `[
  {
    "id": "log_123",
    "action": "LOGIN",
    "userId": "user_123",
    "userName": "João Silva",
    "userEmail": "joao@example.com",
    "timestamp": "2024-12-28T15:30:00Z",
    "details": {
      "ip": "192.168.1.100"
    }
  }
]`
    }
  ];

  const getMethodColor = (method: string) => {
    const colors: { [key: string]: string } = {
      'GET': 'green',
      'POST': 'blue',
      'PUT': 'orange',
      'PATCH': 'cyan',
      'DELETE': 'red'
    };
    return colors[method] || 'default';
  };

  const overviewContent = (
    <div className="space-y-6">
      <Card>
        <Title level={4}>Visão Geral da API</Title>
        <Paragraph>
          Esta é a documentação da API REST da plataforma administrativa WebSolutions ETI. 
          A API segue os padrões RESTful e utiliza autenticação JWT.
        </Paragraph>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Text strong>Base URL:</Text>
            <div className="bg-muted p-2 rounded mt-1 font-mono">
              https://api.webeti.com/v1
            </div>
          </div>
          <div>
            <Text strong>Formato:</Text>
            <div className="bg-muted p-2 rounded mt-1">
              JSON (application/json)
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Title level={4}>Autenticação</Title>
        <Paragraph>
          A API utiliza JWT (JSON Web Tokens) para autenticação. Inclua o token no header Authorization:
        </Paragraph>
        <div className="bg-muted p-3 rounded font-mono">
          Authorization: Bearer &lt;seu_jwt_token&gt;
        </div>
      </Card>

      <Card>
        <Title level={4}>Códigos de Status</Title>
        <div className="space-y-2">
          <div><Tag color="green">200</Tag> Sucesso</div>
          <div><Tag color="blue">201</Tag> Criado com sucesso</div>
          <div><Tag color="orange">400</Tag> Requisição inválida</div>
          <div><Tag color="red">401</Tag> Não autorizado</div>
          <div><Tag color="red">403</Tag> Acesso negado</div>
          <div><Tag color="red">404</Tag> Não encontrado</div>
          <div><Tag color="red">500</Tag> Erro interno do servidor</div>
        </div>
      </Card>
    </div>
  );

  const endpointsContent = (
    <div className="space-y-4">
      <Collapse>
        {apiEndpoints.map((endpoint, index) => (
          <Panel
            header={
              <Space>
                <Tag color={getMethodColor(endpoint.method)}>{endpoint.method}</Tag>
                <Text strong>{endpoint.path}</Text>
                <Text className="text-muted-foreground">{endpoint.description}</Text>
              </Space>
            }
            key={index}
          >
            <div className="space-y-4">
              {endpoint.body && (
                <div>
                  <Text strong>Request Body:</Text>
                  <div className="relative">
                    <pre className="bg-muted p-3 rounded mt-1 text-sm overflow-x-auto">
                      {endpoint.body}
                    </pre>
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(endpoint.body!)}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Text strong>Response:</Text>
                <div className="relative">
                  <pre className="bg-muted p-3 rounded mt-1 text-sm overflow-x-auto">
                    {endpoint.response}
                  </pre>
                  <Button
                    size="small"
                    icon={<CopyOutlined />}
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(endpoint.response)}
                  />
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );

  const examplesContent = (
    <div className="space-y-6">
      <Card>
        <Title level={4}>Exemplo: Autenticação</Title>
        <div className="space-y-4">
          <div>
            <Text strong>cURL:</Text>
            <div className="relative">
              <pre className="bg-muted p-3 rounded mt-1 text-sm overflow-x-auto">
{`curl -X POST https://api.webeti.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "admin@webeti.com",
    "password": "sua_senha"
  }'`}
              </pre>
              <Button
                size="small"
                icon={<CopyOutlined />}
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(`curl -X POST https://api.webeti.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "admin@webeti.com",
    "password": "sua_senha"
  }'`)}
              />
            </div>
          </div>

          <div>
            <Text strong>JavaScript (fetch):</Text>
            <div className="relative">
              <pre className="bg-muted p-3 rounded mt-1 text-sm overflow-x-auto">
{`const response = await fetch('https://api.webeti.com/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@webeti.com',
    password: 'sua_senha'
  })
});

const data = await response.json();
const token = data.token;`}
              </pre>
              <Button
                size="small"
                icon={<CopyOutlined />}
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(`const response = await fetch('https://api.webeti.com/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@webeti.com',
    password: 'sua_senha'
  })
});

const data = await response.json();
const token = data.token;`)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Title level={4}>Exemplo: Criar Membro da Equipe</Title>
        <div className="relative">
          <pre className="bg-muted p-3 rounded mt-1 text-sm overflow-x-auto">
{`const response = await fetch('https://api.webeti.com/v1/team-members', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    name: 'Ana Silva',
    position: 'Desenvolvedora Frontend',
    email: 'ana@webeti.com',
    phone: '(11) 99999-9999'
  })
});

const newMember = await response.json();`}
          </pre>
          <Button
            size="small"
            icon={<CopyOutlined />}
            className="absolute top-2 right-2"
            onClick={() => copyToClipboard(`const response = await fetch('https://api.webeti.com/v1/team-members', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    name: 'Ana Silva',
    position: 'Desenvolvedora Frontend',
    email: 'ana@webeti.com',
    phone: '(11) 99999-9999'
  })
});

const newMember = await response.json();`)}
          />
        </div>
      </Card>
    </div>
  );

  const tabItems = [
    {
      key: 'overview',
      label: 'Visão Geral',
      children: overviewContent,
    },
    {
      key: 'endpoints',
      label: 'Endpoints',
      children: endpointsContent,
    },
    {
      key: 'examples',
      label: 'Exemplos',
      children: examplesContent,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Title level={2} className="!mb-1 flex items-center gap-2">
            <ApiOutlined />
            Documentação da API
          </Title>
          <div className="text-muted-foreground">
            Documentação completa dos endpoints REST
          </div>
        </div>

        <Card>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
          />
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ApiDocs;