import React, { useState, useEffect, useRef } from "react";
import styles from "./TimeDurationOneTimeModal.module.css";
import * as echarts from "echarts";

const TimeDurationOneTimeModal = ({ onClose }) => {
  const [investment, setInvestment] = useState();
  const [rate, setRate] = useState();
  const [goal, setGoal] = useState();
  const [result, setResult] = useState(null);

  const modalRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

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

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const numberToWords = (num) => {
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thousand = Math.floor(num / 1000);

    const parts = [];
    if (crore) parts.push(`${crore} crore`);
    if (lakh) parts.push(`${lakh} lakh`);
    if (thousand) parts.push(`${thousand} thousand`);
    return parts.join(" ") || "zero";
  };

  const formatDuration = (months) => {
    const y = Math.floor(months / 12);
    const m = months % 12;
    return `${y ? `${y} year${y > 1 ? "s" : ""}` : ""}${
      y && m ? " and " : ""
    }${m ? `${m} month${m > 1 ? "s" : ""}` : ""}` || "0 months";
  };

  const calculate = () => {
    if (!investment || !goal || !rate || investment <= 0 || goal <= 0 || rate <= 0) return;

    const r = rate / 100;
    const n = Math.log(goal / investment) / Math.log(1 + r);

    if (n <= 0 || !isFinite(n)) {
      setResult(null);
      return;
    }

    const estimatedReturns = goal - investment;

    setResult({
      investment,
      goal,
      months: n * 12,
      gains: estimatedReturns,
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      if (!chartInstanceRef.current) {
        chartInstanceRef.current = echarts.init(chartRef.current);
      }

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
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 18, fontWeight: "bold" } },
            data: [
              { value: result.investment, name: "Investment", itemStyle: { color: "#2D69FD" } },
              { value: result.gains, name: "Estimated Returns", itemStyle: { color: "#00C48C" } },
            ],
          },
        ],
      };

      chartInstanceRef.current.setOption(option);

      const resizeHandler = () => chartInstanceRef.current?.resize();
      window.addEventListener("resize", resizeHandler);

      return () => {
        chartInstanceRef.current?.dispose();
        chartInstanceRef.current = null;
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, [result]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="time-duration-title">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.modalHeader}>
          <h2 id="time-duration-title">Time Duration - One-Time Investment</h2>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">&times;</button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              One-Time Investment (₹)
              <input
                type="number"
                placeholder="Ex: 500"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
              />
            </label>

            <label>
              Expected Annual Return (%)
              <input
                type="number"
                placeholder="Ex: 12"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </label>

            <label>
              Targeted Wealth (₹)
              <input
                type="number"
                placeholder="Ex: 1000"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
              Calculate
            </button>

            <p className={styles.tip}>
              Enter your investment, expected returns, and target wealth to calculate the time needed.
            </p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Investment</span>
                    <strong>{formatCurrency(result.investment)}</strong>
                    <small>{numberToWords(result.investment)}</small>
                  </div>
                  <div>
                    <span>Targeted Wealth</span>
                    <strong>{formatCurrency(result.goal)}</strong>
                    <small>{numberToWords(result.goal)}</small>
                  </div>
                  <div>
                    <span>Estimated Returns</span>
                    <strong>{formatCurrency(result.gains)}</strong>
                    <small>{numberToWords(result.gains)}</small>
                  </div>
                  <div>
                    <span>Time to Goal</span>
                    <strong>{formatDuration(Math.round(result.months))}</strong>
                  </div>
                </div>

                <div className={styles.chartContainer} ref={chartRef} />

                <p className={styles.note}>
                  You need <strong>{formatDuration(Math.round(result.months))}</strong> to reach your goal of <strong>{formatCurrency(goal)}</strong> from a one-time investment of <strong>{formatCurrency(investment)}</strong> at <strong>{rate}%</strong> p.a.
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
