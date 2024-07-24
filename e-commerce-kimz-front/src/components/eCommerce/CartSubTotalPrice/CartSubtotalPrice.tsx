import { TProduct } from "src/types/product";
import styles from "./styles.module.css";

type TProps = {
  products : TProduct[],
}
const CartSubtotalPrice = ({products} : TProps) => {
console.log(products);

  const subTotal = products.reduce((acc , item) => acc + (item.price * (item.quantity ? item.quantity : 1)) ,0);
  
  return (
    <div className={styles.container}>
      <span>SubTotal</span>
      <span>{subTotal.toFixed(2)} EGP</span>
    </div>
  )
}

export default CartSubtotalPrice;