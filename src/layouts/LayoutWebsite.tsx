import { Content, Footer } from 'antd/es/layout/layout';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const LayoutWebsite = () => {

  return (
    <div>
      <Layout>
        <Menu
          mode="horizontal"
          items={[{ label: <Link style={{ textDecorationLine: 'none' }} to={`/`}>Home</Link>, key: 'home' },
          {
            label: <Link style={{ textDecorationLine: 'none' }} to={`/about`}>About Page</Link>,
            key: 'product', children:
              [{ label: <Link style={{ textDecorationLine: 'none' }} to={{}}>Product Detail</Link>, key: 'productdetail' }],
          },
          {
            label: <Link style={{ textDecorationLine: 'none' }} to={`/register`}>Register</Link>,
            key: 'register',
          },
          {
            label: <Link style={{ textDecorationLine: 'none' }} to={`/login`}>Login</Link>,
            key: 'Login',
          }
          ]}
        />
        <Content>
          <Outlet />
        </Content>
        <Footer style={{ height: '60px', backgroundColor: 'black', color: 'white', textAlign: 'center', paddingTop: 20, width: '100%', overflow: 'hidden' }}>
          Trần Hải Dương PH21290 Assignment
        </Footer>
      </Layout>
    </div>
  );
};

export default LayoutWebsite;
