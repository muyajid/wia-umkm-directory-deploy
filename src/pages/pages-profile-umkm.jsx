import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import TextField from "../component/component-textfield.jsx";
import Button from "../component/component-button.jsx";
import CardProductAdmin from "../component/component-card-product-admin.jsx";
import CardInfoUmkm from "../component/component-admin-card.jsx";
import ComponentAnalisisUmkm from "../component/component-analisis-umkm.jsx";
import ComponentPopupProduct from "../component/component-popup-card.jsx";
import TabSelecting from "../component/component-tab-selecting.jsx";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import dataUmkm from "../data/data-umkm.js";

export default function PageProfileUmkm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("produk");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("add");

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const HandleEditUmkm = () => {
    setPopupMode("umkm");
    setIsPopupOpen(true);
  };

  const HandleAddProduct = () => {
    setPopupMode("add");
    setIsPopupOpen(true);
  };

  const HandleEditProduct = (product) => {
    setPopupMode("edit");
    setIsPopupOpen(true);
    console.log("edit product:", product);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const pageTransition = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const renderTabContent = () => (
    <AnimatePresence mode="wait">
      {activeTab === "produk" ? (
        <motion.div
          key="produk"
          {...pageTransition}
          className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scroll"
        >
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h2 className="text-sm sm:text-base font-medium text-gray-700">
              Daftar Produk
            </h2>
            <Button
              variant="outline"
              className="!py-1 !px-3 text-sm flex items-center gap-2 shrink-0"
              onClick={HandleAddProduct}
            >
              <FaPlus />
              Tambah Produk
            </Button>
          </div>
          {exampleUmkm[0].product.map((product, i) => (
            <motion.div>
              {" "}
              <CardProductAdmin
                key={i}
                nama={product.namaProduct}
                harga={product.harga}
                deskripsi={product.deskripsi}
                foto={product.gambar}
                onEdit={() =>
                  HandleEditProduct({
                    nama: "Kopi Susu Matcha",
                    harga: "Rp 20.000",
                    deskripsi:
                      "Minuman campuran yang menggabungkan kopi, susu, dan bubuk teh hijau matcha.",
                  })
                }
              />{" "}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div key="analisis" {...pageTransition}>
          <ComponentAnalisisUmkm />
        </motion.div>
      )}
    </AnimatePresence>
  );

  const exampleUmkm = dataUmkm.filter((data) => data.id === 16);
  return (
    <div className="m-[5px] mt-[20px] mb-[20px]">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            {...pageTransition}
            className="max-w-md sm:max-w-3xl mx-auto mt-8 px-4 py-8"
          >
            <section className="bg-white rounded-[40px] border border-gray-200 shadow-sm p-6">
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-6 w-full"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Masuk ke Akun Anda
                </h2>
                <hr className="border-t border-[#C1D0E1]" />
                <div className="border border-gray-200 rounded-[30px] p-5 flex flex-col gap-4 hover:shadow-md transition-all duration-300 hover:border-[#2563EB]">
                  <TextField
                    label="Username"
                    placeholder="Masukkan Username Anda"
                    name="username"
                  />
                  <TextField
                    label="Password"
                    type="password"
                    placeholder="Masukkan Password Anda"
                    name="password"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                      Remember me
                    </label>
                    <Link className="text-[#2563EB] font-medium hover:underline">
                      Lupa Password?
                    </Link>
                  </div>
                  <Button text="Login" variant="filled" className="mt-2" />
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Belum Punya Akun?{" "}
                    <Link
                      to="/register-page"
                      className="text-[#2563EB] font-medium hover:underline"
                    >
                      Daftar Sekarang!
                    </Link>
                  </p>
                </div>
              </form>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            {...pageTransition}
            className="flex-grow w-full max-w-[1200px] mx-auto p-[10px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1 order-1"
              >
                <CardInfoUmkm
                  kategori={exampleUmkm[0].kategori}
                  namaUmkm={exampleUmkm[0].nama}
                  owner="Fulan"
                  lokasi="Kudus, Gebog, Besito"
                  phone={exampleUmkm[0].phone}
                  email={exampleUmkm[0].email}
                  onEdit={HandleEditUmkm}
                  fotoUmkm={exampleUmkm[0].gambar}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2 order-2 flex flex-col"
              >
                <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm p-5 min-h-[70vh] flex flex-col">
                  <TabSelecting
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <div className="flex-grow overflow-auto mt-2">
                    {renderTabContent()}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ComponentPopupProduct
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        mode={popupMode}
      />
    </div>
  );
}
