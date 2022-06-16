import React, { useEffect, useRef , useState} from 'react';
import { Space, Button } from 'antd';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import background from './img/background-image.jpg';




function Slotmachine(){



  const einsatz = useRef(0);
  const [guthaben, setGuthaben] = React.useState<any>(' ');
  const [user, setUser] = React.useState<any>({"username": "fish123", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVsM3NGclRrWExXMENseVV3NmFyZSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jN2ZiYnl0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jYXNpbm8tYXBpLyIsImlhdCI6MTY1MTc3NjI4MCwiZXhwIjoxNjUxODYyNjgwLCJhenAiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.Oau7zdJbfXkdV5kQdNY74tGaSmYI8PLucOlDFm3GA1ycvFFXhfHt8vuupgBOCI2DJk6eB4Qu2JOZPBHSnu0A8V_ZCGf20hx9QbGAgWiKi8ULdAUF_6e9mAmXyc2lmeLdZTD5O0lJKAi3lJtRMXdcpRET8UnECLILWa-NS8vzETE5Suozg9SFq7m2hXJZ2W-Uv8pjJkUq2gO1W_unMT8kXOUBoXm-uioCuMlZXX0muhqZC9oKgI1e6eb9DkQsyUhGzHAq-ajGKilVj021uXajMj2h3EFnITTk5_pljuxPhPBW8Y52LqKx7NtwzSUjQV70fWJdyfoFm5LQB6ZR_qFxgQ"});
  const showUI = useRef(false);
  const [status, setStatus] = React.useState<any>('');

  async function getBalance() {
    await fetch('http://localhost:8080/user/' + user.username, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + user.token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => setGuthaben(data.balance.Amount))
    .catch(error => console.log(error));
  }
  
  async function patchBalance(val:any) {
    await fetch('http://localhost:8080/user/balance/amount/' + user.username, {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + user.token,
            'Content-Type': 'application/x-www-form-urlencoded'
            },
        body: new URLSearchParams({
            'balance.amount': val
        })
    }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }


  function handleSubmit(e: any) {
    e.preventDefault();

    var betval = parseInt(e.currentTarget.elements.einsatz.value)

    if(betval <= guthaben && betval >= 1) {
        console.log('Einsatz gesetzt:', betval);
        einsatz.current = betval;
        if(gewonnen===3) {
            setStatus("You got a big Win!");
            setGuthaben(guthaben + betval * 10);
            patchBalance(guthaben + betval * 10);
        } else {
            setGuthaben(guthaben - betval);
            patchBalance(guthaben - betval);
        }
        if(gewonnen===2) {
          setStatus("You got a Win!");
          setGuthaben(guthaben + betval * 2.5);
          patchBalance(guthaben + betval * 2.5);
      } else {
          setGuthaben(guthaben - betval);
          patchBalance(guthaben - betval);
      }
        showUI.current = true;
    } else if(betval === 0) {
        console.log('Einsatz ist null');
    } else if(betval > guthaben) {
        console.log('Einsatz nicht gesetzt\nEinsatz ist höher als vorhandenes Guthaben:', betval);
    }
}























  
  
  const items = [
    1,2,3,4,5,6,7,8,9,0
  ];
  const [gewonnen, setGewonnen] = useState(1);
  const [anzahlSpins, setAnzahlSpins] = useState(1);
  const [getitem1, setItem1] = useState(0);
  const [getitem2, setItem2] = useState(0);
  const [getitem3, setItem3] = useState(0);

  async function spin(){
    
      var item1 = items[Math.floor(Math.random()*items.length)];
      var item2 = items[Math.floor(Math.random()*items.length)];
      var item3 = items[Math.floor(Math.random()*items.length)];


 
  
      if(item1===item2 && item1===item3){
        setGewonnen(3);
      }
    
      if(item1===item2 || item1===item3 || item2===item3){
       setGewonnen(2);
      }
      else{
        setGewonnen(1);
      }
      console.log(item1, item2, item3);
      setItem1(item1);
      setItem2(item2);
      setItem3(item3);
      
    }

    function spinMehrmals(){
      for(var i=1;anzahlSpins<i;i++){
        spin();
      }
    }
  

  
  return (
    
    
    <div style={{ backgroundImage:`url(${background})`, backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh' }}className='content'>
      <div style={{backgroundColor: 'white'}}>

      <h1>{getitem1}{getitem2}{getitem3}</h1>

      <button onClick={spin}>Spin</button>
      <label>Anzahl an spins: </label>
      <input type="number" name="anzahlSpins" onChange={(e)=>{
        setAnzahlSpins(e.target.valueAsNumber);
      }}/> 

      <div data-testid='balance'><b>balance: {guthaben}</b></div>
                    <div className='p-t10'>
                        <form data-testid='bet-form' onSubmit={handleSubmit}>
                            <Space>
                                <label>min. bet amount 1 Credit</label>
                                <input data-testid='bet-input' type="number" name="einsatz" />
                                <Button onClick={spin} data-testid='play' disabled={showUI.current} type="primary" htmlType='submit'>Spin and go</Button>
                                <Button onClick={spinMehrmals} data-testid='play' disabled={showUI.current} type="primary" htmlType='submit'>Autospin and go</Button>
                            </Space>
                        </form>                    
                    </div>
    </div>
</div>
    );
};
export default Slotmachine;