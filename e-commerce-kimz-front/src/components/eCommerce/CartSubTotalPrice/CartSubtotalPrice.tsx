import { TProduct } from "src/types/product";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { actPlaceOrder } from "src/redux/orders/orderSlice";
import { clearCartItems } from "src/redux/cart/cartSlice";

type TProps = {
  products : TProduct[],
  userAccessToken : string | null
}
const CartSubtotalPrice = ({products , userAccessToken} : TProps) => {
const dispatch = useAppDispatch();
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const {items} = useAppSelector(state => state.cart)
  const subTotal = products.reduce((acc , item) => acc + (item.price * (item.quantity ? item.quantity : 1)) ,0);
  
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false); setError(null)}
  const handleShow = () => setShow(true);

  const createOrder = ()=> {
    setLoading(true);
    dispatch(actPlaceOrder(subTotal)).unwrap()
    .then(() => dispatch(clearCartItems()))
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
    handleClose();
  }
  return (
  <>
   <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Place New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to place order with Subtotal:{" "}
          {subTotal.toFixed(2)} EGP
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={createOrder} className="text-light">
            {loading ? <Spinner size="sm"/> : "confirm"}
          </Button>
        </Modal.Footer>
      </Modal>

    <div className={styles.container}>
      <span>SubTotal</span>
      <span>{subTotal.toFixed(2)} EGP</span>
    </div>
    {userAccessToken &&  
  <div className="text-end">
      <Button variant="info" className="text-white" onClick={handleShow} disabled={loading || items.length === 0}>
        Place Order
        </Button>
  </div>
    }
    </>
  )
}

export default CartSubtotalPrice;