import { Row } from 'antd';
import { Link } from 'react-router-dom';
import { RouteName } from '../../routes/routesnames';

export default function Footer() {
    const currentDate = new Date();

    return (
        <Row justify="center">
            <Link to={`${RouteName.ABOUTUS}`}>
                <small>Internetprogrammierung Sommersemester 2022</small>
            </Link>
        </Row>
    )
}