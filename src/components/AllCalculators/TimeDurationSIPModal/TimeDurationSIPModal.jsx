import React, { useState, useEffect, useRef } from "react";
import styles from "./TimeDurationSIPModal.module.css";
import * as echarts from "echarts";

const TimeDurationSIPModal = ({ onClose }) => {
  const [investment, setInvestment] = useState();
  const [rate, setRate] = useState();
  const [goal, setGoal] = useState();
  const [frequency, setFrequency] = useState("monthly"); 
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
    if (!investment || !goal || !rate || investment <= 0 || goal <= 0 || rate <= 0) {
      setResult(null);
      return;
    }

    let r, n = 0, fv = 0;
    if (frequency === "yearly") {
      r = rate / 100;
      while (fv < goal && n < 100) {
        fv = investment * ((Math.pow(1 + r, n) - 1) / r);
        n++;
      }
      if (n === 100) {
        setResult(null);
        return;
      }
      const totalInvested = investment * n;
      setResult({
        investment,
        goal,
        months: n * 12,
        totalInvested,
        gains: fv - totalInvested,
      });
    } else {
      r = rate / 12 / 100;
      while (fv < goal && n < 1200) {
        fv = investment * ((Math.pow(1 + r, n) - 1) / r);
        n++;
      }
      if (n === 1200) {
        setResult(null);
        return;
      }
      const totalInvested = investment * n;
      setResult({
        investment,
        goal,
        months: n,
        totalInvested,
        gains: fv - totalInvested,
      });
    }
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
          data: ["Total Invested", "Estimated Returns"],
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
              { value: result.totalInvested, name: "Total Invested", itemStyle: { color: "#2D69FD" } },
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
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="regular-investment-title">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.modalHeader}>
          <h2 id="regular-investment-title">Time Duration - Regular Investment</h2>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label htmlFor="freqSelect">Frequency of Investment</label>
            <select
              id="freqSelect"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              aria-label="Select frequency of investment"
              className={styles.selectInput}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <label>
              Targeted Wealth *
              <input
                type="number"
                placeholder="eg: 10,000"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                min={0}
              />
            </label>

            <label>
              Investment Amount ({frequency === "yearly" ? "P.A" : "P.M"}) *
              <input
                type="number"
                placeholder={frequency === "yearly" ? "Ex: Rs 6000" : "Ex: Rs 500"}
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                min={0}
              />
            </label>

            <label>
              Expected rate of return (P.A) *
              <input
                type="number"
                placeholder="Ex: 12%"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                min={0}
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
              Calculate
            </button>
            <p className={styles.tip}>
              Enter your {frequency === "yearly" ? "yearly" : "monthly"} investment, expected return, and target wealth to calculate the time needed.
            </p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Investment Amount ({frequency === "yearly" ? "P.A" : "P.M"})</span>
                    <strong>{formatCurrency(result.investment)}</strong>
                    <small>{numberToWords(result.investment)}</small>
                  </div>
                  <div>
                    <span>Targeted Wealth</span>
                    <strong>{formatCurrency(result.goal)}</strong>
                    <small>{numberToWords(result.goal)}</small>
                  </div>
                  <div>
                    <span>Total Invested</span>
                    <strong>{formatCurrency(result.totalInvested)}</strong>
                    <small>{numberToWords(result.totalInvested)}</small>
                  </div>
                  <div>
                    <span>Time to Goal</span>
                    <strong>{formatDuration(result.months)}</strong>
                  </div>
                </div>

                <div ref={chartRef} className={styles.chartContainer} />

                <p className={styles.resultCaption}>
                  The pie chart shows the split between total invested and estimated returns over the duration.
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

export default TimeDurationSIPModal;
