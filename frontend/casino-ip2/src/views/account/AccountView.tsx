import { Button, Card, Col, Row, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { URL_ENDPOINT } from "../../config/env";
import { useUserStore } from "../../config/zustand";

function Account() {
    const [data, setData] = useState<any>('');
    //const [user, setUser] = React.useState<any>({"username": "fish123", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVsM3NGclRrWExXMENseVV3NmFyZSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jN2ZiYnl0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jYXNpbm8tYXBpLyIsImlhdCI6MTY1MTc2NjE4MiwiZXhwIjoxNjUxODUyNTgyLCJhenAiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.WvSrKkTRs4y7l5MbjAH99WFAIPQ3dpWnjwQMHBzS4BxUtH6k4RaRDVYwsvlOheimTu0J_RlFRfyB2WPIEi885YUkJFdsEy3iSFCsS1Bo4BIy5USCrrB1YefgqyPvnNxdHTDZZZgPbIO5bX6waYe5XplmX6HM5CnqGQ_9_6hYNBGjn5xM1cE6hMp4nn6qR-2daf_loEcmYLcOO9gPg0DQmuA8o9KJxEY0ztoLY_PFuQDjBGmHWLG5g6Ae5A9ao5LUX5JIaI-QgnY0C7pAZCXkU8iElwU8alEbf3MOmr9OguyuYSK771iswlkgxnQBF3ivMF65qD5ej2n9rQEbgTe6YA"});
    var user = useUserStore((state:any) => state.userProps)[0];

    const navigate = useNavigate();

    const headerGetDev = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    } 

  
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

    const removeUser = useUserStore((state:any) => state.removeUser);

    async function deleteAccount(val:any) {
      await axios(URL_ENDPOINT + user.username, {
        method: 'DELETE',
        headers: headerGetDev
        })
        .then(val => {
          localStorage.removeItem("accessToken");                  
          removeUser();
          navigate("/home");
        })
        .catch(error => console.log(error));
      console.log('Delete');
    }

    async function lockAccount(val:any) {
     const box = document.getElementById('lock-box');
     if(box != null) {
       box.style.display='flex';
       box.style.zIndex='9999';
     }
     setTimeout(() => {
       if(box != null) {
         box.style.display='none';
         box.style.zIndex='0';
       }
     },20000);

      console.log('Lock');
    }

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
                        <div data-testid="account-text"> Here you can see your account details </div>                        
                        { data === '' ? 
                            <div> Loading Data... </div> :
                            <div className='overview'>
                              <Space direction='vertical' size={10}>
                                <Space size={20}>
                                  <div>
                                    First Name: {data.user.FirstName}
                                  </div>
                                  <div>
                                    Last Name: {data.user.LastName}
                                  </div>
                                  <div>
                                    Street: {data.user.Street}
                                  </div>
                                  <div>
                                    City: {data.user.City}
                                  </div>
                                  <div>
                                    State: {data.user.State}
                                  </div>
                                  <div>
                                    ZIP: {data.user.Zip}
                                  </div>
                                  <div>
                                    Birthday: {data.user.DateOfBirth}
                                  </div>
                                  <div>
                                    Email: {data.user.Email}
                                  </div>
                                </Space>
                              </Space>
                            </div>
                          }
                          <button onClick={deleteAccount}>Delete account!</button>
                          <button onClick={lockAccount}>Lock account!</button>
                    </div>
                )}
            </Popup>
        </div>	
	);
}

export default Account;