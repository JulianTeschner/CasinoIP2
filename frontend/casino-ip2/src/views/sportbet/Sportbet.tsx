import React, { useEffect, useRef } from 'react';
import { Space, Button, Form, Row, Col, Input, message, Image } from 'antd';
import axios from 'axios';
import './style/Sportbet.css';
import { URL_ENDPOINT } from '../../config/env';
import { useUserStore } from '../../config/zustand';
import Title from 'antd/lib/typography/Title';

const headerGetDev = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
} 

const headerGet = {
  'Content-Type': 'application/json'
}

const headerPatchDev = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/x-www-form-urlencoded'
}

const headerPatch = {
  'Content-Type': 'application/x-www-form-urlencoded'
} 

function Sportbet() {
    
    // test
    //const [user, setUser] = React.useState<any>({"username": "fish123", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVsM3NGclRrWExXMENseVV3NmFyZSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jN2ZiYnl0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jYXNpbm8tYXBpLyIsImlhdCI6MTY1MTc3NjI4MCwiZXhwIjoxNjUxODYyNjgwLCJhenAiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.Oau7zdJbfXkdV5kQdNY74tGaSmYI8PLucOlDFm3GA1ycvFFXhfHt8vuupgBOCI2DJk6eB4Qu2JOZPBHSnu0A8V_ZCGf20hx9QbGAgWiKi8ULdAUF_6e9mAmXyc2lmeLdZTD5O0lJKAi3lJtRMXdcpRET8UnECLILWa-NS8vzETE5Suozg9SFq7m2hXJZ2W-Uv8pjJkUq2gO1W_unMT8kXOUBoXm-uioCuMlZXX0muhqZC9oKgI1e6eb9DkQsyUhGzHAq-ajGKilVj021uXajMj2h3EFnITTk5_pljuxPhPBW8Y52LqKx7NtwzSUjQV70fWJdyfoFm5LQB6ZR_qFxgQ"});   
    var user = useUserStore((state:any) => state.userProps)[0];
    
    const [guthaben, setGuthaben] = React.useState<any>(' ');
    const [status, setStatus] = React.useState<any>('');
    const einsatz = useRef(0);
    
    const clubs = ["Arizona Cardinals", "Atlanta Falcons", "Carolina Panthers", "Chicago Bears", "Dallas Cowboys", "Detroit Lions", "Green Bay Packers", "Los Angeles Rams", "Minnesota Vikings", "New Orleans Saints", "New York Giants", "Philadelphia Eagles", "San Francisco 49ers", "Seattle Seahawks", "Tampa Bay Buccaneers", "Washington Commanders"];
    var home = '';
    var away = '';

    async function getBalance() {
        await axios(URL_ENDPOINT + user.username, {
            method: 'GET',
            headers: process.env.NODE_ENV === 'development' ? headerGetDev : headerGet
        })
        .then(data => setGuthaben(data.data.balance.Amount))
        .catch(error => console.log(error));
    }

    async function patchBalance(val:any) {
        await axios(URL_ENDPOINT + 'balance/amount/' + user.username, {
            method: 'PATCH',
            headers: process.env.NODE_ENV === 'development' ? headerPatchDev : headerPatch,
            data: new URLSearchParams({
                'balance.amount': val
            })
        }).then(data => console.log(data.data))
        .catch(error => console.log(error));
    }

    function randGame():any {
        var randHome = Math.round(Math.random() * (clubs.length));
        var randAway = Math.round(Math.random() * (clubs.length));
        while(randHome == randAway){
            randAway = Math.round(Math.random() * (clubs.length));
        }
        home = clubs[randHome];
        away = clubs[randAway];
        return clubs[randHome];
    }

    function handleSubmit(val: any) {

        var homePointsRandom = Math.round(Math.random() * 60);
        var awayPointsRandom = Math.round(Math.random() * 60);

        var homePoints = val.Home;
        var awayPoints = val.Away;
        var betval = val.Amount;

        if(betval <= guthaben && betval >= 1) {
            console.log('Einsatz gesetzt:', betval);
            einsatz.current = betval;
            if((homePointsRandom > awayPointsRandom && homePoints > awayPoints)
                || (homePointsRandom < awayPointsRandom && homePoints < awayPoints)
                || (homePointsRandom == awayPointsRandom && homePoints == awayPoints)) {
                setStatus("you have the right trend! you win!");
                message.success(`${homePointsRandom} : ${awayPointsRandom}\n You win!`);
                setGuthaben(guthaben + betval * 1.5);
                patchBalance(guthaben + betval * 1.5);
            } else {
                message.info(`${homePointsRandom} : ${awayPointsRandom}\n You lose!`);
                setGuthaben(guthaben - betval);
                patchBalance(guthaben - betval);
            }
        } else if(betval === 0) {
            message.info(`You have to set a positive amount`);
            console.log('Einsatz ist null');
        } else if(betval > guthaben) {
            message.info(`Your amount is higher then your deposit`);
            console.log('Einsatz nicht gesetzt\nEinsatz ist höher als vorhandenes Guthaben:', betval);
        }
        
    }


    useEffect(() => {
        getBalance();
    }, []);

    return (
            <div className='sportbet'>
                <div>
                    <Row>
                        <Col span={12} offset={6}>
                            <Title data-testid="sportbet-h1">
                                Sportbet
                            </Title>
                            <div data-testid='balance' className='pt-15'><b>balance: {guthaben}</b></div>

                            <Form name="basic"
                                    className='pt-15'
                                    layout='vertical'
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                    data-testid='bet-form' 
                                    onFinish={handleSubmit}>
                                        <Form.Item 
                                            label="Min. bet amount 1 Credit"
                                            name="Amount"
                                            data-testid="sport-amount"
                                            rules={[
                                                {
                                                required: true,                                        
                                            },
                                            ]}>
                                            <Input type="number" data-testid="type-amount"/>
                                        </Form.Item>
                                        <label style={{display: 'none'}}>{randGame()}</label>
                                        <Row>
                                            <Col span={12}>
                                                <img src={require(`./images/${home}.png`)} className="sportbet-image" />
                                                <Form.Item 
                                                    className='sportbet-txt'
                                                    label={home}
                                                    name="Home"
                                                    data-testid="sport-home"
                                                    rules={[
                                                        {
                                                        required: true,
                                                        },
                                                ]}>
                                                                                    
                                                    <Input data-testid="type-home"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12} >
                                                <img src={require(`./images/${away}.png`)} className="sportbet-image" />
                                                <Form.Item
                                                    className='sportbet-txt'
                                                    label={away}
                                                    name="Away"
                                                    data-testid="sport-away"
                                                    rules={[
                                                        {
                                                        required: true,
                                                        },
                                                    ]}>
                                                    
                                                    <Input data-testid="type-away" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        
                                        
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button data-testid='play' type="primary" htmlType='submit'>bet and go</Button>
                                    </Form.Item>
                                </Form>
                        </Col>
                    </Row>                      
                </div>
            </div>

    )
}

export default Sportbet;