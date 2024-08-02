import Heading from "@components/common/heading/Heading";
import ProductInfo from "@components/eCommerce/productInfo/ProductInfo";
import Loading from "@components/feedBack/Loading";
import useOrders from "@hooks/useOrders";
import { Modal, Table } from "react-bootstrap";


const OrdersPage = () => {
const {loading , error ,product , show , handleClose , orderList ,viewDetailsHandler} = useOrders();
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ overflow: "scroll" }}>
        <Modal.Header closeButton>
          <Modal.Title>Order Items Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product?.map((p) => (
            <ProductInfo
              key={p.id}
              img={p.img}
              price={p.price}
              title={p.title}
              quantity={p.quantity}
              direction="column"
              style={{marginBottom : "10px"}}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="Order Page" />

      <Loading type="category" error={error} LoadingStatus={loading}>
        <Table striped hover bordered className="red">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total price</th>
            </tr>
          </thead>
          <tbody>
            {orderList?.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order?.items?.length} items {" / "}
                  <span
                    style={{ textDecoration: "underLine", cursor: "pointer" }}
                    onClick={() => viewDetailsHandler(order.id)}
                  >
                    product details
                  </span>{" "}
                </td>
                <td>{order.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default OrdersPage;
