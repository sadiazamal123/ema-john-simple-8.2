import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product.js';
import {addToDb, getStoredCart} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
const Shop = () => {
    const [products, setProducts] = useState([]);   
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')                        
        .then(res=> res.json())
        .then(data => setProducts(data))                   
    }, []);
    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = []; 
        for(const id in storedCart){
           const addedProduct = products.find(singleProduct => singleProduct.id === id);
           if(addedProduct){
              const quantity = storedCart[id];
              addedProduct.quantity = quantity; 
              savedCart.push(addedProduct);
           }   
        }      
        setCart(savedCart);
     }, [products]);
     const handleAddToCart = (selectedProduct) =>{
        let newCart = [];
        const exists = cart.find(singleProduct => singleProduct.id === selectedProduct.id);
        if(!exists) {
           selectedProduct.quantity = 1;
           newCart = [...cart, selectedProduct];
        }
        else{
           const rest = cart.filter(singleProduct => singleProduct.id !== selectedProduct.id); 
           exists.quantity = exists.quantity + 1;
           newCart = [...rest, exists];
        }
        setCart(newCart); 
        addToDb(selectedProduct.id);
     }
     
    return (
        <div className = 'shop-container'>
            <div className='products-container'>
                {
                 products.map(singleProduct => <Product key={singleProduct.id} propsName=
                    {singleProduct} handleAddToCart= {handleAddToCart}></Product>) 
                }
            </div>
            <div className= 'cart-container'>
                <Cart cart= {cart}></Cart>
       

            </div>
        </div>  
    );
};
export default Shop;