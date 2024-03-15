import React from 'react'
import playstore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className='leftFooter'>
            <h4>Download our App</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playstore} alt="playstore" />
            <img src={appStore} alt="Appstore" />
        </div>

        <div className='midFooter'>
             <h1>ECOMMERCE</h1>
             <p>High quality is our first priority</p>

             <p>Copyrights 2023 &copy; Muneeb</p>
        </div>

        <div className='rightFooter'>
            <h4>Follow us</h4>
            <a href="http://instagram.com/muneeb5216">Instagram</a>
            <a href="http://instagram.com/muneeb5216">Youtube</a>
            <a href="http://instagram.com/muneeb5216">Facebook</a>
        </div>
    </footer>
  );
}

export default Footer
