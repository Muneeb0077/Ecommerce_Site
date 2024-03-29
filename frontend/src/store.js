import { configureStore} from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from './reducers/productReducer';
import { profileReducer, userReducer,forgotPasswordReducer } from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';

const reducer = combineReducers({
        products:productsReducer,
        productDetails:productDetailsReducer,
        user:userReducer,
        profile:profileReducer,
        forgotPassword:forgotPasswordReducer,
        cart:cartReducer,
        newOrder:newOrderReducer,
        myOrders:myOrdersReducer,
        orderDetails:orderDetailsReducer,
        newReview:newReviewReducer,
        newProduct:newProductReducer,
        product:productReducer,
});

let initialState={
        cart : {
                cartItems: localStorage.getItem("cartItems")
                ? JSON.parse(localStorage.getItem("cartItems")): [],
                shippingInfo: localStorage.getItem("shippingInfo")
                ? JSON.parse(localStorage.getItem("shippingInfo")): {},
        },
       
};

const middleware = [thunk];

const store = configureStore({reducer:reducer , preloadedState:initialState},composeWithDevTools(applyMiddleware(...middleware)));

export default store;