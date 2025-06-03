import React from "react";
import styles from "./CTASection.module.css";

const CTASection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to Partner with VSpartans?</h2>
          <p className={styles.subtitle}>
            Schedule a complimentary consultation with our investment experts to discuss your financial goals and how we can help you achieve them.
          </p>
          <div className={styles.buttonGroup}>
            <button className={`${styles.button} ${styles.primaryButton}`}>
              Schedule a Consultation
            </button>
            <button className={`${styles.button} ${styles.secondaryButton}`}>
              Download Corporate Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
