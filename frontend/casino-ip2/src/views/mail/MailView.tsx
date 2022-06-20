import { Button, Form, Input, message, Space } from "antd";
import { useState } from "react";
import Popup from "reactjs-popup";
import { send } from 'emailjs-com';
import { useNavigate } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

function Mail() {

    const [errorMessage, setErrorMessage] = useState("");

    const [toSend, setToSend] = useState({
        from_name: '',
        message:'',
        reply_to: '',
    });

    const onSubmit = (e:any) => {
        send(
            'service_wyjyj9k',
            'template_pf97nwh',
            toSend,
            'z4fPMHER9eOdAN1pv'
          )
            .then((response:any) => {
                message.success("Message successful");
            })
            .catch((err:any) => {
                setErrorMessage(`Message failed: ${err.description}`);
            }
        );
    };
    
    const handleChange = (e:any) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Popup trigger={<Button type='link' className="button">Mail Support</Button>} position="right center" modal>
                {(close: any) => (
                    <div className='modal'>
                        <div>
                            <h1>Mail Support</h1>
                        </div>
                        <div>
                            <button className="close" onClick={close}></button>
                        </div>
                        <div data-testid="account-text"> Here you can write an email to our support team </div>                        

                        <Form 
                            name="basic"
                            labelCol={{ span: 8}}
                            wrapperCol={{ span: 10 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            onFinish={onSubmit}
                        >
                            <Form.Item 
                                label="Name"
                                name="from-name"
                                data-testid="email-name"
                                rules={[
                                    { required: true, message: "Please input your name!" }
                                ]}
                                >
                                <Input type='text'
                                    name='from_name'
                                    data-testid='from-name'
                                    value={toSend.from_name}
                                    onChange={handleChange}/>
                            </Form.Item>
                            <Form.Item 
                                label="Email"
                                name="from-email"
                                data-testid="email-email"
                                rules={[
                                    { required: true, message: "Please input your email!" }
                                ]}
                                >
                                <Input type='email'
                                    name='reply_to'
                                    data-testid='reply-mail'
                                    value={toSend.reply_to}
                                    onChange={handleChange}/>
                            </Form.Item>
                            <Form.Item 
                                label="Message"
                                name="message"
                                data-testid="email-message"
                                rules={[
                                    { required: true, message: "Please input your message!" }
                                ]}
                                >
                                <TextArea 
                                    rows={4}
                                    name='message'
                                    data-testid='message'
                                    value={toSend.message}
                                    onChange={handleChange} />
                            </Form.Item>

                            <Button type="primary" htmlType="submit" data-testid='mail-submit'>Submit</Button>
                        </Form>
                          
                    </div>
                )}
            </Popup>
        </div>	
	);
}

export default Mail;
