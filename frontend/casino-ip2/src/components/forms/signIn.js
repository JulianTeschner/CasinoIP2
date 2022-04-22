import { useState } from 'react';
import { Alert, Button, Form, Input, message } from 'antd';
import auth0 from '../../config/auth0';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const locationState = location.state;
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    auth0.client.login(
      {
        realm: "Username-Password-Authentication",
        username: values.username,
        password: values.password,
      },
      (err, authResult) => {
        if(err) {
          setErrorMessage(`SignIn failed: ${err.description}`);
          return;
        }
        message.success("SignIn successful");
        localStorage.setItem("accessToken", authResult.accessToken);

        if(locationState) {
          navigate(locationState.from);
        } else {
          navigate("/");
        }
      }
    );
  };

  return (
    <div className="SignIn">
      <div className="SignIn-Content">
        <h2>Sign In</h2>

        { errorMessage ? (
          <div style={{ marginBottom: "24px" }}>
            <Alert message={errorMessage} type="error" showIcon />
          </div>
        ) : null }
        
          <Form 
            name="basic"
            labelCol={{ span: 8}}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item 
              label="Username"
              name="username"
              data-testid="signIn-username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
              label="Password"
              name="password"
              data-testid="signIn-password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary">
                Register First
              </Button>
            </Form.Item>
          </Form>
        
      </div>
    </div>
  );
  
}

export default SignIn;