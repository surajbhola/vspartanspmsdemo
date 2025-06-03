import React, { useState, useEffect, useRef } from "react";
import styles from "./SIPCalculatorModal.module.css";
import * as echarts from "echarts";

const SIPCalculatorModal = ({ onClose }) => {
  const [sipAmount, setSipAmount] = useState("");
  const [sipYears, setSipYears] = useState("");
  const [sipRate, setSipRate] = useState("");
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
    const P = Number(sipAmount);
    const r = Number(sipRate) / 12 / 100;
    const n = Number(sipYears) * 12;

    if (!P || !r || !n) {
      alert("Please enter valid values for all fields.");
      return;
    }

    const invested = P * n;
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const gains = futureValue - invested;

    setResult({
      invested,
      gains,
      futureValue,
      months: n,
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
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
      });

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
    return parts.join(" ");
  };

  const formatDuration = (months) => {
    const y = Math.floor(months / 12);
    const m = months % 12;
    return `${y ? `${y} year${y > 1 ? "s" : ""}` : ""}${
      y && m ? " and " : ""
    }${m ? `${m} month${m > 1 ? "s" : ""}` : ""}` || "0 months";
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.header}>
          <h2 id="modal-title">SIP Calculator</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
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
                onChange={(e) => setSipAmount(e.target.value)}
                placeholder="e.g., 5000"
              />
            </label>

            <label>
              Investment Period (Years)
              <input
                type="number"
                value={sipYears}
                onChange={(e) => setSipYears(e.target.value)}
                placeholder="e.g., 10"
              />
            </label>

            <label>
              Expected Annual Return (%)
              <input
                type="number"
                value={sipRate}
                onChange={(e) => setSipRate(e.target.value)}
                placeholder="e.g., 12"
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
              Calculate
            </button>

            <div className={styles.tipBox}>
              <strong>Quick Tip:</strong> Increasing your monthly SIP by 10% yearly
              significantly boosts wealth through compounding.
            </div>
          </section>

          <section className={styles.outputSection}>
            {result ? (
              <>
                <div className={styles.statsBox}>
                  <div>
                    <span>Invested Amount</span>
                    <strong>
                      {formatCurrency(result.invested)}{" "}
                      <span className={styles.amountWords}>
                        ({numberToWords(result.invested)})
                      </span>
                    </strong>
                  </div>
                  <div>
                    <span>Estimated Returns</span>
                    <strong>
                      {formatCurrency(result.gains)}{" "}
                      <span className={styles.amountWords}>
                        ({numberToWords(result.gains)})
                      </span>
                    </strong>
                  </div>
                  <div>
                    <span>Total Value</span>
                    <strong>
                      {formatCurrency(result.futureValue)}{" "}
                      <span className={styles.amountWords}>
                        ({numberToWords(result.futureValue)})
                      </span>
                    </strong>
                  </div>
                  <div>
                    <span>Investment Duration</span>
                    <strong>{formatDuration(result.months)}</strong>
                  </div>
                </div>

                <div
                  ref={chartRef}
                  className={styles.chart}
                  style={{ height: 200, marginTop: 20 }}
                />

                <div className={styles.noteBox}>
                  <strong>Did you know?</strong> Starting early helps maximize
                  compounding benefits. Even ₹{sipAmount} monthly for {sipYears} years
                  at {sipRate}% can grow to {formatCurrency(result.futureValue)}.
                </div>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Investment Growth" />
                <h4>See how your investments can grow</h4>
                <p>Fill in the details and click Calculate to visualize your returns.</p>
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
