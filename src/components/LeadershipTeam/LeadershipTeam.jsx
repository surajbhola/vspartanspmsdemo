import React from 'react';
import styles from './LeadershipTeam.module.css';
import 'remixicon/fonts/remixicon.css';

const teamMembers = [
  {
    name: 'Mr. Vivek Singhal',
    title: 'Founder & Director',
    experience: '20+ years experience',
    education: 'Seasoned Market Observer',
    credential: 'Mentor to thousands of traders',
    description:
      'Founder and promoter of Vspartans Consultants Pvt. Ltd., Mr. Vivek Singhal is a seasoned market observer with over 20 years of experience. His keen insight and sharp intuitiveness in share trading have consistently yielded outstanding results. He is also a passionate mentor, having guided thousands of aspiring traders to success in the share market.',
    image: 'https://vspartanspms.com/wp-content/uploads/2025/01/dsad.png',
  },
  {
    name: 'Dr. Aastha Agrawal',
    title: 'Principal Officer',
    experience: '25+ years experience',
    education: 'Chartered Accountant, PhD in Business Economics',
    credential: 'Strategic thinker and visionary leader',
    description:
      'A Chartered Accountant with a Doctorate in Business Economics, Dr. Aastha Agrawal brings over 25 years of professional experience. Her disciplined approach and innovative mindset provide the company with a solid foundation of stability and strategic vision.',
    image: 'https://vspartanspms.com/wp-content/uploads/2025/01/sfsafs.png',
  },
  {
    name: 'Nirmal Agrawal',
    title: 'Director',
    experience: '25+ years experience',
    education: 'Chartered Accountant',
    credential: 'Qualified Research Analyst',
    description:
      'A Chartered Accountant with over 25 years of experience in finance, Nirmal Agrawal’s passion for the stock market has established him as a consummate share trading professional. As a qualified research analyst, he brings unmatched expertise in identifying value and growth stocks aligned with the company’s core principles.',
    image: 'https://vspartanspms.com/wp-content/uploads/2025/01/bgngf.png',
  },
  {
    name: 'Mrs. Nishi Singhal',
    title: 'Compliance Officer',
    experience: 'Expert in regulatory compliance',
    education: 'Specialist in governance frameworks',
    credential: 'Operational integrity and transparency enforcer',
    description:
      'With expertise in regulatory compliance and governance, Mrs. Nishi Singhal ensures adherence to all statutory and regulatory frameworks. She plays a pivotal role in fostering a culture of transparency and accountability, delivering trusted and ethical financial solutions.',
    image: 'https://vspartanspms.com/wp-content/uploads/2025/01/asfdsf.png',
  },
];


const LeadershipTeam = () => {
  return (
    <section className={styles.leadershipSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.subtitle}>Leadership</span>
          <h2 className={styles.title}>Our Senior Management</h2>
          <p className={styles.description}>
            Meet the visionaries who guide our investment strategies and ensure we maintain the highest standards of service excellence.
          </p>
        </div>

        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={member.image} alt={member.name} className={styles.image} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.title}</p>
                <div className={styles.info}>
                  <div><i className="ri-briefcase-line" /> {member.experience}</div>
                  <div><i className="ri-graduation-cap-line" /> {member.education}</div>
                  <div><i className="ri-award-line" /> {member.credential}</div>
                </div>
                <p className={styles.bio}>{member.description}</p>
                <div className={styles.socials}>
                  <a href="#"><i className="ri-linkedin-fill" /></a>
                  <a href="#"><i className="ri-twitter-fill" /></a>
                  <a href="#"><i className="ri-mail-line" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
