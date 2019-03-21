import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'List', exact: true },
  { to: '/auth', label: 'Authentication', exact: false },
  { to: '/quiz-creator', label: 'Create Quiz', exact: false },
];

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];
    if (this.props.isOpen) {
      cls.push(classes.open);
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
