import React, {Fragment,useEffect,useState} from 'react';
import "./NewProduct.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { MdAccountTree, MdAttachMoney, MdDescription, MdSpellcheck, MdStorage } from 'react-icons/md';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';


const NewProduct = () => {

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

    const { loading, error, success } = useSelector(state => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
        if(success){
            toast.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({type:NEW_PRODUCT_RESET});
        }
    }, [dispatch,error,success,navigate]);

    const submitHandler = (e) => {
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

        dispatch(createProduct(formData));

    }

    const createProductImagesChange = (e) =>{
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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
                <form className="createProductForm" encType="multipart/form-data" onSubmit={submitHandler}>
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
                        <select  onChange={(e)=>setCategory(e.target.value)}>
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
                        <input type="file" name="avatar" accept="image/*" multiple onChange={createProductImagesChange} />
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

export default NewProduct