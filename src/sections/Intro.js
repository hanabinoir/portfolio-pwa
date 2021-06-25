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
import Wareki from '../utils/Calendar';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    let request = {
      method: HttpMethod.get, 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Host: '127.0.0.1:5000',
        'Accept-Encoding': 'gzip, deflate, br', 
        'Connection': 'keep-alive'
      },
    }
    Http(`basic`, request)
    .then((res) => {
      if (res !== undefined) {
        this.setState({ data: res })
      }
    })
    .finally(() => {
      this.setState({ isLoading: false })
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
    const { data, isLoading } = this.state

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
      const addressParts = [address.town, address.ward, address.city, address.prefecture, address.country]
      const stationAccess = data['transit'].access.map(x => `${x.time} mins ${x.method}`).join(', ')
      const birth = new Date(data['birth'])
      const birthParts = birth.toLocaleDateString('jp-JP', { timeZone: 'Asia/Taipei'}).split('/')
      const birthJP = Wareki(birth)

      colMain = (
        <Col>
          <Card.Body>
            <Container className="intro-container">
              <Row className="title-row">
                <Col><Card.Title>Junior Developer</Card.Title></Col>
              </Row>
              <Row>
                <Col xs={2}><b>住所</b></Col>
                <Col>〒{address['postal_code']}　{addressParts.join(', ')}</Col>
              </Row>
              <Row>
                <Col xs={2}><b>最寄駅</b></Col>
                <Col>{`${data['transit'].line} ${data['transit'].station} Line`}　{stationAccess}</Col>
              </Row>
              <Row>
                <Col xs={2}><b>生年月日</b></Col>
                <Col>{`${birthParts[2]}年${birthParts[0]}月${birthParts[1]}日`}　{birthJP}</Col>
              </Row>
              <Row>
                <Col xs={2}><b>外国人身分</b></Col>
                <Col>国籍：中国<br/>
                在留資格：技術・人文知識・国際業務<br/>
                期限：2021年9月15日</Col>
              </Row>
              <Row>
                <Col xs={2}><b>経験年数</b></Col>
                <Col>2年以上</Col>
              </Row>
              <Row>
                <Col xs={2}><b>個人紹介</b></Col>
                <Col>
                  <Card.Text>
                    中国出身で、カナダでIT関連の専門から卒業し、現在は川崎市在住です。
                    オブジェクト指向プログラミングにおけるWEB系、モバイル系の仕事に自信があり、
                    サーバーでDBの構築、運用、またはWEBのデプロイに経験も所持です。
                    詳細設計から結合テストまでの工程に参画したことがあります。
                  </Card.Text>
                </Col>
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