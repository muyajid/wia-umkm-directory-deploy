import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronDown } from "react-icons/fa";
import TextField from "./component-textfield.jsx";
import Button from "./component-button.jsx";

export default function ComponentPopupProduct({
  isOpen,
  onClose,
  mode = "add",
  productData = null,
  productIndex = null,
  onSave,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const [category, setCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "Kuliner",
    "Jasa & Layanan",
    "Fashion",
    "Kreatif & Digital",
    "Retail",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const [namaProduct, setNamaProduk] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [namaUsaha, setNamaUsaha] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [alamat, setLokasi] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!namaProduct.trim() || !harga.trim() || !deskripsi.trim()) {
      alert("Semua input wajib diisi!");
      return; // hentikan submit
    }

    if (!previewImage) {
      alert("Gambar produk harus diupload!");
      return;
    }

    let data = JSON.parse(sessionStorage.getItem("umkm")) || {};
    const oldProduct = data.product || [];

    if (mode == "edit" && productIndex !== null) {
      oldProduct[productIndex] = {
        namaProduct,
        harga,
        deskripsi,
        gambar: previewImage,
      };
    } else {
      oldProduct.push({
        namaProduct,
        harga,
        deskripsi,
        gambar : previewImage,
      });
    }

    data.product = oldProduct;
    sessionStorage.setItem("umkm", JSON.stringify(data));

    if (onSave) {
      onSave(data.product);
    }
    onClose();
  };
  const handleUmkmEdit =(e) => {
    e.preventDefault();

    let data = JSON.parse(sessionStorage.getItem("umkm")) || {};

    const updateDataUmkm = {
      ...data,
      namaUsaha,
      pemilik,
      alamat,
      nomorHp,
      email,
      kategori : category,
      foto: previewImage
    };

    sessionStorage.setItem("umkm", JSON.stringify(updateDataUmkm));

    onClose();
  }

  useEffect(() => {
    if (mode == "edit" && productData) {
      setNamaProduk(productData.namaProduk);
      setHarga(productData.harga);
      setDeskripsi(productData.deskripsi);
      setPreviewImage(productData.gambar);
    } else if ((mode == "add", isOpen)) {
      setNamaProduk("");
      setHarga("");
      setDeskripsi("");
      setPreviewImage(null);
    }
  }, [mode, productData, isOpen]);

  useEffect(() => {
    if (mode == "umkm") {
      const umkmData = JSON.parse(sessionStorage.getItem("umkm"));
      setNamaUsaha(umkmData.namaUsaha);
      setPemilik(umkmData.pemilik);
      setLokasi(umkmData.alamat);
      setNomorHp(umkmData.nomorHp);
      setEmail(umkmData.email);
      setCategory(umkmData.kategori);
      setPreviewImage(umkmData.foto);
    }
  }, [mode, isOpen])

  // === FORM PRODUK ===
  const renderProductForm = () => (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextField
        label="Nama Produk"
        placeholder="Masukkan nama produk"
        value={namaProduct}
        onChange={(e) => setNamaProduk(e.target.value)}
      />
      <TextField
        label="Harga"
        placeholder="Masukkan harga produk"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-[15px] p-3 focus:border-blue-500 focus:ring-blue-500 outline-none transition"
          rows="3"
          placeholder="Masukkan deskripsi produk"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gambar Produk
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-[15px] cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-[10px] file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-40 object-cover rounded-[15px] mt-2 border"
          />
        )}
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <Button
          text="Batal"
          variant="outline"
          type="button"
          onClick={onClose}
        />
        <Button
          text={mode === "add" ? "Tambah Produk" : "Simpan Perubahan"}
          variant="filled"
          type="submit"
        />
      </div>
    </form>
  );

  // === FORM UMKM ===
  const renderUmkmForm = () => (
    <form className="flex flex-col gap-6" onSubmit={handleUmkmEdit}>
      {/* Gambar di paling atas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gambar Usaha
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-[15px] cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-[10px] file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-70 h-60 object-cover rounded-[20px] mt-3 border"
          />
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Nama UMKM" placeholder="Masukkan nama usaha" value={namaUsaha} onChange={(e) => setNamaUsaha(e.target.value)} />

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`w-full border rounded-[15px] p-3 flex justify-between items-center text-gray-700 transition ${
              isDropdownOpen
                ? "border-blue-500 ring-1 ring-blue-300"
                : "border-gray-300"
            }`}
          >
            <span>{category || "Pilih kategori usaha"}</span>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaChevronDown className="text-gray-500" size={14} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[15px] shadow-lg overflow-hidden z-10"
              >
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-blue-50 ${
                      category === cat ? "bg-blue-100 font-medium" : ""
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <TextField label="Owner" placeholder="Masukkan nama pemilik" value={pemilik} onChange={(e) => setPemilik(e.target.value)}/>
        <TextField label="Lokasi" placeholder="Masukkan lokasi usaha" value={alamat} onChange={(e) => setLokasi(e.target.value)}/>
        <TextField label="Nomor Telepon" placeholder="Masukkan nomor telepon" value={nomorHp} onChange={(e) => setNomorHp(e.target.value)} />
        <TextField label="Email" placeholder="Masukkan email usaha" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* Tombol */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <Button
          text="Batal"
          variant="outline"
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto"
        />
        <Button
          text="Simpan Perubahan"
          variant="filled"
          type="submit"
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            if (isDropdownOpen) setIsDropdownOpen(false);
            else onClose();
          }}
        >
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-[30px] shadow-lg w-full max-w-lg sm:max-w-2xl p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              {mode === "umkm"
                ? "Edit Info Usaha"
                : mode === "add"
                ? "Tambah Produk Baru"
                : "Edit Produk"}
              <hr className="border-t border-[#C1D0E1] my-3 mt-4" />
            </h2>

            {mode === "umkm" ? renderUmkmForm() : renderProductForm()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
