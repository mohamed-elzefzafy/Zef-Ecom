import styles from "./styles.module.css";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const {container , totalNum , pumpAnimate , iconWrapper} = styles;

type TProps = {
  totalQuantity : number,
 svgIcon :ReactNode,
 to : string,
 title : string,
}

function HeaderCounter({totalQuantity , svgIcon , to , title} : TProps) {
  const [isAnimate, setIsAnimate] = useState(false);
const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`

  useEffect(()=>{
    if (!totalQuantity) return
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  },[totalQuantity]);


  return (
    <Link to={to} className={container }>
<div className={iconWrapper}>
        {/* <Logo title="basket icon"/> */}
        {svgIcon}
         {totalQuantity > 0 && <div className={quantityStyle}>{totalQuantity}</div>}
</div>
<h3>{title}</h3>
    </Link>
  )
}

export default HeaderCounter;