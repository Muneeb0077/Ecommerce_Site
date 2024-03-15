import { DataGrid } from '@mui/x-data-grid';
import React, {Fragment,useEffect} from 'react';
import "./ProductList.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProduct,deleteNewProduct } from '../../actions/productAction';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { MdDelete, MdEdit } from 'react-icons/md';
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';


const ProductList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const { products, error } = useSelector(state => state.products);

  const { isDeleted,error:deleteError } = useSelector(state => state.product);

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({type:DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminProduct());
  }, [dispatch,error,isDeleted,navigate,deleteError]);
  
  const deleteProductHandler = (id) => {
    dispatch(deleteNewProduct(id));
  };

  const columns =[
    {field:"id",headerName:"Product ID",minWidth:200,flex:0.5},
    {field:"name",headerName:"Name",minWidth:350,flex:1},
    {field:"stock",headerName:"Stock",type:"number",minWidth:150,flex:0.3},
    {field:"price",headerName:"Price",type:"number",minWidth:270,flex:0.5},
    {field:"actions",flex:0.3,headerName:"Actions",minWidth:150,type:"number",sortable:false,renderCell:(params)=>{
      return(
        <Fragment>
          <Link to={`/admin/product/${params.row.id}`}><MdEdit/></Link>
          <Button onClick={()=>deleteProductHandler(params.row.id)}><MdDelete/></Button>
        </Fragment>
      )
    
    }},
  ];

  const rows = [];

  products && products.forEach((item)=>{
    rows.push({
      id:item._id,
      stock:item.Stock,
      price:item.price,
      name:item.name,
    });
  });

  return (
    <Fragment>
      <MetaData title={`All Products - Admin`} />

      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id='productListHeading'>All Products</h1>

          <DataGrid rows={rows} columns={columns}  disableRowSelectionOnClick className="productListTable" />
        </div>
      </div>

    </Fragment>
  )
}

export default ProductList