import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import * as actions from "../store/actions/index";

const Logout = ({ onLogout }) => {
  const router = useRouter();

  useEffect(() => {
    onLogout();
    router.push("/login");
  }, []);
  return null;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.autologout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
