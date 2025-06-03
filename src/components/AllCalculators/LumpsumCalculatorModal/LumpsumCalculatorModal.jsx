import React, { useState, useEffect, useRef } from "react";
import styles from "./LumpsumCalculatorModal.module.css";
import * as echarts from "echarts";

const LumpsumCalculatorModal = ({ onClose }) => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [rateOfReturn, setRateOfReturn] = useState("");
  const [tenureYears, setTenureYears] = useState("");
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
    const P = Number(investmentAmount);
    const r = Number(rateOfReturn) / 100;
    const t = Number(tenureYears);

    if (!P || !r || !t || t > 50) {
      alert("Please enter valid values for all fields (Tenure up to 50 years).");
      return;
    }

    const futureValue = P * Math.pow(1 + r, t);
    const gains = futureValue - P;

    setResult({
      invested: P,
      gains,
      futureValue,
      years: t,
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

  const formatDuration = (years) => {
    return years ? `${years} year${years > 1 ? "s" : ""}` : "0 years";
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.header}>
          <h2 id="modal-title">Lumpsum Calculator</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
            &times;
          </button>
        </header>

        <div className={styles.container}>
          <section className={styles.inputSection}>
            <label>
              Investment Amount*
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="e.g., 10000"
              />
            </label>

            <label>
              Expected Rate of Return (P.A)*
              <input
                type="number"
                value={rateOfReturn}
                onChange={(e) => setRateOfReturn(e.target.value)}
                placeholder="e.g., 12"
              />
            </label>

            <label>
              Tenure (in years)* (Up to 50 years)
              <input
                type="number"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                placeholder="e.g., 10"
                max={50}
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
              Calculate
            </button>

            <div className={styles.tipBox}>
              <strong>Quick Tip:</strong> A higher rate of return and longer tenure can significantly boost your wealth.
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
                    <strong>{formatDuration(result.years)}</strong>
                  </div>
                </div>

                <div
                  ref={chartRef}
                  className={styles.chart}
                  style={{ height: 200, marginTop: 20 }}
                />

                <div className={styles.noteBox}>
                  <strong>Did you know?</strong> Investing ₹{investmentAmount} for {tenureYears} years at {rateOfReturn}% can grow to {formatCurrency(result.futureValue)}.
                </div>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Investment Growth" />
                <h4>See how your investment grows</h4>
                <p>Fill in the details and click Calculate to visualize your returns.</p>
                <ul>
                  <li>Step 1: Enter investment amount</li>
                  <li>Step 2: Set expected return rate</li>
                  <li>Step 3: Set tenure</li>
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default LumpsumCalculatorModal;
