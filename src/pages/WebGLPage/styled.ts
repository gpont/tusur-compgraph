import { Layout as AntLayout, Menu as AntMenu } from 'antd';
import styled from 'styled-components';

export const Layout = styled(AntLayout)`
  min-height: 100vh;
`;

export const Sider = styled(AntLayout.Sider)`
  background: #fff;
`;

export const Menu = styled(AntMenu)`
  border-right: 0;
  height: 100%;
`;
