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
  message
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  TeamOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/components/AdminLayout';

const { Title } = Typography;

interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  phone?: string;
  createdAt: string;
}

const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [form] = Form.useForm();

  // Mock data - substituir por API calls
  const mockMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Guilherme Puentes',
      position: 'Product Designer & Webmaster',
      email: 'guilherme@online.des.br',
      phone: '(11) 99999-9999',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Ana Silva',
      position: 'Desenvolvedora Frontend',
      email: 'ana@online.des.br',
      phone: '(11) 88888-8888',
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      name: 'Carlos Santos',
      position: 'DevOps Engineer',
      email: 'carlos@online.des.br',
      phone: '(11) 77777-7777',
      createdAt: '2024-03-10'
    }
  ];

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    try {
      // Simular API call
      setTimeout(() => {
        setMembers(mockMembers);
        setLoading(false);
      }, 500);
    } catch (error) {
      message.error('Erro ao carregar membros da equipe');
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingMember(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    form.setFieldsValue(member);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // Simular API call
      setMembers(members.filter(m => m.id !== id));
      message.success('Membro removido com sucesso');
    } catch (error) {
      message.error('Erro ao remover membro');
    }
  };

  const handleSave = async (values: any) => {
    try {
      if (editingMember) {
        // Editar membro existente
        setMembers(members.map(m => 
          m.id === editingMember.id 
            ? { ...m, ...values }
            : m
        ));
        message.success('Membro atualizado com sucesso');
      } else {
        // Adicionar novo membro
        const newMember: TeamMember = {
          id: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setMembers([...members, newMember]);
        message.success('Membro adicionado com sucesso');
      }
      setModalVisible(false);
    } catch (error) {
      message.error('Erro ao salvar membro');
    }
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: TeamMember, b: TeamMember) => a.name.localeCompare(b.name),
    },
    {
      title: 'Cargo',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Data de Cadastro',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('pt-BR'),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: TeamMember) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Confirmar remoção"
            description="Tem certeza que deseja remover este membro?"
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
              <TeamOutlined />
              Gestão de Equipe
            </Title>
            <div className="text-muted-foreground">
              Gerencie membros da equipe e suas informações
            </div>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
          >
            Adicionar Membro
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={members}
            loading={loading}
            rowKey="id"
            pagination={{
              total: members.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </Card>

        <Modal
          title={editingMember ? 'Editar Membro' : 'Adicionar Membro'}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
          >
            <Form.Item
              name="name"
              label="Nome Completo"
              rules={[{ required: true, message: 'Nome é obrigatório' }]}
            >
              <Input placeholder="Nome completo do membro" />
            </Form.Item>

            <Form.Item
              name="position"
              label="Cargo"
              rules={[{ required: true, message: 'Cargo é obrigatório' }]}
            >
              <Input placeholder="Cargo ou função" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email é obrigatório' },
                { type: 'email', message: 'Email inválido' }
              ]}
            >
              <Input placeholder="email@exemplo.com" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Telefone"
            >
              <Input placeholder="(11) 99999-9999" />
            </Form.Item>

            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={() => setModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                {editingMember ? 'Atualizar' : 'Adicionar'}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default TeamManagement;