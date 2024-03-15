import React, { Fragment, useState } from 'react';
import "./Header.css";
import { SpeedDial, SpeedDialAction,Backdrop } from '@mui/material';
import { MdDashboard, MdPerson, MdExitToApp, MdListAlt } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../../actions/userAction';
import { MdShoppingCart } from 'react-icons/md';

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector(state => state.cart);

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const options = [
        { icon: <MdListAlt />, name: "Orders", func: orders },
        { icon: <MdPerson />, name: "Profile", func: account },
        { icon: <MdShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({ icon: <MdDashboard />, name: "Dashboard", func: dashboard });
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }

    function account() {
        navigate("/account");
    }

    function logoutUser() {
        dispatch(logout());
        toast.success("Logged out successfully");
    }

    function cart() {
        navigate("/cart");
    }

    return (

        <Fragment>
            <Backdrop open={open} style={{zIndex:"10"}} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{zIndex: 11}}
                open={open}
                direction='down'
                className="speedDial"
                icon={<img className="speedDialIcon" src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt="Profile" />}
            >

                {options.map((item)=>(
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600?true:false}/>
                ))}
            </SpeedDial>
        </Fragment>

    )
}

export default UserOptions
