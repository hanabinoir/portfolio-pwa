import React from 'react';
import { Container } from 'react-bootstrap';
import Section from './src/components/Section';
import SmoothNavBar from './src/components/SmoothNavBar';
import Enums, { NavItem } from './src/utils/Enums';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Intro from './src/sections/intro/Intro';
import Tech from './src/sections/Tech';
import PR from './src/sections/pr';
import Projects from './src/sections/Projects';

export default function App() {
  const section = (item) => {
    switch(item) {
      case NavItem.intro:
        return(<Intro/>)
      case NavItem.techs:
        return(<Tech/>)
      case NavItem.pr:
        return(<PR/>)
      case NavItem.projects:
        return(<Projects/>)
    }
  }
  const sections = []
  for (const k of Enums.enumKeys(NavItem)) {
    const v = NavItem[k]
    sections.push(
      Section(k, v, section(v))
    )
  }

  return (
    <Container>
      <SmoothNavBar />
      {sections}
    </Container>
  );
}
