import React from 'react';
import classes from './MenuToggle.module.css';

const MenuToggle = props => {
  const cls = [
    classes.MenuToggle,
    'fa',
    props.isOpen ? 'fa-times open' : 'fa-bars',
    props.isOpen ? classes.open : '',
  ];

  return <i className={cls.join(' ')} onClick={props.onToggle} />;
};

export default MenuToggle;
