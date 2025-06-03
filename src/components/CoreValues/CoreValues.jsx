import React from "react";
import styles from "./CoreValues.module.css";

const values = [
  {
    iconClass: "ri-shield-check-line",
    title: "Fiduciary Excellence",
    description:
      "We always place our clients' interests first, maintaining the highest standards of fiduciary responsibility in every action we take.",
  },
  {
    iconClass: "ri-book-read-line",
    title: "Research Rigor",
    description:
      "We believe in thorough, independent research as the foundation for sound investment decisions and long-term performance.",
  },
  {
    iconClass: "ri-eye-line",
    title: "Transparency",
    description:
      "We maintain complete transparency in our fee structure, investment process, and client communications.",
  },
  {
    iconClass: "ri-user-settings-line",
    title: "Client-Centric Approach",
    description:
      "We design personalized solutions that align with each client's unique financial goals, risk tolerance, and time horizon.",
  },
  {
    iconClass: "ri-lightbulb-line",
    title: "Continuous Learning",
    description:
      "We foster a culture of continuous improvement and knowledge sharing to stay at the forefront of investment strategies.",
  },
  {
    iconClass: "ri-community-line",
    title: "Collaborative Spirit",
    description:
      "We work as a cohesive team, leveraging diverse perspectives to deliver superior investment solutions for our clients.",
  },
];

const CoreValues = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our Core Values</span>
          <h2 className={styles.title}>Principles That Guide Us</h2>
          <p className={styles.description}>
            Our values form the foundation of our culture and guide every
            decision we make in service of our clients.
          </p>
        </div>

        <div className={styles.grid}>
          {values.map(({ iconClass, title, description }) => (
            <div key={title} className={styles.valueCard}>
              <div className={styles.iconCircle}>
                <i className={`${iconClass} ${styles.iconPrimary}`}></i>
              </div>
              <h3 className={styles.valueTitle}>{title}</h3>
              <p className={styles.valueDescription}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
