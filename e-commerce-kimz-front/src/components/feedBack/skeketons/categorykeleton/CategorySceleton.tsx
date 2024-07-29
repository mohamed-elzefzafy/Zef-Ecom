import { Col, Row } from "react-bootstrap"
import ContentLoader from "react-content-loader"


const CategorySceleton = () => {
  const renderScelton = Array(4).fill(0).map((_,index) =>
  <Col xs={4} key={index} className="d-flex justify-content-center mb-5 mt-2 flex-column">
      <ContentLoader 
    speed={2}
    width={1080}
    height={209}
    viewBox="0 0 1080 209"
    backgroundColor="#c8c0c0"
    foregroundColor="#f3eded"
  >
    <rect x="56" y="199" rx="3" ry="3" width="100" height="6" /> 
    <circle cx="105" cy="94" r="86" />
  </ContentLoader>
  </Col>
  )
  return <Row>{renderScelton}</Row>
}

export default CategorySceleton