import styles from "./GoalPlanningSIPModal.module.css";
import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";

const GoalPlanningSIPModal = ({ onClose }) => {
  const [goalAmount, setGoalAmount] = useState();
  const [years, setYears] = useState();
  const [rate, setRate] = useState();
  const [result, setResult] = useState(null);

  const modalRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
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

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);


  const numberToWords = (num) => {
    if (num === 0) return "zero";
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thousand = Math.floor(num / 1000);
    num %= 1000;
    const hundred = Math.floor(num / 100);
    num %= 100;

    const parts = [];
    if (crore) parts.push(`${crore} crore`);
    if (lakh) parts.push(`${lakh} lakh`);
    if (thousand) parts.push(`${thousand} thousand`);
    if (hundred) parts.push(`${hundred} hundred`);
    if (num) parts.push(num);
    return parts.join(" ");
  };

  const calculate = () => {
    if (!goalAmount || !years || !rate || goalAmount <= 0 || years <= 0 || rate <= 0) return;

    const r = rate / 12 / 100;
    const n = years * 12;

    let sip = 0;
    if (r === 0) {
      sip = goalAmount / n;
    } else {
      const denominator = (Math.pow(1 + r, n) - 1) * (1 + r);
      sip = (goalAmount * r) / denominator;
    }

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
      if (!chartInstanceRef.current) {
        chartInstanceRef.current = echarts.init(chartRef.current);
      }

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: ₹{c} ({d}%)",
        },
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
            emphasis: {
              label: {
                show: true,
                fontSize: 18,
                fontWeight: "bold",
              },
            },
            data: [
              {
                value: result.totalInvested,
                name: "Total Invested (SIP)",
                itemStyle: { color: "#2D69FD" },
              },
              {
                value: result.gains,
                name: "Estimated Returns",
                itemStyle: { color: "#00C48C" },
              },
            ],
          },
        ],
      };

      chartInstanceRef.current.setOption(option);
      const resizeHandler = () => chartInstanceRef.current.resize();
      window.addEventListener("resize", resizeHandler);

      return () => {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, [result]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="goal-sip-title">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.modalHeader}>
          <h2 id="goal-sip-title">Goal Planning - SIP</h2>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Goal Amount (₹)
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                placeholder="Ex: 1000"
              />
            </label>

            <label>
              Time to Goal (Years)
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                placeholder="Ex: 10"
              />
            </label>

            <label>
              Expected Annual Return (%)
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                placeholder="Ex: 12"
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
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
                    <strong>
                      {formatCurrency(result.goalAmount)}{" "}
                      <span className={styles.amountWords}>
                        ({numberToWords(result.goalAmount)})
                      </span>
                    </strong>
                  </div>
                  <div>
                    <span>Monthly SIP Required</span>
                    <strong>
                      {formatCurrency(result.sip)}{" "}
                      <span className={styles.amountWords}>
                        ({numberToWords(result.sip)})
                      </span>
                    </strong>
                  </div>
                  <div>
                    <span>Total Invested (SIP)</span>
                    <strong>
                      {formatCurrency(result.totalInvested)}{" "}
                      <span className={styles.amountWords}>
                        ({numberToWords(result.totalInvested)})
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
                    <span>Time to Goal</span>
                    <strong>{result.years} years</strong>
                  </div>
                </div>

                <div className={styles.chartContainer} ref={chartRef}></div>

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
