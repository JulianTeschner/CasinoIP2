import React, { useEffect, useState } from 'react';
import { Space, Button } from 'antd';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../config/zustand';

function Logout() {
    const navigate = useNavigate();
    const removeUser = useUserStore((state:any) => state.removeUser);

    return (
        <div className='app'>
            <Popup trigger={<Button type='link' className="button">Logout</Button>} position="right center" modal>
                {(close: any) => (
                    <div className='modal'>
                        <div>
                            <h1>Logout</h1>
                        </div>
                        <div>
                            <button className="close" onClick={close}></button>
                        </div>
                        <div data-testId="logout-text"> Do you really want to logout from the casino-app? </div>
                        <Button 
                            data-testId="logout-button"
                            onClick={  async () => {
                            localStorage.removeItem("accessToken");
                            
                            removeUser();
                            
                            navigate('/public/home');
                            }
                        }>
                            Logout
                        </Button>
                    </div>
                )}
            </Popup>
        </div>
    );
}

export default Logout;