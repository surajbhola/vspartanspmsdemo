import React from 'react';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
  return (
    <section className={styles.whyChooseUsSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <span className={styles.subtitle}>Why Choose VSpartans</span>
            <h2 className={styles.heading}>A Fiduciary Approach to Wealth Management</h2>
            <p className={styles.description}>
              At VSpartans Consultants, we pride ourselves on our client-first
              approach, regulatory compliance, and transparent fee structure.
              Our investment philosophy is built on thorough research and
              disciplined processes.
            </p>
            <div className={styles.featureList}>
              {[
                {
                  title: 'SEBI Registered',
                  description:
                    'We operate under strict regulatory oversight, ensuring the highest standards of compliance and investor protection.'
                },
                {
                  title: 'Experienced Team',
                  description:
                    'Our portfolio managers average 15+ years of experience across market cycles and diverse economic conditions.'
                },
                {
                  title: 'Transparent Fee Structure',
                  description:
                    'We believe in complete transparency with a simple fee structure aligned with your investment success.'
                },
                {
                  title: 'Personalized Approach',
                  description:
                    'Every portfolio is customized to your specific financial goals, risk tolerance, and time horizon.'
                }
              ].map((item, index) => (
                <div className={styles.featureItem} key={index}>
                  <div className={styles.featureIcon}>
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <h3 className={styles.featureTitle}>{item.title}</h3>
                    <p className={styles.featureDescription}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img
                // src="https://readdy.ai/api/search-image?query=A%20professional%20and%20sophisticated%20image%20showing%20a%20diverse%20group%20of%20financial%20advisors%20in%20a%20modern%20office%20environment.&width=800&height=600&seq=2&orientation=landscape"
                      src='WhyChooseusBg.jpg'
                alt="Investment Advisors Meeting"
                className={styles.mainImage}
              />
              <div className={styles.testimonialCard}>
                <div className={styles.rating}>
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <i className="ri-star-fill" key={i}></i>
                    ))}
                  <span className={styles.ratingValue}>5.0/5.0</span>
                </div>
                <p className={styles.testimonial}>
                  "VSpartans has transformed our approach to retirement
                  planning. Their strategic guidance has consistently delivered
                  results that exceed our expectations."
                </p>
                <div className={styles.clientInfo}>
                  <div className={styles.clientImageWrapper}>
                    <img
                    //   src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20middle-aged%20Indian%20businessman...&width=100&height=100&seq=3&orientation=squarish"


                      src='WhyChooseusBg1.jpg'
                      alt="Client"
                      className={styles.clientImage}
                    />
                  </div>
                  <div>
                    <h4 className={styles.clientName}>Rajiv Mehta</h4>
                    <p className={styles.clientTitle}>CEO, TechVision India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
