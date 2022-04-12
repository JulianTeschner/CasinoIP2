import React from 'react';
import { Space, Button } from 'antd';
import './style/Blackjack.css';

function Blackjack() {
    const [guthaben, setGuthaben] = React.useState<any>(100);

    function handleSubmit(e:any) {
        e.preventDefault();
        
        if(e.target.einsatz.value <= guthaben && e.target.einsatz.value >= 1) {
            setGuthaben(guthaben - e.target.einsatz.value);
            console.log('Einsatz gesetzt:', e.target.einsatz.value);
        } else if(e.target.einsatz.value == 0) {
            console.log('Einsatz ist null');
        } else if(e.target.einsatz.value > guthaben) {
            console.log('Einsatz nicht gesetzt\nEinsatz ist höher als vorhandenes Guthaben:', e.target.einsatz.value);
        }
    }

    return (
        <div>
            <h1>Blackjack</h1>
            <div>
                <div>Guthaben: {guthaben}</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <Space>
                            <label>Einsatz mind. 1 Credit</label>
                            <input type="number" name="einsatz" />
                            <Button type="primary">Spielen</Button>
                        </Space>
                    </form>                    
                </div>
            </div>
        </div>
    )
}

export default Blackjack;