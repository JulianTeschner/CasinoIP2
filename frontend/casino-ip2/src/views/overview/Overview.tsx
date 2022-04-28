import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { RouteName } from "../../routes/routesnames";

const { Meta } = Card;
const { Title } = Typography;

function Overview() {
	return (
		<Row>
      		<Col span={12} offset={6}>
				<div className="Overview">
					<Title>
            			Overview
        			</Title>

					<Title level={2}>
						Games
					</Title>
					<Row gutter={[18,18]}>
						<Col sm={{span:24}} md={{span:12}}>
							<Link to={`${RouteName.HOME}`}>
								<Card hoverable
									cover={<img alt="blackjack" src={require('./images/blackjack.jpg')} height="260px"/>}>
										<Row justify="center">
											<Meta title="Blackjack" />
										</Row>
								</Card>
          					</Link>
						</Col>
						<Col sm={{span:24}} md={{span:12}}>
							<Link to={`${RouteName.HOME}`}>
								<Card hoverable 
									cover={<img alt="slotmachine" src={require('./images/slotmaschine.jpg')} height="260px"/>}>
										<Row justify="center">
											<Meta title="Slotmachine" />
										</Row>
										
								</Card>
          					</Link>
						</Col>
					</Row>
				</div>
      		</Col>
    	</Row>
		
		

	);
}

export default Overview;