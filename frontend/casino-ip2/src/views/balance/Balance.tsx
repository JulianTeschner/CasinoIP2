import React, { useEffect, useState } from 'react';
import { Space, Button, Form, Input, Row, Col, message } from 'antd';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../config/zustand';
import axios from 'axios';
import { URL_ENDPOINT } from '../../config/env';

function Balance() {
    const navigate = useNavigate();

    var user = useUserStore((state:any) => state.userProps)[0];

    const [errorMessage, setErrorMessage] = React.useState("");

    const headerPatchDev = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    const headerPatch = {
      'Content-Type': 'application/x-www-form-urlencoded'
    } 

    async function handleDeposit(val:any) {
        await axios(URL_ENDPOINT + 'balance/amount/' + user.username, {
            method: 'PATCH',
            headers: process.env.NODE_ENV === 'development' ? headerPatchDev : headerPatch,
            data: new URLSearchParams({
                'balance.amount': val.balance
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
                        <div>
                            <button className="close" onClick={close}></button>
                        </div>
                        <div data-testId="balance-text"> Here you can deposit money to your account </div>
                        
                        <Form 
                            name="basic"
                            labelCol={{ span: 8}}
                            wrapperCol={{ span: 10 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            onFinish={handleDeposit}
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
                                            data-testId="balance-button" type="primary" htmlType="submit"                       
                                        >Deposit</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        
                        </Form>
                    </div>
                )}
            </Popup>
        </>
    );
}

export default Balance;