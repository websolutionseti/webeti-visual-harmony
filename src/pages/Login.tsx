import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    setError('');

    try {
      // Simulação de autenticação - implementar com Supabase Auth
      if (values.email === 'guilherme@online.des.br' && values.password === 'Senha2011!') {
        localStorage.setItem('user', JSON.stringify({
          email: values.email,
          role: 'ADMIN',
          name: 'Guilherme Puentes'
        }));
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo à plataforma administrativa.",
        });
        
        navigate('/admin');
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao realizar login. Tente novamente.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl bg-card border-border">
        <div className="text-center mb-8">
          <Title level={2} className="!text-foreground !mb-2">
            WebSolutions ETI
          </Title>
          <Text className="text-muted-foreground">
            Plataforma Administrativa
          </Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            className="mb-4"
            showIcon
          />
        )}

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Email inválido!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Sua senha"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              className="w-full h-12 text-lg font-semibold"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6 pt-6 border-t border-border">
          <Text className="text-muted-foreground text-sm">
            Acesso restrito a administradores autorizados
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;