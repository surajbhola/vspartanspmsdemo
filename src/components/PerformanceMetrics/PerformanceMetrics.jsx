import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './PerformanceMetrics.module.css';

const PerformanceMetrics = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: { color: '#1f2937' },
      },
      legend: {
        data: ['Equity Growth', 'Balanced Portfolio', 'Conservative Income', 'Market Benchmark'],
        textStyle: { color: '#1f2937' },
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2020', '2021', '2022', '2023', '2024', '2025'],
        axisLine: { lineStyle: { color: '#ddd' } },
        axisLabel: { color: '#1f2937' },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#ddd' } },
        axisLabel: { color: '#1f2937', formatter: '{value}%' },
        splitLine: { lineStyle: { color: '#eee' } },
      },
      series: [
        {
          name: 'Equity Growth',
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: 'rgba(87, 181, 231, 1)' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(87, 181, 231, 0.3)' },
              { offset: 1, color: 'rgba(87, 181, 231, 0.1)' },
            ]),
          },
          symbol: 'none',
          data: [12.5, 18.2, 9.8, 22.4, 18.7, 20.1],
        },
        {
          name: 'Balanced Portfolio',
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: 'rgba(141, 211, 199, 1)' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(141, 211, 199, 0.3)' },
              { offset: 1, color: 'rgba(141, 211, 199, 0.1)' },
            ]),
          },
          symbol: 'none',
          data: [9.5, 14.2, 8.7, 16.3, 14.2, 15.8],
        },
        {
          name: 'Conservative Income',
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: 'rgba(251, 191, 114, 1)' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(251, 191, 114, 0.3)' },
              { offset: 1, color: 'rgba(251, 191, 114, 0.1)' },
            ]),
          },
          symbol: 'none',
          data: [7.2, 9.8, 7.5, 10.2, 9.8, 10.5],
        },
        {
          name: 'Market Benchmark',
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: 'rgba(252, 141, 98, 1)' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(252, 141, 98, 0.3)' },
              { offset: 1, color: 'rgba(252, 141, 98, 0.1)' },
            ]),
          },
          symbol: 'none',
          data: [10.2, 15.4, 8.2, 14.6, 12.5, 13.8],
        },
      ],
    };

    myChart.setOption(option);
    window.addEventListener('resize', myChart.resize);
    return () => window.removeEventListener('resize', myChart.resize);
  }, []);

  return (
       <section className={styles.section}>
      <div className={styles.containerMain}>
 <div className={styles.textCenter}>
          <span className={styles.trackRecord}>Our Track Record</span>
          <h2 className={styles.title}>Consistent Performance Through Market Cycles</h2>
          <p className={styles.description}>
            Our disciplined investment approach has delivered strong
            risk-adjusted returns across various market conditions.
          </p>
        </div>
        <div className={styles.wrapperMain}>

    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Performance Overview</h3>
          <p>
            Historical returns across our key investment strategies, net of all fees.
          </p>
          <ul className={styles.legendList}>
            <li><span className={styles.dot1}></span>Equity Growth</li>
            <li><span className={styles.dot2}></span>Balanced Portfolio</li>
            <li><span className={styles.dot3}></span>Conservative Income</li>
            <li><span className={styles.dot4}></span>Market Benchmark</li>
          </ul>
        </div>
        <div ref={chartRef} className={styles.chart}></div>
      </div>
        <div className={styles.stats}>
          <div>
            <strong>18.7%</strong>
            <p>5-Year CAGR<br />Equity Growth</p>
          </div>
          <div>
            <strong>14.2%</strong>
            <p>5-Year CAGR<br />Balanced Portfolio</p>
          </div>
          <div>
            <strong>9.8%</strong>
            <p>5-Year CAGR<br />Conservative Income</p>
          </div>
          <div>
            <strong>12.5%</strong>
            <p>5-Year CAGR<br />Market Benchmark</p>
          </div>
        </div>
        <p className={styles.disclaimer}>
          Past performance is not indicative of future results. Returns shown are after fees but before taxes.
        </p>
        <button className={styles.button}>Download Detailed Performance Report</button>
    </section>
        </div>

      </div>
    </section>

  );
};

export default PerformanceMetrics;