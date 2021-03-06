import { useState } from 'react';
import { Alert, Button, Form, Input, message } from 'antd';
import auth0 from '../../config/auth0';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useUserStore } from '../../config/zustand';
import axios from 'axios';
import { URL_ENDPOINT } from '../../config/env';

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const addUser = useUserStore((state:any) => state.addUser);

  var user = useUserStore((state:any) => state.userProps)[0];

  const headerGetDev = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
  } 

  const handleSubmit = (values:any) => {
    auth0.client.login(
      {
        realm: "Username-Password-Authentication",
        username: values.username,
        password: values.password,
      },
      (err:any, authResult:any) => {
        if (err) {
          setErrorMessage(`Login failed: ${err.description}`);
          return;
        }
        message.success("Login successful");
        localStorage.setItem("accessToken", authResult.accessToken);

        var idToken:any = authResult.idToken;
        var decodedIdToken:any = jwtDecode(idToken);

        localStorage.setItem('username', decodedIdToken.nickname);
        
        addUser(decodedIdToken.email, decodedIdToken.nickname);
        
        navigate("/overview");
      }
    );
  };

  return (
    <>
        <h2>Login</h2>

        {errorMessage ? (
          <div style={{ marginBottom: "24px" }}>
            <Alert message={errorMessage} type="error" showIcon />
          </div>
        ) : null}
        
          <Form 
            name="basic"
            labelCol={{ span: 8}}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item 
              label="Email"
              name="username"
              data-testid="signIn-email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input data-testid="type-mail"/>
            </Form.Item>

            <Form.Item 
              label="Password"
              name="password"
              data-testid="signIn-password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password data-testid="type-pwd"/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button>
                <Link to="/public/register">
                  Register First
                </Link>
              </Button>
            </Form.Item>
          </Form>
    </>
  );
  
}