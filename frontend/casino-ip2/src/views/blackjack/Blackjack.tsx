import React, { useEffect, useRef } from 'react';
import { Space, Button } from 'antd';
import './style/Blackjack.css';

function Blackjack() {
    const deck = [{"Farbe": "Herz", "Wert": "2", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "3", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "4", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "5", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "6", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "7", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "8", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "9", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "10", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "Bube", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "Dame", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "König", "Gespielt": 0}, {"Farbe": "Herz", "Wert": "Ass", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "2", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "3", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "4", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "5", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "6", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "7", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "8", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "9", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "10", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "Bube", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "Dame", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "König", "Gespielt": 0}, {"Farbe": "Kreuz", "Wert": "Ass", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "2", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "3", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "4", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "5", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "6", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "7", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "8", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "9", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "10", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "Bube", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "Dame", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "König", "Gespielt": 0}, {"Farbe": "Karo", "Wert": "Ass", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "2", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "3", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "4", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "5", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "6", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "7", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "8", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "9", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "10", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "Bube", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "Dame", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "König", "Gespielt": 0}, {"Farbe": "Pik", "Wert": "Ass", "Gespielt": 0}];
    var deck_copy = [...deck];

    const [guthaben, setGuthaben] = React.useState<any>(100);
    const [einsatz, setEinsatz] = React.useState<any>(0);
    const [hand, setHand] = React.useState<any>([randCard(), randCard()]);
    const [dealer, setDealer] = React.useState<any>([randCard()]);
    const [run, setRun] = React.useState<any>(false);
    const [status, setStatus] = React.useState<any>('');
    const [ui, setUI] = React.useState<any>(false);
    const dealerPick = useRef(false);

    function randCard():object {
        var rand = Math.floor(Math.random() * deck_copy.length);
        if(deck_copy[rand].Gespielt === 0) {
            deck_copy[rand].Gespielt = 1;
            return deck_copy[rand];
        } else {
            return randCard();
        }
    }

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

    function check() {
        if(addCards(hand) === 21) {
            setStatus("you got a blackjack! you win!");
        }
    }

    function handleSubmit(e:any) {
        e.preventDefault();
        
        if(e.target.einsatz.value <= guthaben && e.target.einsatz.value >= 1) {
            console.log('Einsatz gesetzt:', e.target.einsatz.value);
            setEinsatz(e.target.einsatz.value);
            check();
            setUI(true);
        } else if(e.target.einsatz.value == 0) {
            console.log('Einsatz ist null');
        } else if(e.target.einsatz.value > guthaben) {
            console.log('Einsatz nicht gesetzt\nEinsatz ist höher als vorhandenes Guthaben:', e.target.einsatz.value);
        }
    }

    function newGame() {
        setRun(false);
        setStatus('');
        setEinsatz(0);
        setHand([randCard(), randCard()]);
        setDealer([randCard()]);
        setUI(false);
        dealerPick.current = false;
        deck_copy = [...deck];
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
        // dealer muss karten ziehen
        if(dealerPick.current && addCards(dealer) < addCards(hand) && addCards(dealer) < 21 && addCards(hand) <= 21) {
            setDealer([...dealer, randCard()]);
        } 
        
        // dealer hat gewonnen
        else if(dealerPick.current && addCards(hand) > 21) {
            dealerPick.current = false;
            setRun(true);
        }

        // dealer hat genug karten
        else if(dealerPick.current && addCards(dealer) >= addCards(hand)) {
            dealerPick.current = false;
            setRun(true);
        }

        // win logic
        if(run) {
            debugger;
            // spieler gewinnt
            if(addCards(hand) <= 21 && (addCards(hand) > addCards(dealer) || addCards(dealer) > 21)) {
                setGuthaben(guthaben + parseInt(einsatz));
                setStatus('you win!');
                setRun(false);
            }

            // dealer gewinnt
            else if(addCards(dealer) <= 21 && addCards(dealer) > addCards(hand) ) {
                setGuthaben(guthaben - parseInt(einsatz));
                setStatus('you lose!');
                setRun(false);
            } else if(addCards(hand) > 21) {
                setGuthaben(guthaben - parseInt(einsatz));
                setStatus('you lose!');
                setRun(false);
            }

            // unentschieden
            else if(addCards(hand) === addCards(dealer) && addCards(hand) <= 21) {
                setStatus('draw!');
                setRun(false);
            }
        }
    });

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
                                <input type="number" name="einsatz" />
                                <Button disabled={ui} type="primary" htmlType='submit'>bet and go</Button>
                            </Space>
                        </form>                    
                    </div>
                </div>
            </div>
            {
                !ui ? null :
                <div className='p-t10'>
                    <Space direction='vertical'>
                    <div>
                        <p><b>{status}</b></p>
                    </div>
                    <Space>
                    <div className='overlay'>
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
                                <Button disabled={addCards(hand) >= 21 || status !== ''} type="primary" onClick={handleHit}>hit</Button>
                                <Button disabled={status !== ''} type="primary" onClick={handleStay}>stay</Button>
                            </Space>
                        </div>    
                    </div>
                    <div className='overlay'>
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
                            <Button type="primary" onClick={newGame}>new game</Button>
                        </div>
                    }
                    </Space>
                </div>
            }
        </div>
    )
}

export default Blackjack;