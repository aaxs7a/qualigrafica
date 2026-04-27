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
            background: "#1A1D21",
            padding: "16px",
        }}>

            <div style={{
                background: "#2C3035",
                borderRadius: 16,
                padding: "48px 40px",
                width: "100%",
                maxWidth: 420,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                border: "1px solid rgba(0,255,194,0.1)",
            }}>

                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <img
                        src="/favicon2qualigrafica.png"
                        alt="QualiGráfica"
                        style={{ width: 56, height: 56, borderRadius: 12, objectFit: "contain", marginBottom: 16 }}
                    />

                    <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#ECECEC" }}>
                        QualiGráfica
                    </h1>


                    <p style={{ margin: "6px 0 0", color: "#888", fontSize: 13 }}>
                        Sistema de Controle de Estoque
                    </p>

                </div>

                <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                    <Form.Item
                        label={<span style={{ fontWeight: 500, color: "#ECECEC" }}>E-mail</span>}
                        name="email"
                        rules={[{ required: true, message: "Informe o e-mail." }]}
                    >

                        <Input
                            placeholder="seu@email.com"
                            size="large"
                            style={{
                                borderRadius: 8,
                                background: "#1A1D21",
                                border: "1px solid rgba(0,255,194,0.2)",
                                color: "#ECECEC",
                            }}

                        />

                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontWeight: 500, color: "#ECECEC" }}>Senha</span>}
                        name="senha"
                        rules={[{ required: true, message: "Informe a senha." }]}
                    >

                        <Input.Password
                            placeholder="••••••••"
                            size="large"
                            style={{
                                borderRadius: 8,
                                background: "#1A1D21",
                                border: "1px solid rgba(0,255,194,0.2)",
                                color: "#ECECEC",
                            }}

                        />

                    </Form.Item>

                    <Form.Item style={{ marginTop: 28, marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            style={{
                                borderRadius: 8,
                                fontWeight: 600,
                                background: "#00FFC2",
                                border: "none",
                                color: "#1A1D21",
                                height: 46,
                                fontSize: 15,
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