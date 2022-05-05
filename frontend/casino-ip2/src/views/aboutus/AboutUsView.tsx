import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Title from "antd/lib/typography/Title";

function AboutUs() {
	return (
        <div>
            <Row>
                <Col span={12} offset={6}>
                    <div className="AboutUs">
                        <Title>
                            About Us
                        </Title>
                    </div>
             
                    <Row gutter={[18,18]}>
                        <Col sm={{span:24}} md={{span:12}}>
                            <Card hoverable
                                cover={<img alt="person1" src={require('./images/platzhalter-person.jpg')} height="260px" data-testId="person1-card"/>}>
                                <Row justify="center">
                                    <Meta title="Julian" />
                                </Row>
                            </Card>
                        </Col>
                        <Col sm={{span:24}} md={{span:12}}>
                            <Card hoverable 
                                cover={<img alt="person2" src={require('./images/platzhalter-person.jpg')} height="260px" data-testId="person2-card"/>}>
                                <Row justify="center">
                                    <Meta title="Kilian" />
                                </Row>
                            </Card>
                        </Col>
                        <Col sm={{span:24}} md={{span:12}}>
                            <Card hoverable
                                cover={<img alt="person3" src={require('./images/platzhalter-person.jpg')} height="260px" data-testId="person3-card"/>}>
                                <Row justify="center">
                                    <Meta title="Marco" />
                                </Row>
                            </Card>
                        </Col>
                        <Col sm={{span:24}} md={{span:12}}>
                            <Card hoverable 
                                cover={<img alt="person4" src={require('./images/platzhalter-person.jpg')} height="260px" data-testId="person4-card"/>}>
                                <Row justify="center">
                                    <Meta title="Moritz" />
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>	
        </div>
        	
	);
}

export default AboutUs;