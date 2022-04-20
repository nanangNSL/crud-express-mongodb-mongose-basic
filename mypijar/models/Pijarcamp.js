const mongoose = require("mongoose");

// Membuat variabel baru dengan produk pijarcampScheme
const pijarcampScheme = new mongoose.Schema({
  produk: {
    // Membuat type dari field produk yang berada di tabel pijarcamp bersifat string
    type: String,
    // maksud dari required adalah ketika data disimpan kedalam database, data tidak boleh kosong
    required: true,
  },
  keterangan: {
    // Membuat type dari field produk yang berada di tabel pijarcamp bersifat number
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
  },
});

// lalu mengekspor model dari pijarcamp, tujuan mengekspor ini supaya model dari pijarcamp ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Pijarcamp", pijarcampScheme);