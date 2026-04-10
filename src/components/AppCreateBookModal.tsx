import { useEffect } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Row,
    Col,
    Upload,
    Space
} from 'antd';
import type { UploadFile } from 'antd';
import type { Dayjs } from 'dayjs';

import type { IBook, TStatus } from '../types/book.type';

interface AppCreateBookModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void | Promise<void>;
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
    coverFileList?: UploadFile[];
}

function AppCreateBookModal({
    open,
    onClose,
    onSubmit,
    submitting = false,
    initialStatus
}: AppCreateBookModalProps) {

    const [form] = Form.useForm<CreateBookFormValues>();

    useEffect(() => {
        if (!open) {
            form.resetFields();
            form.setFieldsValue({ coverFileList: [] });
            return;
        }

        form.setFieldsValue({
            numPagRead: 0,
            status: initialStatus ?? 'Desejado',
        });
    }, [open, form, initialStatus]);

    const handleSubmit = (values: CreateBookFormValues) => {
        const formatted = {
            ...values,
            dtInicial: values.dtInicial?.format("YYYY-MM-DD"),
            dtFinal: values.dtFinal?.format("YYYY-MM-DD"),
        };

        onSubmit(formatted);
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
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                {/* NOME */}
                <Form.Item
                    label="Nome"
                    name="nome"
                    rules={[{ required: true, message: 'Informe o nome do livro.' }]}
                >
                    <Input placeholder="Ex.: O Hobbit" />
                </Form.Item>

                {/* AUTOR + ANO */}
                <Row gutter={12}>
                    <Col span={16}>
                        <Form.Item label="Autor" name="autor">
                            <Input placeholder="Ex.: J.R.R. Tolkien" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Ano" name="ano">
                            <InputNumber style={{ width: '100%' }} min={0} max={9999} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* STATUS + PAGINAS */}
                <Row gutter={12}>
                    <Col span={8}>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { label: 'Lendo', value: 'Lendo' },
                                    { label: 'Lido', value: 'Lido' },
                                    { label: 'Desejado', value: 'Desejado' },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Total de páginas"
                            name="numPag"
                            rules={[{ required: true }]}
                        >
                            <InputNumber style={{ width: '100%' }} min={1} />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Páginas lidas"
                            name="numPagRead"
                            dependencies={["numPag"]}
                            rules={[
                                { required: true },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value <= getFieldValue("numPag")) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Não pode ser maior que o total")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* DATAS (ALINHADAS) */}
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item
                            label="Data inicial"
                            name="dtInicial"
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item shouldUpdate={(prev, curr) => prev.status !== curr.status}>
                            {({ getFieldValue }) => (
                                <Form.Item
                                    label="Data final"
                                    name="dtFinal"
                                >
                                    <DatePicker
                                        disabled={getFieldValue("status") !== "Lido"}
                                        format="DD/MM/YYYY"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                {/* IMAGEM */}
                <Form.Item
                    label="Imagem da capa"
                    name="coverFileList"
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                        Array.isArray(e) ? e : e?.fileList
                    }
                >
                    <Upload
                        beforeUpload={() => false}
                        accept="image/*"
                        maxCount={1}
                        listType="picture"
                    >
                        <Button>Selecionar imagem</Button>
                    </Upload>
                </Form.Item>

                {/* DESCRIÇÃO */}
                <Form.Item label="Descrição" name="text">
                    <Input.TextArea rows={4} />
                </Form.Item>

                {/* BOTÕES */}
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