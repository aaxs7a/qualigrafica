import { useEffect, useState } from "react";
import { Table, Button, Select, Form, InputNumber, DatePicker, message, Alert, Layout, Typography, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import dayjs from "dayjs";

const { Header, Content } = Layout;

export default function Movimentacoes() {

    const [insumos, setInsumos] = useState([]);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [insumoSelecionado, setInsumoSelecionado] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    async function carregarInsumos() {

        try {

            const response = await api.get("/insumos");
            setInsumos(response.data.sort((a, b) => a.nome.localeCompare(b.nome)));

        } catch {

            message.error("Erro ao carregar insumos.");

        }

    }

    async function carregarMovimentacoes(insumoId) {

        try {

            const response = await api.get(`/movimentacoes/insumo/${insumoId}`);
            setMovimentacoes(response.data);

        } catch {

            message.error("Erro ao carregar movimentações.");

        }

    }

    async function registrar(values) {

        try {

            await api.post("/movimentacoes", {
                insumo: { id: values.insumoId },
                tipo: values.tipo,
                quantidade: values.quantidade,
                dataMovimentacao: values.data.format("YYYY-MM-DD"),
            });
            message.success("Movimentação registrada!");
            form.resetFields();
            carregarInsumos();
            carregarMovimentacoes(values.insumoId);

        } catch (error) {

            message.error(error.response?.data?.message || "Erro ao registrar movimentação.");

        }

    }

    useEffect(() => { carregarInsumos(); }, []);

    const insumoAtual = insumos.find((i) => i.id === insumoSelecionado);

    const colunas = [

        {
            title: "Tipo", dataIndex: "tipo", key: "tipo", align: "center",
            render: (tipo) => (

                <Tag
                    style={{
                        background: tipo === "ENTRADA" ? "rgba(0,255,194,0.1)" : "rgba(239,87,119,0.1)",
                        border: `1px solid ${tipo === "ENTRADA" ? "#00FFC2" : "#EF5777"}`,
                        color: tipo === "ENTRADA" ? "#00FFC2" : "#EF5777",
                        borderRadius: 6,
                    }}
                >

                    {tipo}
                </Tag>
            ),
        },
        { title: "Quantidade", dataIndex: "quantidade", key: "quantidade", align: "center" },
        { title: "Data", dataIndex: "dataMovimentacao", key: "dataMovimentacao", align: "center" },
    ];

    const selectStyle = { background: "#1A1D21", color: "#ECECEC" };
    const labelStyle = { color: "#ECECEC" };

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

            <Content style={{ padding: "24px 16px", maxWidth: 900, margin: "0 auto", width: "100%" }}>
                <div style={{ marginBottom: 20 }}>

                    <h1 style={{ fontSize: 22, fontWeight: 700, color: "#ECECEC", margin: 0 }}>
                        Movimentações de Estoque
                    </h1>


                    <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
                        Registre entradas e saídas de materiais
                    </p>

                </div>

                {insumoAtual?.abaixoDoMinimo && (

                    <Alert
                        message={`Atenção: ${insumoAtual.nome} está abaixo do estoque mínimo!`}
                        type="error"
                        showIcon
                        style={{ marginBottom: 20, borderRadius: 8, background: "rgba(239,87,119,0.1)", border: "1px solid rgba(239,87,119,0.4)", color: "#EF5777" }}
                    />

                )}


                <div style={{ background: "#2C3035", border: "1px solid rgba(0,255,194,0.08)", borderRadius: 12, padding: "24px 20px", marginBottom: 20 }}>
                    <Form form={form} layout="vertical" onFinish={registrar}>

                        <Form.Item label={<span style={labelStyle}>Insumo</span>} name="insumoId" rules={[{ required: true }]}>


                            <Select
                                placeholder="Selecione um insumo"
                                showSearch
                                optionFilterProp="label"
                                onChange={(val) => { setInsumoSelecionado(val); carregarMovimentacoes(val); }}
                                options={insumos.map((i) => ({ label: i.nome, value: i.id }))}
                                style={selectStyle}
                            />


                        </Form.Item>


                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                            <Form.Item label={<span style={labelStyle}>Tipo</span>} name="tipo" rules={[{ required: true }]}>


                                <Select
                                    options={[
                                        { label: "Entrada", value: "ENTRADA" },
                                        { label: "Saída", value: "SAIDA" },
                                    ]}
                                    style={selectStyle}
                                />
                            </Form.Item>


                            <Form.Item label={<span style={labelStyle}>Quantidade</span>} name="quantidade" rules={[{ required: true }]}>
                                <InputNumber min={1} style={{ width: "100%", background: "#1A1D21", border: "1px solid rgba(0,255,194,0.2)", color: "#ECECEC", borderRadius: 8 }} />
                            </Form.Item>

                        </div>

                        <Form.Item label={<span style={labelStyle}>Data</span>} name="data" rules={[{ required: true }]}>
                            <DatePicker style={{ width: "100%", background: "#1A1D21", border: "1px solid rgba(0,255,194,0.2)", color: "#ECECEC", borderRadius: 8 }} defaultValue={dayjs()} />
                        </Form.Item>


                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ background: "#00FFC2", border: "none", borderRadius: 8, color: "#1A1D21", fontWeight: 600 }}
                            >
                                Registrar Movimentação
                            </Button>

                        </Form.Item>

                    </Form>

                </div>

                {movimentacoes.length > 0 && (

                    <div style={{ background: "#2C3035", border: "1px solid rgba(0,255,194,0.08)", borderRadius: 12, padding: "20px 16px" }}>

                        <h3 style={{ margin: "0 0 16px", color: "#ECECEC", fontWeight: 600 }}>
                            Histórico de Movimentações
                        </h3>

                        <Table
                            dataSource={movimentacoes}
                            columns={colunas}
                            rowKey="id"
                            size="middle"
                            pagination={{ pageSize: 8 }}
                        />
                    </div>
                )}

            </Content>

        </Layout>

    );

}