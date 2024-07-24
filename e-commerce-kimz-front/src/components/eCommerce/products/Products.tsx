import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "src/types/product";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { addToCart } from "src/redux/cart/cartSlice";
import {  memo, useEffect, useState } from "react";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { actLikeToggle } from "src/redux/wishlist/wishlistSlice";

const {product , productImg , maximumNotice , wishlistBtn} =styles;


const Products = memo(({id , img , title , price , max , isLiked} : TProduct) => {
  console.log("fire products component");
  
  const dispatch = useAppDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isStopAddToCart, setIsStopAddToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const items = useAppSelector(state => state.cart.items);


  useEffect(()=>{
    const countInCart  = items[id];
    if (countInCart >= max) {
setIsStopAddToCart(true);
    }
    
  },[id, items, max]);

  
  const addToCartHAndler = () => {
    if (isStopAddToCart) return;
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  }

  useEffect(() => {
    if (!isBtnDisabled) return;
    // setIsBtnDisabled(false);

  const deponce =  setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(deponce);
  },[isBtnDisabled]);


  const likeToggleHandler = () => {
    if (loading) return;
    setLoading(true);
    dispatch(actLikeToggle(id)).unwrap().then(() => setLoading(false));
    
  }
  return (
    <div className={product}>
      <div className={wishlistBtn} onClick={likeToggleHandler}>
      {loading ? <Spinner size="sm" animation="border" variant="danger"/> : isLiked ? <LikeFill/> : <Like/>}
      </div>
    <div className={productImg}>
      <img
        src={img}
        alt={title}
      />
    </div>
    <h2>{title}</h2>
    <h3>{price} EGP</h3>
    <p className={maximumNotice}>{isStopAddToCart ? "You reached to the limit" : ""}</p>
    <Button variant="info" style={{ color: "white" }} onClick={addToCartHAndler} disabled={isBtnDisabled || isStopAddToCart}>
      {isBtnDisabled ? <>
        <Spinner size="sm" animation="border"/> Loading...
      </> : 
      "Add to cart"}
      
    </Button>
  </div>
  )
})

export default Products