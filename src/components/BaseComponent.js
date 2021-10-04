import { Component } from 'react'

class BaseComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isLoading: true, 
    }
  }
}

export default BaseComponent