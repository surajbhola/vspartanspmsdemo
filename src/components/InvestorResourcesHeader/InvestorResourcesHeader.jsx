import React from "react";
import styles from "./InvestorResourcesHeader.module.css";
import { FaSearch, FaTimes, FaFileContract, FaChartLine, FaSitemap, FaChartBar } from "react-icons/fa";

const InvestorResourcesHeader = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) => {
  const categories = [
    { key: "all", label: "All Documents", icon: null },
    { key: "regulatory", label: "Regulatory", icon: <FaFileContract className={styles.icon} /> },
    { key: "investment", label: "Investment", icon: <FaChartLine className={styles.icon} /> },
    { key: "framework", label: "Framework", icon: <FaSitemap className={styles.icon} /> },
    { key: "performance", label: "Performance", icon: <FaChartBar className={styles.icon} /> },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Investor Resources & Documents</h1>
          <p className={styles.subtitle}>
            Access our comprehensive collection of investment resources,
            regulatory documents, and market insights to make informed
            decisions.
          </p>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search for documents, reports, or topics..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className={styles.searchIcon} />
            {searchQuery && (
              <button
                className={styles.clearBtn}
                onClick={() => setSearchQuery("")}
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div className={styles.filterButtons}>
            {categories.map(({ key, label, icon }) => (
              <button
                key={key}
                className={`${styles.filterBtn} ${
                  activeCategory === key ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(key)}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorResourcesHeader;
