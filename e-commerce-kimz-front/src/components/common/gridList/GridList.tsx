import { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";

type TGridList<T> = {
  records : T[],
  renderItem : (record : T) => ReactNode 
}

type hasId ={id? : number};
const GridList = <T extends hasId> ({records , renderItem} : TGridList<T>) => {
  const categoryList = records.length > 0 ? 
  records.map(record => 
   <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
         {renderItem(record)}
       </Col>
  )
  : "there are no categories"
  return (
    <Row>{categoryList}</Row>
  )
}

export default GridList;