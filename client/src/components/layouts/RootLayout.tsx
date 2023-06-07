import { Link, Outlet, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import {
  RiAddCircleLine,
  RiEyeLine,
  RiMusic2Fill,
  RiPlayList2Fill,
} from 'react-icons/ri';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Toaster } from 'react-hot-toast';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Track Music', 'sub1', <RiMusic2Fill />, [
    getItem(
      <Link to="/track/create"> create </Link>,
      '/track/create"',
      <RiAddCircleLine />,
    ),
    getItem(
      <Link to="/track/views"> views </Link>,
      '/track/views',
      <RiEyeLine />,
    ),
  ]),
  getItem('Playlist', 'sub2', <RiPlayList2Fill />, [
    getItem(
      <Link to="/playlist/create"> create </Link>,
      '/playlist/create',
      <RiAddCircleLine />,
    ),
    getItem(
      <Link to="/playlist/views"> views </Link>,
      '/playlist/views',
      <RiEyeLine />,
    ),
  ]),
];

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            selectedKeys={[location.pathname]}
          />
        </Sider>
        <Layout>
          <Toaster />
          <Content style={{ margin: '16px 32px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default RootLayout;
