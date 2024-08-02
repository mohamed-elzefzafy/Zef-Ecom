import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "src/types/product";
import { ChangeEvent, memo } from "react";
import ProductInfo from "../productInfo/ProductInfo";

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

<ProductInfo title={title} img={img} price={price} quantity={quantity} direction="column">
<Button
            variant="secondary"
            style={{ color: "white" , width: "100px"}}
            className="mt-auto"
            onClick={() => removeCartItem(id)}
          >
            Remove
          </Button>
</ProductInfo>
        


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