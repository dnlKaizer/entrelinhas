
import { useEffect } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Space,
} from 'antd';
import type { Dayjs } from 'dayjs';

import type { IBook, TStatus } from '../types/book.type';

interface AppCreateBookModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: CreateBookFormValues) => void | Promise<void>;
    submitting?: boolean;
    initialStatus?: TStatus;
}

export interface CreateBookFormValues {
    nome: IBook['nome'];
    numPag: IBook['numPag'];
    status: TStatus;
    autor?: IBook['autor'];
    ano?: IBook['ano'];
    text?: IBook['text'];
    dtInicial?: Dayjs;
    dtFinal?: Dayjs;
    numPagRead: IBook['numPagRead'];
    img?: IBook['img'];
}

function AppCreateBookModal({ open, onClose, onSubmit, submitting = false, initialStatus }: AppCreateBookModalProps) {
    const [form] = Form.useForm<CreateBookFormValues>();

    useEffect(() => {
        if (!open) {
            form.resetFields();
            return;
        }

        form.setFieldsValue({
            numPagRead: 0,
            status: initialStatus ?? 'Desejado',
        });
    }, [open, form, initialStatus]);

    const handleSubmit = (values: CreateBookFormValues) => {
        onSubmit(values);
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Cadastrar novo livro"
            width={760}
            footer={null}
            destroyOnHidden
        >
            <Form<CreateBookFormValues>
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Nome"
                    name="nome"
                    rules={[{ required: true, message: 'Informe o nome do livro.' }]}
                >
                    <Input placeholder="Ex.: O Hobbit" />
                </Form.Item>

                <Space style={{ width: '100%' }} size={12} align="start" wrap>
                    <Form.Item
                        label="Autor"
                        name="autor"
                        style={{ flex: 1, minWidth: 220 }}
                    >
                        <Input placeholder="Ex.: J.R.R. Tolkien" />
                    </Form.Item>

                    <Form.Item
                        label="Ano"
                        name="ano"
                        style={{ minWidth: 120 }}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} max={9999} />
                    </Form.Item>
                </Space>

                <Space style={{ width: '100%' }} size={12} align="start" wrap>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Selecione um status.' }]}
                        style={{ minWidth: 160 }}
                    >
                        <Select
                            options={[
                                { label: 'Lendo', value: 'Lendo' },
                                { label: 'Lido', value: 'Lido' },
                                { label: 'Desejado', value: 'Desejado' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Total de páginas"
                        name="numPag"
                        rules={[{ required: true, message: 'Informe o total de páginas.' }]}
                        style={{ minWidth: 170 }}
                    >
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>

                    <Form.Item
                        label="Páginas lidas"
                        name="numPagRead"
                        rules={[{ required: true, message: 'Informe as páginas lidas.' }]}
                        style={{ minWidth: 170 }}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Space>

                <Space style={{ width: '100%' }} size={12} align="start" wrap>
                    <Form.Item
                        label="Data inicial"
                        name="dtInicial"
                        style={{ minWidth: 180 }}
                    >
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Data final"
                        name="dtFinal"
                        style={{ minWidth: 180 }}
                    >
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>
                </Space>

                <Form.Item
                    label="Imagem (URL)"
                    name="img"
                    rules={[{ type: 'url', message: 'Informe uma URL valida.' }]}
                >
                    <Input placeholder="https://..." />
                </Form.Item>

                <Form.Item label="Descrição" name="text">
                    <Input.TextArea rows={4} placeholder="Sinopse, observações etc." />
                </Form.Item>

                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="primary" htmlType="submit" loading={submitting}>
                        Cadastrar
                    </Button>
                </Space>
            </Form>
        </Modal>
    );
}

export default AppCreateBookModal;