import React, { Fragment, useEffect,useState } from 'react';
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReviewCard from './ReviewCard.js';
import Loader from "../layout/Loader/Loader";
import {toast} from 'react-toastify';
import MetaData from '../layout/MetaData';
import {addItemsToCart} from "../../actions/cartAction";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js';


const ProductDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { product, loading, error } = useSelector((state) => state.productDetails);

    const {success,error:reviewError} = useSelector((state) => state.newReview);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            toast.error(reviewError);
            dispatch(clearErrors());
        }
        if(success){
            toast.success("Review Submitted");
            dispatch({type: NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id,error,reviewError,success]);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {

        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () =>{
        dispatch(addItemsToCart(params.id,quantity));
        toast.success("Item Added to Cart");
    }

    const submitReviewToggel = () =>{
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () =>{
        const myForm = new FormData();

        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",params.id);

        dispatch(newReview(myForm));
        setOpen(false);
    };

    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                
                <MetaData title={`${product.name} -- ECOMMERCE`} />
                
                <div className="ProductDetails">
                    <div>
                        <Carousel className='crsl'>
                            {product.images && product.images.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}

                        </Carousel>
                    </div>

                    <div>
                        <div className='detailsBlock-1'>
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>

                        <div className='detailsBlock-2'>
                            <Rating {...options} />
                            <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                        </div>

                        <div className='detailsBlock-3'>
                            <h1>{`Rs${product.price}`}</h1>
                            <div className='detailsBlock-3-1'>
                                <div className='detailsBlock-3-1-1'>
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type='number' value={quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button disabled={product.Stock<1?true:false} onClick={addToCartHandler}>Add to Cart</button>
                            </div>
                            <p>
                                Status:
                                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                                </b>
                            </p>
                        </div>

                        <div className='detailsBlock-4'>
                            Description : <p>{product.description}</p>
                        </div>

                        <button onClick={submitReviewToggel} className='submitReview'>ADD Review</button>
                    </div>

                </div>

                <h3 className='reviewsHeading'>REVIEWS</h3>

                <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggel}>
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating onChange={(e)=> setRating(e.target.value)} value={rating} size="large"/>
                        <textarea className="submitDialogTextArea" cols="30" rows="5" value={comment} onChange={(e)=> setComment(e.target.value)}></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggel} color="secondary">Cancel</Button>
                        <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>

                {product.reviews && product.reviews[0] ? (
                    <div className='reviews'>
                        {product.reviews &&
                            product.reviews.map((review) => <ReviewCard review={review} />)}
                    </div>
                ) : (
                    <p className='noReviews'>No Reviews Yet</p>
                )}



            </Fragment>)}
        </Fragment>
    );
};


export default ProductDetails

