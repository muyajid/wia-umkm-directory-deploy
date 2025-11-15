function ProductCard({fotoProduct, namaProduct, hargaProduct, deskripsiProduct}) {
  return (
   <div className="bg-white rounded-[25px] border border-[#E5E7EB] w-full max-w-[350px] shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition duration-300 cursor-pointer">
      <img
        src={fotoProduct || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}
        alt="product umkm"
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h2 className="text-[16px] font-semibold text-gray-900 mb-1">
          {namaProduct || "Nama Product"}
        </h2>
        <h3 className="text-[15px] font-medium text-[#2563EB] mb-2">
          {hargaProduct != undefined ? `Rp. ${hargaProduct.toLocaleString('id-ID')}` : "Rp. 0"}
        </h3>
        <p className="text-[13px] text-gray-500 leading-snug text-justify">
          {deskripsiProduct || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
