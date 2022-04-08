import React from 'react';
import SignIn from "../../components/forms/signIn"
import './style/Home.css'

function Home() {
	return (
		<div className="back">
			<div className="back_wrapper">
				<input type="checkbox" defaultChecked></input>

				<div className="back_panel back_panel_left" data-testid="image-left"></div>
				
				<div className="content">
					<SignIn />
				</div>
				
				<div className="back_panel back_panel_right" data-testid="image-right"></div>
			</div>
		</div>

		
	);
}

export default Home;