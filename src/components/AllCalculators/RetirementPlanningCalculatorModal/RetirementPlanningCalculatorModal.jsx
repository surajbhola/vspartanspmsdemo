import React, { useState, useEffect, useRef } from "react";
import styles from "./RetirementPlanningCalculatorModal.module.css";
import * as echarts from "echarts";

const formatCurrency = (amt, decimals = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
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
  return parts.join(" ") || "zero";
};

const formatLargeNumberWithCrores = (num) => {
  const crores = num / 10000000;
  return `${crores.toFixed(2)} Crores`;
};

const RetirementPlanningCalculatorModal = ({ onClose }) => {
  const [currentAge, setCurrentAge] = useState();
  const [retirementAge, setRetirementAge] = useState();
  const [lifeExpectancy, setLifeExpectancy] = useState();
  const [annualExpenses, setAnnualExpenses] = useState();
  const [inflationRate, setInflationRate] = useState();
  const [expectedReturn, setExpectedReturn] = useState();
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
    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;

    
    const inflatedAnnualExpenses =
      annualExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);

    const r = expectedReturn / 100;
    const n = retirementYears;

    
    const corpus =
      inflatedAnnualExpenses * ((1 - Math.pow(1 + r, -n)) / r);

  
    const monthlyRate = r / 12;
    const totalMonths = yearsToRetirement * 12;


    const monthlyInvestment =
      (corpus * monthlyRate) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    setResult({
      corpus,
      monthlyInvestment,
      yearsToRetirement,
      retirementYears,
      inflatedAnnualExpenses,
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Required Corpus", "Total Investment"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "Retirement Planning",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 18, fontWeight: "bold" },
            },
            data: [
              {
                value: Math.round(result.corpus),
                name: "Required Corpus",
                itemStyle: { color: "#2D69FD" },
              },
              {
                value: Math.round(result.monthlyInvestment * result.yearsToRetirement * 12),
                name: "Total Investment",
                itemStyle: { color: "#00C48C" },
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

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="retirement-planning-title"
    >
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <header className={styles.modalHeader}>
          <h2 id="retirement-planning-title">Retirement Planning</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={styles.closeBtn}
          >
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Current Age *
              <input
                type="number"
                min={18}
                max={retirementAge - 1}
                placeholder="Ex: 24"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
              />
            </label>

            <label>
              Retirement Age *
              <input
                type="number"
                min={currentAge + 1}
                max={lifeExpectancy - 1}
                placeholder="Ex: 60"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
              />
            </label>

            <label>
              Life Expectancy *
              <input
                type="number"
                min={retirementAge + 1}
                max={120}
                placeholder="Ex: 80"
                value={lifeExpectancy}
                onChange={(e) => setLifeExpectancy(Number(e.target.value))}
              />
            </label>

            <label>
              Current Annual Expenses (₹) *
              <input
                type="number"
                min={0}
                placeholder="Ex: 1200000"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(Number(e.target.value))}
              />
            </label>

            <label>
              Inflation Rate (%) *
              <input
                type="number"
                min={0}
                max={15}
                placeholder="Ex: 6"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
              />
            </label>

            <label>
              Expected Return (%) *
              <input
                type="number"
                min={1}
                max={30}
                placeholder="Ex: 30"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
              />
            </label>

            <button className={styles.calculateBtn} onClick={calculate}>
              Calculate
            </button>

            <p className={styles.tip}>
              Enter your current age, retirement age, life expectancy, annual
              expenses, inflation, and expected return to calculate your
              retirement corpus and monthly investment.
            </p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Retirement Corpus needed</span>
                    <strong>
                      {formatCurrency(result.corpus, 2)} (
                       {numberToWords(Math.round(result.corpus))})
                    </strong>
                  </div>

                  <div>
                    <span>Monthly savings required to reach corpus</span>
                    <strong>{formatCurrency(result.monthlyInvestment, 2)}</strong>
                  </div>

                  <div>
                    <span>Annual expense at retirement age after considering inflation</span>
                    <strong>{formatCurrency(result.inflatedAnnualExpenses, 2)}(
                       {numberToWords(Math.round(result.inflatedAnnualExpenses))})</strong>
                  </div>

                  <div>
                    <span>Years to Retirement</span>
                    <strong>{result.yearsToRetirement} years</strong>
                  </div>

                  <div>
                    <span>Retirement Duration</span>
                    <strong>{result.retirementYears} years</strong>
                  </div>
                </div>

                <div ref={chartRef} className={styles.chartContainer} />

                <p className={styles.note}>
                  Investing {formatCurrency(result.monthlyInvestment, 2)} monthly
                  can help you accumulate a corpus of{" "}
                  {formatCurrency(result.corpus, 2)} by the age of {retirementAge}.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Retirement Planning" />
                <h4>Plan your retirement effectively</h4>
                <p>
                  Enter your details to calculate the required corpus and monthly
                  investment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanningCalculatorModal;
