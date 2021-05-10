import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import loremIpsum from '../../assets/LoremIpsum';
import imgHolder from '../../assets/favicon.png';

class Holder extends Component {

  render() {
    const colImg = (
      <Col className="col-auto">
        <Card.Body>
          <Card.Img src={imgHolder} />
          <Card.Title>Vincent Shen</Card.Title>
        </Card.Body>
      </Col>
    )
    const colIntro = (
      <Col>
        <Card.Body>
          <Card.Title>Junior Developer</Card.Title>
          <Card.Text>{loremIpsum}</Card.Text>
        </Card.Body>
      </Col>
    )
    return (
      <Container>
        <Row>
          {colImg}
          {colIntro}
        </Row>
      </Container>
    )
  }
}

export default Holder