import React, { useEffect, useState } from 'react';
import './style/WinLoss.css';
import { Space, Button } from 'antd';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { URL_ENDPOINT } from '../../config/env';

const headerGetDev = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
} 
const headerGet = {
  'Content-Type': 'application/json'
}

function WinLoss() {
  const [data, setData] = useState<any>('');
  const [user, setUser] = React.useState<any>({"username": "fish123", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVsM3NGclRrWExXMENseVV3NmFyZSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jN2ZiYnl0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jYXNpbm8tYXBpLyIsImlhdCI6MTY1MTc2NjE4MiwiZXhwIjoxNjUxODUyNTgyLCJhenAiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.WvSrKkTRs4y7l5MbjAH99WFAIPQ3dpWnjwQMHBzS4BxUtH6k4RaRDVYwsvlOheimTu0J_RlFRfyB2WPIEi885YUkJFdsEy3iSFCsS1Bo4BIy5USCrrB1YefgqyPvnNxdHTDZZZgPbIO5bX6waYe5XplmX6HM5CnqGQ_9_6hYNBGjn5xM1cE6hMp4nn6qR-2daf_loEcmYLcOO9gPg0DQmuA8o9KJxEY0ztoLY_PFuQDjBGmHWLG5g6Ae5A9ao5LUX5JIaI-QgnY0C7pAZCXkU8iElwU8alEbf3MOmr9OguyuYSK771iswlkgxnQBF3ivMF65qD5ej2n9rQEbgTe6YA"});

  async function getData() {
      await axios(URL_ENDPOINT + user.username, {
              method: 'GET',
              headers: process.env.NODE_ENV === 'development' ? headerGetDev : headerGet,
      }).then(data => {
        console.log(data.data);
        setData(data)
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