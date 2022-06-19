import React from 'react';
import './style/Cube.css';
import Cube from 'react-3d-cube';

class Cube3D extends React.Component {
    render() {
        return(
            <div>
                <div 
                    style={{
                        width: 400,
                        height: 400
                    }}
                    data-testid='cube-scene'
                    >
                    <Cube size={300} index="front">
                        <div style={{background:'white', opacity:'90%', width: '300px', height: '300px'}} data-testid="cube-front">
                            <img src='https://www.zebis.ch/sites/default/files/styles/gallery_preview/public/2021-02/wuerfelbild%206.png?itok=mes0CQuG' data-testid="cube-six"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testid="cube-right">
                            <img src='https://www.zebis.ch/sites/default/files/styles/gallery_preview/public/2021-02/wuerfelbild%202.png?itok=ejBfH5UQ' data-testid="cube-two"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testid="cube-back">
                            <img src='https://www.zebis.ch/sites/default/files/2021-02/wuerfelbild%201.png' data-testid="cube-one"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testid="cube-left">
                            <img src='https://www.zebis.ch/sites/default/files/2021-02/wuerfelbild%205.png' data-testid="cube-five"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testid="cube-top">
                            <img src='https://www.zebis.ch/sites/default/files/styles/gallery_preview/public/2021-02/wuerfelbild%204.png?itok=WSXiB2Mx' data-testid="cube-four"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testid="cube-bottom">
                            <img src='https://www.zebis.ch/sites/default/files/styles/gallery_preview/public/2021-02/wuerfelbild%203.png?itok=Gj4eF2CV' data-testid="cube-three"></img>
                        </div>
                    </Cube>
                </div>
            </div>
        );
    }
    
}
export default Cube3D;