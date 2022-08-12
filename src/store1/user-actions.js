import axios from "axios";
import { toast } from "react-toastify";
import Alerto from "../components/Alerto";
import { userActions } from "./user-slice";
export const Refresh = () => {
  return (dispatch) => {
    let isAdmin = localStorage.getItem("isAdmin");
    let token = localStorage.getItem("token");
    if (token) {
      isAdmin == true || isAdmin == "true"
        ? dispatch(getEntries())
        : dispatch(getUserEntry());
    }
  };
};
export const getEntries = () => {
  return (dispatch) => {
    axios
      .get("entry")
      .then((res) => {
        dispatch(userActions.storeEntry(res.data));
      })
      .catch((e) => {
        Alerto(e);
      });
  };
};
export const Login = (data) => {
  return (dispatch) => {
    axios
      .post("login", data)
      .then((res) => {
      
        dispatch(userActions.login(res.data));
      })
      .catch((e) => {
        Alerto(e);
      });
  };
};
export const Register = (data) => {
  return () => {
    axios
      .post(`user`, data)

      .catch((e) => {
        Alerto(e);
      });
  };
};
export const postUserEntry = (data) => {
  return (dispatch) => {
    axios
      .post(`entry`, data)
      .then((res) => dispatch(Refresh()))
      .catch((e) => {
        Alerto(e);
      });
  };
};
export const getUserEntry = (data) => {
  return (dispatch) => {
    axios
      .get(`user/entry`)
      .then((res) => {
        dispatch(userActions.storeEntry(res.data));
      })
      .catch((e) => {
        Alerto(e);
      });
  };
};
export const UpdateEntry = (body) => {
  return (dispatch) => {
    axios
      .patch("entry/update", body)
      .then((res) => dispatch(Refresh()))
      .catch((e) => Alerto(e));
  };
};
export const DeletRntry = (id) => {
  return (dispatch) => {
    axios
      .delete(`/entry/delete/${id}`)
      .then((res) => dispatch(Refresh()))
      .catch((e) => Alerto(e));
  };
};
