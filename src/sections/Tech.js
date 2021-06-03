import React, { Component } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import Enums, { TechType } from '../utils/Enums';

class Tech extends Component {

  render() {
    var languages = ['C#', 'Swfit', 'PHP', 'JavaScript', 'Java', 'Kotlin', 'Objective-C', 'HTML', 'CSS', 'Python 3']
    var backend = ['NET Framework', 'Laravel 5', 'Spring Boot']
    var db = ['MySQL', 'MS SQL Server', 'mongodb']
    var servers = ['IIS5', 'IIS7', 'Apache 2', 'Tomcat 8']
    var frontend = ['vue', 'react']
    var mobile = ['cocoapod', 'UIKit', 'nib/xib', 'cocoa', 'storyboard']
    var os = ['Windows 10', 'Windows Server 2012', 'Ubuntu 14.04 LTS', 'Centos 8', 'macOS', 'iOS', 'Android']
    var ides = ['Visual Studio 2017', 'VS Code', 'Xcode', 'Intellij', 'eclipse', 'PyCharm']
    var editors = ['Notepad++', 'Sublime Text 3']
    var other = ['Unity3D', 'jsfiddle']

    const createDivs = (techList) => {
      const divs = []
      var stackIdx = 1
      techList.forEach(items => {
        const badges = items.map(item => {
          const k = item.split(' ').map(w => w.toLowerCase()).join('-')
          return(<Badge key={k} variant="light" as="button">{item}</Badge>)
        })
        divs.push(<div key={"stack-"+stackIdx}>{badges}</div>)
        stackIdx++
      })
      return divs
    }

    const rows = []
    for (const k of Enums.enumKeys(TechType)) {
      const v = TechType[k]
      var techList = []
      switch(v) {
        case TechType.langs:
          techList = [languages]
          break
        case TechType.backend:
          techList = [backend, db, servers]
          break
        case TechType.frontend:
          techList = [frontend, mobile]
          break
        case TechType.os:
          techList = [os]
          break
        case TechType.tools:
          techList = [ides, editors, other]
          break
        default:
          break
      }
      const techDivs = createDivs(techList)
      const rowKey = v.split(' ').map(w => w.toLowerCase()).join('-')
      rows.push(
        <Row key={rowKey} className="tech-row">
          <Col xs={3}><Card.Subtitle>{v}</Card.Subtitle></Col>
          <Col>{techDivs}</Col>
        </Row>
      )
    }
    
    return (
      <Container className="tech-container">
        {rows}
      </Container>
    )
  }
}

export default Tech