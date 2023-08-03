import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const {cart} = props;
 
    let total = 0;
    let shipping = 0;
    let quantity = 0; 
    for(const SingleProduct of cart){
       quantity = quantity + SingleProduct.quantity; 
       total = total + SingleProduct.price * SingleProduct.quantity; 
       shipping = shipping + SingleProduct.shipping;
    }
    const tax = parseFloat((total * 0.1).toFixed(2)); 
    const grandTotal = total + shipping + tax;
    return (
       <div className= 'cart'>
          <h4>Order summary</h4>
          <p>Selected Items: {quantity}</p>
          <p>Total Price: ${total}</p>
          <p>Total Shipping Charge: ${shipping}</p>
          <p>Tax: {tax}</p>
          <h5>Grand Total: {grandTotal.toFixed(2)}</h5>
          
         <div className= 'btn-choose'>
         <button className= 'btn-choose-one'><p>Choose one for me </p></button>
         <button className= 'btn-again'><p>Choose again</p></button>
         </div>
          

         
       </div>
    ); 
 }; 
 

export default Cart;