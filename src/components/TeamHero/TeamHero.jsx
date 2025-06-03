import React from "react";
import styles from "./TeamHero.module.css";

const TeamHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.content}>
            <span className={styles.badge}>Our Expert Team</span>
            <h1 className={styles.title}>
              Meet the Investment Specialists Behind VSpartans
            </h1>
            <p className={styles.description}>
              Our team brings together decades of experience from leading
              financial institutions with a shared commitment to excellence in
              wealth management.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>150+</span>
                <span className={styles.statLabel}>Years Combined Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>₹1.2B+</span>
                <span className={styles.statLabel}>Assets Under Management</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>98%</span>
                <span className={styles.statLabel}>Client Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamHero;
