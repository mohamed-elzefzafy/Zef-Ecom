import { ReactNode } from "react";
import { TLoading } from "src/types/shared"
import CategorySceleton from "./skeketons/categorykeleton/CategorySceleton";
import ProductSkeleton from "./skeketons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "./skeketons/CartSkeleton/CartSkeleton";
import LottieHandler from "./lottieHandler/LottieHandler";


const skeletonTypes = {
  wishlist : ProductSkeleton,
  product : ProductSkeleton,
  category : CategorySceleton,
  cart : CartSkeleton,
}
type TProps = {
  LoadingStatus : TLoading;
  error : string | null;
  children : ReactNode;
  type? : keyof typeof skeletonTypes ,
}

const Loading = ({LoadingStatus ,error , children , type = "product"} : TProps) => {

  if (LoadingStatus === "pending") {
  const Component = skeletonTypes[type];
  return <Component/>
}
  if (LoadingStatus === "failed") {
  return  <div> <LottieHandler type="error" message={error as string}/> </div>
  }
  
  return (
    <>{children}</>
  )
}

export default Loading