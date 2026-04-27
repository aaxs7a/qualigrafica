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
            render: (tipo) => <Tag color={tipo === "ENTRADA" ? "green" : "red"}>{tipo}</Tag>,
        },
        { title: "Quantidade", dataIndex: "quantidade", key: "quantidade", align: "center" },
        { title: "Data", dataIndex: "dataMovimentacao", key: "dataMovimentacao", align: "center" },
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

            <Content style={{ padding: 40, maxWidth: 900, margin: "0 auto", width: "100%" }}>

                <div style={{ marginBottom: 24 }}>

                    <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1E3A5F", margin: 0 }}>
                        Movimentações de Estoque
                    </h1>

                    <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
                        Registre entradas e saídas de materiais
                    </p>

                </div>

                {insumoAtual?.abaixoDoMinimo && (

                    <Alert
                        message={`Atenção: ${insumoAtual.nome} está abaixo do estoque mínimo!`}
                        type="error"
                        showIcon
                        style={{ marginBottom: 20, borderRadius: 8 }}
                    />

                )}

                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 28, boxShadow: "0 1px 6px rgba(0,0,0,0.04)", marginBottom: 24 }}>

                    <Form form={form} layout="vertical" onFinish={registrar} requiredMark={false}>

                        <Form.Item label="Insumo" name="insumoId" rules={[{ required: true }]}>

                            <Select
                                placeholder="Selecione um insumo"
                                showSearch
                                optionFilterProp="label"
                                onChange={(val) => { setInsumoSelecionado(val); carregarMovimentacoes(val); }}
                                options={insumos.map((i) => ({ label: i.nome, value: i.id }))}
                            />

                        </Form.Item>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>


                            <Form.Item label="Tipo" name="tipo" rules={[{ required: true }]}>

                                <Select options={[
                                    { label: "Entrada", value: "ENTRADA" },
                                    { label: "Saída", value: "SAIDA" },
                                ]} />

                            </Form.Item>


                            <Form.Item label="Quantidade" name="quantidade" rules={[{ required: true }]}>

                                <InputNumber min={1} style={{ width: "100%" }} />

                            </Form.Item>


                        </div>



                        <Form.Item label="Data" name="data" rules={[{ required: true }]}>

                            <DatePicker style={{ width: "100%" }} defaultValue={dayjs()} />

                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>

                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ background: "#1E3A5F", border: "none", borderRadius: 8 }}
                            >
                                Registrar Movimentação

                            </Button>

                        </Form.Item>

                    </Form>

                </div>



                {movimentacoes.length > 0 && (

                    <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>

                        <h3 style={{ margin: "0 0 16px", color: "#1E3A5F", fontWeight: 600 }}>
                            Histórico de Movimentações
                        </h3>

                        <Table dataSource={movimentacoes} columns={colunas} rowKey="id" size="middle" pagination={{ pageSize: 8 }} />

                    </div>

                )}

            </Content>

        </Layout>

    );

}