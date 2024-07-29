import GridList from "@components/common/gridList/GridList";
import Heading from "@components/common/heading/Heading"
import Products from "@components/eCommerce/products/Products";
import Loading from "@components/feedBack/Loading";
import { useWishlist } from "@hooks/useWishlist";


const WishlistPage = () => {

  const {loading , error , records} = useWishlist();
  return (
    <>
<Heading title="Your Wishlist"/>
  <Loading LoadingStatus={loading} error={error} type="wishlist">
    <GridList
    message="Wishlist is Empty"
      records={records}
      renderItem={(record) => <Products {...record} />}
    />
  </Loading>
    </>
  )
}

export default WishlistPage