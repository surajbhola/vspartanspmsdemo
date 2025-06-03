import styles from "./HomeHero.module.css";

const HomeHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Strategic Portfolio Management for Lasting Growth
            </h1>
            <p className={styles.subtitle}>
              SEBI-registered portfolio management services tailored to your
              financial goals and risk appetite.
            </p>

            <div className={styles.sebiBadge}>
              <i className={`fas fa-certificate ${styles.certificateIcon}`}></i>
              <span>SEBI Registration No: INP000009083</span>
            </div>

            <div className={styles.buttonsWrapper}>
              <button className={styles.primaryButton}>
                Schedule Consultation
              </button>
              <button className={styles.secondaryButton}>
                Explore Services
              </button>
            </div>
          </div>
          <div className={styles.imagePlaceholder}>
          </div>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </section>
  );
};

export default HomeHero;
