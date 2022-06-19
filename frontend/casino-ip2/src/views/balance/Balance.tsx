import React, { useEffect, useState } from 'react';
import { Space, Button, Form, Input, Row, Col, message, Tabs } from 'antd';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../config/zustand';
import axios from 'axios';
import { URL_ENDPOINT } from '../../config/env';

function Balance() {

    const { TabPane } = Tabs;
    const navigate = useNavigate();

    var user = useUserStore((state:any) => state.userProps)[0];

    const [errorMessage, setErrorMessage] = React.useState("");
    const [guthaben, setGuthaben] = React.useState<any>(' ');

    const headerGetDev = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    } 
    
    const headerPatchDev = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    async function getBalance() {
        await axios(URL_ENDPOINT + user.username, {
            method: 'GET',
            headers: headerGetDev
        })
        .then(data => setGuthaben(data.data.balance.Amount))
        .catch(error => console.log(error));
    }

    async function handlePayIn(val:any) {
        getBalance();
        setGuthaben(guthaben + val.balance);
        await axios(URL_ENDPOINT + 'balance/amount/' + user.username, {
            method: 'PATCH',
            headers: headerPatchDev,
            data: new URLSearchParams({
                'balance.amount': guthaben
            })
          }).then(val => {
            navigate("/overview");
            message.success("Deposit successful");
          })
          .catch(error => {
            setErrorMessage(`Deposit failed. Please try again later`);
            console.log(error)
          });     
    }

    async function handlePayOff(val:any) {
        getBalance();
        setGuthaben(guthaben - val.balance);
        await axios(URL_ENDPOINT + 'balance/amount/' + user.username, {
            method: 'PATCH',
            headers: headerPatchDev,
            data: new URLSearchParams({
                'balance.amount': guthaben
            })
          }).then(val => {
            navigate("/overview");
            message.success("Deposit successful");
          })
          .catch(error => {
            setErrorMessage(`Deposit failed. Please try again later`);
            console.log(error)
          });     
    }
 
    return (
        <>
            <Popup trigger={<Button type='link' className="button">Balance</Button>} position="right center" modal>
                {(close: any) => (
                    <div className='modal'>
                        <div>
                            <h1>Balance</h1>
                        </div>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Pay in" key="1">
                                <div>
                                    <button className="close" onClick={close}></button>
                                </div>
                                <div data-testid="balance-text"> Here you can deposit money to your account </div>
                                
                                <Form 
                                    name="basic"
                                    labelCol={{ span: 8}}
                                    wrapperCol={{ span: 10 }}
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                    onFinish={handlePayIn}
                                >
                                    <Form.Item
                                        label="First Name"
                                        name="FirstName"
                                        data-testid="deposit-first"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input your First Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="LastName"
                                        data-testid="deposit-last"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input your Last Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Creditcard-Number"
                                        name="creditcardNumber"
                                        data-testid="deposit-number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input your credit-card number!',
                                            },
                                        ]}
                                    >
                                        <Input minLength={16} maxLength={16} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Deposit"
                                        name="Deposit"
                                        data-testid="deposit-deposit"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input the deposit!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Row>
                                        <Col span={12} offset={6}>
                                            <Form.Item>
                                                <Button 
                                                    data-testid="balance-button" type="primary" htmlType="submit"                       
                                                >Deposit</Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </TabPane>
                            <TabPane tab="Pay off" key="2" data-testid="tab-pay-off">
                                <div>
                                    <button className="close" onClick={close}></button>
                                </div>
                                <div data-testid="balance-text-off"> Here you can pay off money from your account </div>
                                
                                <Form 
                                    name="basic"
                                    labelCol={{ span: 8}}
                                    wrapperCol={{ span: 10 }}
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                    onFinish={handlePayOff}
                                >
                                    <Form.Item
                                        label="First Name"
                                        name="FirstName"
                                        data-testid="deposit-first-off"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input your First Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="LastName"
                                        data-testid="deposit-last-off"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input your Last Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Creditcard-Number"
                                        name="creditcardNumber"
                                        data-testid="deposit-number-off"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input your credit-card number!',
                                            },
                                        ]}
                                    >
                                        <Input minLength={16} maxLength={16} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Pay off"
                                        name="Deposit"
                                        data-testid="deposit-deposit-off"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input the deposit!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Row>
                                        <Col span={12} offset={6}>
                                            <Form.Item>
                                                <Button 
                                                    data-testid="balance-button-off" type="primary" htmlType="submit"                       
                                                >Pay off</Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </div>
                )}
            </Popup>
        </>
    );
}

export default Balance;