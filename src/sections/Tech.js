import React, { Component } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import Enums, { TechType } from '../utils/Enums';

class Tech extends Component {

  render() {
    var languages = ['C#', 'Swfit', 'PHP', 'JavaScript', 'Java', 'Kotlin', 'Objective-C', 'HTML', 'CSS', 'Python 3']
    var backend = ['.NET Framework', 'Laravel 5', 'Spring Boot']
    var db = ['MySQL', 'MS SQL Server', 'mongodb']
    var frontend = ['vue', 'react']
    var mobile = ['cocoapod', 'UIKit', 'nib/xib', 'cocoa', 'storyboard']
    var os = ['Windows 10', 'Windows Server 2012', 'Ubuntu 14.04 LTS', 'Centos 8', 'macOS', 'iOS', 'Android']
    var servers = ['IIS5', 'IIS7', 'Apache 2', 'Tomcat 8']
    var ides = ['Visual Studio 2017', 'VS Code', 'Xcode', 'Intellij', 'eclipse', 'PyCharm']
    var editors = ['Notepad++', 'Sublime Text 3']
    var other = ['Unity3D', 'jsfiddle']

    
    const backendDivs = []
    //TODO: createDivs function
    // params: item lists
    [backend, db, servers].forEach(items => {
      const badges = items.map(item => {
        return(<Badge variant="light">{item}</Badge>)
      })
      backendDivs.push(<div>{badges}</div>)
    })

    const rows = []
    for (const k of Enums.enumKeys(TechType)) {
      rows.push(
        <Row>
          <Col xs={3}>{TechType[k]}</Col>
          <Col></Col>
        </Row>
      )
      //TODO: switch-cases
      // switch: TechType
      // case: call createDivs
    }
    
    return (
      <Container>
        {rows}
      </Container>
    )
  }
}

export default Tech