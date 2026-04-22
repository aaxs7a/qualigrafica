import { useEffect, useState } from 'react';
import {Table, Button, Input, Modal, InputNumber, Space, Tag, message, Form} from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function Insumos() {

    const [ insumos, setInsumos ] = useState([]);
    const [ busca, setBusca ] = useState( '' )
    const [ modalAberto, setModalAberto ] = useState( false );
    const [ insumoEditando, setInsumoEditando ] = useState( null );
    const [ form ] = Form.useForm();
    const navigate = useNavigate();

    async function carregarInsumos( termo = '' ) {

        try {

            const response = await api.get( `/insumos${ termo ? ` ?busca=${ termo } ` : '' } ` );
            setInsumos( response.data );

        } catch {

            message.error( 'Erro ao carregar os insumos' );

        }

    }

    useEffect(() => { carregarInsumos(); }, []);

    function abrirModal( insumos = null ) {

        setInsumoEditando(insumos);
        form.setFieldsValue( insumos || {});
        setModalAberto( true )

    }

    function fecharModal() {

        setModalAberto( false );
        setInsumoEditando( null );
        form.resetFields();

    }

    async function salvar( values ) {

        try {

            if ( insumoEditando ) {

                await api.put( `/insumos/${ insumoEditando.id }`, values );
                message.success( 'Insumo atualizado!' );

            } else {

                await api.post('/insumos', values);
                message.success( 'Insumo cadastrado!' );

            }

            fecharModal();
            carregarInsumos();

        } catch {

            message.error( 'Erro ao salvar insumo!' )

        }

    }

    async function deletar(id) {

        try {

            await api.delete( `/insumos/${id}` );
            message.success( 'Insumo excluído!' );
            carregarInsumos();

        } catch {

            message.error( 'Erro ao excluir o insumo.' );

        }

    }

    const colunas = [

        { title: 'Nome', dataIndex: 'nome', key: 'nome', align: 'center' },
        { title: 'Tipo', dataIndex: 'tipo', key: 'tipo', align: 'center' },
        { title: 'Gramatura', dataIndex: 'gramatura', key: 'gramatura', align: 'center' },
        { title: 'Unidade', dataIndex: 'unidadeMedida', key: 'unidadeMedida', align: 'center' },
        { title: 'Qtd Atual', dataIndex: 'qtdAtual', key: 'qtdAtual', align: 'center' },
        { title: 'Qtd Mínima', dataIndex: 'qtdMinima', key: 'qtdMinima', align: 'center' },
        {

            title: 'Status', key: 'status', align: 'center',
            render: ( _, record ) => record.abaixoDoMinimo
            ? <Tag color="red">Abaixo do Mínimo</Tag>
            : <Tag color="green">OK</Tag>

        },
        {

            title: 'Ações', key: 'acoes', align: 'center',
            render: ( _, record ) => (

                <Space orientation="vertical">

                    <Button onClick={() => abrirModal(record)}>Editar</Button>

                    <Button danger onClick={() => deletar(record.id)}>Excluir</Button>

                </Space>

            )

        }

    ];

    return (

        <div style={{ padding: 32 }}>

            <Button onClick={() => navigate('/dashboard')} style={{ marginBottom: 16 }}>
                ← Voltar
            </Button>

            <h2>Cadastro de Insumos</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search

                    placeholder="Buscar Insumo..."
                    onSearch={(val) => { setBusca(val); carregarInsumos(val); }}
                    allowClear
                    onChange={(e) => { if ( !e.target.value ) carregarInsumos(); }}

                />

                <Button type="primary" onClick={() => abrirModal()}>
                    + Novo Insumo
                </Button>

            </Space>

            <Table dataSource={ insumos } columns={ colunas } rowKey="id" />

            <Modal

                title={ insumoEditando ? 'Editar Insumo' : 'Novo Insumo' }
                open={ modalAberto }
                onCancel={ fecharModal }
                onOk={() => form.submit()}
                okText="Salvar"
                cancelText="Cancelar"

            >
                <Form form={ form } layout="vertical" onFinish={ salvar }>

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

                        <Input />

                    </Form.Item>

                    <Form.Item label="Quantidade Mínima" name="qtdMinima" rules={[{ required: true }]}>

                        <InputNumber min={0} style={{ width: '100%' }} />

                    </Form.Item>

                </Form>

            </Modal>

        </div>

    );

}