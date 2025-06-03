import React from "react";
import styles from "./CompanyOverview.module.css";

const CompanyOverview = () => {
  const values = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our interactions and decisions.",
    },
    {
      title: "Excellence",
      description: "We strive for exceptional performance in research, strategy, and client service.",
    },
    {                                                 
      title: "Innovation",
      description: "We continuously evolve our approach to stay ahead in a dynamic financial landscape.",
    },
  ];

  const stats = [
    {
      iconClass: "ri-calendar-line",
      value: "15+",
      label: "Years in Business",
    },
    {
      iconClass: "ri-funds-line",
      value: "₹1.2B+",
      label: "Assets Under Management",
    },
    {
      iconClass: "ri-user-star-line",
      value: "500+",
      label: "Satisfied Clients",
    },
    {
      iconClass: "ri-team-line",
      value: "30+",
      label: "Investment Professionals",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.flexRow}>
          <div className={styles.leftColumn}>
            <span className={styles.subtitle}>Our Mission & Vision</span>
            <h2 className={styles.title}>Guided by Purpose, Driven by Excellence</h2>

            <div className={styles.missionBox}>
              <h3 className={styles.heading}>Our Mission</h3>
              <p className={styles.text}>
                To empower investors with personalized portfolio management solutions that deliver consistent long-term growth while preserving capital through market cycles.
              </p>
            </div>

            <div className={styles.visionBox}>
              <h3 className={styles.heading}>Our Vision</h3>
              <p className={styles.text}>
                To be India's most trusted wealth management partner, known for our research excellence, client-centric approach, and unwavering commitment to fiduciary responsibility.
              </p>
            </div>

            <div className={styles.valuesList}>
              {values.map(({ title, description }) => (
                <div key={title} className={styles.valueItem}>
                  <div className={styles.iconCircle}>
               <i className="ri-check-line"></i>

                  </div>
                  <div>
                    <h3 className={styles.valueTitle}>{title}</h3>
                    <p className={styles.text}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.statsGrid}>
              {stats.map(({ iconClass, value, label }) => (
                <div key={label} className={styles.statBox}>
                  <div className={styles.statIcon}>
                    <i className={iconClass}></i>
                  </div>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
