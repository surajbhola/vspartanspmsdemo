import React, { useState, useEffect, useRef } from "react";
import styles from "./GoalPlanningLumpsumModal.module.css";
import * as echarts from "echarts";

const GoalPlanningLumpSumModal = ({ onClose }) => {
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
    const pv = goalAmount / Math.pow(1 + rate / 100, years);
    const gains = goalAmount - pv;

    setResult({
      goalAmount,
      lumpSum: Math.round(pv),
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
          data: ["Lump Sum to Invest Today", "Estimated Returns"],
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
              { value: result.lumpSum, name: "Lump Sum to Invest Today", itemStyle: { color: "#2D69FD" } },
              { value: result.gains, name: "Estimated Returns", itemStyle: { color: "#00C48C" } },
            ],
          },
        ],
      };
      chart.setOption(option);
      const resizeHandler = () => chart.resize();
      window.addEventListener("resize", resizeHandler);
      return () => {
        chart.dispose();
        window.removeEventListener("resize", resizeHandler);
      };
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
          <h2>Goal Planning - Lump Sum</h2>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
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
              Enter your financial goal and expected return to estimate how much you need to invest today.
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
                    <span>Lump Sum to Invest Today</span>
                    <strong>{formatCurrency(result.lumpSum)}</strong>
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

                <div className={styles.chartContainer} ref={chartRef}></div>

                <p className={styles.note}>
                  Investing {formatCurrency(result.lumpSum)} today at an expected return of {rate}% p.a. can help you
                  achieve your goal of {formatCurrency(result.goalAmount)} in {years} years.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Goal Planning Lump Sum" />
                <h4>Plan your goal with lump sum investment</h4>
                <p>Enter your target amount, time horizon and expected returns.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalPlanningLumpSumModal;
