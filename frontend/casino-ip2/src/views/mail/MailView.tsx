import { Button, Form, Input, message, Space } from "antd";
import { useState } from "react";
import Popup from "reactjs-popup";
import { send } from 'emailjs-com';
import { useNavigate } from "react-router-dom";

function Mail() {

    const [errorMessage, setErrorMessage] = useState("");

    const [toSend, setToSend] = useState({
        from_name: '',
        message:'',
        reply_to: '',
    });

    const onSubmit = (e:any) => {
        e.preventDefault();
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
                        <div data-testId="account-text"> Here you can write an email to our support team </div>                        
                    
                        <form onSubmit={onSubmit}>
                            <Input
                                type='text'
                                name='from_name'
                                data-testId='from-name'
                                placeholder='from name'
                                value={toSend.from_name}
                                onChange={handleChange}
                            />
                            <Input
                                type='text'
                                name='message'
                                data-testId='message'
                                placeholder='Your message'
                                value={toSend.message}
                                onChange={handleChange}
                            />
                            <Input
                                type='text'
                                name='reply_to'
                                data-testId='reply-mail'
                                placeholder='Your email'
                                value={toSend.reply_to}
                                onChange={handleChange}
                            />
                            <Button type="primary" htmlType="submit" data-testId='mail-submit'>Submit</Button>

                        </form>
                    </div>
                )}
            </Popup>
        </div>	
	);
}

export default Mail;
