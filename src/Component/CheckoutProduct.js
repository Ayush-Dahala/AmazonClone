import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from '../State/StateProvider';

function CheckoutProduct({id,image,title,price,rating}) {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket=()=>{
        dispatch({
            type:'Remove_From_Basket',
            id: id,
        })
    }
    return (
      <div className="checkoutProduct">
        <img className='checkoutProduct__image' src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}
        <div>
        <small>$</small>
        <strong>{price}</strong>
        </div>
        </p>
        <div className="checkoutProduct__rating">
        {Array(rating)
                    .fill()
                    .map(() => (
                        <p>🌟</p>
                    ))}
        </div>
        <button onClick={removeFromBasket}>Remove from Basket</button>
      </div>
      </div>
  )
}

export default CheckoutProduct
