import React, { useState, useEffect, useRef } from "react";
import styles from "./FixedDepositCalculatorModal.module.css";
import * as echarts from "echarts";

const compoundingOptions = [
  { label: "Yearly", value: 1 },
  { label: "Half-Yearly", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
];


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

const FixedDepositCalculatorModal = ({ onClose }) => {
  const [compoundingFreq, setCompoundingFreq] = useState();
  const [amount, setAmount] = useState();
  const [tenure, setTenure] = useState();
  const [interestRate, setInterestRate] = useState();
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

  const calculateFD = () => {
 
    const P = amount;
    const r = interestRate / 100;
    const n = compoundingFreq;
    const t = tenure;

    const maturityAmount = P * Math.pow(1 + r / n, n * t);
    const totalInterest = maturityAmount - P;

    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInterest: Math.round(totalInterest),
      principal: P,
    });
  };


  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Principal", "Interest Earned"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "FD Breakdown",
            type: "pie",
            radius: ["55%", "70%"],
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
            data: [
              { value: result.principal, name: "Principal", itemStyle: { color: "#2D69FD" } },
              { value: result.totalInterest, name: "Interest Earned", itemStyle: { color: "#F97316" } },
            ],
          },
        ],
      });
      const resizeHandler = () => chart.resize();
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
        chart.dispose();
      };
    }
  }, [result]);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Fixed Deposit Calculator</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Compounding Frequency *
              <select value={compoundingFreq} onChange={(e) => setCompoundingFreq(+e.target.value)}>
                {compoundingOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Amount Deposited *
              <input
                type="number"
                min={100}
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                placeholder="Enter amount"
              />
            </label>

            <label>
              Tenure (Years) *
              <input
                type="number"
                min={1}
                max={50}
                value={tenure}
                onChange={(e) => setTenure(+e.target.value)}
                placeholder="Enter tenure"
              />
            </label>

            <label>
              Interest Rate (P.A) *
              <input
                type="number"
                min={0}
                step={0.01}
                value={interestRate}
                onChange={(e) => setInterestRate(+e.target.value)}
                placeholder="Enter interest rate"
              />
            </label>

            <button className={styles.calculateBtn} onClick={calculateFD}>
              Calculate
            </button>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Principal</span>
                    <strong>{formatCurrency(result.principal)}</strong>
                    <small>({numberToWords(result.principal)})</small>
                  </div>
                  <div>
                    <span>Interest Earned</span>
                    <strong>{formatCurrency(result.totalInterest)}</strong>
                    <small>({numberToWords(result.totalInterest)})</small>
                  </div>
                  <div>
                    <span>Maturity Amount</span>
                    <strong>{formatCurrency(result.maturityAmount)}</strong>
                    <small>({numberToWords(result.maturityAmount)})</small>
                  </div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  Your FD will mature to <strong>{formatCurrency(result.maturityAmount)}</strong> ({numberToWords(result.maturityAmount)}) in{" "}
                  <strong>{tenure}</strong> years at <strong>{interestRate}%</strong> interest compounded{" "}
                  <strong>{compoundingOptions.find((c) => c.value === compoundingFreq)?.label.toLowerCase()}</strong>.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Fixed Deposit Calculator" />
                <h4>Calculate your Fixed Deposit maturity amount</h4>
                <p>Enter deposit amount, tenure, interest rate, and compounding frequency.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedDepositCalculatorModal;
