import { useRegisterMutation } from '@/api/auth';
import { pause } from '@/utils/pause';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: any) => {
        await register({
            name: values.name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }).unwrap().then(async () => {
            form.resetFields();
            messageApi.open({
                type: "success",
                content: "Đăng kí user thành công, Vui lòng chờ sau 3s để đăng nhập!"
            })
            await pause(3000)
            navigate('/login')
        })
    }

    type FieldType = {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{
                        maxWidth: 800,
                        textAlign: "center",
                        marginLeft: 210
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold text-gray-700 " style={{ marginLeft: '230px' }}>Đăng kí user 👤</h2>
                    </div>
                    {contextHolder}
                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Trường tên không được để trống!' },
                        { whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Trường email không được để trống!' },
                        { type: 'email', message: 'Nhập đúng định dạng email!' },
                        { whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Trường mật khẩu không được để trống!' },
                        { min: 6, message: 'Vui lòng nhập tối thiểu 6 kí tự!' },
                        { whitespace: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[{ required: true, message: 'Trường nhập lại mật khẩu không được để trống!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject(
                                        new Error("Nhập lại mật khẩu không khớp")
                                    )
                                }
                            }
                        }),
                        { whitespace: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" danger>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
}
export default Register;