import { Button, Col, DatePicker, Form, Input, message, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_ENDPOINT } from '../../config/env';
import auth0 from '../../config/auth0';

 
function Register() {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState("");

  const headerPostDev = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
  }

  async function auth0Submit(val:any){
    auth0.signup({ 
      connection: 'Username-Password-Authentication', 
      email: val.Email, 
      password: val.Password,
      username: val.Username,
    }, function (err) { 
      console.log(err);
      if (err) return message.error('Something went wrong: ' + err); 
        return message.success('success signup without login!');
    });
  }
  async function handleSubmit(val:any) {
    await axios(URL_ENDPOINT.slice(0,-1), {
      method: 'POST',
      headers: headerPostDev,
      data: {
        'username': val.Username,
        'first_name': val.FirstName,
        'last_name': val.LastName,
        'email': val.Email,
        'date_of_birth': val.DateOfBirth,
        'address.street': val.Street,
        'address.city': val.City,
        'address.state': val.State,
        'address.zip': val.Zip,
      }
    }).then(data => {
      auth0Submit(val);
      console.log(data);
      navigate("/home")
    })
    .catch(error => {
      setErrorMessage(`Register failed. Please try again later`);
      console.log(error)
    });    
  };

  return (
      <>
        <Row>
      		<Col span={12} offset={6}>
						<Title data-testid="register-h1">
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
              name="FirstName"
              data-testid="register-firstname"
              rules={[
                { required: true, message: "Please input your first name!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="LastName"
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
              name="Street"
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
              name="Zip"
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
              name="City"
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
              name="State"
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
              name="DateOfBirth"
              data-testid="register-dayOfBirth"
              rules={[
                {
                  required: true,
                  message: 'Please input your Day of birth!',

                },
              ]}
            >
              <Input type="date"/>
            </Form.Item>

            <Form.Item
              label="E-Mail"
              name="Email"
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
              label="Username"
              name="Username"
              data-testid="register-username"
              rules={[
                {
                  required: true,
                  message: 'Please input a username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="Password"
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
                  <Button data-testid="register-btn" type="primary" htmlType="submit" onClick={handleSubmit}>
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