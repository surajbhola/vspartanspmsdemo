import React, { useState, useEffect, useRef } from "react";
import styles from "./GoalPlanningLumpsumModal.module.css";
import * as echarts from "echarts";

const GoalPlanningLumpsumModal = ({ onClose }) => {
  const [targetWealth, setTargetWealth] = useState("");
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
    const FV = Number(targetWealth);
    const r = Number(rateOfReturn) / 100;
    const t = Number(tenureYears);

    if (!FV || !r || !t || t > 50) {
      alert("Please enter valid values for all fields (Tenure up to 50 years).");
      return;
    }

    const P = FV / Math.pow(1 + r, t);
    const gains = FV - P;

    setResult({
      requiredInvestment: P,
      targetedWealth: FV,
      gains,
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
          data: ["Required Investment", "Estimated Returns"],
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
                value: result.requiredInvestment,
                name: "Required Investment",
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
          <h2 id="modal-title">Goal Planning - Lumpsum</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
            &times;
          </button>
        </header>

        <div className={styles.container}>
          <section className={styles.inputSection}>
            <label>
              Targeted Wealth*
              <input
                type="number"
                value={targetWealth}
                onChange={(e) => setTargetWealth(e.target.value)}
                placeholder="e.g., 1000000"
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
              <strong>Quick Tip:</strong> Define your goal and see how much lump sum you need to invest to reach it.
            </div>
          </section>

          <section className={styles.outputSection}>
            {result ? (
              <>
                <div className={styles.statsBox}>
                  <div>
                    <span>Required Investment</span>
                    <strong>
                      {formatCurrency(result.requiredInvestment)}{" "}
                      <span className={styles.amountWords}>
                        ({numberToWords(result.requiredInvestment)})
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
                    <span>Targeted Wealth</span>
                    <strong>
                      {formatCurrency(result.targetedWealth)}{" "}
                      <span className={styles.amountWords}>
                        ({numberToWords(result.targetedWealth)})
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
                  <strong>Did you know?</strong> To achieve ₹{formatCurrency(result.targetedWealth)} in {tenureYears} years at {rateOfReturn}% p.a., you need to invest ₹{formatCurrency(result.requiredInvestment)} now.
                </div>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Goal Planning Growth" />
                <h4>Plan your goal investment</h4>
                <p>Fill in the target, return rate, and tenure to find your required lump sum investment.</p>
                <ul>
                  <li>Step 1: Enter targeted wealth</li>
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

export default GoalPlanningLumpsumModal;
