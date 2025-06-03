import React, { useState, useEffect, useRef } from "react";
import styles from "./StepUpCalculatorModal.module.css";
import * as echarts from "echarts";

const StepUpCalculatorModal = ({ onClose }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(15000);
  const [annualGrowthRate, setAnnualGrowthRate] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [tenure, setTenure] = useState(20);
  const [result, setResult] = useState(null);

  const modalRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    const handleEscape = (e) => { if (e.key === "Escape") onClose(); };
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
    let totalInvestment = 0;
    let futureValue = 0;
    let currentMonthly = monthlyInvestment;
    const r = expectedReturn / 100 / 12;

    for (let year = 1; year <= tenure; year++) {
      for (let month = 1; month <= 12; month++) {
        futureValue += currentMonthly * Math.pow(1 + r, (tenure - year) * 12 + (12 - month));
        totalInvestment += currentMonthly;
      }
      currentMonthly *= 1 + annualGrowthRate / 100;
    }

    const estimatedReturns = futureValue - totalInvestment;

    setResult({
      totalInvestment: Math.round(totalInvestment),
      futureValue: Math.round(futureValue),
      estimatedReturns: Math.round(estimatedReturns),
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
            name: "Step-Up Plan",
            type: "pie",
            radius: ["55%", "70%"],
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 18, fontWeight: "bold" } },
            data: [
              { value: result.totalInvestment, name: "Total Investment", itemStyle: { color: "#2D69FD" } },
              { value: result.estimatedReturns, name: "Estimated Returns", itemStyle: { color: "#00C48C" } },
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
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Step-Up Calculator</h2>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Monthly Investment Amount
              <input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} />
            </label>
            <label>
              Growth in Investment Amount (P.A.) (%)
              <input type="number" value={annualGrowthRate} onChange={(e) => setAnnualGrowthRate(Number(e.target.value))} />
            </label>
            <label>
              Expected Return (P.A.) (%)
              <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
            </label>
            <label>
              Tenure (Years)
              <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </label>
            <button className={styles.calculateBtn} onClick={calculate}>Calculate</button>
            <p className={styles.tip}>A step-up strategy helps build wealth gradually and effectively.</p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div><span>Future Value</span><strong>{formatCurrency(result.futureValue)}</strong></div>
                  <div><span>Total Investment</span><strong>{formatCurrency(result.totalInvestment)}</strong></div>
                  <div><span>Estimated Returns</span><strong>{formatCurrency(result.estimatedReturns)}</strong></div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  By increasing your monthly SIP annually, you could accumulate {formatCurrency(result.futureValue)} in {tenure} years.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Step-Up Planning" />
                <h4>Boost Your Investment Yearly</h4>
                <p>Enter your SIP, expected growth, and return rate to plan better.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUpCalculatorModal;
