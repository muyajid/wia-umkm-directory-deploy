import { useState } from "react";
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
import { toast } from "react-toastify";

export default function PageProfileUmkm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("produk");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("add");

  const umkmData = JSON.parse(sessionStorage.getItem("umkm")) || {};
  const [productList, setProductList] = useState(umkmData.product || []);

  const HandleEditUmkm = () => {
    setPopupMode("umkm");
    setIsPopupOpen(true);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const HandleAddProduct = () => {
    setPopupMode("add");
    setSelectedProduct(null);
    setSelectedIndex(null);
    setIsPopupOpen(true);
  };

  const HandleEditProduct = (product, index) => {
    setPopupMode("edit");
    setIsPopupOpen(true);
    setSelectedIndex(index);
    setSelectedProduct(product);
    console.log("edit product:", product);
  };

  const handleDelete = (productIndex) => {
    if (!confirm("Yakin Ingin Menghapus Produk Ini?")) {
      return;
    }

    let data = JSON.parse(sessionStorage.getItem("umkm")) || {};
    const oldProduct = data.product;

    const newProductList = oldProduct.filter((_, i) => i !== productIndex);

    data.product = newProductList;
    sessionStorage.setItem("umkm", JSON.stringify(data));
    setProductList(newProductList);
  };

  const pageTransition = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const account = JSON.parse(sessionStorage.getItem("umkm"));
    if (account && username === account.username && password === account.password) {
      toast.success("Login Berhasil")
      setIsLoggedIn(true);
    } else {
      toast.warn("Login Gagal")
      return;
    }
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
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
          {productList.length > 0 ? (
            productList.map((product, i) => (
              <motion.div>
                <CardProductAdmin
                  key={i}
                  nama={product.namaProduct}
                  harga={product.harga}
                  deskripsi={product.deskripsi}
                  foto={product.gambar}
                  onEdit={() => HandleEditProduct(product, i)}
                  onDelete={() => handleDelete(i)}
                />
              </motion.div>
            ))
          ) : (
            <div className="flex justify-center items-center h-[50vh]">
              <h1 className="text-sm sm:text-base font-medium text-gray-700">
                Tidak Ada Product
              </h1>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div key="analisis" {...pageTransition}>
          <ComponentAnalisisUmkm />
        </motion.div>
      )}
    </AnimatePresence>
  );

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
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    placeholder="Masukkan Password Anda"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
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
                  <Button
                    text="Login"
                    variant="filled"
                    className="mt-2"
                    type={"submit"}
                  />
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
                  kategori={umkmData.kategori}
                  namaUmkm={umkmData.namaUsaha}
                  owner={umkmData.pemilik}
                  lokasi={umkmData.alamat.slice(0, 20)}
                  phone={umkmData.nomorHp}
                  email={umkmData.email}
                  onEdit={HandleEditUmkm}
                  fotoUmkm={
                    umkmData.foto
                      ? umkmData.foto
                      : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                  }
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
        productData={selectedProduct}
        productIndex={selectedIndex}
        onSave={(save) => setProductList(save)}
      />
    </div>
  );
}
