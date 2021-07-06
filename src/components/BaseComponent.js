import { Component } from 'react'
import i18n, { GetLanguage } from '../utils/i18n'

class BaseComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isLoading: true, 
      lang: GetLanguage(),
    }
  }

  switchLanguage = (e) => {
    e.preventDefault()
    const current = GetLanguage()
    const target = current == 'en' ? 'jp' : 'en'
    i18n.changeLanguage(target)
    this.setState({ lang: target })
  }
}

export default BaseComponent