import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FiBarChart2 } from "react-icons/fi";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function ComponentAnalisisUmkm() {
  const data = {
    labels: ["APR 05", "APR 06", "APR 07", "APR 08", "APR 09", "APR 10", "APR 11"],
    datasets: [
      {
        label: "Kunjungan",
        data: [10000, 3000, 5000, 4000, 8000, 3500, 6000],
        borderColor: "#2563EB",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#fff",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#2563EB",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 10,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280", font: { size: 11 } },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: {
          color: "#9CA3AF",
          font: { size: 10 },
          callback: (val) => (val >= 1000 ? `${val / 1000}k` : val),
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">
              Analisis Kunjungan
            </h2>
            <p className="text-xs text-gray-500">Profil Usaha</p>
          </div>
          <FiBarChart2 className="text-gray-500 bg-[#F2F4F8] rounded-full p-1" size={20} />
        </div>
        <div className="h-64">
          <Line data={data} options={options} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-[15px] p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 text-sm mb-1">
            Analisis Profil
          </h3>
          <p className="text-sm text-gray-600">
            <span className="text-green-500 font-medium">↑</span> 5 rb orang
            mengunjungi profil anda dalam 30 hari
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-[15px] p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 text-sm mb-1">Audiens</h3>
          <p className="text-sm text-gray-600">
            Sebagian besar audiens ada di sekitar Kudus
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComponentAnalisisUmkm;
