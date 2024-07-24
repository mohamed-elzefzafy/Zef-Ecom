import GridList from "@components/common/gridList/GridList";
import Heading from "@components/common/heading/Heading"
import Products from "@components/eCommerce/products/Products";
import Loading from "@components/feedBack/Loading";
import { useWishlist } from "@hooks/useWishlist";


const WishlistPage = () => {

  const {loading , error , records} = useWishlist();
  return (
    <>
{records.length ? 
(
<>
<Heading title="Your Wishlist"/>
  <Loading LoadingStatus={loading} error={error}>
    <GridList
      records={records}
      renderItem={(record) => <Products {...record} />}
    />
  </Loading>
</>
)
:
(<Heading title="Your Wishlist is Empty"/>)
}
    </>
  )
}

export default WishlistPage