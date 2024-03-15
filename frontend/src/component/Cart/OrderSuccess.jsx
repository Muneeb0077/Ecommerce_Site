import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import "./OrderSuccess.css";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
        <MdCheckCircle />

        <Typography>Your Order has been placed successfully</Typography>
        <Link to="/orders">Go to Orders</Link>
    </div>
  )
}

export default OrderSuccess