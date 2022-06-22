import React, { useEffect, useRef , useState} from 'react';
import { Space, Button, message, Row, Col } from 'antd';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import './style/Slotmachine.css';
import { useUserStore } from '../../config/zustand';
import axios from "axios";
import { URL_ENDPOINT } from '../../config/env';
import Title from 'antd/lib/typography/Title';

const headerGetDev = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
} 

const headerPatchDev = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/x-www-form-urlencoded'
}

function Slotmachine(){

  const einsatz = useRef(0);
  const [guthaben, setGuthaben] = React.useState<any>(' ');
  const showUI = useRef(false);
  const [status, setStatus] = React.useState<any>('');
  var user = useUserStore((state:any) => state.userProps)[0];

  async function getBalance() {
    await axios(URL_ENDPOINT + user.username, {
        method: 'GET',
        headers: headerGetDev
    })
    .then(data => setGuthaben(data.data.balance.Amount))
    .catch(error => console.log(error));
}

  async function patchBalance(val:any) {
    await axios(URL_ENDPOINT + 'balance/amount/' + user.username, {
        method: 'PATCH',
        headers: headerPatchDev,
        data: new URLSearchParams({
            'balance.amount': val
        })
    }).then(data => console.log(data.data))
    .catch(error => console.log(error));
}

  useEffect(() => {
    getBalance();
}, []);


  function handleSubmit(e: any) {
    e.preventDefault();

    var betval = parseInt(e.currentTarget.elements.einsatz.value)

    if(betval <= guthaben && betval >= 1) {
        console.log('Einsatz gesetzt:', betval);
        einsatz.current = betval;
        if(gewonnen===3) {
            setStatus("Jackpot!");
            setGuthaben(guthaben + betval * 100);
            patchBalance(guthaben + betval * 100);
        } else if(gewonnen===2) {
          setStatus("You got a Win!");
          setGuthaben(guthaben + betval * 2.5);
          patchBalance(guthaben + betval * 2.5);
      } else {
          setGuthaben(guthaben - betval);
          patchBalance(guthaben - betval);
      }
        showUI.current = true;
    } else if(betval === 0) {
        message.info(`You have to set a positive amount`);
        console.log('Einsatz ist null');
    } else if(betval > guthaben) {
        message.info(`Your amount is higher then your deposit`);
        console.log('Einsatz nicht gesetzt\nEinsatz ist höher als vorhandenes Guthaben:', betval);
    }
}


//SLOTMACHINE

  
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
    
    <div className='Slotmachine'>
      <Row>
        <Col span={12} offset={6}>
          <Title data-testid="slotmachine-h1">
            Slotmachine
          </Title>
          <div data-testid='balance' className='pt-15'><b>balance: {guthaben}</b></div>
          <form data-testid='bet-form' onSubmit={handleSubmit}>
            <Space>
              <label>min. bet amount 1 Credit</label>
              <input data-testid='bet-input' type="number" name="einsatz" />
            </Space>

            <div style={{textAlign: 'center', alignItems: 'center'}}>
              <h1 style={{ fontSize: '100px', letterSpacing: '1rem'}} className="animate__animated animate__bounce">{getitem1}{getitem2}{getitem3}</h1>
              
              <Button onClick={spin} type="primary" style={{ alignItems: 'center' }}>Spin</Button><br /> 

                <div className='p-t10'>
                  <Space direction='vertical'>
                    <div data-testid='msg'>
                      <p><b>{status}</b></p>
                    </div>
                    <Space>
                    
                      <Space direction='vertical'>
                        <label>Anzahl an spins für den Autospin: </label>
                        <input type="number" name="anzahlSpins" onChange={(e)=>{
                          setAnzahlSpins(e.target.valueAsNumber);
                        }}/>
                      
                        <Button onClick={spin} data-testid='play' disabled={showUI.current} type="primary" htmlType='submit'>Spin and go</Button>
                      </Space>
                      
                  </Space>
                </Space>                 
              </div>
            </div>
          </form>
          </Col>
        </Row>
      </div>
    );


};

export default Slotmachine;