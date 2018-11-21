import { Layout, Menu } from 'antd';
import { SelectParam } from 'antd/lib/menu';
import * as React from 'react';

import { Scene } from '../../components/Scene/component';
import { GlPrimitives } from '../../glUtils/types';
import { capitalize } from '../../utils/string';

import * as Styled from './styled';

interface MenuOption {
  value: string;
  children?: MenuOption[];
}

const menuItems: MenuOption[] = [
  {
    value: 'Lab 1',
  }, {
    value: 'Lab 2',
    children: [{
      value: 'points',
      children: [
        { value: GlPrimitives.GL_POINTS },
      ],
    }, {
      value: 'lines',
      children: [
        { value: GlPrimitives.GL_LINES },
        { value: GlPrimitives.GL_LINE_STRIP },
        { value: GlPrimitives.GL_LINE_LOOP },
      ],
    }, {
      value: 'triangles',
      children: [
        { value: GlPrimitives.GL_TRIANGLES },
        { value: GlPrimitives.GL_TRIANGLE_STRIP },
        { value: GlPrimitives.GL_TRIANGLE_FAN },
      ],
    }, {
      value: 'quads',
      children: [
        { value: GlPrimitives.GL_QUADS },
        { value: GlPrimitives.GL_QUAD_STRIP },
      ],
    }, {
      value: 'Variant 6',
    }],
  },
  {
    value: 'Lab 3',
    children: [{
      value: 'Lab 3 variant 6',
    }],
  },
];

const renderMenuItems = (items: MenuOption[]) =>
  items.map(item =>
    Array.isArray(item.children)
      ? (
        <Menu.SubMenu
          key={item.value}
          title={capitalize(item.value)}
        >
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      )
      : (
        <Menu.Item
          key={item.value}
        >
          {capitalize(item.value)}
        </Menu.Item>
      ),
  );

const WebGLPage = () => {
  const [selectedTask, setSelectedTask] = React.useState(menuItems[0].value);
  const onMenuItemSelect = ({ key }: SelectParam) => setSelectedTask(key);

  return (
    <Styled.Layout>
      <Styled.Sider
        width={240}
      >
        <Styled.Menu
          mode="inline"
          selectedKeys={[selectedTask]}
          onSelect={onMenuItemSelect}
        >
          {renderMenuItems(menuItems)}
        </Styled.Menu>
      </Styled.Sider>
      <Layout.Content>
        <Scene
          task={selectedTask}
        />
      </Layout.Content>
    </Styled.Layout>
  );
};

export default WebGLPage;
