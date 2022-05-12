import { Row, Switch } from 'antd';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Link } from 'react-router-dom';
import { RouteName } from '../../routes/routesnames';

export default function Footer() {
    const [isDarkMode, setIsDarkMode] = React.useState();
    const { switcher, status, themes } = useThemeSwitcher();

    const toggleTheme = (isChecked:any) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark: themes.light });
    };

    if (status === "loading"){
        return null;
    }

    return (
        <Row justify="center">
            <Link to={`${RouteName.ABOUTUS}`}>
                <small>Internetprogrammierung Sommersemester 2022</small>
            </Link>
            <Switch style={{position: 'absolute', right: '20px'}} checked={isDarkMode} onChange={toggleTheme} />
        </Row>

    )
}