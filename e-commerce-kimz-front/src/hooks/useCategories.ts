import { useEffect } from "react";
import { actGetCategories, categoriesCleanUp } from "src/redux/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";


export const useCategories = () => {
  const dispatch = useAppDispatch();
const {records , loading  , error} = useAppSelector(state => state.categories);

  useEffect(() =>{
    const response =   dispatch(actGetCategories());
    return () => {
      dispatch(categoriesCleanUp());
      response.abort();
    }
  },[dispatch])



  
return {loading , error , records}
}

