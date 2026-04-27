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

        <Layout style={{ minHeight: "100vh", background: "#1A1D21" }}>
            <Header style={{
                background: "#2C3035",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                borderBottom: "1px solid rgba(0,255,194,0.1)",
                height: 60,
            }}>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                        src="/favicon2qualigrafica.png"
                        alt="QualiGráfica"
                        style={{ width: 32, height: 32, borderRadius: 6, objectFit: "contain" }}
                    />


                    <Typography.Text style={{ color: "#ECECEC", fontSize: 16, fontWeight: 600 }}>
                        QualiGráfica Estoque
                    </Typography.Text>

                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

                    <Typography.Text style={{ color: "#888", fontSize: 13 }}>
                        Olá, {usuario?.nome}
                    </Typography.Text>


                    <Button
                        onClick={handleLogout}
                        size="small"
                        style={{
                            background: "transparent",
                            border: "1px solid rgba(239,87,119,0.4)",
                            color: "#EF5777",
                            borderRadius: 6,
                        }}
                    >
                        Sair
                    </Button>

                </div>

            </Header>

            <Content style={{ padding: "32px 16px", maxWidth: 900, margin: "0 auto", width: "100%" }}>
                <div style={{ marginBottom: 28 }}>

                    <h1 style={{ fontSize: 22, fontWeight: 700, color: "#ECECEC", margin: 0 }}>
                        Menu Principal
                    </h1>


                    <p style={{ color: "#666", marginTop: 4, fontSize: 13 }}>
                        Selecione uma área para gerenciar
                    </p>

                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 16,
                }}>

                    {[

                        { titulo: "Cadastro de Insumos", desc: "Gerencie papéis, tintas, toners e materiais", rota: "/insumos", icon: "📦" },
                        { titulo: "Movimentações de Estoque", desc: "Registre entradas e saídas de materiais", rota: "/movimentacoes", icon: "🔄" },

                    ].map((item) => (
                        <div
                            key={item.rota}
                            onClick={() => navigate(item.rota)}
                            style={{
                                background: "#2C3035",
                                border: "1px solid rgba(0,255,194,0.08)",
                                borderRadius: 12,
                                padding: "28px 24px",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(0,255,194,0.4)";
                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,255,194,0.08)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(0,255,194,0.08)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >

                            <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>

                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#ECECEC" }}>
                                {item.titulo}
                            </h3>


                            <p style={{ margin: "6px 0 0", color: "#666", fontSize: 13 }}>
                                {item.desc}
                            </p>


                            <div style={{ marginTop: 16, color: "#00FFC2", fontSize: 13, fontWeight: 500 }}>
                                Acessar →
                            </div>

                        </div>

                    ))}

                </div>

            </Content>

        </Layout>

    );

}