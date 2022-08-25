import React from 'react'
import './Product.css'
import {useStateValue} from '../State/StateProvider'

function Product(props) {
  const[{basket},dispatch]=useStateValue()
  const addToBasket=()=>{
    dispatch({
      type:'Add_To_Basket',
      item:{
        id:props.id,
        title:props.title,
        image:props.image,
        price:props.price,
        rating:props.rating,
      }
    })

  }
  return (
    <div className='product'>
        <div className="product-info">
            <p className='para'>{props.title}</p>
            <p className='product-price'>
                <small>$</small>
                <strong>{props.price}</strong>
            </p>
        <div className="product-rating">
          {Array(props.rating).fill().map((_,i)=>(
            <p>⭐</p>
          ))}
            
        </div>
        </div>

        <img className='img' src={props.image} alt="" />
        <button onClick={addToBasket} className='button'>Add to Basket</button>
      
    </div>
  )
}

export default Product
