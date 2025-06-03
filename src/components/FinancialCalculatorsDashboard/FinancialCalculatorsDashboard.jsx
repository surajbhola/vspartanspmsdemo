import React, { useState, useRef, useEffect } from "react";
import styles from "./FinancialCalculatorsDashboard.module.css";
import * as echarts from "echarts";
import SIPCalculatorModal from "../AllCalculators/SIPCalculatorModal/SIPCalculatorModal";
import LumpsumCalculatorModal from "../AllCalculators/LumpsumCalculatorModal/LumpsumCalculatorModal";
import GoalPlanningLumpsumModal from "../AllCalculators/GoalPlanningLumpsumModal/GoalPlanningLumpsumModal";
import GoalPlanningSIPModal from "../AllCalculators/GoalPlanningSIPModal/GoalPlanningSIPModal";
import TimeDurationOneTimeModal from "../AllCalculators/TimeDurationOneTimeModal/TimeDurationOneTimeModal";
import TimeDurationSIPModal from "../AllCalculators/TimeDurationSIPModal/TimeDurationSIPModal";
import RetirementPlanningCalculatorModal from "../AllCalculators/RetirementPlanningCalculatorModal/RetirementPlanningCalculatorModal";
import StockMarketVsFDModal from "../AllCalculators/StockMarketVsFDModal/StockMarketVsFDModal";
import InvestmentPlannerModal from "../AllCalculators/InvestmentPlannerModal/InvestmentPlannerModal";
import StepUpCalculatorModal from "../AllCalculators/StepUpCalculatorModal/StepUpCalculatorModal";
import ChildEducationPlannerModal from "../AllCalculators/ChildEducationPlannerModal/ChildEducationPlannerModal";
import EMICalculatorModal from "../AllCalculators/EMICalculatorModal/EMICalculatorModal";
import EducationLoanEMICalculatorModal from "../AllCalculators/EducationLoanEMICalculatorModal/EducationLoanEMICalculatorModal";
import PPFCalculatorModal from "../AllCalculators/PPFCalculatorModal/PPFCalculatorModal";
import FixedDepositCalculatorModal from "../AllCalculators/FixedDepositCalculatorModal/FixedDepositCalculatorModal";
import RecurringDepositCalculatorModal from "../AllCalculators/RecurringDepositCalculatorModal/RecurringDepositCalculatorModal";
import CompoundInterestCalculatorModal from "../AllCalculators/CompoundInterestCalculatorModal/CompoundInterestCalculatorModal";
import CAGRCalculatorModal from "../AllCalculators/CAGRCalculatorModal/CAGRCalculatorModal";

const calculators = [
  { id: "sip", title: "SIP Calculator", description: "Calculate your returns on systematic investments", category: "Mutual Fund", icon: "fa-chart-line" },
  { id: "lumpsum", title: "Lumpsum Calculator", description: "Estimate returns on one-time investments", category: "Investment", icon: "fa-coins" },
  { id: "goal", title: "Goal Planning", description: "Plan investments to achieve your goals", category: "Investment", icon: "fa-bullseye" },
  { id: "goal-sip", title: "Goal Planning SIP", description: "Plan your goal investments via SIP", category: "Investment", icon: "fa-bullseye" },
  { id: "time-duration-onetime", title: "Time Duration (One-time)", description: "Calculate investment duration for one-time investments", category: "Investment", icon: "fa-hourglass-start" },
  { id: "time-duration-regular", title: "Time Duration (Regular)", description: "Calculate investment duration for regular investments", category: "Investment", icon: "fa-hourglass-half" },
  { id: "retirement", title: "Retirement Planning", description: "Plan your finances for retirement", category: "Retirement", icon: "fa-umbrella-beach" },
  { id: "investment-planner", title: "Investment Planner", description: "Plan and track your investments", category: "Investment", icon: "fa-file-invoice-dollar" },
  { id: "stock-vs-fd", title: "Stock Market vs FD Returns", description: "Compare stock market and fixed deposit returns", category: "Investment", icon: "fa-chart-bar" },
  { id: "child-education-planner", title: "Child Education Planner", description: "Plan finances for your child's education", category: "Investment", icon: "fa-graduation-cap" },
  { id: "step-up", title: "Step-Up Calculator", description: "Calculate SIP with step-up increments", category: "Investment", icon: "fa-arrow-up" },
//   { id: "dcf", title: "DCF Calculator", description: "Discounted Cash Flow valuation calculator", category: "Investment", icon: "fa-calculator" },
  { id: "emi", title: "EMI Calculator", description: "Calculate your monthly loan installments", category: "Loan", icon: "fa-home" },
  { id: "emi-education", title: "EMI Education Loan", description: "Calculate EMI for education loans", category: "Loan", icon: "fa-graduation-cap" },
  { id: "ppf", title: "PPF Calculator", description: "Calculate returns on PPF investments", category: "Investment", icon: "fa-wallet" },
  { id: "fd", title: "Fixed Deposit Calculator", description: "Estimate returns on your fixed deposits", category: "Investment", icon: "fa-piggy-bank" },
  { id: "rd", title: "Recurring Deposit Calculator", description: "Estimate returns on recurring deposits", category: "Investment", icon: "fa-coins" },
  { id: "compound-interest", title: "Compound Interest Calculator", description: "Calculate compound interest returns", category: "Investment", icon: "fa-chart-line" },
  { id: "cagr", title: "CAGR Calculator", description: "Calculate compound annual growth rate", category: "Investment", icon: "fa-chart-bar" },
];

