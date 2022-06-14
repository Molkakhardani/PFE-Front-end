import axios from "axios";
import setAuthToken from "../store/utility/utility";

export const getById = async (dataType, id) => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);
  try {
    const { data } = await axios.get(`http://localhost:5000/api/user/${dataType}/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getMessageById = async (id) => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);
  try {
    const { data } = await axios.get(`http://localhost:5000/api/message/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteMessageById = async (id, router) => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);
  try {
    await axios.delete(`http://localhost:5000/api/message/delete-message/${id}`);
    router.push("/messages");
  } catch (err) {
    console.error(err);
  }
};

export const updatePassword = async (updatedData) => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);

  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/user/update-password`,
      updatedData
    );
    return { data };
  } catch (err) {
    console.error(err);
    return { err };
  }
};
