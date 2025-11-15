import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Layout from "../layout/layout-main";
import ProductCard from "../component/component-product-card";
import Button from "../component/component-button";
import { useParams } from "react-router-dom";
import dataUmkm from "../data/data-umkm";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function DetailUmkm() {
  const { id } = useParams();
  const umkm = dataUmkm.filter((umkm) => umkm.id === parseInt(id))[0];

  if (!umkm) {
    return (
      <Layout>
        <div className="p-10 text-center text-gray-500">
          UMKM Tidak Ditemukan
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
       <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-14 mt-[6vh] font-[DM_Sans]">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-8 mb-16 items-center lg:items-center"
        >
          {/* Gambar */}
          <div className="w-full lg:w-[33%] flex justify-center lg:justify-start">
            <img
              src={umkm.gambar}
              alt="Foto UMKM"
              className="w-[300px] sm:w-[320px] md:w-[333px] h-[280px] sm:h-[300px] md:h-[333px] object-cover rounded-[25px] border border-gray-200 shadow-md"
            />
          </div>

          {/* Deskripsi */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block border border-gray-900 text-[14px] sm:text-[15px] font-bold px-6 py-1 rounded-full mb-3 text-gray-900 hover:bg-gray-50 transition w-fit mx-auto lg:mx-0">
              {umkm.kategori}
            </span>

            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              {umkm.nama}
            </h1>

            <hr className="border-t border-[#C1D0E1] w-[90%] lg:w-full mx-auto lg:mx-0 mb-3" />

            <p className="text-gray-600 leading-relaxed text-[16px] sm:text-[18px] md:text-[20px] text-justify">
              {umkm.deskripsi}
            </p>
          </div>
        </motion.div>

        {/* PRODUK DAN LAYANAN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">
            Produk dan Layanan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {umkm.product && umkm.product.length > 0
              ? umkm.product.map((prod, i) => (
                  <ProductCard
                    key={i}
                    fotoProduct={prod.gambar}
                    namaProduct={prod.namaProduct}
                    deskripsiProduct={prod.deskripsi}
                    hargaProduct={prod.harga}
                  />
                ))
              : [...Array(4)].map((_, i) => <ProductCard key={i} />)}
          </div>
        </motion.div>

        {/* INFORMASI BISNIS & MAP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-8"
        >
          {/* KOTAK INFORMASI BISNIS */}
          <div className="bg-white rounded-[25px] border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
              Informasi Bisnis
            </h2>
            <div className="space-y-5 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-blue-600 mt-1 shrink-0" size={18} />
                <div>
                  <p className="font-medium text-gray-700 text-[17px]">
                    Alamat
                  </p>
                  <p className="text-gray-500 text-[15px] sm:text-[16px]">
                    {umkm.alamat}
                  </p>
                </div>
              </div>
              <hr className="border-t border-[#C1D0E1]" />
              <div className="flex items-start gap-3">
                <FiPhone className="text-blue-600 mt-1 shrink-0" size={18} />
                <div>
                  <p className="font-medium text-gray-700 text-[17px]">
                    Telepon
                  </p>
                  <p className="text-gray-500 text-[15px] sm:text-[16px]">
                    {umkm.phone}
                  </p>
                </div>
              </div>
              <hr className="border-t border-[#C1D0E1]" />
              <div className="flex items-start gap-3">
                <FiMail className="text-blue-600 mt-1 shrink-0" size={18} />
                <div>
                  <p className="font-medium text-gray-700 text-[17px]">Email</p>
                  <p className="text-gray-500 text-[15px] sm:text-[16px]">
                    {umkm.email}
                  </p>
                </div>
              </div>
            </div>

            <Button
              text={
                <span className="flex items-center justify-center gap-2">
                  <FiPhone size={18} />
                  Hubungi Pemilik
                </span>
              }
              variant="filled"
              marginTop="mt-8"
              className="w-full !py-3 !text-base !rounded-full"
              href={umkm.redirectPhone}
            />
          </div>

          {/* MAP */}
          <div className="bg-white rounded-[25px] border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Lokasi Peta
            </h2>
            <iframe
              src={umkm.embed}
              width="100%"
              height="340"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map Location"
              className="rounded-[15px] shadow-sm"
            ></iframe>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}

export default DetailUmkm;
