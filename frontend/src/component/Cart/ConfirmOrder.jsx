import React, {Fragment} from 'react';
import CheckoutSteps from '../Cart/CheckoutSteps';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import "./ConfirmOrder.css";
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';




const ConfirmOrder = () => {

    let navigate = useNavigate();

    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const shippingCharges = subtotal > 2000 ? 0 : 200;

    const tax = Number((0.18 * subtotal).toFixed(2));

    const totalPrice = (subtotal + shippingCharges + tax).toFixed(2);

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem('orderInfo', JSON.stringify(data));

        navigate("/process/payment");
    }

  return (
    <Fragment>
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1}/>

        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Details</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phoneNumber}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
                
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {cartItems && cartItems.map((item) => (
                            <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>{" "}
                                <span>
                                    {item.quantity} x Rs{item.price} ={" "}
                                    <b>Rs{item.quantity * item.price}</b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            {/* */}
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>Rs{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>Rs{shippingCharges}</span>
                        </div>
                        <div>
                            <p>Gst Tax:</p>
                            <span>Rs{tax}</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>Rs{totalPrice}</span>
                    </div>

                    <button onClick={proceedToPayment}>Proceed to Payment</button>

                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder