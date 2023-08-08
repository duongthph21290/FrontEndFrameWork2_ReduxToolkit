import { useAddProductMutation } from '@/api/product';
import { pause } from '@/utils/pause';
import { Button, Form, Input, message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';



type FieldType = {
    name?: string;
    price?: number;
    description?: string;
    image?: string;
};

const AdminAdd = () => {

    // Hook
    const [addProduct, { isLoading: isAddLoading }] = useAddProductMutation();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        addProduct(values).unwrap().then(async () => {
            form.resetFields();
            messageApi.open({
                type: "success",
                content: "Thêm sản phẩm thành công. Chuyển trang sau 3s"
            })
            await pause(3000);
            navigate("/admin/product")
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <header className='mb-4'>
                <h2 className='font-bold text-2xl'>Thêm sản phẩm</h2>
            </header>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên sản phẩm' },
                        { min: 4, message: 'Vui lòng nhập tên sản phẩm ít nhất 4 kí tự' },
                        {
                            validator: (_, value) => {
                                if (value && value.trim() === '') {
                                    return Promise.reject('Tên sản phẩm không được để trống');
                                }
                                // if (value && value.includes(' ')) {
                                //     return Promise.reject('Tên sản phẩm không được chứa dấu cách');
                                // }
                                return Promise.resolve();
                            },
                        }

                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá sản phẩm"
                    name="price"
                    rules={[
                        { required: true, message: 'Vui lòng nhập giá sản phẩm' },
                        {
                            validator: (_, value) => {
                                if (value && value.trim() === '') {
                                    return Promise.reject('Giá sản phẩm không được để trống');
                                }
                                if (value && parseFloat(value) < 0) {
                                    return Promise.reject('Giá sản phẩm không được âm');
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item<FieldType>
                    label="Mô tả sản phẩm"
                    name="description"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả sản phẩm' },
                        { min: 4, message: 'Vui lòng nhập mô tả sản phẩm ít nhất 4 kí tự' },
                        {
                            validator: (_, value) => {
                                if (value && value.trim() === '') {
                                    return Promise.reject('Mô tả sản phẩm không được để trống');
                                }
                                // if (value && value.includes(' ')) {
                                //     return Promise.reject('Tên sản phẩm không được chứa dấu cách');
                                // }
                                return Promise.resolve();
                            },
                        }

                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ảnh sản phẩm"
                    name="image"
                    rules={[
                        { required: true, message: 'Vui lòng nhập ảnh sản phẩm' },
                        {
                            validator: (_, value) => {
                                if (value && value.trim() === '') {
                                    return Promise.reject('Ảnh sản phẩm không được để trống');
                                }
                                // if (value && value.includes(' ')) {
                                //     return Promise.reject('Tên sản phẩm không được chứa dấu cách');
                                // }
                                return Promise.resolve();
                            },
                        }

                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isAddLoading ? (<AiOutlineLoading3Quarters className="animate-spin" />) : ("Thêm sản phẩm")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AdminAdd;