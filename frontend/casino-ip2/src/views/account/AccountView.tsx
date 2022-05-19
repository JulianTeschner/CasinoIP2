import { Button, Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

function Account() {
    const navigate = useNavigate();
	return (
        <div>
            <Popup trigger={<Button type='link' className="button">Account</Button>} position="right center" modal>
                {(close: any) => (
                    <div className='modal'>
                        <div>
                            <h1>Account</h1>
                        </div>
                        <div>
                            <button className="close" onClick={close}></button>
                        </div>
                        <div data-testId="account-text"> Here you can see your account details </div>                        
                    </div>
                )}
            </Popup>
        </div>	
	);
}

export default Account;