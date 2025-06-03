import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { RiArrowDownSLine } from 'react-icons/ri';

const faqs = [
  {
    question: 'What is PMS?',
    answer:
      'Portfolio Management Service (PMS) is an investment service offered by SEBI-registered portfolio managers. It provides customized investment solutions tailored to an individual’s goals, risk profile, and financial situation. PMS is offered in three formats: Discretionary (portfolio manager takes all decisions), Non-discretionary (client takes final decisions), and Advisory (client executes recommendations). VCPL offers a purely equity-based discretionary PMS.',
  },
  {
    question: 'Is there a minimum or maximum investment requirement to invest with VCPL?',
    answer:
      'The minimum investment required is ₹50 lakhs. There is no maximum investment limit. VCPL can manage portfolios of all sizes.',
  },
  {
    question: 'Is a new demat account required for every client?',
    answer:
      'Yes, each client must open a new demat account with VCPL’s preferred depository participant. VCPL facilitates this process upon submission of required documents.',
  },
  {
    question: 'What is the investment policy of VCPL?',
    answer:
      'VCPL follows a research-driven investment strategy focused on identifying growth and value stocks. The approach emphasizes buying at low prices and selling at high, based on macro and microeconomic factors.',
  },
  {
    question: 'Who can open a PMS account with VCPL?',
    answer:
      'Any individual or entity (HUF, LLP, Company, etc.) with a substantial investible surplus seeking long-term, professionally managed investment services can open a PMS account with VCPL.',
  },
  {
    question: 'What are the risks associated with PMS at VCPL?',
    answer:
      'Besides general market risks, PMS investments may face liquidity risks, especially during downturns.',
  },
  {
    question: 'What kind of returns can I expect from PMS at VCPL?',
    answer:
      'While returns cannot be guaranteed due to market volatility, VCPL aims to generate alpha by leveraging this volatility through informed investment decisions.',
  },
  {
    question: 'Can NRIs invest in PMS?',
    answer:
      'Yes, NRIs are eligible to invest in PMS offered by VCPL.',
  },
  {
    question: 'What is the tax treatment for gains earned via PMS?',
    answer:
      'The tax treatment of gains from PMS is the same as for individuals trading directly in their own demat accounts.',
  },
  {
    question: 'What is the fee structure of VCPL?',
    answer:
      'VCPL charges a fixed management fee of 2% per annum on the gross investment. No performance fees are charged. Transactional charges like brokerage and STT are additional.',
  },
  {
    question: 'Can I access my portfolio after investing in PMS with VCPL?',
    answer:
      'Yes. Clients receive login credentials for online portfolio access. Additionally, a detailed monthly portfolio report is emailed to each client.',
  },
  {
    question: 'Is there any lock-in period for invested funds?',
    answer:
      'No, there is no lock-in period. However, VCPL recommends a long-term investment horizon to fully benefit from compounding.',
  },
  {
    question: 'When and how can funds be withdrawn from PMS?',
    answer:
      'Funds can be withdrawn anytime by submitting a withdrawal request. The amount is credited within 10 working days. Partial withdrawals are allowed as long as the remaining amount is ≥ ₹50 lakhs; otherwise, full withdrawal is required.',
  },
  {
    question: 'Is there any exit load applicable on withdrawals?',
    answer:
      'No, VCPL does not levy any exit load on withdrawals. However, clients are advised to stay invested long term for optimal returns.',
  },
];


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>FAQs</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.description}>
            Find answers to common questions about our portfolio management services and investment approach.
          </p>
        </div>

        <div className={styles.faqWrapper}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.accordion}>
              <div
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(index)}
              >
                <h3 className={styles.accordionQuestion}>{faq.question}</h3>
                <RiArrowDownSLine
                  className={`${styles.icon} ${
                    activeIndex === index ? styles.rotate : ''
                  }`}
                />
              </div>
              {activeIndex === index && (
                <div className={styles.accordionContent}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.helpText}>Still have questions? We're here to help.</p>
          <button className={styles.contactButton}>Contact Our Team</button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
