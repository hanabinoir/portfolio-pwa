import React from "react";
import { useEffect, useState } from "react";
import { Col, Card, Container, Row } from "react-bootstrap";
import { Translation } from 'react-i18next';
import { ActivityIndicator } from "react-native";
import Http, { MakeRequest } from "../../components/Http";
import { Experience, LocalTime, Wareki } from "../../utils/Calendar";

export default function Profile({ lang }) {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    const request = MakeRequest()
    Http(`profile?lang=${encodeURIComponent(lang)}`, request)
    .then((res) => {
      if (res !== undefined) {
        setData(res)
      }
    })
    .finally(() => setLoading(false))
  }, [lang])

  // Init the layout
  let ItemList
  const MainContent = () => (
    <Col>
      <Card.Body>
        <Container className="intro-container">
          <Row className="title-row">
            <Col><Card.Title>{ data['title'] }</Card.Title></Col>
          </Row>
          { data['is_error'] 
          ? <p>Failed to load</p> 
          : isLoading 
          ? <ActivityIndicator /> 
          : <ItemList /> }
        </Container>
      </Card.Body>
    </Col>
  )

  // Loading or error: return the layout
  if (isLoading || data['is_error']) {
    return (<MainContent />)
  }

  // Finished loading: display the data with the layout
  // Address
  const address = data.address
  let strAddress, transit, stationAccess, strBirth, validity
  const addressParts = [address.city, address.prefecture, address.country]
  transit = `${data['transit'].line} ${data['transit'].station}`
  // Birthday, Identity
  const birth = new Date(data['birth'])
  const identity = data['identity']
  // Intro: as paragraphs
  const txtIntro = []
  data['summary'].split('\\n\\n').forEach((e, i) => {
    txtIntro.push(<p key={i}>{e}</p>)
  })

  // Create the strings and determine the width
  let colItemWidth
  if (lang == 'jp') {
    addressParts.pop()
    strAddress = addressParts.reverse().join(' ')
    stationAccess = data['transit'].access.map(x => `${x.method}${x.time}分`).join(', ')
    strBirth = LocalTime(birth)
    validity = LocalTime(new Date(identity['expire_on']))
    colItemWidth = 2
  } else {
    strAddress = addressParts.join(', ')
    transit += ' Line'
    stationAccess = data['transit'].access.map(x => `${x.time} mins ${x.method}`).join(', ')
    strBirth = LocalTime(birth, 'en-US', 'Asia/Taipei')
    validity = LocalTime(new Date(identity['expire_on']), 'en-US', 'Japan')
    colItemWidth = 3
  }

  // Inside layouts
  // Row
  const ItemRow = (props) => {
    const { name, val } = props.item
    return (<Row>
      <Translation>
        { t => 
          <Col xs= { props.width }>
            <b>{ t(name) }</b>
          </Col>
        }
      </Translation>
      <Col>{ val }</Col>
    </Row>)
  }

  // Identity row details
  const idStatus = ( 
    <Translation>
      { t => 
        <div>
          {t('nationality')}：{identity['nationality']}<br/>
          {t('visa')}：{identity['visa']}<br/>
          {t('validity')}：{validity}
        </div>
      }
    </Translation>
  )

  // Row details
  const items = [
    { name: "address", val: `〒${address['postal_code']} ${strAddress}` }, 
    { name: "transit", val: `${transit} ${stationAccess}`}, 
    { name: "birth", val: `${strBirth} (${Wareki(birth, lang)})` }, 
    { name: "identity", val: idStatus }, 
    { name: "experience", val: Experience(data['experience'], lang) }, 
    { name: "intro", val: txtIntro}
  ]
  
  // Rows
  ItemList = () => (
    items.map((item, i) => (<ItemRow key={ `row-${i}` } 
      width={ colItemWidth }
      item={ item }/>))
  )

  return (<MainContent />)
}