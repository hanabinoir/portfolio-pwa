import React, { Component } from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { FaGithub, FaLinkedin, FaTwitter, FaFileExcel, FaFileWord, FaFilePdf } from 'react-icons/fa'
import { IoDocumentOutline } from 'react-icons/io5'
import { TiContacts, TiMail} from 'react-icons/ti'
import { ActivityIndicator, Linking } from 'react-native';
import validator from 'validator';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Http from '../components/Http';
import { HttpMethod } from '../utils/Enums';
import '../utils/i18n';
import { Wareki, Experience, LocalTime } from '../utils/Calendar';
import { Translation } from 'react-i18next';
import { GetLanguage } from '../utils/i18n';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true, 
      lang: '',
    };
  }

  componentDidMount() {

    const lang = GetLanguage()
    const request = {
      method: HttpMethod.get, 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const langParam = encodeURIComponent(lang.toUpperCase())
    Http(`basic?lang=${langParam}`, request)
    .then((res) => {
      if (res !== undefined) {
        this.setState({ data: res })
      }
    })
    .finally(() => {
      this.setState({ 
        isLoading: false, 
        lang: lang 
      })
    })
  }

  openExternal = (url) => {
    const isEmailAddr = validator.isEmail(url)
    const lblOK = isEmailAddr ? "Send" : "Open"

    confirmAlert({
      title: "Warning: Opening External Link",
      message: url,
      buttons: [
        {
          label: "Cancel",
        },
        {
          label: lblOK,
          onClick: () => {
            if (isEmailAddr) {
              url = `mailto:${url}`
            }
            Linking.openURL(url)
          }
        }, 
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    })
  }

  render() {
    const { data, isLoading, lang } = this.state

    // Layouts
    let colLeft
    let colMain

    if (!isLoading) {
      // Left Side
      const address = data['address']
      const media = data['media']
      const contact = data['contact']

      colLeft = (
        <Col className="col-auto">
          <Card.Body>
            <Card.Img src={require('../../assets/avatar_160x160.jpg')} />
            <Card.Title>Vincent Shen</Card.Title>
            <div className="profile-icons">
              <FaGithub onClick={() => {this.openExternal(media['github'])}}/>
              <FaLinkedin onClick={() => {this.openExternal(media['linkedin'])}}/>
              <FaTwitter onClick={() => {this.openExternal(media['twitter'])}}/>
            </div>
            <div className="contact-icons">
              <TiMail/><a href="#" onClick={() => { this.openExternal(contact.email) }}>{contact.email}</a><br/>
              <IoDocumentOutline/>CV: <FaFileWord/>/<FaFilePdf/><br/>
              <IoDocumentOutline/>履歴書: <FaFileExcel/>/<FaFilePdf/><br/>
              <IoDocumentOutline/>職務経歴書: <FaFileWord/>/<FaFilePdf/><br/>
              <TiContacts/>Contact Me
            </div>
          </Card.Body>
        </Col>
      )

      // Main Content
      let strAddress, transit, stationAccess, strBirth, validity
      const addressParts = [address.town, address.ward, address.city, address.prefecture, address.country]
      transit = `${data['transit'].line} ${data['transit'].station}`
      const birth = new Date(data['birth'])
      const identity = data['identity']

      if (lang == 'jp') {
        addressParts.pop()
        strAddress = addressParts.reverse().join(' ')
        stationAccess = data['transit'].access.map(x => `${x.method}${x.time}分`).join(', ')
        strBirth = LocalTime(birth)
        validity = LocalTime(new Date(identity['expire_on']))
      } else {
        strAddress = addressParts.join(', ')
        transit += ' Line'
        stationAccess = data['transit'].access.map(x => `${x.time} mins ${x.method}`).join(', ')
        strBirth = LocalTime(birth, 'en-US', 'Asia/Taipei')
        validity = LocalTime(new Date(identity['expire_on']), 'en-US', 'Japan')
      }

      const txtIntro = []
      data['summary'].split('\n\n').forEach(e => {
        txtIntro.push(<Card.Text>{e}<br/></Card.Text>)
      })
      
      colMain = (
        <Col>
          <Card.Body>
            <Container className="intro-container">
              <Row className="title-row">
                <Col><Card.Title>Junior Developer</Card.Title></Col>
              </Row>
              <Row>
                <Translation>{ t => <Col xs={3}><b>{t('address')}</b></Col>}</Translation>
                <Col>〒{address['postal_code']}　{strAddress}</Col>
              </Row>
              <Row>
                <Translation>{ t => <Col xs={3}><b>{t('transit')}</b></Col>}</Translation>
                <Col>{transit}　{stationAccess}</Col>
              </Row>
              <Row>
                <Translation>{ t => <Col xs={3}><b>{t('birth')}</b></Col>}</Translation>
                <Col>{strBirth}　{Wareki(birth, lang)}</Col>
              </Row>
              <Row>
                <Translation>{ t => <Col xs={3}><b>{t('identity')}</b></Col>}</Translation>
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
                <Translation>{ t => <Col xs={3}><b>{t('experience')}</b></Col>}</Translation>
                <Col>{Experience(data['experience'], lang)}</Col>
              </Row>
              <Row>
                <Translation>{ t => <Col xs={3}><b>{t('intro')}</b></Col>}</Translation>
                <Col>{ txtIntro }</Col>
              </Row>
            </Container>
          </Card.Body>
        </Col>
      )
    }
    
    return (
      <Container>
        { isLoading ? <ActivityIndicator/> :
        <Row>
          <Alert style={{ display: data['is_error'] ? 'block' : 'none' }}
              variant='warning'>{data['status']}: 
              {data['msg']}</Alert>
            {colLeft}
            {colMain}
          </Row>}
      </Container>
    )
  }
}

export default Intro