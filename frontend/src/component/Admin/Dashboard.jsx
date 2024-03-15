import React, { useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import './Dashboard.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut,Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import {getAdminProduct } from '../../actions/productAction.js';
import { useDispatch, useSelector } from 'react-redux';


const Dashboard = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
  );

  const dispatch = useDispatch();

  const { products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  let outOfStock = 0;

  products && products.forEach((item)=>{
    if(item.Stock === 0){
      outOfStock += 1;
    }
  })

  const lineState = {
    labels:["Inital Amount","Amount Earned"],
    datasets:[
      {
       label:"Total Amount",
       backgroundColor: ["tomato"],
       hoverBackgroundColor: ["rgb(197,72,49)"],
       data:[0,4000],
      }
    ]
  };

  const doughnutState = {
    labels:["Out o Stock","In Stock"],
    datasets:[
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data:[outOfStock,products.length - outOfStock]
      }
    ]
  };

  return (
    <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
        
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> Rs2000
              </p>
            </div>
              
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>50</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>50</p>
              </Link>
            </div>

          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>

        </div>
    </div>
  )
}

export default Dashboard