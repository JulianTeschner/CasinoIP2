import { Menu, Row, PageHeader, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RouteName } from '../../routes/routesnames';

export default function Header() {
  const navigate = useNavigate();
    return(
      <Row>
        <Col span={9}>
          <Link to={`${RouteName.OVERVIEW}`}>
            <PageHeader
              title="Casino"
              className="site-page-header"
              avatar={{ src: 'https://findicons.com/files/icons/903/travel/256/casino.png' }}>  
            </PageHeader>
          </Link>
        </Col>
        <Col span={3} offset={12}>
          <Menu mode="horizontal" style={{background: 'transparent'}} data-testId="dropdown-menu">
              <Menu.SubMenu key="SubMenu" icon={<MenuOutlined style={{ fontSize: '24px' }}/>} data-testid="icon">
                <Menu.ItemGroup>
                  <Menu.Item key="Balance">
                    <Link to={`${RouteName.OVERVIEW}`}>
                      Balance
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Account">
                    <Link to={`${RouteName.OVERVIEW}`}>
                      Account
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup>
                  <Menu.Item key="Logout">
                    <Button type="link" 
                      onClick={  async () => {
                        localStorage.removeItem("accessToken");
                        navigate('/public/home');
                        }
                      }>
                      Logout
                    </Button>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
            </Menu>
        </Col>           
      </Row>
    )
}