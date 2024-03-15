import React, { Fragment, useEffect, useState } from 'react';
import "./ResetPassword.css";
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetUserPassword } from '../../actions/userAction';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { MdLock} from 'react-icons/md';


const ResetPassword = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const params = useParams();

    const { loading, error, success } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetUserPassword(params.token,myForm));
    }

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Password updated successfully");

            navigate("/login");

        }

    }, [dispatch, error, navigate, success]);


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title='Change Password' />
                <div className="resetPasswordContainer">

                    <div className="resetPasswordBox">
                        <h2 className='resetPasswordHeading'>Update Profile</h2>

                        <form className='resetPasswordForm' onSubmit={resetPasswordSubmit} >

                            <div>
                                <LockOpenIcon />
                                <input
                                    type='password'
                                    placeholder='New Password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <MdLock />
                                <input
                                    type='password'
                                    placeholder='Confirm Password'
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <input
                                type='submit'
                                value='Update'
                                className='resetPasswordBtn'
                            />


                        </form>
                    </div>

                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ResetPassword
