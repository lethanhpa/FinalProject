import React, { useState } from "react";
import RevenueLineChart from "@/components/RevenueChart";
import PieChart from "@/components/PieChart";
import DailyRevenueChart from "@/components/DailyRevenueChart";

function Statistical() {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  return (
    <div>
      <title>Thống kê</title>
      <div className="container my-5 overflow-x-auto">
        <div className="flex justify-between">
          <div className="w-full">
            <h1 className="flex justify-center font-bold mb-3 text-xl">
              Biểu đồ doanh thu các tháng
            </h1>
            <RevenueLineChart />
          </div>
          <div>
            <h1 className="flex justify-center font-bold mb-3 text-lg">
              Biểu đồ thống kê theo trạng thái
            </h1>
            <PieChart />
          </div>
        </div>
        <div className="mt-10">
          <h1 className="flex justify-center font-bold mb-3 text-xl">
            Biểu đồ thống kê doanh thu theo ngày
          </h1>
          <DailyRevenueChart selectedYear={selectedYear} />
        </div>
      </div>
    </div>
  );
}

export default Statistical;
