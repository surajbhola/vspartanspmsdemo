import React, { useState, useEffect, useRef } from "react";
import styles from "./EducationLoanEMICalculatorModal.module.css";
import * as echarts from "echarts";

const EducationLoanEMICalculatorModal = ({ onClose }) => {
  const [loanAmount, setLoanAmount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [tenure, setTenure] = useState();
  const [courseDuration, setCourseDuration] = useState();
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
    const moratoriumMonths = courseDuration * 12;

    const accruedAmount = P * Math.pow(1 + R, moratoriumMonths);
    const EMI = accruedAmount * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
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
      const option = {
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Principal", "Interest"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "EMI Breakdown",
            type: "pie",
            radius: ["55%", "70%"],
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 18, fontWeight: "bold" },
            },
            data: [
              {
                value: result.loanAmount,
                name: "Principal",
                itemStyle: { color: "#2D69FD" },
              },
              {
                value: result.totalInterest,
                name: "Interest",
                itemStyle: { color: "#F97316" },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => chart.resize());
      return () => chart.dispose();
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
          <h2>Education Loan EMI Calculator</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Loan Amount (₹)
              <input
                type="number"
                placeholder="Enter education loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(+e.target.value)}
              />
            </label>
            <label>
              Interest Rate (P.A.) (%)
              <input
                type="number"
                placeholder="Expected interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(+e.target.value)}
              />
            </label>
            <label>
              Loan Tenure (Years)
              <input
                type="number"
                placeholder="Repayment tenure"
                value={tenure}
                onChange={(e) => setTenure(+e.target.value)}
              />
            </label>
            <label>
              Course Duration (Years)
              <input
                type="number"
                placeholder="Duration of your course"
                value={courseDuration}
                onChange={(e) => setCourseDuration(+e.target.value)}
              />
            </label>
            <button className={styles.calculateBtn} onClick={calculateEMI}>
              Calculate
            </button>
            <p className={styles.tip}>
              Includes moratorium period (course duration) where interest accrues but no EMI is paid.
            </p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Monthly EMI</span>
                    <strong>{formatCurrency(result.EMI)}</strong>

                    {numberToWords(result.EMI)}

                  </div>
                  <div>
                    <span>Total Interest Payable</span>
                    <strong>{formatCurrency(result.totalInterest)}</strong>
                    {numberToWords(result.totalInterest)}
                  </div>
                  <div>
                    <span>Total Amount Payable</span>
                    <strong>{formatCurrency(result.totalPayment)}</strong>
                    {numberToWords(result.totalPayment)}
                  </div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  After completing a <strong>{courseDuration}-year</strong> course, your EMI will be{" "}
                  <strong>{formatCurrency(result.EMI)}</strong> for a loan of{" "}
                  <strong>{formatCurrency(result.loanAmount)}</strong> at{" "}
                  <strong>{interestRate}%</strong> interest over <strong>{tenure} years</strong>. <br />
                  That’s <strong>{numberToWords(result.totalPayment)}</strong> in total repayment.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Education Loan" />
                <h4>Plan your education loan repayment</h4>
                <p>
                  Calculate EMI post-moratorium by including course duration and interest accrual.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationLoanEMICalculatorModal;
