import React from 'react';
import styles from './About.module.css';
import CompanyOverview from '../../components/CompanyOverview/CompanyOverview';
import HistoryTimeline from '../../components/HistoryTimeline/HistoryTimeline';
import CoreValues from '../../components/CoreValues/CoreValues';
import CTASection from '../../components/CTASection/CTASection';

const About = () => {
  return (
    <div>

    <section className={styles.heroSection}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.overlay}></div>
        <img
          src="https://readdy.ai/api/search-image?query=Modern%2520corporate%2520office%2520space%2520with%2520glass%2520walls%2520and%2520elegant%2520furniture%252C%2520navy%2520blue%2520and%2520gold%2520accents%252C%2520panoramic%2520city%2520view%252C%2520soft%2520natural%2520lighting%252C%2520professional%2520atmosphere%252C%2520subtle%2520luxury%2520details%252C%2520clean%2520architectural%2520lines%252C%2520minimal%2520aesthetic%252C%25208k%2520resolution&width=1440&height=600&seq=205&orientation=landscape"
          alt="VSpartans Office"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentBox}>
          <div className={styles.titleGroup}>
            <h2 className={styles.brand}>
              <span className={styles.highlight}>VS</span>partans
            </h2>
            <span className={styles.badge}>SEBI Registered</span>
          </div>
          <h1 className={styles.heading}>Our Journey of Excellence</h1>
          <p className={styles.text}>
            VSpartans Consultants Pvt. Ltd. is a premier investment management
            firm dedicated to creating long-term value for our clients through
            disciplined investment strategies and personalized service.
          </p>
          <p className={styles.textSecondary}>
            Since our inception in 2015, we have been committed to delivering
            consistent returns while managing risk effectively across various
            market cycles.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>Our Investment Philosophy</button>
            <button className={styles.secondaryButton}>Meet Our Team</button>
          </div>
        </div>
      </div>


    </section>
      <CompanyOverview></CompanyOverview>
<HistoryTimeline></HistoryTimeline>
<CoreValues></CoreValues>
<CTASection></CTASection>
    </div>
    
  );
};

export default About;
