import React from "react";
import styles from "./TeamOverview.module.css";

const overviewCards = [
  {
    icon: "ri-team-line",
    title: "Diverse Backgrounds",
    description:
      "Our team members come from varied professional backgrounds including investment banking, equity research, risk management, and corporate finance, bringing multiple perspectives to our investment strategies.",
  },
  {
    icon: "ri-graduation-cap-line",
    title: "Advanced Credentials",
    description:
      "Our investment professionals hold advanced degrees and prestigious certifications including CFA, CFP, MBA from premier institutions, ensuring the highest standards of financial expertise.",
  },
  {
    icon: "ri-line-chart-line",
    title: "Market Experience",
    description:
      "With experience spanning multiple market cycles, our team has successfully navigated through various economic conditions, from bull markets to recessions, delivering consistent results.",
  },
];

const TeamOverview = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subheading}>Team Overview</span>
          <h2 className={styles.title}>Our Collective Expertise</h2>
          <p className={styles.description}>
            At VSpartans Consultants, we've assembled a diverse team of investment professionals with complementary skills and expertise. Our collaborative approach ensures that every client benefits from our collective knowledge across various market segments and asset classes.
          </p>
        </div>

        <div className={styles.grid}>
          {overviewCards.map((card, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>
                <i className={`${card.icon} ${styles.icon}`}></i>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamOverview;
