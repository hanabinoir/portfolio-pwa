import React from "react"
import { Card, Col, Container } from "react-bootstrap"

export default function ColumnView(title, content, xs = 6) {
  return(
    <Col xs={xs}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Container>{content}</Container>
      </Card.Body>
    </Col>
  )
}