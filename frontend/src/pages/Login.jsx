import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import api from "../services/api.js";

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
            background: '#f0f2f5'

        }}>
            <Card title="QualiGráfica Estoque" style={{ width: 400 }}>

                <Form layout="vertical" onFinish={ handleSubmit }>

                    <Form.Item

                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Informe o seu e-mail.' }]}

                    >
                        <Input />

                    </Form.Item>

                    <Form.Item

                        label="Senha"
                        name="senha"
                        rules={[{ required: true, message: 'Informe a sua senha.' }]}

                    >
                        <Input.Password />

                    </Form.Item>

                    <Form.Item>

                        <Button type="primary" htmlType="submit" block>

                            Entrar

                        </Button>

                    </Form.Item>

                </Form>

            </Card>
            
        </div>

    );

}