import React from 'react';
import SignIn from "../../components/forms/signIn";
import Cube3D from '../../components/Cube/Cube';
import { Row, Col } from 'antd';
import './style/Home.css';

function Home() {
	return (
		<div className="back">
			<div className="back_wrapper">
				<input type="checkbox" defaultChecked></input>

				<div className="back_panel back_panel_left" data-testid="image-left"></div>
				<div className="content">
					<Row style={{width: '70%'}}>
						<Col span={12}>
							<Cube3D />
						</Col>
						<Col span={10} offset={2}>
							<SignIn />
						</Col>
					</Row>
				</div>
				
				<div className="back_panel back_panel_right" data-testid="image-right"></div>
			</div>
		</div>

		
	);
}

export default Home;