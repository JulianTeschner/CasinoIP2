import React, { useEffect, useRef } from 'react';
import { Space, Button } from 'antd';
import './style/Blackjack.css';
import axios from 'axios';
import { URL_ENDPOINT } from '../../config/env';
import { useUserStore } from '../../config/zustand';



function Blackjack() {

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

    const deck = [{"Farbe": "♥", "Wert": "2", "Gespielt": 0}, {"Farbe": "♥", "Wert": "3", "Gespielt": 0}, {"Farbe": "♥", "Wert": "4", "Gespielt": 0}, {"Farbe": "♥", "Wert": "5", "Gespielt": 0}, {"Farbe": "♥", "Wert": "6", "Gespielt": 0}, {"Farbe": "♥", "Wert": "7", "Gespielt": 0}, {"Farbe": "♥", "Wert": "8", "Gespielt": 0}, {"Farbe": "♥", "Wert": "9", "Gespielt": 0}, {"Farbe": "♥", "Wert": "10", "Gespielt": 0}, {"Farbe": "♥", "Wert": "Jack", "Gespielt": 0}, {"Farbe": "♥", "Wert": "Queen", "Gespielt": 0}, {"Farbe": "♥", "Wert": "King", "Gespielt": 0}, {"Farbe": "♥", "Wert": "Ace", "Gespielt": 0}, {"Farbe": "♣", "Wert": "2", "Gespielt": 0}, {"Farbe": "♣", "Wert": "3", "Gespielt": 0}, {"Farbe": "♣", "Wert": "4", "Gespielt": 0}, {"Farbe": "♣", "Wert": "5", "Gespielt": 0}, {"Farbe": "♣", "Wert": "6", "Gespielt": 0}, {"Farbe": "♣", "Wert": "7", "Gespielt": 0}, {"Farbe": "♣", "Wert": "8", "Gespielt": 0}, {"Farbe": "♣", "Wert": "9", "Gespielt": 0}, {"Farbe": "♣", "Wert": "10", "Gespielt": 0}, {"Farbe": "♣", "Wert": "Jack", "Gespielt": 0}, {"Farbe": "♣", "Wert": "Queen", "Gespielt": 0}, {"Farbe": "♣", "Wert": "King", "Gespielt": 0}, {"Farbe": "♣", "Wert": "Ace", "Gespielt": 0}, {"Farbe": "♦", "Wert": "2", "Gespielt": 0}, {"Farbe": "♦", "Wert": "3", "Gespielt": 0}, {"Farbe": "♦", "Wert": "4", "Gespielt": 0}, {"Farbe": "♦", "Wert": "5", "Gespielt": 0}, {"Farbe": "♦", "Wert": "6", "Gespielt": 0}, {"Farbe": "♦", "Wert": "7", "Gespielt": 0}, {"Farbe": "♦", "Wert": "8", "Gespielt": 0}, {"Farbe": "♦", "Wert": "9", "Gespielt": 0}, {"Farbe": "♦", "Wert": "10", "Gespielt": 0}, {"Farbe": "♦", "Wert": "Jack", "Gespielt": 0}, {"Farbe": "♦", "Wert": "Queen", "Gespielt": 0}, {"Farbe": "♦", "Wert": "King", "Gespielt": 0}, {"Farbe": "♦", "Wert": "Ace", "Gespielt": 0}, {"Farbe": "♠", "Wert": "2", "Gespielt": 0}, {"Farbe": "♠", "Wert": "3", "Gespielt": 0}, {"Farbe": "♠", "Wert": "4", "Gespielt": 0}, {"Farbe": "♠", "Wert": "5", "Gespielt": 0}, {"Farbe": "♠", "Wert": "6", "Gespielt": 0}, {"Farbe": "♠", "Wert": "7", "Gespielt": 0}, {"Farbe": "♠", "Wert": "8", "Gespielt": 0}, {"Farbe": "♠", "Wert": "9", "Gespielt": 0}, {"Farbe": "♠", "Wert": "10", "Gespielt": 0}, {"Farbe": "♠", "Wert": "Jack", "Gespielt": 0}, {"Farbe": "♠", "Wert": "Queen", "Gespielt": 0}, {"Farbe": "♠", "Wert": "King", "Gespielt": 0}, {"Farbe": "♠", "Wert": "Ace", "Gespielt": 0}];
    const deck_copy = useRef(deck);
    const [guthaben, setGuthaben] = React.useState<any>(' ');
    const einsatz = useRef(0);
    const [hand, setHand] = React.useState<any>([randCard(), randCard()]);
    const [dealer, setDealer] = React.useState<any>([randCard()]);
    const run = useRef(false);
    const [status, setStatus] = React.useState<any>('');
    const showUI = useRef(false);
    const dealerPick = useRef(false);
  
    // test
    //const [user, setUser] = React.useState<any>({"username": "fish123", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVsM3NGclRrWExXMENseVV3NmFyZSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jN2ZiYnl0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jYXNpbm8tYXBpLyIsImlhdCI6MTY1MTc3NjI4MCwiZXhwIjoxNjUxODYyNjgwLCJhenAiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.Oau7zdJbfXkdV5kQdNY74tGaSmYI8PLucOlDFm3GA1ycvFFXhfHt8vuupgBOCI2DJk6eB4Qu2JOZPBHSnu0A8V_ZCGf20hx9QbGAgWiKi8ULdAUF_6e9mAmXyc2lmeLdZTD5O0lJKAi3lJtRMXdcpRET8UnECLILWa-NS8vzETE5Suozg9SFq7m2hXJZ2W-Uv8pjJkUq2gO1W_unMT8kXOUBoXm-uioCuMlZXX0muhqZC9oKgI1e6eb9DkQsyUhGzHAq-ajGKilVj021uXajMj2h3EFnITTk5_pljuxPhPBW8Y52LqKx7NtwzSUjQV70fWJdyfoFm5LQB6ZR_qFxgQ"});   
    var user = useUserStore((state:any) => state.userProps)[0];

    function addCards(cards:any):number {
        var sum = 0;
        for (var i = 0; i < cards.length; i++) {
            if(cards[i].Wert === "Jack" || cards[i].Wert === "Queen" || cards[i].Wert === "King" ) {
                sum += 10;
            } else if (cards[i].Wert === "Ace") {
                if(sum + 11 > 21) {
                    sum += 1;
                } else {
                    sum += 11;
                }
            } else {
                sum += parseInt(cards[i].Wert);
            }
        }
        return sum;	
    }
    
    function randCard():any {
        var rand = Array.from(Array(deck_copy.current.length).keys());
        
        for (let i = deck_copy.current.length - 1; i > 0 ; i--) {
            const j = Math.floor(Math.random() * i);
            [rand[i], rand[j]] = [rand[j], rand[i]];
        }

        for (let index = 0; index < deck_copy.current.length; index++) {
            if(deck_copy.current[rand[index]].Gespielt === 0) {
                deck_copy.current[rand[index]].Gespielt = 1;
                return deck_copy.current[rand[index]];
            }            
        }
    }

    async function getBalance() {
        await axios(URL_ENDPOINT + `${localStorage.getItem("username")}`, {
            method: 'GET',
            headers: headerGetDev
        })
        .then(data => setGuthaben(data.data.balance.amount))
        .catch(error => console.log(error));
    }

    async function patchBalance(val:any) {
        await axios(URL_ENDPOINT + 'balance/amount/' + `${localStorage.getItem("username")}`, {
            method: 'PATCH',
            headers: headerPatchDev,
            data: new URLSearchParams({
                'balance.amount': val
            })
        }).then(data => console.log(data.data))
        .catch(error => console.log(error));
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        var betval = parseInt(e.currentTarget.elements.einsatz.value)

        if(betval <= guthaben && betval >= 1) {
            console.log('Einsatz gesetzt:', betval);
            einsatz.current = betval;
            if(addCards(hand) === 21) {
                setStatus("you got a blackjack! you win!");
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

    function newGame(e:any) {
        e.preventDefault();

        run.current = false;
        setStatus('');
        einsatz.current = 0;
        deck_copy.current = deck;        
        showUI.current = false;
        dealerPick.current = false;
        setHand([randCard(), randCard()]);
        setDealer([randCard()]);
        getBalance();
    }

    function handleHit(e:any) {
        e.preventDefault();
        setHand([...hand, randCard()]);
    }

    function handleStay(e:any) {
        e.preventDefault();
        setDealer([...dealer, randCard()]);
        dealerPick.current = true;
    }
    
    useEffect(() => {
        getBalance();
    }, []);

    useEffect(() => {
        // dealer muss karten ziehen
        if(dealerPick.current && addCards(dealer) < addCards(hand) && addCards(dealer) < 21 && addCards(hand) <= 21) {
            setDealer([...dealer, randCard()]);
        } 
        
        // dealer hat gewonnen
        else if(dealerPick.current && addCards(hand) > 21) {
            dealerPick.current = false;
            run.current = true;
        } else if(!dealerPick.current && addCards(hand) > 21) {
            run.current = true;
        }

        // dealer hat genug karten
        else if(dealerPick.current && addCards(dealer) >= addCards(hand)) {
            dealerPick.current = false;
            run.current = true;
        } 
        
        // player wins
        else if(!dealerPick.current && addCards(hand) === 21) {
            run.current = true;
        }

        // player wins
        else if(!dealerPick.current && addCards(hand) === 21) {
            run.current = true;
        }

    }, [dealer, hand, dealerPick]);

    useEffect(() => {        
        // win logic
        if(run.current) {
            // spieler gewinnt
            if(addCards(hand) <= 21 && (addCards(hand) > addCards(dealer) || addCards(dealer) > 21)) {
                setGuthaben(guthaben + einsatz.current * 2);
                patchBalance(guthaben + einsatz.current * 2);
                setStatus('you win!');
                run.current = false;
            }

            // dealer gewinnt
            else if(addCards(dealer) <= 21 && addCards(dealer) > addCards(hand) ) {
                setStatus('you lose!');
                run.current = false;
            } else if(addCards(hand) > 21) {
                setStatus('you lose!');
                run.current = false;
            }

            // unentschieden
            else if(addCards(hand) === addCards(dealer) && addCards(hand) <= 21) {
                setGuthaben(guthaben + einsatz.current);
                patchBalance(guthaben + einsatz.current);
                setStatus('draw!');
                run.current = false;
            }
        }
    }, [dealer, guthaben, hand, run]);

    return (
            <div className='blackjack'>
            <div>
                <h1>Blackjack</h1>
                <div className='p-t20'>
                    <div data-testid='balance'><b>balance: {guthaben}</b></div>
                    <div className='p-t10'>
                        <form data-testid='bet-form' onSubmit={handleSubmit}>
                            <Space>
                                <label>min. bet amount 1 Credit</label>
                                <input data-testid='bet-input' type="number" name="einsatz" />
                                <Button data-testid='play' disabled={showUI.current} type="primary" htmlType='submit'>bet and go</Button>
                            </Space>
                        </form>                    
                    </div>
                </div>
            </div>
            {
                !showUI.current ? null :
                <div className='p-t10'>
                    <Space direction='vertical'>
                    <div data-testid='msg'>
                        <p><b>{status}</b></p>
                    </div>
                    <Space>
                    <div data-testid='overlay-player' className='overlay-player'>
                        <div>
                            <p><b>sum: {addCards(hand)}</b></p>
                            <ul className='cards'>
                                {
                                  hand.map((card:any, index:any) => {
                                      return (                                            
                                          <li key={index}>
                                              {card.Farbe === '♥' || card.Farbe === '♦' ?
                                                  <span className='red'>{card.Farbe} </span> 
                                                  :
                                                  <span>{card.Farbe} </span>
                                              }
                                              {card.Wert}
                                          </li>
                                      );
                                  })
                                }
                            </ul>
                            <Space>
                                <Button data-testid='hit' disabled={addCards(hand) >= 21 || status !== ''} type="primary" onClick={handleHit}>hit</Button>
                                <Button data-testid='stay' disabled={status !== ''} type="primary" onClick={handleStay}>stay</Button>
                            </Space>
                        </div>    
                    </div>
                    <div data-testid='overlay-dealer' className='overlay'>
                        <div>
                            <p>
                              <b>Dealer</b><br />
                              <b>sum: {addCards(dealer)}</b>
                            </p>
                            <ul className='cards'>
                                {
                                  dealer.map((card:any, index:any) => {
                                      return (                                            
                                          <li key={index}>
                                              {card.Farbe === '♥' || card.Farbe === '♦' ?
                                                  <span className='red'>{card.Farbe} </span> 
                                                  :
                                                  <span>{card.Farbe} </span>
                                              }
                                              {card.Wert}
                                          </li>
                                      );
                                  })
                                }
                            </ul>
                        </div>
                    </div>
                    </Space>
                    { status === '' ? null : 
                        <div className='p-t10'>
                            <Button data-testid='new' type="primary" onClick={newGame}>new game</Button>
                        </div>
                    }
                    </Space>
                </div>
            }
        </div>
    )
}

export default Blackjack;