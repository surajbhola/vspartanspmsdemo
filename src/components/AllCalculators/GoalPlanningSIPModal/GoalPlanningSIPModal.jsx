import React, { useState, useEffect, useRef } from "react";
import styles from "./GoalPlanningSIPModal.module.css";
import * as echarts from "echarts";

const GoalPlanningSIPModal = ({ onClose }) => {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
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
   
    const r = rate / 12 / 100;
    const n = years * 12;

    if (r === 0) {
      const sip = goalAmount / n;
      setResult({
        goalAmount,
        sip: Math.round(sip),
        totalInvested: Math.round(sip * n),
        gains: Math.round(goalAmount - sip * n),
        years,
      });
      return;
    }

    const denominator = (Math.pow(1 + r, n) - 1) * (1 + r);
    const sip = (goalAmount * r) / denominator;
    const totalInvested = sip * n;
    const gains = goalAmount - totalInvested;

    setResult({
      goalAmount,
      sip: Math.round(sip),
      totalInvested: Math.round(totalInvested),
      gains: Math.round(gains),
      years,
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Total Invested (SIP)", "Estimated Returns"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "Investment",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 18, fontWeight: "bold" } },
            data: [
              { value: result.totalInvested, name: "Total Invested (SIP)", itemStyle: { color: "#2D69FD" } },
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
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="goal-sip-title">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.modalHeader}>
          <h2 id="goal-sip-title">Goal Planning - SIP</h2>
          <button onClick={onClose} aria-label="Close modal" className={styles.closeBtn}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Goal Amount (₹)
              <input
                type="number"
                min={10000}
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
              />
            </label>

            <label>
              Time to Goal (Years)
              <input
                type="number"
                min={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </label>

            <label>
              Expected Annual Return (%)
              <input
                type="number"
                min={1}
                max={30}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </label>

            <button className={styles.calculateBtn} onClick={calculate}>
              Calculate
            </button>

            <p className={styles.tip}>
              Enter your financial goal details and expected returns to calculate the monthly SIP needed.
            </p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Goal Amount</span>
                    <strong>{formatCurrency(result.goalAmount)}</strong>
                  </div>
                  <div>
                    <span>Monthly SIP Required</span>
                    <strong>{formatCurrency(result.sip)}</strong>
                  </div>
                  <div>
                    <span>Total Invested (SIP)</span>
                    <strong>{formatCurrency(result.totalInvested)}</strong>
                  </div>
                  <div>
                    <span>Estimated Returns</span>
                    <strong>{formatCurrency(result.gains)}</strong>
                  </div>
                  <div>
                    <span>Time to Goal</span>
                    <strong>{result.years} years</strong>
                  </div>
                </div>

                <div ref={chartRef} className={styles.chartContainer} />

                <p className={styles.note}>
                  Investing {formatCurrency(result.sip)} monthly at an expected return of {rate}% p.a. can help you
                  achieve your goal of {formatCurrency(result.goalAmount)} in {years} years.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Goal Planning SIP" />
                <h4>Plan your goal with monthly SIP investment</h4>
                <p>Enter your target amount, time horizon and expected returns.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalPlanningSIPModal;
