import React from "react";
import { useEffect, useState } from "react";
import { Col, Card, Container, Row } from "react-bootstrap";
import { Translation } from 'react-i18next';
import { ActivityIndicator } from "react-native";
import Http, { MakeRequest } from "../../components/Http";
import { Experience, LocalTime, Wareki } from "../../utils/Calendar";
import { GetLanguage } from '../../utils/i18n';

export default function Profile(lng) {

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const lang = lng ?? GetLanguage()

  useEffect(() => {
    const request = MakeRequest()
    Http(`profile?lang=${encodeURIComponent(lang)}`, request)
    .then((res) => {
      if (res !== undefined) {
        setData(res)
      }
    })
    .finally(() => setLoading(false))
  }, [])

  let mainContent
  if (!isLoading && !data['is_error']) {
    const address = data.address

    let strAddress, transit, stationAccess, strBirth, validity
    const addressParts = [address.town, address.ward, address.city, address.prefecture, address.country]
    transit = `${data['transit'].line} ${data['transit'].station}`
    const birth = new Date(data['birth'])
    const identity = data['identity']

    const txtIntro = []
    data['summary'].split('\\n\\n').forEach((e, i) => {
      txtIntro.push(<p key={i}>{e}</p>)
    })

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

    mainContent = (
      <Container className="intro-container">
        <Row className="title-row">
          <Col><Card.Title>{ data['title'] }</Card.Title></Col>
        </Row>
        <Row>
          <Translation>{ t => <Col xs={ colItemWidth }><b>{t('address')}</b></Col>}</Translation>
          <Col>〒{address['postal_code']}　{strAddress}</Col>
        </Row>
        <Row>
          <Translation>{ t => <Col xs={ colItemWidth }><b>{t('transit')}</b></Col>}</Translation>
          <Col>{transit}　{stationAccess}</Col>
        </Row>
        <Row>
          <Translation>{ t => <Col xs={ colItemWidth }><b>{t('birth')}</b></Col>}</Translation>
          <Col>{strBirth}　{Wareki(birth, lang)}</Col>
        </Row>
        <Row>
          <Translation>{ t => <Col xs={ colItemWidth }><b>{t('identity')}</b></Col>}</Translation>
          <Translation>
            { t => 
              <Col>
                {t('nationality')}：{identity['nationality']}<br/>
                {t('visa')}：{identity['visa']}<br/>
                {t('validity')}：{validity}
              </Col>
            }
          </Translation>
          
        </Row>
        <Row>
          <Translation>{ t => <Col xs={ colItemWidth }><b>{t('experience')}</b></Col>}</Translation>
          <Col>{Experience(data['experience'], lang)}</Col>
        </Row>
        <Row>
          <Translation>{ t => <Col xs={ colItemWidth }><b>{t('intro')}</b></Col>}</Translation>
          <Col>{ txtIntro }</Col>
        </Row>
      </Container>
    )
  }
  

  return(<Col>{ isLoading 
    ? <ActivityIndicator/> 
    : <Card.Body>{mainContent}</Card.Body> }</Col>)
}