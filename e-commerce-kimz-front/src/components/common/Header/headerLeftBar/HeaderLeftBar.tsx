import { useAppSelector } from "src/redux/hooks";
import HeaderCounter from "../headerCounter/HeaderCounter";
import styles from "./styles.module.css";
import { getCartTotalQuantitySelector } from "src/redux/selectors/selectors";
import Logo from "@assets/svg/cart.svg?react";
import LogoWithList from "@assets/svg/wishlist.svg?react";
const {  headerLeftBar} = styles;

const HeaderLeftBar = () => {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const wishlistItemId = useAppSelector(state => state.wishlist.itemsId);
  return (
    <div className={headerLeftBar}>
    <HeaderCounter to="/Wishlist" totalQuantity={wishlistItemId.length} svgIcon={<LogoWithList/>} title={"Wishlist"}/>
    <HeaderCounter to="/cart" totalQuantity={totalQuantity} svgIcon={<Logo title="Cart"/>} title={"Cart"}/>

    </div>
  )
}

export default HeaderLeftBar