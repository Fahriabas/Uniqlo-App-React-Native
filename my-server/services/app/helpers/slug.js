function createSlug(title) {
  return title
    .toLowerCase() // Ubah menjadi huruf kecil
    .replace(/\s+/g, "-") // Ganti spasi dengan tanda hubung (-)
    .replace(/[^\w-]+/g, "") // Hapus karakter non-alfanumerik dan non-tanda hubung
    .replace(/--+/g, "-") // Hapus tanda hubung berulang
    .replace(/^-+|-+$/g, ""); // Hapus tanda hubung di awal dan akhir
}


module.exports = createSlug