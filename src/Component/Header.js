import React from "react";
import logo from "./Amazon-Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import Basket from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../State/StateProvider";
import {auth} from "../firebase"

function Header() {
  const[{basket,user},dispatch]=useStateValue()
  let handleAuthentication=()=>{
    if(user){
      auth.signOut()
    }
  }

  return (
    <div className="header">
      <Link to='/'>
      <img className="logo" src={logo} alt="" />
      </Link>
      <div className="search">
        <input className="searchInput" type="text" />
        <SearchIcon className="search_icon" />
      </div>
      <div className="navbar">
          <Link to={!user && '/Sign'}>
        <div onClick={handleAuthentication} className="option">
          <span className="option1">Hello</span>
          <span className="option2">{user?'Sign Out':'Sign In'}</span>
        </div>
          </Link>
        <div className="option">
          <span className="option1">Returns</span>
          <span className="option2">& Orders</span>
        </div>
        <div className="option">
          <span className="option1">Your</span>
          <span className="option2">Prime</span>
        </div>
        <Link to='/checkout'>
        <div className="basket">
          <Basket />
          <span className="header_optionLineTwo header__basketCount">{basket.length}</span>
        </div>
      </Link>
      </div>
    </div>
  );
}

export default Header;
