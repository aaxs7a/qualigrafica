import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import api from "../services/api.js";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(values) {

        try {

            const response = await api.post("/auth/login", {

                email: values.email,
                senha: values.senha,

            });

            login(response.data.token, response.data.nomeUsuario);
            navigate("/dashboard");

        } catch {

            message.error("E-mail ou senha inválidos.");

        }

    }

    return (

        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#f5f5f5",

        }}>

            <div style={{
                background: "#fff",
                borderRadius: 12,
                padding: "48px 40px",
                width: 400,
                boxShadow: "0 2px 24px rgba(0,0,0,0.08)",
                border: "1px solid #e8e8e8",

            }}>

                <div style={{ textAlign: "center", marginBottom: 36 }}>

                    <div style={{
                        width: 48, height: 48,
                        background: "#1E3A5F",
                        borderRadius: 10,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,

                    }}>

                        <span style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>G</span>

                    </div>



                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#1E3A5F" }}>

                        QualiGráfica

                    </h1>

                    <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>

                        Sistema de Controle de Estoque

                    </p>

                </div>



                <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>

                    <Form.Item

                        label={<span style={{ fontWeight: 500, color: "#333" }}>E-mail</span>}
                        name="email"
                        rules={[{ required: true, message: "Informe o e-mail." }]}

                    >

                        <Input

                            placeholder="seu@email.com"
                            size="large"
                            style={{ borderRadius: 8 }}

                        />

                    </Form.Item>



                    <Form.Item

                        label={<span style={{ fontWeight: 500, color: "#333" }}>Senha</span>}
                        name="senha"
                        rules={[{ required: true, message: "Informe a senha." }]}

                    >
                        <Input.Password

                            placeholder="••••••••"
                            size="large"
                            style={{ borderRadius: 8 }}

                        />

                    </Form.Item>



                    <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>

                        <Button

                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            style={{
                                borderRadius: 8,
                                fontWeight: 600,
                                background: "#1E3A5F",
                                border: "none",
                                height: 44,
                            }}

                        >

                            Entrar

                        </Button>

                    </Form.Item>

                </Form>

            </div>

        </div>

    );

}