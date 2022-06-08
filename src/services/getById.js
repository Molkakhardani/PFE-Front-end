import axios from "axios";
import setAuthToken from "../store/utility/utility";

const getById = async (dataType, id) => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);
  try {
    const { data } = await axios.get(`http://localhost:5000/api/user/${dataType}/${id}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default getById;
