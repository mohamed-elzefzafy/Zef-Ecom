import { isAxiosError } from "axios";

 const AxiosErrorHandler = (error : unknown) => {

  if ( isAxiosError(error)) {
    return  error.response?.data.message || error.message
  } else {
    return "un expected error"
  }
}


export default AxiosErrorHandler;