import axiosClient from "@/libraries/axiosClient";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Select } from "antd";

const DailyRevenueChart = ({ selectedYear }) => {
  const [chartData, setChartData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString().padStart(2, "0") // Mặc định là tháng hiện tại
  );

  useEffect(() => {
    const fetchDailyRevenue = async () => {
      try {
        const response = await axiosClient.get(
          `/orders/revenue/daily?year=${selectedYear}&month=${selectedMonth}`
        );
        const data = response.data;

        // Sắp xếp ngày
        const sortedDates = Object.keys(data).sort(
          (a, b) => new Date(a) - new Date(b)
        );

        const labels = sortedDates.map((date) => {
          const [year, month, day] = date.split("-");
          return `${day}-${month}-${year}`;
        });

        const values = sortedDates.map((date) => data[date]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
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
  }, [selectedYear, selectedMonth]);

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <div>
      <div className="flex">
        <h1 className="mr-3">Chọn tháng:</h1>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ width: 120, marginBottom: 20 }}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const month = String(i + 1).padStart(2, "0");
            return (
              <Select.Option key={month} value={month}>
                {month}
              </Select.Option>
            );
          })}
        </Select>
      </div>

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
