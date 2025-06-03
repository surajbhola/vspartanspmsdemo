import React, { useState, useEffect, useRef } from "react";
import styles from "./StepUpCalculatorModal.module.css";
import * as echarts from "echarts";

const StepUpCalculatorModal = ({ onClose }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState();
  const [annualGrowthRate, setAnnualGrowthRate] = useState();
  const [expectedReturn, setExpectedReturn] = useState();
  const [tenure, setTenure] = useState();
  const [result, setResult] = useState(null);

  const modalRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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
    let totalInvestment = 0;
    let futureValue = 0;
    let currentMonthly = monthlyInvestment;
    const r = expectedReturn / 100 / 12;

    for (let year = 1; year <= tenure; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthsLeft = (tenure - year) * 12 + (12 - month);
        futureValue += currentMonthly * Math.pow(1 + r, monthsLeft);
        totalInvestment += currentMonthly;
      }
      currentMonthly *= 1 + annualGrowthRate / 100;
    }

    setResult({
      totalInvestment: Math.round(totalInvestment),
      futureValue: Math.round(futureValue),
      estimatedReturns: Math.round(futureValue - totalInvestment),
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption({
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Total Investment", "Estimated Returns"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "Step-Up Plan",
            type: "pie",
            radius: ["55%", "70%"],
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
                value: result.totalInvestment,
                name: "Total Investment",
                itemStyle: { color: "#2D69FD" },
              },
              {
                value: result.estimatedReturns,
                name: "Estimated Returns",
                itemStyle: { color: "#00C48C" },
              },
            ],
          },
        ],
      });

      const handleResize = () => chartInstance.current?.resize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, [result]);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

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

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Step-Up Calculator</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Monthly Investment Amount
              <input
                type="number"
                  placeholder="e.g. 15000"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              />
            </label>
            <label>
              Growth in Investment Amount (P.A.) (%)
              <input
                type="number"
                placeholder="e.g. 10"
                
                value={annualGrowthRate}
                onChange={(e) => setAnnualGrowthRate(Number(e.target.value))}
              />
            </label>
            <label>
              Expected Return (P.A.) (%)
              <input
                type="number"
                     placeholder="e.g. 12"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
              />
            </label>
            <label>
              Tenure (Years)
              <input
                type="number"

                    placeholder="e.g. 20"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
            </label>
            <button className={styles.calculateBtn} onClick={calculate}>
              Calculate
            </button>
            <p className={styles.tip}>
              A step-up strategy helps build wealth gradually and effectively.
            </p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Future Value</span>
                    <strong>{formatCurrency(result.futureValue)}</strong>({numberToWords(result.futureValue)})
                  </div>
                  <div>
                    <span>Total Investment</span>
                    <strong>{formatCurrency(result.totalInvestment)}</strong>
                    ({numberToWords(result.totalInvestment)})
                  </div>
                  <div>
                    <span>Estimated Returns</span>
                    <strong>{formatCurrency(result.estimatedReturns)}</strong>
                    ({numberToWords(result.estimatedReturns)})
                    
                  </div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  By increasing your monthly SIP annually, you could accumulate{" "}
                  {formatCurrency(result.futureValue)} (
                  {numberToWords(result.futureValue)}) in {tenure} years.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Step-Up Planning" />
                <h4>Boost Your Investment Yearly</h4>
                <p>
                  Enter your SIP, expected growth, and return rate to plan
                  better.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUpCalculatorModal;
