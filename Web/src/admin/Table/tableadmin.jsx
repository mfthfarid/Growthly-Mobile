// src/components/Table/tableadmin.jsx
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaBirthdayCake, FaVenusMars } from "react-icons/fa";
import ModalEditBalita from "../pages/modal/editadmin";
import {
  getBalitaList,
  updateBalita,
  deleteBalita,
} from "../../services/adminService";
import {
  showDeleteConfirm,
  showDeleteSuccess,
  showUpdateSuccess,
  showCrudError,
} from "../../utils/sweetAlertCrud";

const Tableadmin = ({ searchQuery, roleFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBalita, setEditBalita] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balitaList = await getBalitaList();

        if (!Array.isArray(balitaList)) {
          throw new Error("Respons API bukan array");
        }

        const transformedData = balitaList.map((item) => ({
          id_user: item.id_balita,
          nama_balita: item.nama_balita,
          nama_orangtua: item.Orangtua?.nama_orangtua || "–",
          tanggal_lahir: item.tgl_lahir,
          jenis_kelamin: item.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
          // ✅ Perbaikan: pastikan PengukuranGizis ada & punya elemen pertama
          status_gizi:
            item.PengukuranGizis?.[0]?.status_gizi?.toLowerCase() || "–",
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Gagal mengambil data balita:", error);
        showCrudError("memuat data balita", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.nama_balita.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama_orangtua.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !roleFilter || item.status_gizi === roleFilter;
    return matchesSearch && matchesFilter;
  });

  const handleModalClose = () => setIsModalOpen(false);

  const handleFieldChange = (field, value) => {
    setEditBalita((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    try {
      if (
        !editBalita.nama_balita ||
        !editBalita.tanggal_lahir ||
        !editBalita.jenis_kelamin
      ) {
        throw new Error("Field wajib tidak boleh kosong");
      }

      const updatedData = {
        nama_balita: editBalita.nama_balita,
        tgl_lahir: editBalita.tanggal_lahir,
        jenis_kelamin: editBalita.jenis_kelamin === "Laki-laki" ? "L" : "P",
      };

      await updateBalita(editBalita.id_user, updatedData);

      // Refresh data
      const freshData = await getBalitaList();
      if (!Array.isArray(freshData)) throw new Error("Respons tidak valid");

      const transformed = freshData.map((item) => ({
        id_user: item.id_balita,
        nama_balita: item.nama_balita,
        nama_orangtua: item.Orangtua?.nama_orangtua || "–",
        tanggal_lahir: item.tgl_lahir,
        jenis_kelamin: item.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
        status_gizi:
          item.PengukuranGizis?.[0]?.status_gizi?.toLowerCase() || "–",
      }));
      setData(transformed);
      setIsModalOpen(false);
      showUpdateSuccess("balita"); // ✅ Notifikasi sukses
    } catch (error) {
      console.error("Error update balita:", error);
      showCrudError("memperbarui data balita", error.message);
    }
  };

  const handleEdit = (id) => {
    const balitaToEdit = data.find((item) => item.id_user === id);
    setEditBalita(balitaToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await showDeleteConfirm("balita ini");
    if (!result.isConfirmed) return;

    try {
      await deleteBalita(id);

      // Refresh data
      const freshData = await getBalitaList();
      if (!Array.isArray(freshData)) throw new Error("Respons tidak valid");

      const transformed = freshData.map((item) => ({
        id_user: item.id_balita,
        nama_balita: item.nama_balita,
        nama_orangtua: item.Orangtua?.nama_orangtua || "–",
        tanggal_lahir: item.tgl_lahir,
        jenis_kelamin: item.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
        status_gizi:
          item.PengukuranGizis?.[0]?.status_gizi?.toLowerCase() || "–",
      }));
      setData(transformed);
      showDeleteSuccess("balita"); // ✅ Notifikasi sukses
    } catch (error) {
      console.error("Error delete balita:", error);
      showCrudError("menghapus data balita", error.message);
    }
  };

  // === Styling & Kolom (tidak berubah) ===
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#F9FAFB",
        borderBottom: "2px solid #E5E7EB",
        fontSize: "13px",
        fontWeight: "700",
        color: "#374151",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    },
    rows: {
      style: {
        minHeight: "64px",
        fontSize: "14px",
        color: "#1F2937",
        "&:hover": {
          backgroundColor: "#F3F4F6",
          cursor: "pointer",
          transition: "all 0.2s ease",
        },
        borderBottom: "1px solid #F3F4F6",
      },
    },
    headCells: { style: { paddingLeft: "16px", paddingRight: "16px" } },
    cells: { style: { paddingLeft: "16px", paddingRight: "16px" } },
  };

  const statusMap = {
    stunted: { label: "Stunted", color: "bg-yellow-100 text-yellow-700" },
    "severely stunted": {
      label: "Severely Stunted",
      color: "bg-red-100 text-red-700",
    },
    tinggi: { label: "Tinggi", color: "bg-blue-100 text-blue-700" },
    normal: { label: "Normal", color: "bg-green-100 text-green-700" },
    "–": { label: "–", color: "bg-gray-100 text-gray-700" },
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_user,
      sortable: true,
      width: "80px",
      cell: (row) => (
        <div className="font-semibold text-gray-700">#{row.id_user}</div>
      ),
    },
    {
      name: "Nama Balita",
      selector: (row) => row.nama_balita,
      sortable: true,
      grow: 1.5,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            {row.nama_balita.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.nama_balita}</div>
            <div className="text-xs text-gray-500">Balita</div>
          </div>
        </div>
      ),
    },
    {
      name: "Nama Orang Tua",
      selector: (row) => row.nama_orangtua,
      sortable: true,
      grow: 1.5,
      cell: (row) => <div className="text-gray-700">{row.nama_orangtua}</div>,
    },
    {
      name: "Tanggal Lahir",
      selector: (row) => row.tanggal_lahir,
      sortable: true,
      width: "130px",
      cell: (row) => (
        <div className="flex items-center gap-2 text-gray-700">
          <FaBirthdayCake className="text-gray-400 w-3.5 h-3.5" />
          <span>
            {new Date(row.tanggal_lahir).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      ),
    },
    {
      name: "Jenis Kelamin",
      selector: (row) => row.jenis_kelamin,
      sortable: true,
      width: "120px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <FaVenusMars
            className={`w-4 h-4 ${
              row.jenis_kelamin === "Laki-laki"
                ? "text-blue-500"
                : "text-pink-500"
            }`}
          />
          <span>{row.jenis_kelamin}</span>
        </div>
      ),
    },
    {
      name: "Status Gizi",
      selector: (row) => row.status_gizi,
      sortable: true,
      width: "140px",
      cell: (row) => {
        const statusInfo = statusMap[row.status_gizi] || statusMap["–"];
        return (
          <span
            className={`inline-flex items-center justify-center px-3 py-1.5 ${statusInfo.color} rounded-full text-xs font-semibold`}
          >
            {statusInfo.label}
          </span>
        );
      },
    },
    {
      name: "Aksi",
      width: "140px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row.id_user)}
            className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            title="Edit Data"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id_user)}
            className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            title="Hapus Data"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full">
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20, 25]}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        responsive
        progressPending={loading}
        progressComponent={
          <div className="py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
            <p className="mt-3 text-gray-600">Memuat data balita...</p>
          </div>
        }
        noDataComponent={
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <p className="text-gray-500 font-medium">Tidak ada data balita</p>
          </div>
        }
      />

      <ModalEditBalita
        isOpen={isModalOpen}
        onClose={handleModalClose}
        balita={editBalita}
        onSave={handleFormSubmit}
        onChange={handleFieldChange}
      />
    </div>
  );
};

export default Tableadmin;
