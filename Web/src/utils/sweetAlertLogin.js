import Swal from "sweetalert2";

export const showLoginSuccess = () => {
  return Swal.fire({
    icon: "success",
    title: "Login Berhasil! 👍",
    text: "Selamat datang di dashboard admin.",
    confirmButtonText: "Lanjutkan",
    confirmButtonColor: "#6f42c1", // warna ungu
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showLoginError = (message) => {
  return Swal.fire({
    icon: "error",
    title: "Login Gagal!",
    text: message || "Username atau password salah.",
    confirmButtonText: "Coba Lagi",
    confirmButtonColor: "#dc3545", // warna merah
  });
};
