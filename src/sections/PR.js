import React, { Component } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import ColumnView from '../components/ColumnView';

class PR extends Component {

  render() {
    class Lang {
      constructor(abbr, name, level, description) {
        this.abbr = abbr
        this.name = name
        this.level = level
        this.description = description
      }
    }
    const langLv = {
      BEGINNER: "Beginner", 
      CONVERSATIONAL: "Conversational", 
      BUSINESS: "Business", 
      NATIVE: "Native"
    }
    const languages = [
      new Lang("en", "English", langLv.BUSINESS, "Graduated in Canada"),
      new Lang("jp", "Japanese", langLv.BUSINESS, "JTEST A-D 673"),
      new Lang("cn", "Chinese Mandarin", langLv.NATIVE, "Chinese Traditional"),
      new Lang("hk", "Cantonese", langLv.CONVERSATIONAL, "Chinese Traditional"),
      new Lang("kr", "Korean", langLv.BEGINNER, "Able to use dictionary"),
    ]
    const langRows = languages.map(lang => {
      return(
        <Row key={lang.abbr} className="lang-row border-bottom">
          <Col>{lang.name}</Col>
          <Col>
            {lang.level}<br/>
            {lang.description}
          </Col>
        </Row>
      )
    })

    const interests = ["musics", "novels", "fictions", "movies", "videdo games", 
    "linguistics", "geeking"].map((b, i) => {
      return(<Badge key={`badge-${i}`} variant="light" as="button">{b}</Badge>)
    })

    const colLangs = ColumnView("Languages", langRows)
    const colInterests = ColumnView("Interests", interests)

    return (
      <Container>
        <Row>
          {colLangs}
          {colInterests}
        </Row>
      </Container>
    )
  }
}

export default PR