import { ReactNode, Suspense } from "react"
import LottieHandler from "../lottieHandler/LottieHandler"


const SuspenceLazyLoading = ({children} : {children : ReactNode}) => {
  return (
<Suspense fallback={<LottieHandler type='loading' message="Loading... please wait"/>}>
{children}
</Suspense>
  )
}

export default SuspenceLazyLoading