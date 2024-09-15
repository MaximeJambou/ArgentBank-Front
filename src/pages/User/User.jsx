import React, { useEffect } from "react";
import "./User.scss";

import Account from "../../components/Account/Account";
import UserNameButton from "../../components/UserNameButton/UserNameButton";

import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/reducers/userSlice";

function User () {
    const dispatch = useDispatch();
    const profileReducer = useSelector((state) => state.user)

    useEffect(() =>{

            dispatch(getProfile())
        
    },[dispatch, getProfile])
    // console.log(profileReducer.data)

    return (
        <main className="main bg-dark">
            {profileReducer.data && <div className="header">
                <h1>Welcome back {profileReducer.data.firstName} {profileReducer.data.lastName} !</h1>
                <UserNameButton />
            </div>}
            <h2 className="sr-only">Accounts</h2>
            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance" />
            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance" />
            <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance" />
        </main>
    )
}

export default User;