import { Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Title from "antd/lib/typography/Title";
import Popup from "reactjs-popup";

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
                            <Popup trigger={
                                <Card hoverable
                                    cover={<img alt="person1" src={require('./images/platzhalter-person.jpg')} data-testid="person1-card"/>}>
                                    <Row justify="center">
                                        <Meta title="Julian" />
                                    </Row>
                                </Card> 
                            } position="right center" modal closeOnDocumentClick>
                                {(close: any) => (
                                    <div className='modal'>
                                        <div>
                                            <h1>Julian Teschner</h1>
                                        </div>
                                        <div>
                                            <button className="close" onClick={close}></button>
                                        </div>
                                        <div data-testid="g1-text"> Hochschule für Technik Stuttgart</div>
                                        <div data-testid="g1-text"> Studiengang: Bachelor Informatik</div>
                                    </div>
                                    )
                                }
                            </Popup>
                        </Col>
                        <Col sm={{span:24}} md={{span:12}}>
                            <Popup trigger={
                                <Card hoverable 
                                    cover={<img alt="person2" src={require('./images/platzhalter-person.jpg')} data-testid="person2-card"/>}>
                                    <Row justify="center">
                                        <Meta title="Kilian" />
                                    </Row>
                                </Card>
                            } position="right center" modal closeOnDocumentClick>
                                {(close: any) => (
                                    <div className='modal'>
                                        <div>
                                            <h1>Kilian Hammer</h1>
                                        </div>
                                        <div>
                                            <button className="close" onClick={close}></button>
                                        </div>
                                        <div data-testid="g1-text"> Hochschule für Technik Stuttgart</div>
                                        <div data-testid="g2-text"> Studiengang: Bachelor Informatik</div>
                                    </div>
                                    )
                                }
                            </Popup>
                        </Col>
                        <Col sm={{span:24}} md={{span:12}}>
                            <Popup trigger={
                                <Card hoverable
                                    cover={<img alt="person3" src={require('./images/platzhalter-person.jpg')} data-testid="person3-card"/>}>
                                    <Row justify="center">
                                        <Meta title="Marco" />
                                    </Row>
                                </Card>
                            } position="right center" modal closeOnDocumentClick>
                                {(close: any) => (
                                    <div className='modal'>
                                        <div>
                                            <h1>Marco Haas</h1>
                                        </div>
                                        <div>
                                            <button className="close" onClick={close}></button>
                                        </div>
                                        <div data-testid="g1-text"> Hochschule für Technik Stuttgart</div>
                                        <div data-testid="g3-text"> Studiengang: Bachelor Informatik</div>
                                    </div>
                                    )
                                }
                            </Popup>   
                        </Col>
                        <Col sm={{span:24}} md={{span:12}}>
                            <Popup trigger={
                                <Card hoverable 
                                    cover={<img alt="person4" src={require('./images/platzhalter-person.jpg')} data-testid="person4-card"/>}>
                                    <Row justify="center">
                                        <Meta title="Moritz" />
                                    </Row>
                                </Card>
                            } position="right center" modal closeOnDocumentClick>
                                {(close: any) => (
                                    <div className='modal'>
                                        <div>
                                            <h1>Moritz Zucker</h1>
                                        </div>
                                        <div>
                                            <button className="close" onClick={close}></button>
                                        </div>
                                        <div data-testid="g1-text"> Hochschule für Technik Stuttgart</div>
                                        <div data-testid="g4-text"> Studiengang: Bachelor Informatik</div>
                                    </div>
                                    )
                                }
                            </Popup>      
                        </Col>
                    </Row>
                </Col>
            </Row>	
        </div>
        	
	);
}

export default AboutUs;