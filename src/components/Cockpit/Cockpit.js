import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.module.css';

import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    toggleBtnRef.current.click();
    // Http request here
    setTimeout(() => {
      alert('Saved data to cloud!');
    }, 1000);
    return () => {
      /**
       * Runs before the main useEffect runs,
       * but after the (first) render cycle
       */
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, [props.persons]); // will be executed when our persons changed
  // [] - empty array this tells react that there are no dependencies
  // and it should rerun whenever one of the dependencies changes
  // and will be executed just once

  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>Hello!</h1>
      <p className={assignedClasses.join(' ')}>
        This is the ReactJS Application!
      </p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.toggle}>
        Toggle Persons
      </button>

      <button onClick={authContext.login}>Log In</button>
    </div>
  );
};

export default Cockpit;
