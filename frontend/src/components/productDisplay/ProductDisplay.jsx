import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';

function ProductDisplay(props) {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    // console.log(product);
  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img-list'>
                <img src={product.image} alt='product_image'/>
                <img src={product.image} alt='product_image'/>
                <img src={product.image} alt='product_image'/>
                <img src={product.image} alt='product_image'/>
            </div>
            <div className='productdisplay-img'>
                <img className='productdisplay-main-img' src={product.image} alt='product_image'/>
            </div>
        </div>
        <div className='productdisplay-right'>
            <h1>{product.name}</h1>
            <div className='productdisplay-right-stars'>
                <img src={star_icon} alt='star_icon'/>
                <img src={star_icon} alt='star_icon'/>
                <img src={star_icon} alt='star_icon'/>
                <img src={star_icon} alt='star_icon'/>
                <img src={star_dull_icon} alt='star_dull_icon'/>
                <p>(122)</p>
            </div>
            <div className='productdisplay-right-prices'>
                <div className='productdisplay-right-price-old'>${product.old_price}</div>
                <div className='productdisplay-right-price-new'>${product.new_price}</div>
            </div>
            <div className='productdisplay-right-description'>
            This stunning evening gown. The dress boasts a sweetheart neckline and delicate lace detailing, perfect for making a statement at any formal event.
            </div>
            <div className='productdisplay-right-size'>
                <h1>Select Size</h1>
                <div className='productdisplay-right-sizes'>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category: </span>Women, T-Shirt, Crop-Top</p>
            <p className='productdisplay-right-category'><span>Tags: </span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay
