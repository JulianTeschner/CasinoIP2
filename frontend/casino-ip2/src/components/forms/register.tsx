import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import * as React from 'react';
 
function Register() {

  const handleSubmit = (values:any) => {
    
  };
  return (
      <>
        <Row>
      		<Col span={12} offset={6}>
						<Title data-testId="register-h1">
         			Register
      			</Title>
          </Col>
        </Row>
              
        <Form 
            name="basic"
            labelCol={{ span: 8}}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            
            <Form.Item 
              label="First Name"
              name="firstname"
              data-testid="register-firstname"
              rules={[
                { required: true, message: "Please input your first name!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              data-testid="register-lastname"
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',

                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Street" 
              name="street"
              data-testid="register-street"
              rules={[
                {
                  required: true,
                  message: 'Please input your street!',

                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ZIP"
              name="zip"
              data-testid="register-zip"
              rules={[
                {
                  required: true,
                  message: 'Please input your ZIP code!',

                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
              label="City"
              name="city"
              data-testid="register-city"
              rules={[
                {
                  required: true,
                  message: 'Please input your city!',

                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              data-testid="register-state"
              rules={[
                {
                  required: true,
                  message: 'Please input your state!',

                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Day of birth"
              name="dayOfBirth"
              data-testid="register-dayOfBirth"
              rules={[
                {
                  required: true,
                  message: 'Please input your Day of birth!',

                },
              ]}
            >
              <DatePicker/>
            </Form.Item>

            <Form.Item
              label="E-Mail"
              name="email"
              data-testid="register-email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              data-testid="register-password1"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm"
              data-testid="register-password2"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                /*
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
                */
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Row>
      		    <Col span={12} offset={6}>
						    <Form.Item>
                  <Button data-testid="register-btn" type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

      </>
        
  );
}

export default Register;