import React, { useEffect } from "react";
import Home from "./Component/Home";
import Header from "./Component/Header";
import { Routes, Route, Link } from "react-router-dom";
import Checkout from "./Component/Checkout";
import SignIn from "./Component/SignIn";
import { auth } from "./firebase";
import { useStateValue } from "./State/StateProvider";
import Payment from "./Component/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51LMoiESDUxQMa4SoMk7lHowgByUq2PrCHR8kDQX68j8djMWse8BNU1ukZz2zg3EiafrEHOhLp8cadiqeMXxKhZC000xujni7wi"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log(authUser)
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="checkout"
          element={
            <div>
              <Header />
              <Checkout />
            </div>
          }
        /> 
        <Route
          path="payment"
          element={
            <div>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Home />
            </div>
          }
        />
        <Route path="sign" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
