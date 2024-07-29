import LottieHandler from "@components/feedBack/lottieHandler/LottieHandler";
import { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";

type TGridList<T> = {
  records : T[],
  renderItem : (record : T) => ReactNode ,
  message : string,
}

type hasId ={id? : number};
const GridList = <T extends hasId> ({records , renderItem , message} : TGridList<T>) => {
  const categoryList = records.length > 0 ? 
  records.map(record => 
   <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
         {renderItem(record)}
       </Col>
  )
  : <LottieHandler type="empty" message={message}/>
  return (
    <Row>{categoryList}</Row>
  )
}

export default GridList;