const filters = ["All", "Mutual Fund", "Loan", "Investment", "Tax", "Retirement"];

const FinancialCalculatorsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCalculator, setActiveCalculator] = useState(null);


  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch =
      calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || calc.category === activeFilter;
    return matchesSearch && matchesFilter;
  });


  const closeModal = () => setActiveCalculator(null);

  return (
    <main className={styles.dashboard}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Smart Financial Calculators</h1>
          <p>Make smarter financial decisions with our suite of powerful tools.</p>
          <div className={styles.heroActions}>
            <button className={styles.primaryBtn}>
              <i className="fas fa-calculator" /> Explore All Tools
            </button>
            <button className={styles.secondaryBtn}>
              <i className="fas fa-play-circle" /> Watch Demo
            </button>
          </div>
        </div>
        <div className={styles.heroImage} />
      </section>

      <section className={styles.searchFilter}>
        <div className={styles.searchBar}>
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Search calculators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")}>
              <i className="fas fa-times" />
            </button>
          )}
        </div>

        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${
                activeFilter === filter ? styles.active : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.grid}>
        {filteredCalculators.length ? (
          filteredCalculators.map((calc) => (
            <div
              key={calc.id}
              className={styles.card}
              onClick={() => setActiveCalculator(calc)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveCalculator(calc);
              }}
            >
              <div className={styles.cardIcon}>
                <i className={`fas ${calc.icon}`} />
              </div>
              <h3>{calc.title}</h3>
              <p>{calc.description}</p>
              <button className={styles.cardBtn}>
                Start <i className="fas fa-arrow-right" />
              </button>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <i className="fas fa-search" />
            <h3>No calculators found</h3>
            <p>Try adjusting your search or filter</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>


      {activeCalculator && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
          >
            <button className={styles.closeBtn} onClick={closeModal} aria-label="Close modal">
              &times;
            </button>
            <h2>{activeCalculator.title}</h2>
            <p>{activeCalculator.description}</p>

           {activeCalculator && (
  <>
    {activeCalculator.id === "sip" && <SIPCalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "lumpsum" && <LumpsumCalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "goal" && <GoalPlanningLumpsumModal onClose={closeModal} />}
    {activeCalculator.id === "goal-sip" && <GoalPlanningSIPModal onClose={closeModal} />}
    {activeCalculator.id === "time-duration-onetime" && <TimeDurationOneTimeModal onClose={closeModal} />}
    {activeCalculator.id === "time-duration-regular" && <TimeDurationSIPModal onClose={closeModal} />}
    {activeCalculator.id === "retirement" && <RetirementPlanningCalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "investment-planner" && <InvestmentPlannerModal onClose={closeModal} />}
    {activeCalculator.id === "stock-vs-fd" && <StockMarketVsFDModal onClose={closeModal} />}
    {activeCalculator.id === "child-education-planner" && <ChildEducationPlannerModal onClose={closeModal} />}
    {activeCalculator.id === "step-up" && <StepUpCalculatorModal onClose={closeModal} />}
    {/* {activeCalculator.id === "dcf" && <DCFCalculatorModal onClose={closeModal} />} */}
    {activeCalculator.id === "emi" && <EMICalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "emi-education" && <EducationLoanEMICalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "ppf" && <PPFCalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "fd" && 
    
    <FixedDepositCalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "rd" && <RecurringDepositCalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "compound-interest" && <CompoundInterestCalculatorModal onClose={closeModal} />}
    {activeCalculator.id === "cagr" && <CAGRCalculatorModal onClose={closeModal} />}


    {![
      "sip",
      "lumpsum",
      "goal",
      "goal-sip",
      "time-duration-onetime",
      "time-duration-regular",
      "retirement",
      "investment-planner",
      "stock-vs-fd",
      "child-education-planner",
      "step-up",
      "dcf",
      "emi",
      "emi-education",
      "ppf",
      "fd",
      "rd",
      "compound-interest",
      "cagr",
    ].includes(activeCalculator.id) && (
      <p>Calculator for "{activeCalculator.title}" coming soon!</p>
    )}
  </>
)}

          </div>
        </div>
      )}
    </main>
  );
};

export default FinancialCalculatorsDashboard;
