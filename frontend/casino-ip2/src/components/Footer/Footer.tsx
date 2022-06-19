import { Row, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { RouteName } from '../../routes/routesnames';
import { useTheme } from '../../themes/use-theme';

export default function Footer() {
    const [darkMode, setDarkMode] = useTheme();

    return (
        <Row justify="center">
            <Link to={`${RouteName.ABOUTUS}`}>
                <small>Internetprogrammierung Sommersemester 2022</small>
            </Link>
            <Switch style={{position: 'absolute', right: '20px'}} checked={darkMode} onChange={setDarkMode} data-testid="toggle-theme"/>
        </Row>

    )
}