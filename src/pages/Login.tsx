import { Button, Form, Input } from 'antd';

const Login = () => {


  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 800,
            textAlign: "center",
            marginLeft: 210
          }}
          initialValues={{ remember: true }}
          autoComplete="off"

        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold text-gray-700 " style={{ marginLeft: '230px' }}>Đăng nhập 👤</h2>
          </div>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' },
            { whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' },
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
export default Login;