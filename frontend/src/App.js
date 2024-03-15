import './App.css';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import WebFont from "webfontloader"
import React from "react"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoutes from './component/Route/ProtectedRoutes';
import UpdateProfile from './component/User/UpdateProfile'; 
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';

function App() {
  
  const { isAuthenticated, user } = useSelector(state=>state.user);

  const [stripeApiKey, setStripeApiKey] = React.useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapiKey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    window.process={
      ...window.process,
    };
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();

  }, []);

  const PaymentWithStripe = () => {
    return (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    );
  };

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path ="/password/update" element={<UpdatePassword />} />
          <Route exact path ="/login/shipping" element={<Shipping />} />
          {stripeApiKey&&<Route exact path ="/process/payment" element={<PaymentWithStripe />} />}
          <Route exact path ="/success" element={<OrderSuccess />} />
          <Route exact path ="/orders" element={<MyOrders />} />
          <Route exact path ="/order/confirm" element={<ConfirmOrder />} />
          <Route exact path ="/order/:id" element={<OrderDetails />} />
          <Route exact path="/admin/dashboard" element={<ProtectedRoutes isAdmin={true} />}>
            <Route index element={<Dashboard />} />
         </Route>
         <Route exact path="/admin/products" element={<ProtectedRoutes isAdmin={true} />}>
            <Route index element={<ProductList />} />
         </Route>

         <Route exact path="/admin/product" element={<ProtectedRoutes isAdmin={true} />}>
            <Route index element={<NewProduct/>} />
         </Route>

         <Route exact path="/admin/product/:id" element={<ProtectedRoutes isAdmin={true} />}>
            <Route index element={<UpdateProduct/>} />
         </Route>

        </Route>
        <Route exact path ="/password/forgot" element={<ForgotPassword />} />
        <Route exact path ="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>

      

      <Footer />
    </Router>

  );
}

export default App;
