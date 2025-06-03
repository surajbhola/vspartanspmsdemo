import React, { useState, useEffect, useRef } from "react";
import styles from "./StockMarketVsFDModal.module.css";
import * as echarts from "echarts";

const StockMarketVsFDModal = ({ onClose }) => {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(10);
  const [fdRate, setFdRate] = useState(6);
  const [marketRate, setMarketRate] = useState(12);
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

  const calculate = () => {
    const fdValue = amount * Math.pow(1 + fdRate / 100, years);
    const marketValue = amount * Math.pow(1 + marketRate / 100, years);
    setResult({ fdValue: Math.round(fdValue), marketValue: Math.round(marketValue) });
  };

  useEffect(() => {
    if (result && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        tooltip: { trigger: "item", formatter: "{b}: ₹{c} ({d}%)" },
        legend: {
          bottom: 0,
          data: ["FD Returns", "Stock Market Returns"],
          textStyle: { color: "#666" },
        },
        series: [
          {
            name: "Returns Comparison",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 18, fontWeight: "bold" },
            },
            data: [
              {
                value: result.fdValue,
                name: "FD Returns",
                itemStyle: { color: "#00C48C" },
              },
              {
                value: result.marketValue,
                name: "Stock Market Returns",
                itemStyle: { color: "#2D69FD" },
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

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <header className={styles.modalHeader}>
          <h2>Stock Market vs FD Returns</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.inputSection}>
            <label>
              Investment Amount (₹)
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </label>

            <label>
              Investment Duration (Years)
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </label>

            <label>
              FD Interest Rate (%)
              <input
                type="number"
                value={fdRate}
                onChange={(e) => setFdRate(Number(e.target.value))}
              />
            </label>

            <label>
              Stock Market Return Rate (%)
              <input
                type="number"
                value={marketRate}
                onChange={(e) => setMarketRate(Number(e.target.value))}
              />
            </label>

            <button onClick={calculate} className={styles.calculateBtn}>
              Compare
            </button>
          </div>

          <div className={styles.resultSection}>
            {result ? (
              <>
                <div className={styles.resultStats}>
                  <div>
                    <span>FD Returns</span>
                    <strong>{formatCurrency(result.fdValue)}</strong>
                  </div>
                  <div>
                    <span>Stock Market Returns</span>
                    <strong>{formatCurrency(result.marketValue)}</strong>
                  </div>
                </div>
                <div ref={chartRef} className={styles.chartContainer} />
              </>
            ) : (
              <div className={styles.placeholder}>
                <img src="/growth-graph.jpg" alt="Stock vs FD" />
                <h4>Compare Investment Outcomes</h4>
                <p>
                  See how your investment performs in FD vs Stock Market over
                  time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMarketVsFDModal;
