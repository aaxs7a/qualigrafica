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
        { title: "Tipo", dataIndex: "tipo", key: "tipo", align: "center", responsive: ["md"] },
        { title: "Gramatura", dataIndex: "gramatura", key: "gramatura", align: "center", responsive: ["lg"] },
        { title: "Unidade", dataIndex: "unidadeMedida", key: "unidadeMedida", align: "center", responsive: ["md"] },
        { title: "Qtd Atual", dataIndex: "qtdAtual", key: "qtdAtual", align: "center" },
        { title: "Qtd Mínima", dataIndex: "qtdMinima", key: "qtdMinima", align: "center", responsive: ["md"] },
        {
            title: "Status", key: "status", align: "center",
            render: (_, r) => r.abaixoDoMinimo
                ? <Tag color="#EF5777" style={{ color: "#fff" }}>Abaixo do mínimo</Tag>
                : <Tag color="#00FFC2" style={{ color: "#1A1D21" }}>OK</Tag>,
        },
        {

            title: "Ações", key: "acoes", align: "center",
            render: (_, r) => (

                <Space direction="vertical" size={4}>
                    <Button
                        size="small"
                        onClick={() => abrirModal(r)}
                        style={{ background: "transparent", border: "1px solid rgba(0,255,194,0.4)", color: "#00FFC2", borderRadius: 6 }}
                    >
                        Editar
                    </Button>

                    <Button
                        size="small"
                        onClick={() => deletar(r.id)}
                        style={{ background: "transparent", border: "1px solid rgba(239,87,119,0.4)", color: "#EF5777", borderRadius: 6 }}
                    >
                        Excluir
                    </Button>

                </Space>

            ),

        },

    ];

    const inputStyle = {
        background: "#1A1D21",
        border: "1px solid rgba(0,255,194,0.2)",
        color: "#ECECEC",
        borderRadius: 8,
    };

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

                <Button
                    onClick={() => navigate("/dashboard")}
                    style={{ background: "transparent", border: "1px solid rgba(0,255,194,0.3)", color: "#00FFC2", borderRadius: 6 }}
                >
                    ← Voltar
                </Button>

            </Header>

            <Content style={{ padding: "24px 16px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
                <div style={{ marginBottom: 20 }}>

                    <h1 style={{ fontSize: 22, fontWeight: 700, color: "#ECECEC", margin: 0 }}>
                        Cadastro de Insumos
                    </h1>



                    <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
                        Gerencie os materiais utilizados na gráfica
                    </p>

                </div>

                <div style={{
                    background: "#2C3035",
                    border: "1px solid rgba(0,255,194,0.08)",
                    borderRadius: 12,
                    padding: "20px 16px",
                }}>

                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 20,
                    }}>

                        <Input.Search
                            placeholder="Buscar por nome..."
                            allowClear
                            style={{ width: "100%", maxWidth: 300 }}
                            styles={{ input: { background: "#1A1D21", color: "#ECECEC" } }}
                            onSearch={(val) => carregarInsumos(val)}
                            onChange={(e) => { if (!e.target.value) carregarInsumos(); }}
                        />

                        <Button
                            type="primary"
                            onClick={() => abrirModal()}
                            style={{ background: "#00FFC2", border: "none", borderRadius: 8, color: "#1A1D21", fontWeight: 600 }}
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
                        style={{ color: "#ECECEC" }}
                    />

                </div>
            </Content>

            <Modal
                title={<span style={{ color: "#ECECEC" }}>{insumoEditando ? "Editar Insumo" : "Novo Insumo"}</span>}
                open={modalAberto}
                onCancel={fecharModal}
                onOk={() => form.submit()}
                okText="Salvar"
                cancelText="Cancelar"
                styles={{ content: { background: "#2C3035" }, header: { background: "#2C3035" }, footer: { background: "#2C3035" } }}
                okButtonProps={{ style: { background: "#00FFC2", border: "none", color: "#1A1D21", fontWeight: 600 } }}
                cancelButtonProps={{ style: { background: "transparent", border: "1px solid #444", color: "#ECECEC" } }}
            >

                <Form form={form} layout="vertical" onFinish={salvar}>

                    {[
                        { label: "Nome", name: "nome", required: true },
                        { label: "Tipo", name: "tipo", required: true },
                        { label: "Gramatura", name: "gramatura", required: false },
                        { label: "Unidade de Medida", name: "unidadeMedida", required: true },

                    ].map((f) => (

                        <Form.Item
                            key={f.name}
                            label={<span style={{ color: "#ECECEC" }}>{f.label}</span>}
                            name={f.name}
                            rules={f.required ? [{ required: true }] : []}
                        >
                            <Input style={inputStyle} />

                        </Form.Item>

                    ))}

                    <Form.Item label={<span style={{ color: "#ECECEC" }}>Quantidade Atual</span>} name="qtdAtual" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: "100%", ...inputStyle }} />
                    </Form.Item>



                    <Form.Item label={<span style={{ color: "#ECECEC" }}>Quantidade Mínima</span>} name="qtdMinima" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: "100%", ...inputStyle }} />
                    </Form.Item>

                </Form>

            </Modal>

        </Layout>

    );

}