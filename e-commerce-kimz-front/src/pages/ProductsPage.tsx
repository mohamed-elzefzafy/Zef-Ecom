import GridList from "@components/common/gridList/GridList";
import Heading from "@components/common/heading/Heading";
import Products from "@components/eCommerce/products/Products";
import Loading from "@components/feedBack/Loading";
import { useProducts } from "@hooks/useProducts";


const ProductsPage = () => {
const {productParam , loading , error , productsFullInfo} = useProducts();
  return (
    <>
      <Heading title={`${productParam} Products`}></Heading>
      <Loading LoadingStatus={loading} error={error} type="product">
        <GridList
        message="there are no Products"
          records={productsFullInfo}
          renderItem={(record) => <Products {...record}/>}
        />
      </Loading>
    </>
  );
};

export default ProductsPage;
