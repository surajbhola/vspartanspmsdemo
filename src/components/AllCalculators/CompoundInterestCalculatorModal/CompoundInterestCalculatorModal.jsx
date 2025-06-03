import React, { useState, useEffect, useRef } from "react";
import styles from "./CompoundInterestCalculatorModal.module.css";
import * as echarts from "echarts";

const frequencyMap = {
  yearly: 1,
  "half-yearly": 2,
  quarterly: 4,
  monthly: 12,
};


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

const CompoundInterestCalculatorModal = ({ onClose }) => {
  const [initialInvestment, setInitialInvestment] = useState(200);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(5);
  const [compoundingFreq, setCompoundingFreq] = useState("monthly");
  const [regularInvestment, setRegularInvestment] = useState(5);
  const [regularFreq, setRegularFreq] = useState("monthly");

  const [result, setResult] = useState(null);
  const chartRef = useRef(null);
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

  const calculateCompoundInterest = () => {
    const P = initialInvestment;
    const r = interestRate / 100;
    const t = tenure;
    const n = frequencyMap[compoundingFreq];
    const rf = frequencyMap[regularFreq];
    const RI = regularInvestment;

    const compoundPrincipal = P * Math.pow(1 + r / n, n * t);
    const totalPeriods = rf * t;
    const periodicRate = r / rf;

    const compoundRegular =
      RI * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate) *
      (1 + periodicRate);

    const totalInvestment = P + RI * totalPeriods;
    const maturityAmount = compoundPrincipal + compoundRegular;
    const totalInterest = maturityAmount - totalInvestment;

    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInterest: Math.round(totalInterest),
      totalInvestment: Math.round(totalInvestment),
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Total Investment", "Interest Earned"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "CI Breakdown",
            type: "pie",
            radius: ["55%", "70%"],
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 16, fontWeight: "bold" },
            },
            data: [
              {
                value: result.totalInvestment,
                name: "Total Investment",
                itemStyle: { color: "#2D69FD" },
              },
              {
                value: result.totalInterest,
                name: "Interest Earned",
                itemStyle: { color: "#F97316" },
              },
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
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Compound Interest Calculator</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Initial Investment *
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(+e.target.value)}
                placeholder="Enter initial investment amount"
                min={0}
              />
            </label>

            <label>
              Interest Rate (P.A) *
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(+e.target.value)}
                placeholder="Enter annual interest rate"
                min={0}
                step={0.01}
              />
            </label>

            <label>
              Tenure (Years) *
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(+e.target.value)}
                placeholder="Enter tenure in years"
                min={0}
              />
            </label>

            <label>
              Compounding Frequency *
              <select
                value={compoundingFreq}
                onChange={(e) => setCompoundingFreq(e.target.value)}
              >
                {Object.keys(frequencyMap).map((key) => (
                  <option key={key} value={key}>
                    {key[0].toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Regular Investment (If Any)
              <input
                type="number"
                value={regularInvestment}
                onChange={(e) => setRegularInvestment(+e.target.value)}
                placeholder="Enter regular investment amount"
                min={0}
              />
            </label>

            <label>
              Regular Deposit Frequency
              <select
                value={regularFreq}
                onChange={(e) => setRegularFreq(e.target.value)}
              >
                {Object.keys(frequencyMap).map((key) => (
                  <option key={key} value={key}>
                    {key[0].toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <button
              className={styles.calculateBtn}
              onClick={calculateCompoundInterest}
            >
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
                  Your investment will grow to{" "}
                  <strong>{formatCurrency(result.maturityAmount)}</strong> (
                  {numberToWords(result.maturityAmount)}) in {tenure} year
                  {tenure > 1 ? "s" : ""} at {interestRate}% interest compounded{" "}
                  {compoundingFreq}.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Compound Interest" />
                <h4>Calculate your Compound Interest earnings</h4>
                <p>
                  Enter principal, interest, tenure, and frequency to get
                  started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculatorModal;
