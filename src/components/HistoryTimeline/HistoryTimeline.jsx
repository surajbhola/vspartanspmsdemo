import React from "react";
import styles from "./HistoryTimeline.module.css";

const timelineItems = [
  {
    year: "2010",
    title: "Foundation",
    description:
      "VSpartans Consultants was founded by Vikram Sharma after his successful tenure as Head of Equities at ICICI Securities, with a vision to provide personalized portfolio management services.",
    iconClass: "ri-flag-line",
    dotBg: "secondary",
  },
  {
    year: "2012",
    title: "SEBI Registration",
    description:
      "Received official SEBI registration as a Portfolio Management Service provider, marking our commitment to regulatory compliance and investor protection.",
    iconClass: "ri-government-line",
    dotBg: "primary",
  },
  {
    year: "2015",
    title: "Expansion",
    description:
      "Expanded our team and moved to our current headquarters in Gurugram. Crossed the milestone of ₹250 million in Assets Under Management with 100+ clients.",
    iconClass: "ri-building-line",
    dotBg: "secondary",
  },
  {
    year: "2018",
    title: "Recognition",
    description:
      'Received "Emerging Portfolio Manager of the Year" award from the Association of Investment Professionals. Launched our Multi-Asset Allocation strategy.',
    iconClass: "ri-award-line",
    dotBg: "primary",
  },
  {
    year: "2023",
    title: "Milestone Achievement",
    description:
      "Surpassed ₹1 billion in Assets Under Management. Expanded our research team and launched our proprietary investment analytics platform for enhanced portfolio management.",
    iconClass: "ri-line-chart-line",
    dotBg: "secondary",
  },
];

const HistoryTimeline = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our History</span>
          <h2 className={styles.title}>The VSpartans Journey</h2>
          <p className={styles.description}>
            From our humble beginnings to becoming a trusted name in portfolio
            management, explore the key milestones that have shaped our journey.
          </p>
        </div>

        <div className={styles.timelineWrapper}>
          {timelineItems.map(({ year, title, description, iconClass, dotBg }) => (
            <div key={year} className={styles.timelineItem}>
              <div
                className={`${styles.timelineDot} ${
                  dotBg === "primary" ? styles.primaryDot : styles.secondaryDot
                }`}
              >
                <i className={iconClass + " " + styles.iconWhite}></i>
              </div>
              <div className={styles.timelineContent}>
                <span
                  className={`${styles.yearBadge} ${
                    dotBg === "primary" ? styles.primaryBadge : styles.secondaryBadge
                  }`}
                >
                  {year}
                </span>
                <h3 className={styles.timelineTitle}>{title}</h3>
                <p className={styles.timelineDescription}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
