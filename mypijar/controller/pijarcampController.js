// Membuat variabel Pijarcamp dan mengimport/required dari model Pijarcamp
const Pijarcamp = require("../models/Pijarcamp");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter export
module.exports = {
  // Membuat view untuk pijarcamp
  viewPijarcamp: async (req, res) => {
    try {
      // Membuat variabel pijarcamp, dan menunda eksekusi hingga proses async selesai lalu mengambil model Pijarcamp
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Pijarcamp
      const pijarcamp = await Pijarcamp.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel pijarcamp diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("index", {
        pijarcamp,
        alert,
        title: "CRUD", // Untuk title dari aplikasi kita, saya maprodukkannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route pijarcamp(routenya akan kita buat setelah selesai dengan pijarcampController)
      res.redirect("/pijarcamp");
    }
  },

  // Membuat create data untuk pijarcamp
  addPijarcamp: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk produk, keterangan, harga, dan jumlah yang diambil dari body/yang diketikan di form
      const { produk, keterangan, harga, jumlah } = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Pijarcamp
      await Pijarcamp.create({ produk, keterangan, harga, jumlah });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add data Pijarcamp");
      req.flash("alertStatus", "success");
      res.redirect("/pijarcamp"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/pijarcamp");
    }
  },

  // Membuat update data untuk pijarcamp
  editPijarcamp: async (req, res) => {
    try {
      // Membuat variabel yang menerima id, dan produk yang didapat dari req body atau yang di inputkan di form input
      const { id, produk, keterangan, harga, jumlah } = req.body;
      /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
   _id didapat database dan id isinya dari inputan user */
      const pijarcamp = await Pijarcamp.findOne({ _id: id });
      /* pijarcamp diambil dari fungsi diatas dan titik(.) produk diambil dari database = produk yang didapat dari req body
   yang tentu dikirimkan dari inputan user */
      pijarcamp.produk = produk;
      pijarcamp.keterangan = keterangan;
      pijarcamp.harga = harga;
      pijarcamp.jumlah = jumlah;
      // Menyimpan datanya ke database
      await pijarcamp.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit data pijarcamp");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/pijarcamp)
      res.redirect("/pijarcamp");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/pijarcamp)
      res.redirect("/pijarcamp");
    }
  },

  // Membuat delete data untuk pijarcamp
  deletePijarcamp: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Pijarcamp yang mau di delete berdasarkan id
      const pijarcamp = await Pijarcamp.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await pijarcamp.remove();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data pijarcamp");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/pijarcamp");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/pijarcamp");
    }
  },
};