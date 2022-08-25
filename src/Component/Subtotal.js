import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from "../State/StateProvider";
import {getBasketTotal} from '../State/Reducer'
import {useNavigate} from 'react-router-dom'

function Subtotal() {
  let navigate=useNavigate();
  const[{basket},dispatch]=useStateValue()
  return (
    <div className='subtotal'>
      <CurrencyFormat renderText={(value)=>(
        <>
        <p>
          Subtotal ({basket.length} item):<strong>{value}</strong>
          </p>
          <small className='subtotal-gift'>
            <input type="checkbox" />This order contain a gift
          </small>
          </>
      )}
      decimalScale={2}
      value={getBasketTotal(basket)}
      displayType={"text"}
      thousandSeparator={true}
      prefix={'$'} 
      />
      <button onClick={e=>navigate('/payment')}>Proceed to Checkout</button>
      </div>
  )
}

export default Subtotal
