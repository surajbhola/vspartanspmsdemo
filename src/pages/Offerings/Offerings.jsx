import React from "react";
import styles from "./Offerings.module.css";

const Offerings = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>VSPARTANS MULTICAP PORTFOLIO</h2>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.content}>
            <p className={styles.paragraph}>
              At Vspartans Consultants Pvt. Ltd. (VCPL), we offer a distinctive multicap diversified equity portfolio that spans across a broad spectrum of sectors and companies with varying market capitalizations. This approach allows us to tap into the growth potential of both large, established companies as well as emerging, high-potential firms, ensuring a well-rounded and balanced portfolio. Our strategy is centered around wealth maximization by identifying and capitalizing on the right opportunities at the optimal time, while mitigating risks through diversification.
            </p>

            <p className={styles.paragraph}>
              We are committed to a dynamic investment approach, continuously revising and realigning our portfolio to adapt to changing market conditions, economic shifts, and emerging trends. Our team of experienced professionals conducts thorough research and employs a disciplined selection process to ensure that every investment aligns with our long-term goals.
            </p>

            <p className={styles.paragraph}>
              By focusing on both growth and value, we seek to provide sustainable returns for our clients. With an emphasis on transparency, regular updates, and personalized strategies, we ensure that our clients' portfolios are resilient, strategically positioned for long-term success, and continuously optimized for growth.
            </p>


            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.icon}>
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h3 className={styles.cardTitle}>Digital Transformation</h3>
                <p className={styles.cardText}>
                  Modernize your business with custom digital solutions designed
                  to enhance efficiency and customer experience.
                </p>
              </div>

              <div className={styles.card}>
                <div className={styles.icon}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className={styles.cardTitle}>Strategic Consulting</h3>
                <p className={styles.cardText}>
                  Gain insights from our industry experts to develop strategies
                  that drive sustainable growth and competitive advantage.
                </p>
              </div>

              <div className={styles.card}>
                <div className={styles.icon}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className={styles.cardTitle}>Security Solutions</h3>
                <p className={styles.cardText}>
                  Protect your valuable data and systems with our comprehensive
                  security services and compliance frameworks.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Offerings;
