import { Layout, Menu, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Dashboard() {

    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {

        logout();
        navigate('/');

    }

    return (

        <Layout style={{ minHeight: '100vh' }}>

            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Typography.Text style={{ color: 'white', fontSize: 18 }}>

                    QualiGráfica Estoque

                </Typography.Text>

                <Typography.Text style={{ color: 'white' }} >

                    Olá, { usuario?.nome }

                </Typography.Text>

                <Button onClick={handleLogout} danger>

                    Sair

                </Button>

            </Header>

            <Content style={{ padding: 32 }}>

                <Title level={ 3 }> Menu Principal </Title>

                <div style={{ display: 'flex', gap: 16 }}>

                    <Button type="primary" size="large" onClick={() => navigate('/insumos')}>

                        Cadastro de Insumos

                    </Button>

                    <Button type="primary" size="large" onClick={() => navigate('/movimentacoes')}>

                        Cadastro de Estoque

                    </Button>

                </div>

            </Content>

        </Layout>

    );
}