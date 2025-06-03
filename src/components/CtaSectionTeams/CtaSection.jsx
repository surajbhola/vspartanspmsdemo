import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Join Our Growing Team</h2>
          <p className={styles.description}>
            We're always looking for talented professionals who share our passion for excellence in investment management.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.buttonSecondary}>View Open Positions</button>
            <button className={styles.buttonWhite}>Learn About Our Culture</button>
          </div>
        </div>
      </div>
    </section>
  );
}
