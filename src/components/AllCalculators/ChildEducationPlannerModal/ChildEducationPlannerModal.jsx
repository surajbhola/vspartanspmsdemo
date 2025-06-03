import React, { useState, useEffect, useRef } from "react";
import styles from "./ChildEducationPlannerModal.module.css";
import * as echarts from "echarts";

const ChildEducationPlannerModal = ({ onClose }) => {
  const [childAge, setChildAge] = useState(0);
  const [goalAge, setGoalAge] = useState(18);
  const [rate, setRate] = useState(12);
  const [presentCost, setPresentCost] = useState(1000000);
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

  const calculate = () => {
    const years = goalAge - childAge;
    const futureCost = presentCost * Math.pow(1 + 0.06, years); 
    const requiredInvestment = futureCost / Math.pow(1 + rate / 100, years);
    const estimatedReturns = futureCost - requiredInvestment;

    setResult({
      futureCost: Math.round(futureCost),
      requiredInvestment: Math.round(requiredInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      years,
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Investment Needed Today", "Estimated Returns"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "Child Education Plan",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 18, fontWeight: "bold" } },
            data: [
              { value: result.requiredInvestment, name: "Investment Needed Today", itemStyle: { color: "#2D69FD" } },
              { value: result.estimatedReturns, name: "Estimated Returns", itemStyle: { color: "#00C48C" } },
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
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Child Education Planner</h2>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Current Age of Child
              <input type="number" value={childAge} onChange={(e) => setChildAge(Number(e.target.value))} />
            </label>
            <label>
              Age for Higher Education
              <input type="number" value={goalAge} onChange={(e) => setGoalAge(Number(e.target.value))} />
            </label>
            <label>
              Expected Annual Return (%)
              <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </label>
            <label>
              Present Cost of Higher Education (₹)
              <input type="number" value={presentCost} onChange={(e) => setPresentCost(Number(e.target.value))} />
            </label>
            <button className={styles.calculateBtn} onClick={calculate}>Calculate</button>
            <p className={styles.tip}>Plan now to afford your child’s higher education in the future.</p>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div><span>Future Education Cost</span><strong>{formatCurrency(result.futureCost)}</strong></div>
                  <div><span>Investment Needed Today</span><strong>{formatCurrency(result.requiredInvestment)}</strong></div>
                  <div><span>Estimated Returns</span><strong>{formatCurrency(result.estimatedReturns)}</strong></div>
                  <div><span>Years Left</span><strong>{result.years} years</strong></div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  Investing {formatCurrency(result.requiredInvestment)} today can help you achieve the education goal of
                  {formatCurrency(result.futureCost)} in {result.years} years.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Child Education Planning" />
                <h4>Plan for Your Child’s Future</h4>
                <p>Enter child’s age, expected education cost, and return rate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildEducationPlannerModal;
