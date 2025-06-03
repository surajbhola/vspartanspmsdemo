import { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={`${styles.container}`}>
        <div className={styles.flexBetween}>
          <div className={styles.flexGroup}>
           <div className={styles.logoContainer}>
  <Link to="/" className={styles.logoText}>
    VSpartans
  </Link>
  <span className={styles.badge}>SEBI Registered</span>
</div>


            <nav className={styles.desktopNav}>
              {["About", "Team", "Offerings", "Resources","Calculators"].map((item, i) => (
                <Link key={i} to={`/${item.toLowerCase().replace(/\s+/g, "")}`} className={styles.navLink}>
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.flexGroup}>
            <Link to="/contact" className={styles.contactButton}>
              Contact Us
            </Link>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} ${styles.icon}`}></i>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.container}>
            <nav className={styles.mobileNav}>
              {["About Us", "Our Team", "Offerings", "Resources", "Calculators", "Contact Us"].map(
                (item, i) => (
                  <Link
                    key={i}
                    to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                    className={styles.mobileLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
