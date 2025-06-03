import React, { useState, useEffect, useRef } from "react";
import styles from "./TimeDurationOneTimeModal.module.css";
import * as echarts from "echarts";

const TimeDurationOneTimeModal = ({ onClose }) => {
  const [investment, setInvestment] = useState(500000);
  const [rate, setRate] = useState(12);
  const [goal, setGoal] = useState(1000000);
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
    const r = rate / 100;
    const n = Math.log(goal / investment) / Math.log(1 + r);

    const estimatedReturns = goal - investment;
    setResult({
      investment,
      goal,
      years: n > 0 ? n.toFixed(1) : 0,
      gains: estimatedReturns,
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Investment", "Estimated Returns"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "Time Duration",
            type: "pie",
            radius: ["55%", "70%"],
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 18, fontWeight: "bold" } },
            data: [
              { value: result.investment, name: "Investment", itemStyle: { color: "#2D69FD" } },
              { value: result.gains, name: "Estimated Returns", itemStyle: { color: "#00C48C" } },
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
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Time Duration - One-Time Investment</h2>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>One-Time Investment (₹)
              <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
            </label>
            <label>Expected Annual Return (%)
              <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </label>
            <label>Goal Amount (₹)
              <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} />
            </label>
            <button onClick={calculate} className={styles.calculateBtn}>Calculate</button>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div><span>Investment</span><strong>{formatCurrency(result.investment)}</strong></div>
                  <div><span>Goal Amount</span><strong>{formatCurrency(result.goal)}</strong></div>
                  <div><span>Estimated Returns</span><strong>{formatCurrency(result.gains)}</strong></div>
                  <div><span>Time to Goal</span><strong>{result.years} years</strong></div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  You need {result.years} years to reach your goal of {formatCurrency(goal)} from a one-time investment of {formatCurrency(investment)} at {rate}% p.a.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="One-Time Duration" />
                <h4>Estimate your time to goal</h4>
                <p>Enter investment, goal, and return to calculate duration.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeDurationOneTimeModal;
