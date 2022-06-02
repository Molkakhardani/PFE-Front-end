import { useState, useEffect } from "react";
import LoginPage from "../pages/login";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const PageGuard = ({ children, isAuthenticated, onTryAutoSignup }) => {
  useEffect(() => {
    onTryAutoSignup();
  }, []);

  if (!isAuthenticated) {
    return <LoginPage />;
  }
  if (isAuthenticated) {
    return children;
  }
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: !!auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageGuard);
