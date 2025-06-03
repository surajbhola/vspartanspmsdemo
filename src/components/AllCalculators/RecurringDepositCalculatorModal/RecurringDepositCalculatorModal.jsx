import React, { useState, useEffect, useRef } from "react";
import styles from "./RecurringDepositCalculatorModal.module.css";
import * as echarts from "echarts";

const RecurringDepositCalculatorModal = ({ onClose }) => {
  const [monthlyAmount, setMonthlyAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(12);
  const [years, setYears] = useState(1);
  const [months, setMonths] = useState(0);
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

  const calculateRD = () => {
    const P = monthlyAmount;
    const r = interestRate / 100 / 12;
    const n = years * 12 + months;

    const maturityAmount = P * n + P * n * (n + 1) * r / (2 * 12);
    const totalInvestment = P * n;
    const totalInterest = maturityAmount - totalInvestment;

    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInterest: Math.round(totalInterest),
      principal: totalInvestment,
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Principal", "Interest Earned"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "RD Breakdown",
            type: "pie",
            radius: ["55%", "70%"],
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
            data: [
              { value: result.principal, name: "Principal", itemStyle: { color: "#2D69FD" } },
              { value: result.totalInterest, name: "Interest Earned", itemStyle: { color: "#F97316" } },
            ],
          },
        ],
      });
      window.addEventListener("resize", () => chart.resize());
      return () => chart.dispose();
    }
  }, [result]);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Recurring Deposit Calculator</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Monthly Amount Deposited *
              <input
                type="number"
                min={100}
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(+e.target.value)}
              />
            </label>

            <label>
              Interest Rate (P.A) *
              <input
                type="number"
                min={0}
                step={0.01}
                value={interestRate}
                onChange={(e) => setInterestRate(+e.target.value)}
              />
            </label>

            <label>
              Deposit Tenure:*
              <div className={styles.tenureInput}>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={years}
                  onChange={(e) => setYears(+e.target.value)}
                />
                <span>Year(s)</span>
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={months}
                  onChange={(e) => setMonths(+e.target.value)}
                />
                <span>Month(s)</span>
              </div>
            </label>

            <button className={styles.calculateBtn} onClick={calculateRD}>
              Calculate
            </button>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Principal</span>
                    <strong>{formatCurrency(result.principal)}</strong>
                  </div>
                  <div>
                    <span>Interest Earned</span>
                    <strong>{formatCurrency(result.totalInterest)}</strong>
                  </div>
                  <div>
                    <span>Maturity Amount</span>
                    <strong>{formatCurrency(result.maturityAmount)}</strong>
                  </div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  Your RD will mature to {formatCurrency(result.maturityAmount)} in {years} year(s) and {months} month(s) at {interestRate}% annual interest.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Recurring Deposit Calculator" />
                <h4>Estimate your RD maturity amount</h4>
                <p>Enter deposit amount, tenure, and interest rate to calculate your returns.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringDepositCalculatorModal;
