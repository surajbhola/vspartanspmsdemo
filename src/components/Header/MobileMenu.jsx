import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const MobileMenu = () => {
  return (
    <div className="md:hidden bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex flex-col space-y-4">
          <Link to="/" className={styles.mobileLink}>Home</Link>
          <Link to="/about" className={styles.mobileLink}>About Us</Link>
          <Link to="/team" className={styles.mobileLink}>Our Team</Link>
          <Link to="/offerings" className={styles.mobileLink}>Our Offerings</Link>
          <Link to="/resources" className={styles.mobileLink}>Resources</Link>
          <Link to="/faqs" className={styles.mobileLink}>FAQs</Link>
          <Link to="/career" className={styles.mobileLink}>Career</Link>
          <Link to="/contact" className={styles.mobileLink}>Contact Us</Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
