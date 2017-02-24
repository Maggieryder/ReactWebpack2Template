import React, {Component} from 'react'
import Menu from './menu.jsx'
import styles from '../css/container.css'

class Container extends Component {
  render() {
    return(
      <div className={styles.container}>
        <Menu/>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default Container
