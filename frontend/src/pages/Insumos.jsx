import { useEffect, useState } from "react";
import { Table, Button, Input, Modal, InputNumber, Space, Tag, message, Form, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

const { Header, Content } = Layout;

export default function Insumos() {

    const [insumos, setInsumos] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [insumoEditando, setInsumoEditando] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    async function carregarInsumos(termo = "") {

        try {

            const url = termo ? `/insumos?busca=${termo}` : "/insumos";
            const response = await api.get(url);
            setInsumos(response.data);

        } catch {

            message.error("Erro ao carregar os insumos.");

        }

    }

    useEffect(() => { carregarInsumos(); }, []);

    function abrirModal(insumo = null) {

        setInsumoEditando(insumo);
        form.setFieldsValue(insumo || {});
        setModalAberto(true);

    }

    function fecharModal() {

        setModalAberto(false);
        setInsumoEditando(null);
        form.resetFields();

    }

    async function salvar(values) {

        try {

            if (insumoEditando) {

                await api.put(`/insumos/${insumoEditando.id}`, values);
                message.success("Insumo atualizado!");

            } else {

                await api.post("/insumos", values);
                message.success("Insumo cadastrado!");

            }

            fecharModal();
            carregarInsumos();

        } catch {

            message.error("Erro ao salvar insumo.");

        }

    }

    async function deletar(id) {

        try {

            await api.delete(`/insumos/${id}`);
            message.success("Insumo excluído!");
            carregarInsumos();

        } catch {

            message.error("Erro ao excluir insumo.");

        }

    }

    const colunas = [

        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Tipo", dataIndex: "tipo", key: "tipo", align: "center" },
        { title: "Gramatura", dataIndex: "gramatura", key: "gramatura", align: "center" },
        { title: "Unidade", dataIndex: "unidadeMedida", key: "unidadeMedida", align: "center" },
        { title: "Qtd Atual", dataIndex: "qtdAtual", key: "qtdAtual", align: "center" },
        { title: "Qtd Mínima", dataIndex: "qtdMinima", key: "qtdMinima", align: "center" },
        {
            title: "Status", key: "status", align: "center",
            render: (_, r) => r.abaixoDoMinimo
                ? <Tag color="red">Abaixo do mínimo</Tag>
                : <Tag color="green">OK</Tag>,
        },

        {

            title: "Ações", key: "acoes", align: "center",
            render: (_, r) => (

                <Space direction="vertical" size={4}>
                    <Button size="small" onClick={() => abrirModal(r)}>Editar</Button>
                    <Button size="small" danger onClick={() => deletar(r.id)}>Excluir</Button>
                </Space>

            ),

        },

    ];

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

                    <div style={{ width: 32, height: 32, background: "#C75B1A", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>G</span>
                    </div>



                    <Typography.Text style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
                        QualiGráfica Estoque
                    </Typography.Text>

                </div>

                <Button
                    onClick={() => navigate("/dashboard")}
                    style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 6 }}
                >
                    ← Voltar
                </Button>

            </Header>

            <Content style={{ padding: 40, maxWidth: 1100, margin: "0 auto", width: "100%" }}>

                <div style={{ marginBottom: 24 }}>

                    <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1E3A5F", margin: 0 }}>
                        Cadastro de Insumos
                    </h1>

                    <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
                        Gerencie os materiais utilizados na gráfica
                    </p>

                </div>



                <div style={{
                    background: "#fff",
                    border: "1px solid #e8e8e8",
                    borderRadius: 12,
                    padding: 24,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                }}>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                        <Input.Search
                            placeholder="Buscar por nome..."
                            allowClear
                            style={{ width: 300, borderRadius: 8 }}
                            onSearch={(val) => carregarInsumos(val)}
                            onChange={(e) => { if (!e.target.value) carregarInsumos(); }}
                        />

                        <Button
                            type="primary"
                            onClick={() => abrirModal()}
                            style={{ background: "#1E3A5F", border: "none", borderRadius: 8 }}
                        >

                            + Novo Insumo

                        </Button>

                    </div>



                    <Table
                        dataSource={insumos}
                        columns={colunas}
                        rowKey="id"
                        size="middle"
                        pagination={{ pageSize: 10 }}
                    />

                </div>



            </Content>



            <Modal
                title={insumoEditando ? "Editar Insumo" : "Novo Insumo"}
                open={modalAberto}
                onCancel={fecharModal}
                onOk={() => form.submit()}
                okText="Salvar"
                cancelText="Cancelar"
                okButtonProps={{ style: { background: "#1E3A5F", border: "none" } }}
            >

                <Form form={form} layout="vertical" onFinish={salvar}>

                    <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>



                    <Form.Item label="Tipo" name="tipo" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>



                    <Form.Item label="Gramatura" name="gramatura">
                        <Input />
                    </Form.Item>



                    <Form.Item label="Unidade de Medida" name="unidadeMedida" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>



                    <Form.Item label="Quantidade Atual" name="qtdAtual" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>



                    <Form.Item label="Quantidade Mínima" name="qtdMinima" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>

                </Form>

            </Modal>

        </Layout>

    );

}