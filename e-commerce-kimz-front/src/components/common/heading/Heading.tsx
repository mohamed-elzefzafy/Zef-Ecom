import { memo } from "react"


const Heading = ({title} : { title : string}) => {
  console.log("heading");
  
  return (
    <div className="mb-3 fs-3 fw-bold">{title}</div>
  )
}

export default Heading