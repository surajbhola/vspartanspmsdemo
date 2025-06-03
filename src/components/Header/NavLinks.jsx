import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const NavLinks = () => {
  return (
    <nav className="hidden md:flex space-x-8">
      <Link to="/" className={styles.navLink}>Home</Link>
      <Link to="/about" className={styles.navLink}>About Us</Link>
      <Link to="/team" className={styles.navLink}>Our Team</Link>
      <Link to="/offerings" className={styles.navLink}>Our Offerings</Link>
      <Link to="/resources" className={styles.navLink}>Resources</Link>
      <Link to="/faqs" className={styles.navLink}>FAQs</Link>
      <Link to="/career" className={styles.navLink}>Career</Link>
    </nav>
  );
};

export default NavLinks;
