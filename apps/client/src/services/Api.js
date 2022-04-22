import axios from "axios";
import { findAll } from "../../../server/services/cars";

export default () => {
  return axios.create({
    baseURL: "http://localhost:2000/",
  });
};
axios.get('/employees')
  .then(findAll (data.axios.JSON) {
    // handle success
    console.log(data);
  })
