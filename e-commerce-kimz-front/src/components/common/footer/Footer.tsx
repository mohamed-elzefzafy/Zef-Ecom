import styles from "./styles.module.css";

const {footerContainer} = styles;
const Footer = () => {
  return (
    <div className={footerContainer}>
      Zef Ecom  {new Date().getFullYear()} &copy;
    </div>
  )
}

export default Footer