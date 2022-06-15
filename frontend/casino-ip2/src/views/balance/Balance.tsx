import React, { useEffect, useState } from 'react';
import { Space, Button } from 'antd';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../config/zustand';

function Balance() {
    const navigate = useNavigate();
 
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
                        <Button 
                            data-testId="balance-button"
                            onClick={  async () => {
                                
                            }
                        }>
                            Deposit
                        </Button>
                    </div>
                )}
            </Popup>
        </>
    );
}

export default Balance;