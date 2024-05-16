import axiosClient from "@/libraries/axiosClient";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const DailyRevenueChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDailyRevenue = async () => {
      try {
        const response = await axiosClient.get("/orders/revenue/daily");
        const data = response.data;
        const labels = Object.keys(data)
          .map((date) => {
            const [year, month, day] = date.split("-");
            return `${day}-${month}-${year}`;
          })
          .sort(
            (a, b) =>
              new Date(a.split("-").reverse().join("-")) -
              new Date(b.split("-").reverse().join("-"))
          );
        const values = labels.map(
          (date) => data[date.split("-").reverse().join("-")]
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Doanh thu (VNĐ)", // Đổi label của trục y
              data: values,
              backgroundColor: "#3366ff",
              borderColor: "#3366ff",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching daily revenue:", error);
      }
    };

    fetchDailyRevenue();
  }, []);

  return (
    <div>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Ngày",
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Tổng tiền (VNĐ)", 
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DailyRevenueChart;
