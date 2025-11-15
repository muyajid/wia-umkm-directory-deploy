import { FiEdit2, FiTrash2 } from "react-icons/fi";

function CardProductAdmin({ foto, nama, harga, deskripsi, onEdit, onDelete }) {
  return (
    <div className="flex items-start justify-between bg-white border border-gray-200 rounded-[15px] p-4 shadow-sm hover:shadow transition duration-200">
      <div className="flex items-start gap-4 w-full">
        <img
          src={
            foto ||
            "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
          }
          alt={nama}
          className="w-[80px] h-[80px] object-cover rounded-[12px] flex-shrink-0"
        />
        <div className="flex-1">
          <h2 className="text-[15px] font-semibold text-gray-800 leading-tight">
            {nama || "Nama Produk"}
          </h2>
          <p className="text-[#2563EB] font-medium text-sm mt-1">
            {harga || "Rp 20.000"}
          </p>
          <p className="text-gray-500 text-sm mt-1 leading-snug line-clamp-2 text-justify">
            {deskripsi ||
              "Nikmati cita rasa kopi susu matcha yang menggabungkan kopi, susu, dan bubuk teh hijau matcha."}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-4 shrink-0">
        <button onClick={onEdit} className="border border-[#2563EB] text-[#2563EB] p-2 rounded-lg hover:bg-[#2563EB] hover:text-white transition">
          <FiEdit2 size={14} />
        </button>
        <button onClick={onDelete} className="border border-red-500 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition">
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default CardProductAdmin;
