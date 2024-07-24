import Heading from "@components/common/heading/Heading";
import CartItemList from "@components/eCommerce/cartItemList/CartItemList";
import CartSubtotalPrice from "@components/eCommerce/CartSubTotalPrice/CartSubtotalPrice";
import Loading from "@components/feedBack/Loading";
import useCart from "@hooks/useCart";

const CartPage = () => {
  const { products, loading, error, changeQuantityHandler, removeCartItem } =
    useCart();
  return (
    <>
      {products.length > 0 ? (
        <>
          <Heading title="Cart" />
          <Loading LoadingStatus={loading} error={error}>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeCartItem={removeCartItem}
            />

            <CartSubtotalPrice products={products} />
          </Loading>
        </>
      ) : (
        <h4>Cart is Empty</h4>
      )}
    </>
  );
};

export default CartPage;
