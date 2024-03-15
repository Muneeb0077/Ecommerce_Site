import React, {Fragment,useState} from 'react';
import "./Shipping.css";
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../layout/MetaData';
import { MdHome, MdLocationCity, MdPhone, MdPinDrop, MdPublic, MdTransferWithinAStation } from 'react-icons/md';
import {Country, State} from 'country-state-city';
import { toast } from 'react-toastify';
import CheckoutSteps from '../Cart/CheckoutSteps';
import { useNavigate } from 'react-router-dom';



const Shipping = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { shippingInfo } = useSelector(state => state.cart);
    

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNumber, setPhoneNo] = useState(shippingInfo.phoneNumber);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNumber.length < 10 || phoneNumber.length > 10) {
            toast.error('Phone No must be 10 digits long');
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNumber })
        );
        navigate("/order/confirm");
    };

    

  return (
    <Fragment>

        <MetaData title="Shipping Details" />

        <CheckoutSteps activeStep={0} />

        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Details</h2>

                <form className="shippingForm" encType='multipart/form-data' onSubmit={shippingSubmit}>

                  
                  <div>
                    <MdHome />
                    <input
                        type="text"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                    <div>
                        <MdLocationCity />
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div>
                        <MdPinDrop />
                        <input
                            type="text"
                            placeholder="Pin Code"
                            required
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>

                    <div>
                        <MdPhone />
                        <input
                            type="text"
                            placeholder="Phone No"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />
                    </div>

                    <div>
                        <MdPublic />
                        <select
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="">Country</option>
                            {Country && 
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))
                                }
                        </select>
                    </div>

                    {country && (
                        <div>
                            <MdTransferWithinAStation />
                            
                            <select
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">State</option>
                                {State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>

                        </div>
                    )}

                    <input type='submit' value='Continue' className='shippingBtn' disabled={state?false:true} />


                </form>

            </div>
        </div>
    </Fragment>
  )
}

export default Shipping