import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <a href="#" className={styles.logo}>VSpartans</a>
            <p className={styles.description}>
              SEBI Registered Portfolio Management Services providing personalized investment solutions.
            </p>
            <div className={styles.socialIcons}>
              <a href="#"><i className="ri-linkedin-fill"></i></a>
              <a href="#"><i className="ri-twitter-fill"></i></a>
              <a href="#"><i className="ri-facebook-fill"></i></a>
              <a href="#"><i className="ri-youtube-fill"></i></a>
            </div>
          </div>

          <div>
            <h3 style={{marginBottom: "1rem"}}>Quick Links</h3>
            <ul>
              {['Home','About','Team','Offerings','Resources','FAQs','Career','Contact Us'].map(item => (
                <li key={item} className={styles.linkItem}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{marginBottom: "1rem"}}>Services</h3>
            <ul>
              {['Equity Portfolio Management','Multi-Asset Allocation','Wealth Preservation','High Growth Portfolio','Retirement Planning','Tax-Efficient Investing'].map(service => (
                <li key={service} className={styles.linkItem}><a href="#" >{service}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{marginBottom: "1rem"}}>Contact Us</h3>
            <ul className={styles.contactList}>
              <li>
                <i className="ri-map-pin-line"></i>
                Registered Office: 346 Basement, Sector 38, Gurgaon, Haryana, 122001
              </li>
              <li>
                <i className="ri-map-pin-line"></i>
                Corporate Office: 101, Imperial Park, Khare Town, Dharampeth, Nagpur 440010
              </li>
              <li><i className="ri-phone-line"></i>+91 8130811911</li>
              <li><i className="ri-mail-line"></i>support@vspartanspms.com</li>
            </ul>

            <h3 className={styles.newsletterHeading}>Subscribe to Our Newsletter</h3>
            <form className={styles.form}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© 2025 VSpartans Consultants Pvt. Ltd. All rights reserved. SEBI Registration No: INP000009083 | CIN: U74999HR2021PTC100061</p>
          <div className={styles.links}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Disclaimer</a>
          </div>
          <div className={styles.payments}>
            {['visa','mastercard','paypal','amazon-pay','bank-card'].map(icon => (
              <i key={icon} className={`ri-${icon}-fill`}></i>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
