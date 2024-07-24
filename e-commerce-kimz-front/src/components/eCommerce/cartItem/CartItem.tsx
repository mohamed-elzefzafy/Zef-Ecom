import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "src/types/product";
import { ChangeEvent, memo } from "react";

const {cartItem , product , productImg , productInfo , cartItemSelection} = styles;

type TProps = TProduct & {changeQuantityHandler :  (id : number , quantity : number) => void , 

  removeCartItem :  (id : number ) => void
}
const CartItem = memo(({id , img , title , price , quantity , max , changeQuantityHandler , removeCartItem} : TProps) => {

  const renderOption = Array.from({length : max}).map((_, index) => (index + 1));

  const changeQuantity = (e : ChangeEvent<HTMLSelectElement>) => {
    const quantity = +e.target.value;
    changeQuantityHandler(id , quantity)
  }

  console.log("rendercartitem");
  
  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img 
            src={img}
            alt={title}
          />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)} EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white" , width: "100px"}}
            className="mt-auto"
            onClick={() => removeCartItem(id)}
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select defaultValue={quantity} aria-label="Default select example" onClick={changeQuantity}>
{renderOption.map(option => 
  <option key={option} value={option}>{option}</option>

)}
      
        </Form.Select>
      </div>
    </div>
  )
})

export default CartItem