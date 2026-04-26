import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import api from "../services/api.js";

const { Title } = Typography;

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit( values ) {

        try {

            const response = await api.post('/auth/login', {

                email: values.email,
                senha: values.senha,

            });

            login( response.data.token, response.data.nomeUsuario );
            navigate('/dashboard');

        } catch ( error ) {

            message.error('E-mail ou senha inválidos, tente novamente!');

        }

    }

    return (

        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',

        }}>
            <Card title="QualiGráfica Estoque"
                  style={{ width: 400,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(12px)',
                    WebkitAlignContent: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                  }}

                  title={null}

            >

                <div style={{ textAlign: 'center', marginBottom: '24px' }}>


                    <Title level={1} style={{ color: '#fff', margin: 0 }}>

                        QualiGráfica

                    </Title>


                </div>



                <Form layout="vertical"
                      onFinish={ handleSubmit }
                      requiredMark={false}
                >

                    <Form.Item

                        label={ <span style={{ color: '#cbd5e1' }}> E-mail </span> }
                        name="email"
                        rules={[{ required: true, message: 'Informe o seu e-mail.' }]}

                    >
                        <Input

                            placeholder="Seu@email.com"
                            style={{ background: 'rgba(255,255, 255, 0.05)', color: '#161616' }}/>

                    </Form.Item>

                    <Form.Item

                        label={ <span style={{ color: '#cbd5e1' }}> Senha </span> }
                        name="senha"
                        rules={[{ required: true, message: 'Informe a sua senha.' }]}

                    >
                        <Input.Password

                            placeholder="Sua senha"
                            style={{ background: 'rgba(255,255, 255, 0.05)', color: '#161616' }}
                        />

                    </Form.Item>

                    <Form.Item style={{ marginTop: '32px' }}>

                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ height: '40px', borderRadius: '8px', fontWeight: '600' }}
                        >

                            Entrar

                        </Button>

                    </Form.Item>

                </Form>

            </Card>
            
        </div>

    );

}