import GridList from "@components/common/gridList/GridList";
import Heading from "@components/common/heading/Heading";
import CartItemList from "@components/eCommerce/cartItemList/CartItemList";
import CartSubtotalPrice from "@components/eCommerce/CartSubTotalPrice/CartSubtotalPrice";
import Loading from "@components/feedBack/Loading";
import LottieHandler from "@components/feedBack/lottieHandler/LottieHandler";
import useCart from "@hooks/useCart";

const CartPage = () => {
  const { products, loading, error, changeQuantityHandler, removeCartItem } =
    useCart();
  return (
    <>

  <Heading title="Your Cart" />
      <Loading LoadingStatus={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeCartItem={removeCartItem}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <LottieHandler message="Your cart is empty" type="empty" />
        )}
      </Loading>
    </>
  );
};

export default CartPage;
