import { Button, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const { Header, Content } = Layout;

export default function Dashboard() {

    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {

        logout();
        navigate("/");

    }

    return (
        <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>

            <Header style={{
                background: "#1E3A5F",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 32px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                    <div style={{
                        width: 32, height: 32,
                        background: "#C75B1A",
                        borderRadius: 6,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>

                        <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>G</span>

                    </div>

                    <Typography.Text style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>

                        QualiGráfica Estoque

                    </Typography.Text>

                </div>



                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

                    <Typography.Text style={{ color: "#a8c8e8", fontSize: 13 }}>

                        Olá, {usuario?.nome}

                    </Typography.Text>

                    <Button

                        onClick={handleLogout}
                        size="small"
                        style={{
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.3)",
                            color: "#fff",
                            borderRadius: 6,
                        }}
                    >
                        Sair

                    </Button>

                </div>

            </Header>

            <Content style={{ padding: 40, maxWidth: 900, margin: "0 auto", width: "100%" }}>

                <div style={{ marginBottom: 32 }}>

                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1E3A5F", margin: 0 }}>

                        Menu Principal

                    </h1>



                    <p style={{ color: "#888", marginTop: 4, fontSize: 13 }}>
                        Selecione uma área para gerenciar
                    </p>

                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

                    {[

                        { titulo: "Cadastro de Insumos", desc: "Gerencie papéis, tintas, toners e materiais", rota: "/insumos", icon: "📦" },
                        { titulo: "Movimentações de Estoque", desc: "Registre entradas e saídas de materiais", rota: "/movimentacoes", icon: "🔄" },

                    ].map((item) => (

                        <div

                            key={item.rota}
                            onClick={() => navigate(item.rota)}
                            style={{
                                background: "#fff",
                                border: "1px solid #e8e8e8",
                                borderRadius: 12,
                                padding: "28px 24px",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                            }}

                            onMouseEnter={(e) => {

                                e.currentTarget.style.boxShadow = "0 4px 16px rgba(30,58,95,0.12)";
                                e.currentTarget.style.borderColor = "#1E3A5F";

                            }}

                            onMouseLeave={(e) => {

                                e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)";
                                e.currentTarget.style.borderColor = "#e8e8e8";

                            }}

                        >

                            <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>

                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#1E3A5F" }}>

                                {item.titulo}

                            </h3>



                            <p style={{ margin: "6px 0 0", color: "#888", fontSize: 13 }}>

                                {item.desc}

                            </p>

                        </div>

                    ))}

                </div>

            </Content>

        </Layout>

    );

}