import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { FaGithub, FaLinkedin, FaTwitter, FaFileExcel, FaFileWord, FaFilePdf } from 'react-icons/fa'
import { IoDocumentOutline } from 'react-icons/io5'
import { TiContacts, TiMail} from 'react-icons/ti'
import { Linking } from 'react-native';
import validator from 'validator';
import imgHolder from '../../assets/favicon.png';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Intro extends Component {
  constructor(props) {
    super(props)
    
    this.email = "crigshn@gmail.com"
    this.profile = {
      linkedin: "https://www.linkedin.com/in/hanabinoir/", 
      github: "https://github.com/hanabinoir", 
      twitter: "https://twitter.com/HanabiNoir"
    }
  }

  openExternal = (url) => {
    confirmAlert({
      title: "Warning: Opening External Link",
      message: url,
      buttons: [
        {
          label: "Send",
          onClick: () => {
            if (validator.isEmail(url)) {
              url = `mailto:${url}`
            }
            Linking.openURL(url)
          }
        }, 
        {
          label: "Cancel",
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    })
  }

  render() {
    const colImg = (
      <Col className="col-auto">
        <Card.Body>
          <Card.Img src={imgHolder} />
          <Card.Title>Vincent Shen</Card.Title>
          <p className="profile-icons">
          <FaGithub href={this.profile.github} onClick={() => {this.openExternal(this.profile.github)}}/>
          <FaLinkedin href={this.profile.linkedin} onClick={() => {this.openExternal(this.profile.linkedin)}}/>
          <FaTwitter href={this.profile.twitter} onClick={() => {this.openExternal(this.profile.twitter)}}/>
          </p>
          <p className="contact-icons">
            <TiMail/><a href="#" onClick={() => { this.openExternal(this.email) }}>{this.email}</a><br/>
            <IoDocumentOutline/>Resume: <FaFileExcel/>/<FaFilePdf/><br/>
            <IoDocumentOutline/>CV: <FaFileWord/>/<FaFilePdf/><br/>
            <TiContacts/>Contact Me
          </p>
        </Card.Body>
      </Col>
    )
    const colIntro = (
      <Col>
        <Card.Body>
          <Container className="intro-container">
            <Row className="title-row">
              <Col><Card.Title>Junior Developer</Card.Title></Col>
            </Row>
            <Row>
              <Col xs={2}><b>住所</b></Col>
              <Col>〒215-0003　神奈川県　川崎市　麻生区　高石</Col>
            </Row>
            <Row>
              <Col xs={2}><b>最寄駅</b></Col>
              <Col>小田急小田原線　百合ヶ丘　歩き１０分</Col>
            </Row>
            <Row>
              <Col xs={2}><b>生年月日</b></Col>
              <Col>1991年10月19日　平成３年</Col>
            </Row>
            <Row>
              <Col xs={2}><b>外国人身分</b></Col>
              <Col>国籍：中国　
              在留資格：技術・人文知識・国際業務　
              期限：2021年9月15日</Col>
            </Row>
            <Row>
              <Col xs={2}><b>経験年数</b></Col>
              <Col>２年以上</Col>
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

export default Intro