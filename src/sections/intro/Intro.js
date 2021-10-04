import React from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { ActivityIndicator } from 'react-native';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Http, { MakeRequest } from '../../components/Http';
import Profile from './Profile';
import Contact from './Contact';
import BaseComponent from '../../components/BaseComponent';

class Intro extends BaseComponent {
  componentDidMount() {
    this.fetchContent()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang === this.props.lang) return
    this.fetchContent()
  }

  fetchContent() {
    this.setState({ isLoading: true })
    const request = MakeRequest()
    Http(`basic?lang=${encodeURIComponent(this.props.lang)}`, request)
    .then((res) => {
      if (res !== undefined) {
        this.setState({ data: res })
      }
    })
    .finally(() => {
      this.setState({ isLoading: false })
    })
  }

  render() {
    const { data, isLoading } = this.state
    const { lang } = this.props

    let colLeft

    if (!isLoading && !data['is_error']) {

      const txtName = lang.includes('en') 
        ? (<Card.Title>{data['first_name']} {data['last_name']}</Card.Title>)
        : (<div>
          <Card.Subtitle className="text-muted furigana">{data['last_name_jp']} {data['first_name_jp']}</Card.Subtitle>
          <Card.Title className="sino-name">{data['last_name']} {data['first_name']}</Card.Title>
        </div>)

      colLeft = (
        <Col className="col-auto">
          <Card.Body>
            <Card.Img src={require('../../../assets/avatar_160x160.jpg')} />
            {txtName}
            <Contact/>
          </Card.Body>
        </Col>
      )
    }
    return (
      <Container>
        <Row>
          <Alert style={{ display: data['is_error'] ? 'block' : 'none' }}
              variant='warning'>{data['status']}: 
              {data['msg']}</Alert>
            { isLoading ? <ActivityIndicator/> : colLeft }
            <Profile lang={lang} />
        </Row>
      </Container>
    )
  }
}

export default Intro