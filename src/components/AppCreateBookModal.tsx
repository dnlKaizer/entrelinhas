import { useEffect, useRef, useState } from 'react';
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
    Space,
    Tooltip,
    Typography
} from 'antd';
import { CameraOutlined, CloseCircleOutlined, PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { Dayjs } from 'dayjs';
import type { ChangeEvent } from 'react';

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
    const cameraInputRef = useRef<HTMLInputElement | null>(null);
    const [coverFileList, setCoverFileList] = useState<UploadFile[]>([]);

    const syncCoverFileList = (nextFileList: UploadFile[]) => {
        const normalizedFileList = nextFileList.slice(-1);
        setCoverFileList(normalizedFileList);
        form.setFieldsValue({ coverFileList: normalizedFileList });
    };

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setCoverFileList([]);
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
            coverFileList,
        };

        onSubmit(formatted);
    };

    const mapFileToUploadList = (file: File): UploadFile[] => {
        const rcFile = Object.assign(file, { uid: `camera-${Date.now()}` }) as RcFile;

        const uploadFile: UploadFile & { source?: 'camera' } = {
            uid: rcFile.uid,
            name: rcFile.name || `foto-capa-${Date.now()}.jpg`,
            status: 'done',
            originFileObj: rcFile,
            thumbUrl: URL.createObjectURL(file),
            source: 'camera',
        };

        return [uploadFile];
    };

    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
        syncCoverFileList(fileList);
    };

    const handleCapturePhotoClick = () => {
        cameraInputRef.current?.click();
    };

    const handleCameraFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            return;
        }


        syncCoverFileList(mapFileToUploadList(selectedFile));

        // Permite selecionar a mesma imagem novamente em uma nova tentativa.
        event.target.value = '';
    };

    const currentCover = coverFileList[0];
    const currentCoverPreviewUrl = currentCover?.thumbUrl ?? currentCover?.url;

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
                >
                    <div>
                        <Space>
                            <Upload
                                beforeUpload={() => false}
                                accept="image/*"
                                maxCount={1}
                                listType="picture"
                                fileList={coverFileList}
                                onChange={handleUploadChange}
                                showUploadList={false}
                            >
                                <Tooltip title="Selecionar imagem">
                                    <Button
                                        shape="circle"
                                        icon={<UploadOutlined />}
                                        aria-label="Selecionar imagem"
                                    />
                                </Tooltip>
                            </Upload>

                            <Tooltip title="Tirar foto">
                                <Button
                                    shape="circle"
                                    icon={<CameraOutlined />}
                                    onClick={handleCapturePhotoClick}
                                    aria-label="Tirar foto"
                                />
                            </Tooltip>
                        </Space>

                        {currentCover && (
                            <div
                                style={{
                                    alignItems: 'center',
                                    border: '1px solid #f0f0f0',
                                    borderRadius: 8,
                                    display: 'flex',
                                    gap: 8,
                                    marginTop: 10,
                                    maxWidth: '100%',
                                    padding: '6px 10px',
                                }}
                            >
                                {currentCoverPreviewUrl ? (
                                    <img
                                        src={currentCoverPreviewUrl}
                                        alt={currentCover.name}
                                        style={{
                                            borderRadius: 6,
                                            height: 44,
                                            objectFit: 'cover',
                                            width: 32,
                                        }}
                                    />
                                ) : (
                                    <PaperClipOutlined style={{ color: '#595959' }} />
                                )}
                                <Typography.Text
                                    style={{ flex: 1, minWidth: 0 }}
                                    ellipsis={{ tooltip: currentCover.name }}
                                >
                                    {currentCover.name}
                                </Typography.Text>
                                <Tooltip title="Remover imagem">
                                    <Button
                                        aria-label="Remover imagem"
                                        icon={<CloseCircleOutlined />}
                                        size="small"
                                        type="text"
                                        onClick={() => syncCoverFileList([])}
                                    />
                                </Tooltip>
                            </div>
                        )}

                        <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleCameraFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
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