import React from "react"
import { Card } from "react-bootstrap"

export default function Section(id, title, content) {
  return(
    <Card key={id} id={id}>
      <Card.Header>{title}</Card.Header>
      {content}
    </Card>
  )
}