import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Typography, 
  Space,
  Popconfirm,
  message,
  InputNumber,
  Tag
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  DatabaseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import AdminLayout from '@/components/AdminLayout';

const { Title } = Typography;
const { TextArea } = Input;

interface DbConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  cname?: string;
  parameters?: any;
  createdAt: string;
}

const DatabaseConfig = () => {
  const [configs, setConfigs] = useState<DbConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingConfig, setEditingConfig] = useState<DbConfig | null>(null);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [form] = Form.useForm();

  // Mock data
  const mockConfigs: DbConfig[] = [
    {
      id: '1',
      name: 'Banco Principal',
      host: 'aws-1-sa-east-1.pooler.supabase.com',
      port: 5432,
      database: 'postgres',
      username: 'postgres.pdvdnjavmqldqdtsssug',
      password: 'Senhabanco2015!',
      cname: 'db.webeti.com.br',
      parameters: { ssl: true, pool_size: 10 },
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Banco de Teste',
      host: 'localhost',
      port: 5433,
      database: 'webeti_test',
      username: 'test_user',
      password: 'test123',
      createdAt: '2024-02-20'
    }
  ];

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setConfigs(mockConfigs);
        setLoading(false);
      }, 500);
    } catch (error) {
      message.error('Erro ao carregar configurações');
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingConfig(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (config: DbConfig) => {
    setEditingConfig(config);
    form.setFieldsValue({
      ...config,
      parameters: config.parameters ? JSON.stringify(config.parameters, null, 2) : ''
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setConfigs(configs.filter(c => c.id !== id));
      message.success('Configuração removida com sucesso');
    } catch (error) {
      message.error('Erro ao remover configuração');
    }
  };

  const handleSave = async (values: any) => {
    try {
      let parameters = null;
      if (values.parameters) {
        try {
          parameters = JSON.parse(values.parameters);
        } catch (e) {
          message.error('JSON de parâmetros inválido');
          return;
        }
      }

      const configData = {
        ...values,
        parameters
      };

      if (editingConfig) {
        setConfigs(configs.map(c => 
          c.id === editingConfig.id 
            ? { ...c, ...configData }
            : c
        ));
        message.success('Configuração atualizada com sucesso');
      } else {
        const newConfig: DbConfig = {
          id: Date.now().toString(),
          ...configData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setConfigs([...configs, newConfig]);
        message.success('Configuração adicionada com sucesso');
      }
      setModalVisible(false);
    } catch (error) {
      message.error('Erro ao salvar configuração');
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: DbConfig, b: DbConfig) => a.name.localeCompare(b.name),
    },
    {
      title: 'Host/IP',
      dataIndex: 'host',
      key: 'host',
      render: (host: string, record: DbConfig) => (
        <div>
          <div>{host}</div>
          {record.cname && (
            <Tag color="blue" className="mt-1">{record.cname}</Tag>
          )}
        </div>
      )
    },
    {
      title: 'Porta',
      dataIndex: 'port',
      key: 'port',
      width: 80,
    },
    {
      title: 'Banco',
      dataIndex: 'database',
      key: 'database',
    },
    {
      title: 'Usuário',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Senha',
      key: 'password',
      render: (_: any, record: DbConfig) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">
            {showPasswords[record.id] ? record.password : '••••••••'}
          </span>
          <Button
            type="text"
            size="small"
            icon={showPasswords[record.id] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => togglePasswordVisibility(record.id)}
          />
        </div>
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: DbConfig) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Confirmar remoção"
            description="Tem certeza que deseja remover esta configuração?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="!mb-1 flex items-center gap-2">
              <DatabaseOutlined />
              Configurações de Banco
            </Title>
            <div className="text-muted-foreground">
              Gerencie conexões de banco de dados
            </div>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
          >
            Nova Configuração
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={configs}
            loading={loading}
            rowKey="id"
            scroll={{ x: 800 }}
            pagination={{
              total: configs.length,
              pageSize: 10,
              showSizeChanger: true,
            }}
          />
        </Card>

        <Modal
          title={editingConfig ? 'Editar Configuração' : 'Nova Configuração'}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
          >
            <Form.Item
              name="name"
              label="Nome da Configuração"
              rules={[{ required: true, message: 'Nome é obrigatório' }]}
            >
              <Input placeholder="Ex: Banco Principal" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="host"
                label="Host/IP"
                rules={[{ required: true, message: 'Host é obrigatório' }]}
              >
                <Input placeholder="localhost ou IP" />
              </Form.Item>

              <Form.Item
                name="port"
                label="Porta"
                rules={[{ required: true, message: 'Porta é obrigatória' }]}
              >
                <InputNumber 
                  placeholder="5432" 
                  className="w-full"
                  min={1}
                  max={65535}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="cname"
              label="CNAME (Opcional)"
            >
              <Input placeholder="db.exemplo.com" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="database"
                label="Nome do Banco"
                rules={[{ required: true, message: 'Nome do banco é obrigatório' }]}
              >
                <Input placeholder="nome_do_banco" />
              </Form.Item>

              <Form.Item
                name="username"
                label="Usuário"
                rules={[{ required: true, message: 'Usuário é obrigatório' }]}
              >
                <Input placeholder="usuario" />
              </Form.Item>
            </div>

            <Form.Item
              name="password"
              label="Senha"
              rules={[{ required: true, message: 'Senha é obrigatória' }]}
            >
              <Input.Password placeholder="senha_segura" />
            </Form.Item>

            <Form.Item
              name="parameters"
              label="Parâmetros Adicionais (JSON)"
            >
              <TextArea
                rows={4}
                placeholder='{"ssl": true, "pool_size": 10}'
              />
            </Form.Item>

            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={() => setModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                {editingConfig ? 'Atualizar' : 'Adicionar'}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default DatabaseConfig;