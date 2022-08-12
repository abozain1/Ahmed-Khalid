import Registerpage from "./pages/register";
import { Route, Switch, Redirect } from "react-router-dom";

import {  useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Homepage2 from "./pages/home2";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store1/user-slice";
import axios from "axios";
function App() {
  const token = useSelector((state) => state).token;
  axios.defaults.baseURL = "http://localhost:3000/";
  axios.defaults.headers.common["x-auth-token"] = token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const logged = useSelector((state) => state).isLogged;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.checkLogin());

  }, []);
  return (
    <div>
      <ToastContainer />
      <Switch>
       

        {logged && (
          <Route path="/home">
            <Homepage2 />
          </Route>
        )}

        {!logged && (
          <Route path="/register">
            <Registerpage />
          </Route>
        )}

        {!logged && (
          <Route path="*">
            <Redirect to="/register" />
          </Route>
        )}
        {logged && (
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
