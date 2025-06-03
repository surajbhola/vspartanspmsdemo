import React, { useState, useEffect, useRef } from "react";
import styles from "./CAGRCalculatorModal.module.css";
import * as echarts from "echarts";

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

const CAGRCalculatorModal = ({ onClose }) => {
  const [beginningValue, setBeginningValue] = useState();
  const [endingValue, setEndingValue] = useState();
  const [period, setPeriod] = useState();
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

  const calculateCAGR = () => {
    const start = beginningValue;
    const end = endingValue;
    const years = period;

    if (start <= 0 || end <= 0 || years <= 0) {
      setResult(null);
      return;
    }

    const cagr = Math.pow(end / start, 1 / years) - 1;
    setResult({
      cagrPercent: +(cagr * 100).toFixed(2),
    });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["Beginning Value", "Gain"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "CAGR Breakdown",
            type: "pie",
            radius: ["55%", "70%"],
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 16, fontWeight: "bold" },
            },
            data: [
              {
                value: beginningValue,
                name: "Beginning Value",
                itemStyle: { color: "#2D69FD" },
              },
              {
                value: endingValue - beginningValue,
                name: "Gain",
                itemStyle: { color: "#F97316" },
              },
            ],
          },
        ],
      });
      window.addEventListener("resize", () => chart.resize());
      return () => chart.dispose();
    }
  }, [result, beginningValue, endingValue]);

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
          <h2>CAGR Calculator</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Beginning Value *
              <input
                type="number"
                value={beginningValue}
                onChange={(e) => setBeginningValue(+e.target.value)}
                placeholder="Beginning Value"
              />
            </label>

            <label>
              Ending Value *
              <input
                type="number"
                value={endingValue}
                onChange={(e) => setEndingValue(+e.target.value)}
                placeholder="Ending Value"

              />
            </label>

            <label>
              Period (Years) *
              <input
                type="number"
                min={1}
                max={50}
                value={period}
                placeholder="Years"

                onChange={(e) => setPeriod(+e.target.value)}
              />
            </label>

            <button className={styles.calculateBtn} onClick={calculateCAGR}>
              Calculate
            </button>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>Beginning Value</span>
                    <strong>{formatCurrency(beginningValue)}</strong>
                    <small>({numberToWords(beginningValue)})</small>

                  </div>
                  <div>
                    <span>Ending Value</span>
                    <strong>{formatCurrency(endingValue)}</strong>
                    <small>({numberToWords(endingValue)})</small>

                  </div>
                  <div>
                    <span>CAGR</span>
                    <strong>{result.cagrPercent}%</strong>
                  </div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
                <p className={styles.note}>
                  Your investment grew from {formatCurrency(beginningValue)} to{" "}
                  {formatCurrency(endingValue)} in {period} years, delivering a CAGR of{" "}
                  <strong>{result.cagrPercent}%</strong>.
                </p>
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="CAGR Calculator" />
                <h4>Calculate your Compound Annual Growth Rate</h4>
                <p>Enter beginning & ending value along with the time period.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAGRCalculatorModal;
