// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import TextField from "../component/component-textfield.jsx";
import Button from "../component/component-button.jsx";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const categories = [
  "Kuliner",
  "Jasa & Layanan",
  "Fashion",
  "Kreatif & Digital",
  "Retail",
];

export default function PageRegisterUmkm() {
  const [previewImage, setPreviewImage] = useState(null);
  const [kategori, setKategori] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const [namaUsaha, setNamaUsaha] = useState("");
  const [email, setEmail] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const daftarHandler = (e) => {
    e.preventDefault();
    if (
      username == "" ||
      password == "" ||
      namaUsaha == "" ||
      email == "" ||
      nomorHp == "" ||
      alamat == "" ||
      pemilik == ""
    ) {
      toast.warn("Input Tidak Boleh Ada Yang Kosong");
      return;
    }
    sessionStorage.setItem(
      "umkm",
      JSON.stringify({
        namaUsaha,
        pemilik,
        kategori,
        email,
        nomorHp,
        alamat,
        username,
        password,
        foto: previewImage,
      })
    );
    navigate("/profile-umkm");
  };
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="bg-white rounded-[35px] border border-gray-200 shadow-sm p-6 sm:p-8">
          <form className="flex flex-col gap-8 w-full" onSubmit={daftarHandler}>
            <h2 className="text-lg font-semibold text-gray-800 mb-[-20px]">
              Buat Akun
            </h2>
            <hr className="border-t border-[#C1D0E1]" />

            <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 hover:shadow-md hover:border-[#2563EB] transition-all duration-300">
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
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Daftarkan Usaha
            </h2>
            <hr className="border-t border-[#C1D0E1] my-3 mt-[-20px] mb-[-1px]" />

            <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 hover:shadow-md hover:border-[#2563EB] transition-all duration-300">
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

              <TextField
                label="Nama Usaha"
                placeholder="Masukkan Nama Usaha Anda"
                name="namaUsaha"
                onChange={(e) => setNamaUsaha(e.target.value)}
              />

              <TextField
                label="Nama Pemilik"
                placeholder="Masukkan Nama Pemilik Usaha"
                name="namaPemilik"
                onChange={(e) => setPemilik(e.target.value)}
              />

              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Kategori Bisnis
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={`w-full border rounded-[15px] p-3 flex justify-between items-center text-gray-700 transition 
                    ${
                      dropdownOpen
                        ? "border-blue-500 ring-1 ring-blue-300"
                        : "border-gray-300"
                    }`}
                >
                  <span>{kategori || "Pilih kategori usaha"}</span>
                  <FaChevronDown
                    className={`text-gray-500 transform transition-transform ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    size={14}
                  />
                </button>

                {dropdownOpen && (
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
                          setKategori(cat);
                          setDropdownOpen(false);
                        }}
                        className={`px-4 py-2 cursor-pointer text-sm hover:bg-blue-50 ${
                          kategori === cat ? "bg-blue-100 font-medium" : ""
                        }`}
                      >
                        {cat}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
              <TextField
                label="Deskripsi Singkat"
                placeholder="Masukkan Deskripsi"
                name="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label="Email"
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Nomor Telephone"
                  placeholder="+62-xxx-xxx"
                  name="phone"
                  onChange={(e) => setNomorHp(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Alamat
                </label>
                <textarea
                  name="alamat"
                  placeholder="Masukkan Alamat Usaha Anda"
                  className="w-full border border-gray-300 rounded-[15px] p-3 
  text-sm transition duration-200
  focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 outline-none"
                  rows="3"
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-4 w-full mt-4 sm:mt-8">
              <Button
                type={"submit"}
                text="Daftar"
                variant="filled"
                className="w-full sm:w-1/2 !rounded-full !py-3 !text-base"
              />
              <Button
                onClick={() => navigate("/")}
                type={"button"}
                text="Cancel"
                variant="outline"
                className="w-full sm:w-1/2 !rounded-full !py-3 !text-base"
              />
            </div>
          </form>
        </section>
      </div>
    </motion.div>
  );
}
