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
                    data-testId='cube-scene'
                    >
                    <Cube size={300} index="front">
                        <div style={{background:'white', opacity:'90%', width: '300px', height: '300px'}} data-testId="cube-front">
                            <img src='https://www.zebis.ch/sites/default/files/styles/gallery_preview/public/2021-02/wuerfelbild%206.png?itok=mes0CQuG' data-testId="cube-six"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testId="cube-right">
                            <img src='https://www.zebis.ch/sites/default/files/styles/gallery_preview/public/2021-02/wuerfelbild%202.png?itok=ejBfH5UQ' data-testId="cube-two"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testId="cube-back">
                            <img src='https://www.zebis.ch/sites/default/files/2021-02/wuerfelbild%201.png' data-testId="cube-one"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testId="cube-left">
                            <img src='https://www.zebis.ch/sites/default/files/2021-02/wuerfelbild%205.png' data-testId="cube-five"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testId="cube-top">
                            <img src='https://www.zebis.ch/sites/default/files/styles/gallery_preview/public/2021-02/wuerfelbild%204.png?itok=WSXiB2Mx' data-testId="cube-four"></img>
                        </div>
                        <div style={{background: 'white', opacity:'90%', width: '300px', height: '300px'}} data-testId="cube-bottom">
                            <img src='https://www.zebis.ch/sites/default/files/styles/gallery_preview/public/2021-02/wuerfelbild%203.png?itok=Gj4eF2CV' data-testId="cube-three"></img>
                        </div>
                    </Cube>
                </div>
            </div>
        );
    }
    
}
export default Cube3D;