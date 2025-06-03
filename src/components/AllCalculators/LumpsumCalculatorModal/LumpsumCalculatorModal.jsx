import React, { useState, useEffect, useRef } from "react";
import styles from "./LumpsumCalculatorModal.module.css";
import * as echarts from "echarts";

const LumpsumCalculatorModal = ({ onClose }) => {
  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [investmentYears, setInvestmentYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
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
    const rate = expectedReturn / 100;
    const futureValue = lumpsumAmount * Math.pow(1 + rate, investmentYears);
    const gains = futureValue - lumpsumAmount;

    setResult({
      invested: lumpsumAmount,
      futureValue: Math.round(futureValue),
      gains: Math.round(gains),
      years: investmentYears,
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
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.header}>
          <h2 id="modal-title">Lumpsum Calculator</h2>
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
              Lump Sum Amount
              <input
                type="number"
                value={lumpsumAmount}
                onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                min="1000"
              />
            </label>

            <label>
              Investment Period (Years)
              <input
                type="number"
                value={investmentYears}
                onChange={(e) => setInvestmentYears(Number(e.target.value))}
                min="1"
              />
            </label>

            <label>
              Expected Annual Return (%)
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                min="1"
                max="30"
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
              Calculate
            </button>

            <div className={styles.tipBox}>
              <strong>Tip:</strong> Your lump sum grows exponentially with time at
              compounding interest.
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
                    <strong>{result.years} years</strong>
                  </div>
                </div>

                <div
                  ref={chartRef}
                  className={styles.chart}
                  style={{ height: 200, marginTop: 20 }}
                />

                <div className={styles.noteBox}>
                  <strong>Note:</strong> Investing ₹{lumpsumAmount} as lump sum for{" "}
                  {investmentYears} years at {expectedReturn}% can grow to{" "}
                  {formatCurrency(result.futureValue)}.
                </div>

                {/* <button className={styles.downloadBtn}>Download Report</button> */}
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Investment Growth" />
                <h4>See how your lump sum investment grows</h4>
                <p>
                  Enter amount, time period and expected returns to calculate future
                  value.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default LumpsumCalculatorModal;
