import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UmkmCard({
  id,
  fotoUmkm,
  namaUmkm,
  deskripsi,
  location,
  noHp,
  kategori,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/umkm/${id}`);
  };
  return (
    <div
      className="bg-white rounded-[30px] shadow-md overflow-hidden w-full max-w-sm mx-auto border border-[#C1D0E1] hover:scale-105 hover:-translate-y-2 hover:shadow-xl duration-500 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={
          fotoUmkm ||
          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
        }
        alt="Foto UMKM"
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">
          {namaUmkm ?  namaUmkm.length > 20 ? `${namaUmkm.slice(0,20)} ...` : namaUmkm : "Nama Umkm"}
        </h2>

        <button className="border border-[#C1D0E1] rounded-full px-4 py-1 text-sm font-semibold mb-3 hover:bg-gray-50 transition">
          {kategori || "kategori"}
        </button>

        <p className="text-gray-500 text-sm mb-2 leading-relaxed text-justify">
          {deskripsi
            ? `${deskripsi.slice(0, 60)} ...`
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, omnis deserunt! Ratione ipsam,"}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 border-t border-gray-200 pt-3">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>
              {location ? `${location.slice(0, 15)}..` : "Kecamatan, Kota"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaWhatsapp className="text-green-500" />
            <span>{noHp || "+62 XXX-XXX-XX"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UmkmCard;
