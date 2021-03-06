import { Button, Card, Col, message, Row, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { URL_ENDPOINT } from "../../config/env";
import { useUserStore } from "../../config/zustand";
import "./style/Account.css";

function Account() {

    const headerGetDev = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    } 
    
    const headerPatchDev = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }

    const [data, setData] = useState<any>('');
    //const [user, setUser] = React.useState<any>({"username": "fish123", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVsM3NGclRrWExXMENseVV3NmFyZSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jN2ZiYnl0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jYXNpbm8tYXBpLyIsImlhdCI6MTY1MTc2NjE4MiwiZXhwIjoxNjUxODUyNTgyLCJhenAiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.WvSrKkTRs4y7l5MbjAH99WFAIPQ3dpWnjwQMHBzS4BxUtH6k4RaRDVYwsvlOheimTu0J_RlFRfyB2WPIEi885YUkJFdsEy3iSFCsS1Bo4BIy5USCrrB1YefgqyPvnNxdHTDZZZgPbIO5bX6waYe5XplmX6HM5CnqGQ_9_6hYNBGjn5xM1cE6hMp4nn6qR-2daf_loEcmYLcOO9gPg0DQmuA8o9KJxEY0ztoLY_PFuQDjBGmHWLG5g6Ae5A9ao5LUX5JIaI-QgnY0C7pAZCXkU8iElwU8alEbf3MOmr9OguyuYSK771iswlkgxnQBF3ivMF65qD5ej2n9rQEbgTe6YA"});
    var user = useUserStore((state:any) => state.userProps)[0];

    const navigate = useNavigate();
  
    async function getData() {
      await axios(URL_ENDPOINT + `${localStorage.getItem("username")}`, {
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
      await axios(URL_ENDPOINT + `${localStorage.getItem("username")}`, {
        method: 'DELETE',
        headers: headerGetDev
        })
        .then(val => {
          removeUser();
          localStorage.removeItem("accessToken");                  
          localStorage.removeItem("username");
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
  
    async function checkStreak (values: any){
      await axios(URL_ENDPOINT + `${localStorage.getItem("username")}`, {
              method: 'GET',
              headers: headerGetDev
          })
          .then(data => {    
            if(data.data.login_streak % 2 == 0){
              message.success("You are logged in two days in a row. You get a bonus of 5 credits.");
              handleDeposit(data.data.balance.amount+5);
            }
          }).catch(error => console.log(error));
    }
  
    async function handleDeposit(val:any) {
      await axios(URL_ENDPOINT + 'balance/amount/' + `${localStorage.getItem("username")}`, {
          method: 'PATCH',
          headers: headerPatchDev,
          data: new URLSearchParams({
              'balance.amount': val
          })
        }).then(val => {
          console.log("streak successful");
        })
        .catch(error => {
          console.log(error)
        });
      };

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
                            <div>
                              <Space direction='vertical' size={10}>
                                <Space size={20}>
                                  <div className="display-grid">
                                    <div>
                                      First Name: {data.first_name}
                                    </div>
                                    <div>
                                      Last Name: {data.last_name}
                                    </div>
                                    <div>
                                      Street: {data.address.street}
                                    </div>
                                    <div>
                                      City: {data.address.city}
                                    </div>
                                    <div>
                                      State: {data.address.state}
                                    </div>
                                    <div>
                                      ZIP: {data.address.zip}
                                    </div>
                                    <div>
                                      Birthday: {data.date_of_birth}
                                    </div>
                                    <div>
                                      Email: {data.email}
                                    </div>
                                  </div>
                                  
                                </Space>
                              </Space>
                            </div>
                          }
                          <Space>
                            <Button type="primary" onClick={checkStreak}>Check streak!</Button>
                            <Button type="primary" onClick={deleteAccount}>Delete account!</Button>
                            <Button type="primary" onClick={lockAccount}>Lock account!</Button>
                          </Space>
                    </div>
                )}
            </Popup>
        </div>	
	);
}

export default Account;