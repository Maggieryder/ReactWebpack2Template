import React, {PropTypes, Component} from 'react'
import styles from '../css/menu.scss'


class Menu extends Component {
  render(){
    return (
      <nav className={styles}>
        <h1>Navigation</h1>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </nav>
    )
  }
}

export default Menu
