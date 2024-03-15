import React, {Fragment,useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProduct,getProductDetails } from '../../actions/productAction';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { MdAccountTree, MdAttachMoney, MdDescription, MdSpellcheck, MdStorage } from 'react-icons/md';
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
        "Toys",
    ];

    const navigate=useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, error:updateError, isUpdated } = useSelector(state => state.product);
    const { product,error } = useSelector(state => state.productDetails);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const productId = params.id;

    useEffect(() => {
      if(product && product._id !== productId){
        dispatch(getProductDetails(productId));
      }else{
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.Stock);
        setOldImages(product.images);
      }
        
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
      if(updateError){
        toast.error(error);
        dispatch(clearErrors());
      }
        if(isUpdated){
            toast.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({type:UPDATE_PRODUCT_RESET});
        }
    }, [dispatch,error,isUpdated,navigate,product,productId,updateError]);

    const updateSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("price", price);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("Stock", stock);

        images.forEach(image=>{
            formData.append("images",image);
        });

        dispatch(updateProduct(productId,formData));

    }

    const updateProductImagesChange = (e) =>{
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file)=>{
           const reader = new FileReader();

           reader.onload = () => {
            if(reader.readyState === 2){
                setImagesPreview((oldArray)=>[...oldArray,reader.result]);
                setImages((oldArray)=>[...oldArray,reader.result]);
            }
           }

           reader.readAsDataURL(file);
        });

    }
    

  return (
    <Fragment>
        <MetaData title="Create Product" />
        <div className="dashboard">
            <Sidebar/>
            <div className="newProductContainer">
                <form className="createProductForm" encType="multipart/form-data" onSubmit={updateSubmitHandler}>
                    <h1>Create Product</h1>

                    <div>
                        <MdSpellcheck />
                        <input type="text" placeholder="Product Name" required value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>

                    <div>
                        <MdAttachMoney />
                        <input type="number" placeholder="Price" required value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>

                    <div>
                        <MdDescription />
                        <textarea placeholder="Product Description" value={description} cols="30" rows="1" onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>

                    <div>
                        <MdAccountTree />
                        <select value={category}  onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate)=>(
                                <option key={cate} value={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <MdStorage />
                        <input type="number" placeholder="Stock" value={stock} required onChange={(e)=>setStock(e.target.value)} />
                    </div>

                    <div id="createProductFormFile">
                        <input type="file" name="avatar" accept="image/*" multiple onChange={updateProductImagesChange} />
                    </div>

                    <div id="createProductFormImage">
                        {oldImages&&oldImages.map((image,index)=>(
                            <img key={index} src={image.url} alt='Old Product Preview' />
                        ))}
                    </div>

                    <div id="createProductFormImage">
                        {imagesPreview.map((image,index)=>(
                            <img key={index} src={image} alt='Product Preview' />
                        ))}
                    </div>

                    <Button type="submit" id="createProductBtn" disabled={loading?true:false}>Create Product</Button>

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateProduct