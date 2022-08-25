import { toUnitless } from "@mui/material/styles/cssUtils";
import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "../State/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat
from "react-currency-format";
import {getBasketTotal} from '../State/Reducer'
import axios from '../State/Axiox'
import {useNavigate} from 'react-router-dom'

function Payment() {
  const navigate=useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const element = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
   const[suceeded , setSuceeded]=useState(false);
   const[processing,setProcessing]=useState("");
   const [clientSecret, setClientSecret]=useState(true)

   useEffect(()=>{
    const getClientSecret=async()=>{
      const response=await axios({
        method:'post',
        url:`/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
   },[basket])
    
  //  console.log(response.data.clientSecret)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:element.getElement(CardElement)
      }
    }).then(({paymentIntent})=>{
      setSuceeded(true);
      setError(null)
      setProcessing(false)
      navigate('/')
    })
    
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(
          <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h1>Delivery Address</h1>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h1>Review items and delivery</h1>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h1>Payment Method</h1>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket.length} item):<strong>{value}</strong>
                      </p>
                      <small className="subtotal-gift">
                        <input type="checkbox" />
                        This order contain a gift
                      </small>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <div>
                 <button disabled={processing || disabled || suceeded}>
                  <span>{processing ? <p>Processing</p>:
                  "Buy Now"}</span>
                 </button>
                 </div>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
