import React from "react";

const Tabs = [
  { key: "produk", label: "Produk" },
  { key: "analitik", label: "Analisis" },
];
function TabSelecting({ activeTab, setActiveTab }) {
  return (
    <div className="w-full mb-6">
      <div className="flex w-full border border-[#C1D0E1] rounded-full p-2 bg-white">
        {Tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-1.5 rounded-full font-medium text-[15px] sm:text-[16px] transition-all duration-200 ${
              activeTab === key
                ? "bg-[#2563EB] text-white shadow-sm"
                : "bg-white text-gray-800 hover:text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TabSelecting;
