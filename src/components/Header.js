import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../reducers/auth/authSlice";
import "../assets/css/main.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogged } = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {isLogged ? (
          <>
            <NavLink className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {userInfo?.userName}
            </NavLink>
            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Logout
            </button>
          </>
        ) : (
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
