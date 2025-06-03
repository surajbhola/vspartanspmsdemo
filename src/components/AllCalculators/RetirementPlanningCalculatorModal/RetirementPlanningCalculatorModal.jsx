import React, { useState, useEffect, useRef } from "react";
import styles from "./RetirementPlanningCalculatorModal.module.css";
import * as echarts from "echarts";

const RetirementPlanningCalculatorModal = ({ onClose }) => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [result, setResult] = useState(null);

  const modalRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

const calculate = () => {
  const yearsToRetirement = retirementAge - currentAge;
  const retirementYears = 20; 

  const annualExpenses = monthlyExpenses * 12;


  const inflatedAnnualExpenses =
    annualExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);


  const realRate =
    (1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1;


  const corpus =
    inflatedAnnualExpenses *
    ((1 - Math.pow(1 + realRate, -retirementYears)) / realRate);


  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = yearsToRetirement * 12;

  const monthlyInvestment =
    (corpus * monthlyRate) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  setResult({
    corpus: Math.round(corpus),
    monthlyInvestment: Math.round(monthlyInvestment),
    yearsToRetirement,
  });
};

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Required Corpus", "Monthly Investment"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "Retirement Planning",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 18, fontWeight: "bold" },
            },
            data: [
              {
                value: result.corpus,
                name: "Required Corpus",
                itemStyle: { color: "#2D69FD" },
              },
              {
                value: result.monthlyInvestment * result.yearsToRetirement * 12,
                name: "Total Investment",
                itemStyle: { color: "#00C48C" },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => chart.resize());
      return () => chart.dispose();
    }
  }, [result]);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="retirement-planning-title"
    >
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.modalHeader}>
          <h2 id="retirement-planning-title">Retirement Planning</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={styles.closeBtn}
          >
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Current Age
              <input
                type="number"
                min={18}
                max={60}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
              />
            </label>

            <label>
              Retirement Age
              <input
                type="number"
                min={currentAge + 1}
                max={80}
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
              />
            </label>

            <label>
              Monthly Expenses (₹)
              <input
                type="number"
                min={1000}
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              />
            </label>

            <label>
              Inflation Rate (%)
              <input
                type="number"
                min={1}
                max={15}
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
              />
            </label>

            <label>
              Expected Return (%)
              <input
                type="number"
                min={1}
                max={15}
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
              />
            </label>

            <button className={styles.calculateBtn} onClick={calculate}>
              Calculate
            </button>

            <p className={styles.tip}>
              Enter your current age, retirement age, monthly expenses, expected
              inflation, and return rates to calculate the required retirement
              corpus and monthly investment.
            </p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Required Corpus</span>
                    <strong>{formatCurrency(result.corpus)}</strong>
                  </div>
                  <div>
                    <span>Monthly Investment</span>
                    <strong>{formatCurrency(result.monthlyInvestment)}</strong>
                  </div>
                  <div>
                    <span>Years to Retirement</span>
                    <strong>{result.yearsToRetirement} years</strong>
                  </div>
                </div>

                <div ref={chartRef} className={styles.chartContainer} />

                <p className={styles.note}>
                  Investing {formatCurrency(result.monthlyInvestment)} monthly
                  can help you accumulate a corpus of{" "}
                  {formatCurrency(result.corpus)} by the age of{" "}
                  {retirementAge}.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img
                  src="/growth-graph.jpg"
                  alt="Retirement Planning"
                />
                <h4>Plan your retirement effectively</h4>
                <p>
                  Enter your details to calculate the required corpus and
                  monthly investment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanningCalculatorModal;
