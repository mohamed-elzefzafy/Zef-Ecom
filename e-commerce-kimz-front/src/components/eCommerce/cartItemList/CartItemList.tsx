import { TProduct } from "src/types/product"
import CartItem from "../cartItem/CartItem"


type TProp = {
  products : TProduct[],
  changeQuantityHandler : (id : number , quantity : number) => void,
  removeCartItem : (id : number) => void,
}
const CartItemList = ({products , changeQuantityHandler , removeCartItem} : TProp) => {
  const renderList = products.map(product => <CartItem key={product.id} {...product} 
    changeQuantityHandler={changeQuantityHandler} removeCartItem={removeCartItem}/>)
  return (
    <div>{renderList}</div>
  )
}

export default CartItemList