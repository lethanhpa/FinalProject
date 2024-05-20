import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Select } from "antd";
import axiosClient from "@/libraries/axiosClient";

const RevenueLineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState({});
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axiosClient.get(`/orders/revenue`);
        setMonthlyRevenue(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const labels = monthlyRevenue[selectedYear]
      ? Object.keys(monthlyRevenue[selectedYear]).map(
          (month) => `Tháng ${month}`
        )
      : [];
    const data = monthlyRevenue[selectedYear]
      ? Object.values(monthlyRevenue[selectedYear])
      : [];

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Doanh thu (VNĐ)",
            data: data,
            fill: false,
            borderColor: "#3366ff",
            backgroundColor: "#3366ff",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
          },
          y: {
            type: "linear",
            title: {
              display: true,
              text: "Tổng tiền (VNĐ)",
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedYear, monthlyRevenue]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <div>
      <div className="flex">
        <h1 className="mr-3">Chọn năm:</h1>
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          style={{ width: 120, marginBottom: 20 }}
        >
          {Object.keys(monthlyRevenue).map((year) => (
            <Select.Option key={year} value={year}>
              {year}
            </Select.Option>
          ))}
        </Select>
      </div>

      <canvas ref={chartRef} />
    </div>
  );
};

export default RevenueLineChart;
