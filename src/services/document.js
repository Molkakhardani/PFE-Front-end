import axios from "axios";
import setAuthToken from "../store/utility/utility";

export const sendDocument = async (documentData, router) => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const { file, ...data } = documentData || {};

  const fd = new FormData();
  fd.append("iShareDocument", file[0]);

  fd.append("data", JSON.stringify(data));

  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/document/new-document`,
      fd,
      config
    );
    router.push("/documents");
    return { data };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

export const getUserDocuments = async (messageData) => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);
  try {
    const { data = {} } = await axios.get("http://localhost:5000/api/document/my-documents");
    return data;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

export const deleteDocumentById = async (id, router) => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);
  try {
    await axios.delete(`http://localhost:5000/api/document/delete-document/${id}`);
    router.push("/document");
  } catch (err) {
    console.error(err);
  }
};
