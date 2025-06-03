import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.pageHeading}>Get in Touch</h2>
        <p className={styles.subHeading}>We’d love to hear from you. Here’s how you can reach us.</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3 className={styles.cardTitle}>Call Us</h3>
              <p className={styles.cardText}>Have questions? Give us a call</p>
              <a href="tel:+918130811911" className={styles.cardLink}>+91 8130811911</a>
              <p className={styles.subText}>Business Hours: 9AM - 6PM IST</p>
              <button className={styles.button}><i className="fas fa-phone-alt"></i> Call Now</button>
            </div>
          </div>


          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <i className="fas fa-envelope"></i>
              </div>
              <h3 className={styles.cardTitle}>Email Us</h3>
              <p className={styles.cardText}>Send us your inquiries</p>
              <ul className={styles.emailList}>
                {[
                  "support@vspartanspms.com",
                  "vivek@vspartans.in",
                  "nishi@vspartans.in"
                ].map(email => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className={styles.cardLink}>{email}</a>
                  </li>
                ))}
              </ul>
              <p className={styles.subText}>24/7 Email Support Available</p>
              <button className={styles.button}><i className="fas fa-envelope"></i> Email Now</button>
            </div>
          </div>

   
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3 className={styles.cardTitle}>Visit Us</h3>
              <p className={styles.cardText}>Our office locations</p>
              <address className={styles.cardLink}>
                <strong>Registered Office:</strong><br />
                346 Basement, Sector 38<br />
                Gurgaon, Haryana, 122001<br /><br />

                <strong>Corporate Office:</strong><br />
                101, Imperial Park, Khare Town<br />
                Dharampeth, Nagpur 440010
              </address>
              <p className={styles.subText}>Open Monday to Friday, 9AM - 6PM</p>
              <button className={styles.button}><i className="fas fa-directions"></i> Get Directions</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
