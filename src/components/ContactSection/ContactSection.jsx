import React from "react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.flexRow}>
            <div className={styles.leftPane}>
              <span className={styles.subtitle}>Get in Touch</span>
              <h2 className={styles.title}>Connect With Our Team</h2>
              <p className={styles.text}>
                Have questions about our investment approach or want to explore
                career opportunities? Our team is here to help.
              </p>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <i className="ri-map-pin-line" />
                  </div>
                  <div>
                    <h3 className={styles.infoTitle}>Registered Office</h3>
                    <p className={styles.infoText}>
                      346 Basement, Sector 38, Gurgaon, Haryana, 122001
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <i className="ri-map-pin-line" />
                  </div>
                  <div>
                    <h3 className={styles.infoTitle}>Corporate Office</h3>
                    <p className={styles.infoText}>
                      101, Imperial Park, Khare Town, Dharampeth, Nagpur 440010
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <i className="ri-phone-line" />
                  </div>
                  <div>
                    <h3 className={styles.infoTitle}>Phone</h3>
                    <p className={styles.infoText}>+91 8130811911</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <i className="ri-mail-line" />
                  </div>
                  <div>
                    <h3 className={styles.infoTitle}>Email</h3>
                    <p className={styles.infoText}>support@vspartanspms.com</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <i className="ri-building-line" />
                  </div>
                  <div>
                    <h3 className={styles.infoTitle}>CIN</h3>
                    <p className={styles.infoText}>U74999HR2021PTC100061</p>
                  </div>
                </div>
              </div>

              <div className={styles.buttonWrapper}>
                <button className={styles.button}>Schedule a Meeting</button>
              </div>
            </div>

            <div className={styles.rightPane}>
              <h3 className={styles.rightTitle}>Department Contacts</h3>

              <div className={styles.departmentList}>
                <div>
                  <h4 className={styles.departmentTitle}>Compliance</h4>
                  <p className={styles.departmentText}>Mrs. Nishi Singhal</p>
                  <p className={styles.departmentText}>nishi@vspartans.in</p>
                </div>

                <div>
                  <h4 className={styles.departmentTitle}>Principal Officer</h4>
                  <p className={styles.departmentText}>Dr. Aastha Agrawal</p>
                  <p className={styles.departmentText}>astha@vspartans.in</p>
                </div>

                <div>
                  <h4 className={styles.departmentTitle}>Client Support</h4>
                  <p className={styles.departmentText}>Support Team</p>
                  <p className={styles.departmentText}>support@vspartanspms.com</p>
                </div>

                <div>
                  <h4 className={styles.departmentTitle}>Careers</h4>
                  <p className={styles.departmentText}>Human Resources</p>
                  <p className={styles.departmentText}>careers@vspartans.com</p>
                </div>
              </div>

              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <i className="ri-linkedin-fill" />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <i className="ri-twitter-fill" />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <i className="ri-facebook-fill" />
                </a>
                <a href="#" className={styles.socialLink} aria-label="YouTube">
                  <i className="ri-youtube-fill" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
