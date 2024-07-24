import GridList from "@components/common/gridList/GridList";
import Heading from "@components/common/heading/Heading";
import Categories from "@components/eCommerce/category/Categories"
import Loading from "@components/feedBack/Loading";
import { useCategories } from "@hooks/useCategories";


const CategoriesPage = () => {
const {loading , error , records} = useCategories();
  return (

<>
<Heading title="Categories"/>
  <Loading LoadingStatus={loading} error={error}>
    <GridList records={records} renderItem={(records) => <Categories {...records}/>}/>
  
  
  
  </Loading>
</>

  )
}

export default CategoriesPage