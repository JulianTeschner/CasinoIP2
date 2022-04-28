import React, { useEffect, useRef } from 'react';
import { Space, Button } from 'antd';
import './style/Blackjack.css';

function Blackjack() {
    const deck = [{"Farbe": "Herz", "Wert": "2", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "3", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "4", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "5", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "6", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "7", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "8", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "9", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "10", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "Bube", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "Dame", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "König", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "Ass", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "2", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "3", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "4", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "5", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "6", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "7", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "8", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "9", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "10", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "Bube", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "Dame", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "König", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "Ass", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "2", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "3", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "4", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "5", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "6", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "7", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "8", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "9", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "10", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "Bube", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "Dame", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "König", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "Ass", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "2", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "3", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "4", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "5", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "6", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "7", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "8", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "9", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "10", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "Bube", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "Dame", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "König", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "Ass", "Gespielt": 0}];

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
    const [user, setUser] = React.useState<any>({"username": "fish123", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVsM3NGclRrWExXMENseVV3NmFyZSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jN2ZiYnl0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jYXNpbm8tYXBpLyIsImlhdCI6MTY1MTEzNzg0OCwiZXhwIjoxNjUxMjI0MjQ4LCJhenAiOiJHd3NXNmRPWlpCWVNWY0dkMHE2TXBGRmd6SWdhZzY3MiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.RVFRTz9I6jpRzfKhk_kLoCaQfQYTKcXbsOV88ztHujR0i3P7NjlsjmAcePLItO_hz5jMLdMmqADS4oSw5dQd3XanowewA4gM8VZW18FDyt4xnIyHEgfHzB86PFe68rxS-MF6juonMgzTLP7VOGPaHz9qe-A0Q11pL7io_Ie0EYBFh6KkYPq0SjH8b_EI-8ny0cXOpIa41OOD7R5V2L7xHOZ-ImBPAVoyYS3w2Me9u75H9P5qTfx2xedps_1FEp5N5nUdqpqta6tolGqywvIoywONhFGyNRNz8egv9UWBTNhVO5yN-WxtatY6wMfXNnxP5avx-V9xasNwlyRmigP0yA"});

    function addCards(cards:any):number {
        var sum = 0;
        for (var i = 0; i < cards.length; i++) {
            if(cards[i].Wert === "Bube" || cards[i].Wert === "Dame" || cards[i].Wert === "König" ) {
                sum += 10;
            } else if (cards[i].Wert === "Ass") {
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
            <div>
            <div>
                <h1>Blackjack</h1>
                <div className='p-t40'>
                    <div data-testid='balance'><b>balance: {guthaben}</b></div>
                    <div className='p-t10'>
                        <form data-testid='bet-form' onSubmit={handleSubmit}>
                            <Space>
                                <label>Einsatz mind. 1 Credit</label>
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
                    <div data-testid='overlay-player' className='overlay'>
                        <div>
                            <p><b>sum: {addCards(hand)}</b></p>
                            <ul>
                                {
                                    hand.map((card:any, index:any) => {
                                        return (                                            
                                            <li key={index}>
                                                {card.Farbe} {card.Wert}
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
                            <p><b>sum: {addCards(dealer)}</b></p>
                            <ul>
                                {
                                    dealer.map((card:any, index:any) => {
                                        return (                                            
                                            <li key={index}>
                                                {card.Farbe} {card.Wert}
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