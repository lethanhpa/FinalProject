import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axiosClient from "@/libraries/axiosClient";

const PieChart = () => {
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/orders/status");
        setStatusData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(statusData),
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: Object.values(statusData),
        backgroundColor: ["#000000", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#000000", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default PieChart;
