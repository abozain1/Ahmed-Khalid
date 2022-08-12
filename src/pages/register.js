import classes from "./register.module.css";
import { Fragment, useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";

import { Login, Register } from "../store1/user-actions";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { createAction } from "@reduxjs/toolkit";
import Alerto from "../components/Alerto";
export const Registerpage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, setlogin] = useState(true);
  const authctx = "";
  const [nameState, setNameState] = useState();
  const [passstate, setpassstate] = useState();
  const [emailstate, setemailstate] = useState();
  const [nameIsValid, setNameIsValid] = useState({ input: true, func: false });
  const [emailisvalid, setemailisvalid] = useState({
    input: true,
    func: false,
  });
  const [passisvalid, setpassisvalid] = useState({ input: true, func: false });

  const enteredemail = useRef();
  const enteredpass = useRef();
  const enteredName = useRef();

  const emailvalidation = () => {
    const email = enteredemail.current.value;
    const emailvalid = email.match(
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]+)$/
    );
    if (!emailvalid) {
      setemailisvalid({
        input: false,
        func: false,
      });
    }
    if (emailvalid) {
      setemailisvalid({
        input: true,
        func: true,
      });
    }
    setemailstate(email);
  };
  const Idvalidation = () => {
    const name = enteredName.current.value;
    const namevalid = name.match(/^[A-Za-z][A-Za-z0-9_]{1,10}$/);
    if (!namevalid) {
      setNameIsValid({
        input: false,
        func: false,
      });
    }
    if (namevalid) {
      setNameIsValid({
        input: true,
        func: true,
      });
    }
    setNameState(name);
  };
  const passvalidation = () => {
    const pass = enteredpass.current.value;
    const passvalid = pass.match(/^\d{4,}$/);
    if (!passvalid) {
      setpassisvalid({
        input: false,
        func: false,
      });
    }
    if (passvalid) {
      setpassisvalid({
        input: true,
        func: true,
      });
    }
    setpassstate(pass);
  };
  const formisvalid = passisvalid.func && nameIsValid.func && emailisvalid.func;
  const formisvalid2 = passisvalid.func && emailisvalid.func;

  const switchhandler = () => {
    setlogin(!login);

    setNameIsValid({
      input: true,
      func: false,
    });
    setpassisvalid({
      input: true,
      func: false,
    });
    setemailisvalid({
      input: true,
      func: false,
    });
  };

  const formsubmithandler = (e) => {
    try {
      e.preventDefault();

      let data = { email: emailstate, password: passstate, name: nameState };

      login ? dispatch(Register(data)) : dispatch(Login(data));
      login && setlogin(false);
    } catch (e) {
      Alerto(e);
    }
  };
  return (
    <Fragment>
      {login && (
        <Form className={classes.form}>
          <div className={classes.headline}>
            <p onClick={switchhandler} className={classes.headlinetext}>
              SignUp
            </p>
          </div>
          {!nameIsValid.input && (
            <p className={classes.invalid}>Enter a valid Name</p>
          )}
          {/* <div className={classes.forminputholder}> */}
          <Form.Group className={classes.forminput}>
            <Form.Control
              onChange={Idvalidation}
              ref={enteredName}
              type="name"
              placeholder="enter your Name"
            />
          </Form.Group>

          {/* </div> */}

          <Form.Group className={classes.forminput2}>
            {!emailisvalid.input && (
              <p className={classes.invalid}>Enter a valid Email</p>
            )}
            <Form.Control
              onChange={emailvalidation}
              ref={enteredemail}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className={classes.forminput2}>
            {!passisvalid.input && (
              <p className={classes.invalid}>
                Password must contain at least 4 numbers,no characters allowed
              </p>
            )}
            <Form.Control
              onChange={passvalidation}
              ref={enteredpass}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <button
            disabled={!formisvalid}
            onClick={formsubmithandler}
            className={`${classes.btn} ${formisvalid ? "" : classes.disable}`}
          >
            register
          </button>
        </Form>
      )}
      <ToastContainer theme="colored" autoClose={4000} />
      {!login && (
        <Form className={classes.form}>
          <div className={classes.headline}>
            <p onClick={switchhandler} className={classes.headlinetext}>
              {" "}
              Login
            </p>
          </div>

          <Form.Group className={classes.forminput2}>
            {!emailisvalid.input && (
              <p className={classes.invalid}>Enter a valid Email</p>
            )}
            <Form.Control
              onChange={emailvalidation}
              value={emailstate}
              ref={enteredemail}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className={classes.forminput2}>
            {!passisvalid.input && (
              <p className={classes.invalid}>
                Password must contain at least 4 numbers,no characters allowed
              </p>
            )}
            <Form.Control
              onChange={passvalidation}
              value={passstate}
              ref={enteredpass}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <button
            disabled={!formisvalid2}
            onClick={formsubmithandler}
            className={`${classes.btn} ${formisvalid2 ? "" : classes.disable}`}
          >
            login
          </button>
        </Form>
      )}
    </Fragment>
  );
};

export default Registerpage;
