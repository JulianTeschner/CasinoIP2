import { Menu, Row, PageHeader, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RouteName } from '../../routes/routesnames';
import 'reactjs-popup/dist/index.css';
import WinLoss from '../../views/winloss/WinLoss';
import Logout from '../../views/logout/Logout';
import Account from '../../views/account/AccountView';
import Mail from '../../views/mail/MailView';
import Balance from '../../views/balance/Balance';

export default function Header() {
    return(
      <Row>
        <Col span={9}>
          <Link to={`${RouteName.OVERVIEW}`} data-testid="header-link">
            <PageHeader
              title="Casino"
              className="site-page-header"
              avatar={{ src: 'https://findicons.com/files/icons/903/travel/256/casino.png' }}>  
            </PageHeader>
          </Link>
        </Col>
        <Col span={3} offset={12}>
          <Menu mode="horizontal" style={{background: 'transparent'}} data-testid="dropdown-menu">
              <Menu.SubMenu key="SubMenu" icon={<MenuOutlined style={{ fontSize: '24px' }}/>} data-testid="icon">
                <Menu.ItemGroup>
                  <Menu.Item key="Win/Loss">
                    <WinLoss />
                  </Menu.Item>
                  <Menu.Item key="Account">
                    <Account />
                  </Menu.Item>
                  <Menu.Item key="Balance">
                    <Balance />
                  </Menu.Item>
                  <Menu.Item key="Mail Support">
                    <Mail />
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup>
                  <Menu.Item key="Logout">
                    <Logout />
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
            </Menu>
        </Col>           
      </Row>
    )
}