import React, { useEffect, useState } from 'react';
import './style/WinLoss.css';
import { Space } from 'antd';

function WinLoss() {
  const [data, setData] = useState<any>('');
  const [user, setUser] = React.useState<any>({"username": "fish123", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVsM3NGclRrWExXMENseVV3NmFyZSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jN2ZiYnl0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jYXNpbm8tYXBpLyIsImlhdCI6MTY1MTMxODUwMSwiZXhwIjoxNjUxNDA0OTAxLCJhenAiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.viG4uKWiYfNDtMMF6ahHCAl8bQls2LYfH7coaAtaPzgw0otkVXOfC0_ZXECObvKLvuz_TjGssrwrrr2JboA6vm-gA2tl4sRYjHzaG5Z0f092MPrZVfK91OLq5R5tGFPCBfdycR6TX8uduY6f9Qy46D2yk63GWdF_hnbbqt2XabB3eOHT2lzeD9n0Wqbbhd-EHKmzU8daZjNn-AyZQjWgNi7Cf0pV8LI0Ngf_smAMKLJwcgTmdrDM08Ecvr3Z2XQ7EeXXgZjP523vcw68N-p4uATTsQDTFyayuhH5dxlUhyUuvW1UZHJu5ttHrwlA3i8-UiLIG5X1qN5arZWO_TYm9g"});

  async function getData() {
    await fetch('http://localhost:8080/user/' + user.username, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + user.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='app'>
      <div>
        <h1>Win-Loss Overview</h1>
      </div>
      { data === '' ? null :
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
  );
}

export default WinLoss;