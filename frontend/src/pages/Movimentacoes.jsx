import { useEffect, useState } from "react";
import {Table, Button, Select, Form, InputNumber, DatePicker, Space, message, Alert} from "antd";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import dayjs from 'dayjs';

export default function Movimentacoes() {

    const [ insumos, setInsumos ] = useState([]);
    const [ movimentacoes, setMovimentacoes ] = useState([]);
    const [ insumoSelecionado, setInsumoSelecionado ] = useState(null);
    const [ form ] = Form.useForm();
    const navigate = useNavigate();

    async function carregarInsumos() {

        try {

            const response = await api.get('/insumos');
            const sorted = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
            setInsumos(sorted);

        } catch {

            message.error('Erro ao carregar insumos.');

        }

    }

    async function carregarMovimentacoes(insumoId) {

        try {

            const response = await api.get(`/movimentacoes/insumo/${insumoId}`);
            setMovimentacoes(response.data);

        } catch {

            message.erro('Erro ao carregar movimentações.');

        }

    }

    async function registrar(values) {

        try {

            await api.post('/movimentacoes', {

                insumo: { id: values.insumoId },
                tipo: values.tipo,
                quantidade: values.quantidade,
                dataMovimentacao: values.data.format('YYYY-MM-DD'),

            });

            message.success('Movimentação registrada!');
            form.resetFields();
            carregarInsumos();
            carregarMovimentacoes(values.insumoId);

        } catch (error) {

            message.error(error.response?.data?.message || 'Erro ao registrar a movimentação');

        }

    }

    useEffect(() => { carregarInsumos() }, []);

    const colunas = [

        { title: 'Tipo', dataIndex: 'tipo', key: 'tipo', align: 'center' },
        { title: 'Quantidade', dataIndex: 'quantidade', key: 'quantidade', align: 'center' },
        { title: 'Data', dataIndex: 'dataMovimentacao', key: 'dataMovimentacao', align: 'center' },

    ];

    const insumoAtual = insumos.find(i => i.id === insumoSelecionado);
    
    return (

        <div style={{ padding: 32 }}>

            <Button onClick={() => navigate('/dashboard')} style={{ marginBottom: 16 }}>

                ← Voltar

            </Button>

            <h2>Movimentações de Estoque</h2>

            { insumoAtual?.abaixoDoMinimo && (

                <Alert

                    title={`Atenção: ${ insumoAtual.nome } está abaixo do estoque mínimo!`}
                    type="error"
                    showIcon
                    style={{ marginBottom: 16 }}

                />

            )}

            <Form form={ form } layout="vertical" onFinish={ registrar }>
                <Form.Item label="Insumo" name="insumoId" rules={[{ required: true }]}>
                    <Select

                        placeholder="Selecione um insumo"
                        onChange={(val) => {

                            setInsumoSelecionado(val);
                            carregarMovimentacoes(val);

                        }}

                        options={ insumos.map( i => ({ label: i.nome, value: i.id }))}

                    />

                </Form.Item>

                <Form.Item label="Tipo" name="tipo" rules={[{ required: true }]}>

                    <Select options={[

                        { label: 'Entrada', value: 'ENTRADA' },
                        { label: 'Saída', value: 'SAIDA' },

                    ]} />

                </Form.Item>

                <Form.Item label="Quantidade" name="quantidade" rules={[{ required: true }]}>

                    <InputNumber min={1} style={{ width: '100%' }} />

                </Form.Item>

                <Form.Item label="Data" name="data" rules={[{ required: true }]}>

                    <DatePicker style={{ width: '100%' }} defaultValue={ dayjs() } />

                </Form.Item>

                <Form.Item>

                    <Button type="primary" htmlType="submit">

                        Registrar Movimentação

                    </Button>

                </Form.Item>

            </Form>

            { movimentacoes.length > 0 && (

                <>

                    <h3>Histórico de Movimentatções</h3>
                    <Table dataSource={ movimentacoes } columns={ colunas } rowKey="id" />

                </>

            ) }

        </div>

    );

}