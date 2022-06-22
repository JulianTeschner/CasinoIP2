import React, { useEffect, useState } from 'react';
import './style/WinLoss.css';
import { Space, Button } from 'antd';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { useUserStore } from '../../config/zustand';
import { URL_ENDPOINT } from '../../config/env';

function WinLoss() {
  const headerGetDev = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
  }

  const [data, setData] = useState<any>('');
  var user = useUserStore((state:any) => state.userProps)[0];


  async function getData() {
      await axios(URL_ENDPOINT + user.username, {
              method: 'GET',
              headers: headerGetDev,
      }).then(data => {
        console.log('data:', data.data);
        setData(data.data)
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='app'>
      <Popup trigger={<Button type='link' className="button">Win/Loss Overview</Button>} position="right center" modal closeOnDocumentClick>
      {(close: any) => (
      <div className='modal'>
        <div>
          <h1>Win-Loss Overview</h1>
        </div>
        <div>
        <button className="close" onClick={close}>  
        </button>
        </div>
        { data === '' ? 
        <div> Loading Data... </div> :
        <div className='overview'>
          <Space direction='vertical' size={10}>
            <Space size={20}>
              <div>
                Last deposit: {data.balance.LastDeposit}
              </div>
              <div>
                Current amount: {data.balance.Amount}
              </div>
            </Space>
            <div>
              {
              data.balance.LastDeposit > data.balance.Amount ?
                <p>
                  <span className='Loss'>Difference: {data.balance.LastDeposit - data.balance.Amount}</span>
                  <br />
                  <span className='Loss'>no lucky today!</span>
                </p>
                :            
                <p>
                  <span className='Win'>Difference: {data.balance.Amount - data.balance.LastDeposit}</span>
                  <br />
                  <span className='Win'>Lucky!</span> 
                </p>           
              }
            </div>
          </Space>
        </div>
        }
      </div>
      )}
      </Popup>
    </div>
  );
}

export default WinLoss;