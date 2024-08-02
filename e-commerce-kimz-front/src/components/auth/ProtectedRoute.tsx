import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";

const ProtectedRoute = ({children} : {children : ReactNode}) => {
  const {accessToken} = useAppSelector(state => state.auth);
  if (!accessToken) {
    return (
      <Navigate to="/login?message=login_required"/>
    )
  }
  return (
    <>{children}</>
  )
}

export default ProtectedRoute;