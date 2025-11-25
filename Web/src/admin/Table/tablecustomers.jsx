// src/components/Table/tablecustomers.jsx
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  FaEdit,
  FaTrash,
  FaPhone,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import ModalEditCustomer from "../pages/modal/editcustomer"; // Sesuaikan path
import {
  getAllOrangtua,
  updateOrangtua,
  deleteOrangtua,
} from "../../services/customerService";
import {
  showDeleteConfirm,
  showDeleteSuccess,
  showUpdateSuccess,
  showCrudError,
} from "../../utils/sweetAlertCrud";

const Tablecustomers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import("../../services/customerService").then(
          (service) => service.getAllOrangtua()
        );
        // Mapping ke format yang diharapkan
        const mappedData = response.map((item) => ({
          id_customer: item.id_orangtua,
          id_user: item.id_user,
          nama: item.nama_orangtua,
          username: item.User?.username || "-",
          no_hp: item.no_hp,
          alamat: item.alamat,
          pendapatan: item.pendapatan,
          wilayah: item.wilayah,
        }));
        setData(mappedData);
      } catch (err) {
        console.error("Gagal mengambil data orang tua:", error);
        showCrudError("memuat data orang tua", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (customer) => {
    setSelectedCustomer({ ...customer });
    setModalIsOpen(true);
  };

  const handleDelete = async (id_customer) => {
    const result = await showDeleteConfirm("orang tua ini");
    if (!result.isConfirmed) return; // Jika dibatalkan

    try {
      await deleteOrangtua(id_customer);
      setData((prev) =>
        prev.filter((item) => item.id_customer !== id_customer)
      );
      showDeleteSuccess("orang tua"); // ✅ Notifikasi sukses
    } catch (err) {
      console.error("Gagal menghapus data:", err);
      showCrudError("menghapus", err.message); // ❌ Notifikasi error
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedCustomer(null);
  };

  const handleSave = async () => {
    if (!selectedCustomer) return;

    try {
      const payload = {
        nama_orangtua: selectedCustomer.nama,
        no_hp: selectedCustomer.no_hp,
        alamat: selectedCustomer.alamat,
        pendapatan: selectedCustomer.pendapatan,
        wilayah: selectedCustomer.wilayah,
      };

      await updateOrangtua(selectedCustomer.id_customer, payload);

      // Refresh data
      const response = await getAllOrangtua();
      const mappedData = response.map((item) => ({
        id_customer: item.id_orangtua,
        id_user: item.id_user,
        nama: item.nama_orangtua,
        username: item.User?.username || "-",
        no_hp: item.no_hp,
        alamat: item.alamat,
        pendapatan: item.pendapatan,
        wilayah: item.wilayah,
      }));
      setData(mappedData);

      showUpdateSuccess("orang tua"); // ✅ Notifikasi sukses
      handleModalClose();
    } catch (err) {
      console.error("Gagal update data:", err);
      showCrudError("memperbarui", err.message); // ❌ Notifikasi error
    }
  };

  const handleFieldChange = (field, value) => {
    setSelectedCustomer((prev) => ({ ...prev, [field]: value }));
  };

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

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_customer,
      sortable: true,
      width: "80px",
      cell: (row) => (
        <div className="font-semibold text-gray-700">#{row.id_customer}</div>
      ),
    },
    {
      name: "Nama Orang Tua",
      selector: (row) => row.nama,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
            {row.nama.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.nama}</div>
            <div className="text-xs text-gray-500">Orang Tua</div>
          </div>
        </div>
      ),
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      grow: 1.5,
      cell: (row) => (
        <div className="flex items-center gap-2 text-gray-600">
          <FaUser className="text-gray-400 w-3.5 h-3.5" />
          <span>{row.username}</span>
        </div>
      ),
    },
    {
      name: "No HP",
      selector: (row) => row.no_hp,
      sortable: true,
      width: "140px",
      cell: (row) => (
        <div className="flex items-center gap-2 text-gray-700">
          <FaPhone className="text-gray-400 w-3.5 h-3.5" />
          <span>{row.no_hp}</span>
        </div>
      ),
    },
    {
      name: "Alamat",
      selector: (row) => row.alamat,
      sortable: true,
      grow: 3,
      cell: (row) => (
        <div className="flex items-start gap-2">
          <FaMapMarkerAlt className="text-blue-400 w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <div className="text-gray-700 line-clamp-2" title={row.alamat}>
            {row.alamat}
          </div>
        </div>
      ),
    },
    {
      name: "Pendapatan (Rp)",
      selector: (row) => row.pendapatan,
      sortable: true,
      width: "140px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-green-500 w-4 h-4" />
          <span className="font-medium text-gray-800">
            {row.pendapatan?.toLocaleString("id-ID")}
          </span>
        </div>
      ),
    },
    {
      name: "Wilayah",
      selector: (row) => row.wilayah,
      sortable: true,
      width: "160px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-purple-500 w-4 h-4" />
          <span className="font-medium text-gray-800">{row.wilayah}</span>
        </div>
      ),
    },
    {
      name: "Aksi",
      width: "140px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            title="Edit Data"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id_customer)}
            className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            title="Hapus Data"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">❌ {error}</div>;
  }

  return (
    <div className="h-full">
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20, 25]}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        responsive
        noDataComponent={
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <p className="text-gray-500 font-medium">
              Tidak ada data orang tua
            </p>
          </div>
        }
      />

      <ModalEditCustomer
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        customer={selectedCustomer}
        onSave={handleSave}
        onChange={handleFieldChange}
      />

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Tablecustomers;
