import * as React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const initialFormData = Object.freeze({
  username: "",
  password: ""
});

function SignIn() {

  const [formData, updateFormData] = React.useState(initialFormData);
  
  function handleChange(e:any) {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  }

  function handleSignInSubmit(e:any) {
    e.preventDefault();
    console.log(formData)
  }

  return (
    <div className="SignIn">
      <div className="SignIn-Content">
        <h2>Sign In</h2>
        
          <Form 
            name="basic"
            labelCol={{ span: 8}}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            autoComplete="off"
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

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              >
              <Checkbox>Remember me</Checkbox>
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