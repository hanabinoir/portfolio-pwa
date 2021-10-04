import React, { useState } from 'react';
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
import i18n, { GetLanguage } from './src/utils/i18n';

export default function App() {
  const [lang, setLang] = useState(GetLanguage())

  const toggleLang = () => {
    const newLang = lang === 'jp' ? 'en' : 'jp'
    i18n.changeLanguage(newLang)
    setLang(newLang)
  }

  const section = (item) => {
    switch(item) {
      case NavItem.intro:
        return(<Intro lang={lang} />)
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
      <SmoothNavBar onLangChange={toggleLang} />
      {sections}
    </Container>
  );
}
