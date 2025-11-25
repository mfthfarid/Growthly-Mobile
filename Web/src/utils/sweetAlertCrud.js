import Swal from "sweetalert2";

// 💡 Konfigurasi umum
const baseConfig = {
  confirmButtonColor: "#6f42c1", // ungu sesuai tema Growthly
  cancelButtonColor: "#dc3545", // merah untuk batal/hapus
  focusConfirm: false,
};

// ✅ Notifikasi Berhasil Tambah
export const showCreateSuccess = (itemName = "data") => {
  return Swal.fire({
    icon: "success",
    title: "Berhasil Ditambahkan! 🎉",
    text: `${
      itemName.charAt(0).toUpperCase() + itemName.slice(1)
    } berhasil disimpan.`,
    confirmButtonText: "Oke",
    ...baseConfig,
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// ✅ Notifikasi Berhasil Edit
export const showUpdateSuccess = (itemName = "data") => {
  return Swal.fire({
    icon: "success",
    title: "Berhasil Diubah! ✏️",
    text: `${
      itemName.charAt(0).toUpperCase() + itemName.slice(1)
    } berhasil diperbarui.`,
    confirmButtonText: "Oke",
    ...baseConfig,
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// ✅ Konfirmasi Hapus (dengan tombol Batal & Hapus)
export const showDeleteConfirm = (itemName = "data") => {
  return Swal.fire({
    title: "Yakin ingin menghapus?",
    text: `Data "${itemName}" akan dihapus secara permanen!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
    reverseButtons: true,
    ...baseConfig,
  });
};

// ✅ Notifikasi Berhasil Hapus
export const showDeleteSuccess = (itemName = "data") => {
  return Swal.fire({
    icon: "success",
    title: "Berhasil Dihapus! 🗑️",
    text: `${
      itemName.charAt(0).toUpperCase() + itemName.slice(1)
    } telah dihapus.`,
    confirmButtonText: "Oke",
    ...baseConfig,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// ❌ Notifikasi Gagal (untuk error saat tambah/edit/hapus)
export const showCrudError = (action = "operasi", error = "") => {
  return Swal.fire({
    icon: "error",
    title: `Gagal ${action}!`,
    text: error || `Terjadi kesalahan saat ${action.toLowerCase()} data.`,
    confirmButtonText: "Mengerti",
    confirmButtonColor: "#dc3545",
  });
};
