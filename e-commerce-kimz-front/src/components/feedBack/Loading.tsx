import { ReactNode } from "react";
import { TLoading } from "src/types/shared"

type TProps = {
  LoadingStatus : TLoading;
  error : string | null;
  children : ReactNode;
}

const Loading = ({LoadingStatus ,error , children} : TProps) => {

  if (LoadingStatus === "pending") {
  return  <p>Loading... please wait</p>
  }
  if (LoadingStatus === "failed") {
  return  <p>{error}</p>
  }
  
  return (
    <>{children}</>
  )
}

export default Loading