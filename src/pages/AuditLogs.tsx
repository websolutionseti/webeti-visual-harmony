import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Typography, 
  Tag, 
  Input,
  Select,
  DatePicker,
  Space,
  Button,
  Modal,
  Descriptions
} from 'antd';
import { 
  FileTextOutlined,
  SearchOutlined,
  EyeOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import AdminLayout from '@/components/AdminLayout';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface AuditLog {
  id: string;
  action: string;
  entity?: string;
  entityId?: string;
  userId: string;
  userName: string;
  userEmail: string;
  details?: any;
  timestamp: string;
}

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Mock data
  const mockLogs: AuditLog[] = [
    {
      id: '1',
      action: 'LOGIN',
      userId: 'admin',
      userName: 'Guilherme Puentes',
      userEmail: 'guilherme@online.des.br',
      details: { ip: '192.168.1.100', userAgent: 'Chrome/120.0.0.0' },
      timestamp: '2024-12-28T10:30:00Z'
    },
    {
      id: '2',
      action: 'CREATE_TEAM_MEMBER',
      entity: 'TeamMember',
      entityId: '3',
      userId: 'admin',
      userName: 'Guilherme Puentes',
      userEmail: 'guilherme@online.des.br',
      details: { memberName: 'Ana Silva', memberEmail: 'ana@online.des.br' },
      timestamp: '2024-12-28T11:15:00Z'
    },
    {
      id: '3',
      action: 'UPDATE_DB_CONFIG',
      entity: 'DbConfig',
      entityId: '1',
      userId: 'admin',
      userName: 'Guilherme Puentes',
      userEmail: 'guilherme@online.des.br',
      details: { configName: 'Banco Principal', changes: ['port', 'password'] },
      timestamp: '2024-12-28T14:20:00Z'
    },
    {
      id: '4',
      action: 'DELETE_TEAM_MEMBER',
      entity: 'TeamMember',
      entityId: '2',
      userId: 'admin',
      userName: 'Guilherme Puentes',
      userEmail: 'guilherme@online.des.br',
      details: { memberName: 'João Silva', reason: 'Desligamento' },
      timestamp: '2024-12-28T16:45:00Z'
    }
  ];

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLogs(mockLogs);
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  };

  const getActionTag = (action: string) => {
    const actionConfig: { [key: string]: { color: string; text: string } } = {
      'LOGIN': { color: 'blue', text: 'Login' },
      'LOGOUT': { color: 'orange', text: 'Logout' },
      'CREATE_TEAM_MEMBER': { color: 'green', text: 'Criar Membro' },
      'UPDATE_TEAM_MEMBER': { color: 'cyan', text: 'Editar Membro' },
      'DELETE_TEAM_MEMBER': { color: 'red', text: 'Remover Membro' },
      'CREATE_DB_CONFIG': { color: 'green', text: 'Criar Config DB' },
      'UPDATE_DB_CONFIG': { color: 'cyan', text: 'Editar Config DB' },
      'DELETE_DB_CONFIG': { color: 'red', text: 'Remover Config DB' },
    };

    const config = actionConfig[action] || { color: 'default', text: action };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const filteredLogs = logs.filter(log => {
    let matches = true;

    if (searchText) {
      const searchLower = searchText.toLowerCase();
      matches = matches && (
        log.userName.toLowerCase().includes(searchLower) ||
        log.userEmail.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower) ||
        (log.entity && log.entity.toLowerCase().includes(searchLower))
      );
    }

    if (actionFilter) {
      matches = matches && log.action === actionFilter;
    }

    if (dateRange) {
      const logDate = dayjs(log.timestamp);
      matches = matches && logDate.isAfter(dateRange[0]) && logDate.isBefore(dateRange[1]);
    }

    return matches;
  });

  const actionOptions = [
    { label: 'Todos', value: '' },
    { label: 'Login', value: 'LOGIN' },
    { label: 'Logout', value: 'LOGOUT' },
    { label: 'Criar Membro', value: 'CREATE_TEAM_MEMBER' },
    { label: 'Editar Membro', value: 'UPDATE_TEAM_MEMBER' },
    { label: 'Remover Membro', value: 'DELETE_TEAM_MEMBER' },
    { label: 'Criar Config DB', value: 'CREATE_DB_CONFIG' },
    { label: 'Editar Config DB', value: 'UPDATE_DB_CONFIG' },
    { label: 'Remover Config DB', value: 'DELETE_DB_CONFIG' },
  ];

  const columns = [
    {
      title: 'Data/Hora',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a: AuditLog, b: AuditLog) => dayjs(a.timestamp).unix() - dayjs(b.timestamp).unix(),
      render: (timestamp: string) => (
        <div>
          <div>{dayjs(timestamp).format('DD/MM/YYYY')}</div>
          <div className="text-xs text-muted-foreground">
            {dayjs(timestamp).format('HH:mm:ss')}
          </div>
        </div>
      ),
    },
    {
      title: 'Ação',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => getActionTag(action),
    },
    {
      title: 'Usuário',
      key: 'user',
      render: (_: any, record: AuditLog) => (
        <div>
          <div className="font-medium">{record.userName}</div>
          <div className="text-xs text-muted-foreground">{record.userEmail}</div>
        </div>
      ),
    },
    {
      title: 'Entidade',
      key: 'entity',
      render: (_: any, record: AuditLog) => (
        record.entity ? (
          <div>
            <div>{record.entity}</div>
            {record.entityId && (
              <div className="text-xs text-muted-foreground">ID: {record.entityId}</div>
            )}
          </div>
        ) : '-'
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: AuditLog) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedLog(record);
            setDetailModalVisible(true);
          }}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="!mb-1 flex items-center gap-2">
              <FileTextOutlined />
              Logs de Auditoria
            </Title>
            <div className="text-muted-foreground">
              Histórico de atividades do sistema
            </div>
          </div>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={loadLogs}
            loading={loading}
          >
            Atualizar
          </Button>
        </div>

        <Card className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Buscar por usuário, ação..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              placeholder="Filtrar por ação"
              value={actionFilter}
              onChange={setActionFilter}
              options={actionOptions}
            />
            <RangePicker
              placeholder={['Data inicial', 'Data final']}
              value={dateRange}
              onChange={setDateRange}
            />
            <Button
              onClick={() => {
                setSearchText('');
                setActionFilter('');
                setDateRange(null);
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </Card>

        <Card>
          <Table
            columns={columns}
            dataSource={filteredLogs}
            loading={loading}
            rowKey="id"
            pagination={{
              total: filteredLogs.length,
              pageSize: 20,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </Card>

        <Modal
          title="Detalhes do Log"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Fechar
            </Button>
          ]}
          width={600}
        >
          {selectedLog && (
            <Descriptions column={1} bordered>
              <Descriptions.Item label="ID">{selectedLog.id}</Descriptions.Item>
              <Descriptions.Item label="Ação">{getActionTag(selectedLog.action)}</Descriptions.Item>
              <Descriptions.Item label="Usuário">{selectedLog.userName}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedLog.userEmail}</Descriptions.Item>
              <Descriptions.Item label="Data/Hora">
                {dayjs(selectedLog.timestamp).format('DD/MM/YYYY HH:mm:ss')}
              </Descriptions.Item>
              {selectedLog.entity && (
                <Descriptions.Item label="Entidade">
                  {selectedLog.entity} (ID: {selectedLog.entityId})
                </Descriptions.Item>
              )}
              {selectedLog.details && (
                <Descriptions.Item label="Detalhes">
                  <pre className="text-xs bg-muted p-2 rounded">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AuditLogs;