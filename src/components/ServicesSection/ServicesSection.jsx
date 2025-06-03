import styles from "./ServicesSection.module.css";

const services = [
  {
    id: 1,
    title: "Equity Portfolio Management",
    description:
      "Strategic equity investments focused on long-term capital appreciation through carefully selected stocks.",
    iconClass: "fas fa-chart-line",
    imgSrc:
      "https://readdy.ai/api/search-image?query=elegant%20stock%20market%20chart%20with%20blue%20and%20gold%20accents%2C%20financial%20data%20visualization%2C%20professional%20investment%20graph%2C%20clean%20minimalist%20design%20with%20subtle%20grid%20lines%2C%20abstract%20market%20performance%20visualization&width=600&height=400&seq=service-1&orientation=landscape",
    alt: "Equity Portfolio Management",
  },
  {
    id: 2,
    title: "Multi-Asset Allocation",
    description:
      "Diversified investment approach across multiple asset classes to optimize risk-adjusted returns.",
    iconClass: "fas fa-balance-scale",
    imgSrc:
      "https://readdy.ai/api/search-image?query=balanced%20investment%20portfolio%20concept%20with%20diverse%20asset%20allocation%20visualization%2C%20professional%20financial%20planning%20chart%2C%20elegant%20wealth%20management%20illustration%20with%20gold%20and%20blue%20color%20scheme%2C%20clean%20modern%20design&width=600&height=400&seq=service-2&orientation=landscape",
    alt: "Multi-Asset Allocation",
  },
  {
    id: 3,
    title: "Personalized Advisory",
    description:
      "Tailored investment strategies aligned with your financial goals, risk tolerance, and time horizon.",
    iconClass: "fas fa-user-tie",
    imgSrc:
      "https://readdy.ai/api/search-image?query=personalized%20financial%20advisory%20concept%20with%20client%20meeting%20professional%20consultant%2C%20elegant%20wealth%20management%20consultation%2C%20sophisticated%20investment%20planning%20session%2C%20clean%20modern%20office%20setting%20with%20blue%20and%20gold%20accents&width=600&height=400&seq=service-3&orientation=landscape",
    alt: "Personalized Advisory",
  },
];

const ServicesSection = () => {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Investment Expertise</h2>
          <p className={styles.subtitle}>
            Comprehensive portfolio management services designed to maximize
            returns while managing risk effectively.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map(({ id, title, description, iconClass, imgSrc, alt }) => (
            <div key={id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={imgSrc} alt={alt} className={styles.image} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <i className={`${iconClass} ${styles.icon}`}></i>
                  <h3 className={styles.cardTitle}>{title}</h3>
                </div>
                <p className={styles.cardDescription}>{description}</p>
                <a href="#" className={styles.learnMore}>
                  Learn more <i className={`fas fa-arrow-right ${styles.arrowIcon}`}></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.viewAllButton}>View All Services</button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
