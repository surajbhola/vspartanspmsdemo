import React, { useState, useEffect, useRef } from "react";
import styles from "./EMICalculatorModal.module.css";
import * as echarts from "echarts";

const EMICalculatorModal = ({ onClose }) => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(10);
  const [result, setResult] = useState(null);

  const modalRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    const handleEscape = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const calculateEMI = () => {
    const P = loanAmount;
    const R = interestRate / 100 / 12;
    const N = tenure * 12;

    const EMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = EMI * N;
    const totalInterest = totalPayment - P;

    setResult({
      EMI: Math.round(EMI),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      loanAmount: Math.round(P)
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Principal", "Interest"],
          textStyle: { color: "#666" },
        },
        series: [{
          name: "EMI Breakdown",
          type: "pie",
          radius: ["55%", "70%"],
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
          data: [
            { value: result.loanAmount, name: "Principal", itemStyle: { color: "#2D69FD" } },
            { value: result.totalInterest, name: "Interest", itemStyle: { color: "#F97316" } }
          ]
        }]
      });
      window.addEventListener("resize", () => chart.resize());
      return () => chart.dispose();
    }
  }, [result]);

  const formatCurrency = (val) => 
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>EMI Calculator</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Loan Amount (₹)
              <input type="number" min={1000} value={loanAmount} onChange={(e) => setLoanAmount(+e.target.value)} />
            </label>
            <label>
              Interest Rate (P.A) %
              <input type="number" min={1} max={30} value={interestRate} onChange={(e) => setInterestRate(+e.target.value)} />
            </label>
            <label>
              Loan Tenure (Years)
              <input type="number" min={1} max={30} value={tenure} onChange={(e) => setTenure(+e.target.value)} />
            </label>
            <button className={styles.calculateBtn} onClick={calculateEMI}>Calculate</button>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>EMI (Monthly)</span>
                    <strong>{formatCurrency(result.EMI)}</strong>
                  </div>
                  <div>
                    <span>Total Interest</span>
                    <strong>{formatCurrency(result.totalInterest)}</strong>
                  </div>
                  <div>
                    <span>Total Payment</span>
                    <strong>{formatCurrency(result.totalPayment)}</strong>
                  </div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  Your monthly EMI will be {formatCurrency(result.EMI)} for a loan of {formatCurrency(result.loanAmount)} at {interestRate}% p.a. for {tenure} years.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="EMI Calculator" />
                <h4>Calculate your EMI with ease</h4>
                <p>Enter loan details to view monthly EMI and total interest.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculatorModal;
