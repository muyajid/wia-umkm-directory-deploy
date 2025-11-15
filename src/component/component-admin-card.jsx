import Button from "./component-button";
import { IoStorefrontOutline } from "react-icons/io5";
import { FiEdit, FiMail, FiMapPin, FiPhone, FiEye } from "react-icons/fi";

function CardInfoUmkm({
  fotoUmkm,
  kategori,
  namaUmkm,
  owner,
  lokasi,
  phone,
  email,
  onEdit,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-[15px] shadow-sm overflow-hidden">
      <img
        src={
          fotoUmkm ||
          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
        }
        alt="Foto UMKM"
        className="w-full h-40 sm:h-48 md:h-56 lg:h-52 xl:h-60 object-cover rounded-t-[15px] transition-all duration-300"
      />
      <div className="px-5 py-4 space-y-2">
        <button className="border border-[#C1D0E1] rounded-full px-4 py-0.5 text-sm text-[13px] font-bold mb-4 hover:bg-gray-50 transition">
          {kategori || "Kategori UMKM"}
        </button>
        <h2 className="text-[16px] font-normal text-gray-800 leading-tight mt-[-9px]">
          {namaUmkm || "Nama UMKM"}
        </h2>
        <hr className="border-t border-[#C1D0E1] my-3 mt-4" />
        <div className="pt-2 space-y-1 text-sm text-gray-600">
          <p>
            <IoStorefrontOutline className="inline mr-2 text-[#2563EB] size-[20px]" />
            <span>Owner : </span>
            {owner || "Nama Pemilik"}
          </p>
          <p>
            <FiMapPin className="inline mr-2 text-[#2563EB] size-[18px]" />
            {lokasi || "Rembang, Kudus"}</p>
          <p>
            <FiPhone className="inline mr-2 text-[#2563EB] size-[18px]" />
            {phone || "+62 xxx-xxx-xxx"}</p>
          <p>
            <FiMail className="inline mr-2 text-[#2563EB] size-[18px]" />
            {email || "budi@gmail.com"}</p>
        </div>
        <div className="pt-3">
          <Button
            variant="outlined"
            className="w-full !py-2 text-sm font-medium"
            onClick={onEdit}
          >
            <FiEdit className="size-[20px] justify-center" />
            Edit Info UMKM
          </Button>
          <Button
            variant="outlined"
            className="w-full !py-2 mt-2 text-sm font-medium"
            href={"/umkm/16"}
          >
            <FiEye className="size-[20px] justify-center" />
            Lihat Profil UMKM
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardInfoUmkm;
