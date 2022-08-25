import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import {auth} from '../firebase'
import { useStateValue } from '../State/StateProvider'
import CheckoutProduct from './CheckoutProduct'
function Checkout() {
  const[{basket,user},dispatch]=useStateValue()
  return (
    <div className='checkout'>
        <div className="checkout-left">
            <img className='checkout-ad' src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
            <div>
                <h3>hello, {user?.email}</h3>
                <h1 className='checkout-title'>Your Shopping Basket</h1>
                {basket.map(item=>(
                  <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}/>
                ))}
            </div>
        </div>
        <div className="checkout-right">
            <Subtotal/>
        </div>
      
    </div>
  )
}

export default Checkout
