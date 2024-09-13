import React from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/argentBankLogo.webp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const profileReducer = useSelector((state) => state.profile);
    const userReducer = useSelector((state) => state.user);
    // console.log('===>', userReducer.data.userName)
    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {userReducer.data && (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        {userReducer.data.userName}
                    </Link>
                )}
                {!userReducer.token && (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
                {userReducer.token && (
                    <div className="main-nav-item" onClick={logoutHandler}>
                        <i className="fa fa-user-circle"></i>
                        Logout
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
