import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Container } from 'react-bootstrap';
import { StyleSheet, Text, View } from 'react-native';
import loremIpsum from './assets/LoremIpsum';
import Section from './src/components/Section';
import SmoothNavBar from './src/components/SmoothNavBar';
import Enums, { NavItem } from './src/utils/Enums';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const sections = []
  for (const k of Enums.enumKeys(NavItem)) {
    sections.push(
      Section(k, NavItem[k], loremIpsum)
    )
  }

  return (
    <Container>
      <SmoothNavBar />
      {sections}
    </Container>
  );
}
