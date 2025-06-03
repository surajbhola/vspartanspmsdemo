import React, { useState, useEffect, useRef } from "react";
import styles from "./SIPCalculatorModal.module.css";
import * as echarts from "echarts";

const SIPCalculatorModal = ({ onClose }) => {
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);
  const [result, setResult] = useState(null);

  const modalRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
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
    const monthlyRate = sipRate / 12 / 100;
    const months = sipYears * 12;
    const invested = sipAmount * months;
    const futureValue =
      sipAmount *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const gains = futureValue - invested;

    setResult({
      invested,
      futureValue: Math.round(futureValue),
      gains: Math.round(gains),
      months,
    });
  };


  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        animation: true,
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Amount Invested", "Estimated Returns"],
          textStyle: { color: "#555" },
        },
        series: [
          {
            name: "Investment Breakdown",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 16, fontWeight: "bold" },
            },
            data: [
              {
                value: result.invested,
                name: "Amount Invested",
                itemStyle: { color: "#0B3D91" },
              },
              {
                value: result.gains,
                name: "Estimated Returns",
                itemStyle: { color: "#27AE60" },
              },
            ],
          },
        ],
      };
      chart.setOption(option);

      const resize = () => chart.resize();
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
        chart.dispose();
      };
    }
  }, [result]);

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.header}>
          <h2 id="modal-title">SIP Calculator</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={styles.closeButton}
          >
            &times;
          </button>
        </header>

        <div className={styles.container}>
          <section className={styles.inputSection}>
            <label>
              Monthly Investment Amount
              <input
                type="number"
                value={sipAmount}
                onChange={(e) => setSipAmount(Number(e.target.value))}
                min="500"
              />
            </label>

            <label>
              Investment Period (Years)
              <input
                type="number"
                value={sipYears}
                onChange={(e) => setSipYears(Number(e.target.value))}
                min="1"
              />
            </label>

            <label>
              Expected Annual Return (%)
              <input
                type="number"
                value={sipRate}
                onChange={(e) => setSipRate(Number(e.target.value))}
                min="1"
                max="30"
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
              Calculate
            </button>

            <div className={styles.tipBox}>
              <strong>Quick Tip:</strong> Increasing your monthly SIP amount by just 10%
              annually can significantly boost your final corpus due to the power of
              compounding.
            </div>
          </section>

          <section className={styles.outputSection}>
            {result ? (
              <>
                <div className={styles.statsBox}>
                  <div>
                    <span>Invested Amount</span>
                    <strong>{formatCurrency(result.invested)}</strong>
                  </div>
                  <div>
                    <span>Estimated Returns</span>
                    <strong>{formatCurrency(result.gains)}</strong>
                  </div>
                  <div>
                    <span>Total Value</span>
                    <strong>{formatCurrency(result.futureValue)}</strong>
                  </div>
                  <div>
                    <span>Investment Period</span>
                    <strong>{result.months} months</strong>
                  </div>
                </div>

                <div
                  ref={chartRef}
                  className={styles.chart}
                  style={{ height: 200, marginTop: 20 }}
                />

                <div className={styles.noteBox}>
                  <strong>Did you know?</strong> Starting early with SIP investments can
                  significantly increase your returns due to the power of compounding. Even
                  a small monthly investment of ₹{sipAmount} can grow to{" "}
                  {formatCurrency(result.futureValue)} in {sipYears} years at {sipRate}%
                  annual returns.
                </div>

            
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Investment Growth" />
                <h4>See how your investments can grow</h4>
                <p>
                  Fill in the details on the left and click Calculate to see your potential
                  returns over time.
                </p>
                <ul>
                  <li>Step 1: Set time period</li>
                  <li>Step 2: Enter amount</li>
                  <li>Step 3: Set return rate</li>
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculatorModal;
