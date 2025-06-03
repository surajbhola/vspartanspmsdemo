import React, { useState, useEffect, useRef } from "react";
import styles from "./InvestmentPlannerModal.module.css";
import * as echarts from "echarts";

const InvestmentPlannerModal = ({ onClose }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [savingsRate, setSavingsRate] = useState(20);
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
  const totalMonths = yearsToRetirement * 12;
  const monthlySavings = (monthlyIncome * savingsRate) / 100;
  const monthlyRate = expectedReturn / 12 / 100;

  const futureValue =
    monthlySavings *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);

  setResult({
    monthlySavings: Math.round(monthlySavings),
    futureValue: Math.round(futureValue),
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
          data: ["Total Investment", "Estimated Returns"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "Investment Planner",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 18, fontWeight: "bold" },
            },
            data: [
              {
                value: result.monthlySavings * result.yearsToRetirement * 12,
                name: "Total Investment",
                itemStyle: { color: "#00C48C" },
              },
              {
                value:
                  result.futureValue -
                  result.monthlySavings * result.yearsToRetirement * 12,
                name: "Estimated Returns",
                itemStyle: { color: "#2D69FD" },
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
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Investment Planner</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Monthly Income (₹)
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              />
            </label>

            <label>
              Current Age
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
              />
            </label>

            <label>
              Retirement Age
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
              />
            </label>

            <label>
              Savings Rate (% of Income)
              <input
                type="number"
                value={savingsRate}
                onChange={(e) => setSavingsRate(Number(e.target.value))}
              />
            </label>

            <label>
              Expected Return (%)
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
              Calculate
            </button>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Monthly Savings</span>
                    <strong>{formatCurrency(result.monthlySavings)}</strong>
                  </div>
                  <div>
                    <span>Future Value</span>
                    <strong>{formatCurrency(result.futureValue)}</strong>
                  </div>
                  <div>
                    <span>Years to Invest</span>
                    <strong>{result.yearsToRetirement}</strong>
                  </div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Investment Planner" />
                <h4>Plan your investment smartly</h4>
                <p>
                  Enter your income and savings percentage to see how much you
                  can accumulate before retirement.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlannerModal;

 
