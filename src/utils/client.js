import axios from "axios";
import Cookies from "js-cookie";

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_LOCAL;
  } else {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API;
  }

const token = Cookies.get("pokefight-token");

if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios