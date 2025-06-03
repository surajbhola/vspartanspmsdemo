import React, { useState, useEffect, useRef } from "react";
import styles from "./PersonalLoanEMICalculatorModal.module.css";

const PersonalLoanEMICalculatorModal = ({ onClose }) => {
  const [principal, setPrincipal] = useState(200000);
  const [interestRate, setInterestRate] = useState(12.5); 
  const [loanTerm, setLoanTerm] = useState(5);
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const modalRef = useRef(null);

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

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTerm * 12;
    if (monthlyRate === 0) {
      const emiValue = principal / months;
      setEmi(emiValue);
      setTotalPayment(principal);
      setTotalInterest(0);
      return;
    }

    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(emiValue);
    setTotalPayment(emiValue * months);
    setTotalInterest(emiValue * months - principal);
  };

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.header}>
          <h2 id="modal-title">Personal Loan EMI Calculator</h2>
          <button onClick={onClose} aria-label="Close modal" className={styles.closeButton}>
            &times;
          </button>
        </header>

        <div className={styles.container}>
          <section className={styles.inputSection}>
            <label>
              Loan Amount (Principal)
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                min="0"
              />
            </label>

            <label>
              Annual Interest Rate (%)
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min="0"
                step="0.01"
              />
            </label>

            <label>
              Loan Term (Years)
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                min="1"
                max="20"
              />
            </label>

            <button onClick={calculateEMI} className={styles.calculateBtn}>
              Calculate EMI
            </button>
          </section>

          <section className={styles.outputSection}>
            {emi !== null ? (
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span>Monthly EMI</span>
                  <strong>{formatCurrency(emi)}</strong>
                </div>
                <div className={styles.resultItem}>
                  <span>Total Payment</span>
                  <strong>{formatCurrency(totalPayment)}</strong>
                </div>
                <div className={styles.resultItem}>
                  <span>Total Interest Payable</span>
                  <strong>{formatCurrency(totalInterest)}</strong>
                </div>
              </div>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Personal Loan" />
                <h4>Calculate your monthly EMI</h4>
                <p>Enter loan amount, interest rate and tenure, then click Calculate EMI.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanEMICalculatorModal;
