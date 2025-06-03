import React, { useState, useEffect, useRef } from "react";
import styles from "./PPFCalculatorModal.module.css";
import * as echarts from "echarts";

const depositFrequencies = [
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Semi-Annually", value: 2 },
  { label: "Annually", value: 1 },
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

const PPFCalculatorModal = ({ onClose }) => {
  const [depositFrequency, setDepositFrequency] = useState();
  const [investmentAmount, setInvestmentAmount] = useState();
  const [tenure, setTenure] = useState();
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

  const calculatePPF = () => {
    const annualInterestRate = 7.1 / 100;
    const n = tenure;
    const freq = depositFrequency;
    const totalDeposits = n * freq;
    const periodicInterestRate = annualInterestRate / freq;

    let maturityAmount = 0;
    for (let i = 0; i < totalDeposits; i++) {
      maturityAmount += investmentAmount * Math.pow(1 + periodicInterestRate, totalDeposits - i);
    }

    const totalInvestment = investmentAmount * totalDeposits;
    const totalInterest = maturityAmount - totalInvestment;

    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInvestment,
      totalInterest: Math.round(totalInterest),
    });
  };

  
  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Investment", "Interest Earned"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "PPF Breakdown",
            type: "pie",
            radius: ["55%", "70%"],
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
            data: [
              { value: result.totalInvestment, name: "Investment", itemStyle: { color: "#2D69FD" } },
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
          <h2>PPF Calculator</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Deposit Frequency *
              <select value={depositFrequency} onChange={(e) => setDepositFrequency(+e.target.value)}>
                {depositFrequencies.map((freq) => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Investment Amount (₹)
              <input
                type="number"
                min={1000}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(+e.target.value)}
                placeholder="Enter amount"
              />
            </label>

            <label>
              Tenure (Years)
              <input
                type="number"
                min={1}
                max={50}
                value={tenure}
                onChange={(e) => setTenure(+e.target.value)}
                placeholder="Enter tenure"
              />
            </label>

            <button className={styles.calculateBtn} onClick={calculatePPF}>
              Calculate
            </button>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Total Investment</span>
                    <strong>{formatCurrency(result.totalInvestment)}</strong>
                    <small>({numberToWords(result.totalInvestment)})</small>
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
                  Your PPF will mature to <strong>{formatCurrency(result.maturityAmount)}</strong> ({numberToWords(result.maturityAmount)}) in{" "}
                  <strong>{tenure}</strong> years with a{" "}
                  <strong>{depositFrequencies.find((f) => f.value === depositFrequency)?.label}</strong> deposit of{" "}
                  <strong>{formatCurrency(investmentAmount)}</strong> ({numberToWords(investmentAmount)}).
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="PPF Calculator" />
                <h4>Calculate your PPF maturity amount</h4>
                <p>Enter deposit frequency, amount, and tenure.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPFCalculatorModal;
