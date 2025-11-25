// src/components/Table/tablereport.jsx
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  FaTrash,
  FaCalendar,
  FaRuler,
  FaWeight,
  FaMapMarkerAlt,
  FaStickyNote,
  FaEdit, // Tambahkan icon edit
} from "react-icons/fa";
import {
  getPengukuranList,
  deletePengukuran,
  updatePengukuran,
} from "../../services/pengukuranService"; // Tambahkan import
import EditPengukuranModal from "../pages/modal/editreport";
import {
  showDeleteConfirm,
  showDeleteSuccess,
  showUpdateSuccess,
  showCrudError,
} from "../../utils/sweetAlertCrud";

const CustomTable = ({
  title,
  data,
  setData, // Terima setData dari Tablereport
  searchQuery,
  statusFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPengukuran, setEditPengukuran] = useState(null);

  // Filter data berdasarkan search dan status_gizi
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.nama_balita.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.posyandu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.catatan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || item.status_gizi === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Fungsi hapus via API
  const handleDelete = async (id_gizi) => {
    const result = await showDeleteConfirm("data pengukuran ini");
    if (!result.isConfirmed) return;

    try {
      await deletePengukuran(id_gizi);
      setData((prevData) =>
        prevData.filter((item) => item.id_gizi !== id_gizi)
      );
      showDeleteSuccess("data pengukuran");
    } catch (error) {
      console.error("Gagal menghapus data pengukuran:", error);
      showCrudError("menghapus data pengukuran", error.message);
    }
  };

  // Fungsi untuk membuka modal edit
  const handleEdit = (row) => {
    setEditPengukuran(row);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    if (!editPengukuran) return;

    try {
      await updatePengukuran(editPengukuran.id_gizi, updatedData);
      setData((prevData) =>
        prevData.map((item) =>
          item.id_gizi === editPengukuran.id_gizi
            ? { ...item, ...updatedData, Balitum: editPengukuran.Balitum }
            : item
        )
      );
      showUpdateSuccess("data pengukuran");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal memperbarui data pengukuran:", error);
      showCrudError("memperbarui data pengukuran", error.message);
    }
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
        minHeight: "72px",
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
    headCells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
  };

  // Status Gizi dengan warna
  const getStatusBadge = (status) => {
    const statusConfig = {
      normal: {
        label: "Normal",
        bg: "bg-green-100",
        text: "text-green-700",
        icon: "✓",
      },
      stunted: {
        label: "Stunted",
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: "⚠",
      },
      "severely-stunted": {
        label: "Severely Stunted",
        bg: "bg-red-100",
        text: "text-red-700",
        icon: "✕",
      },
      tinggi: {
        label: "Tinggi",
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: "↑",
      },
    };

    const key = status.toLowerCase();
    const config = statusConfig[key] || statusConfig.normal;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
      >
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_gizi,
      sortable: true,
      width: "70px",
      cell: (row) => (
        <div className="font-semibold text-gray-700">#{row.id_gizi}</div>
      ),
    },
    {
      name: "Nama Balita",
      selector: (row) => row.Balitum?.nama_balita,
      sortable: true,
      grow: 1.5,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="font-semibold text-gray-900">
            {row.Balitum?.nama_balita || "–"}
          </div>
        </div>
      ),
    },
    {
      name: "Tanggal Ukur",
      selector: (row) => row.tanggal_ukur,
      sortable: true,
      width: "130px",
      cell: (row) => (
        <div className="flex items-center gap-2 text-gray-600">
          <FaCalendar className="text-blue-400 w-3.5 h-3.5" />
          <span className="text-sm">
            {new Date(row.tanggal_ukur).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      ),
    },
    {
      name: "Tinggi Badan",
      selector: (row) => row.tinggi_badan,
      sortable: true,
      width: "120px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <FaRuler className="text-orange-400 w-3.5 h-3.5" />
          <span className="font-semibold text-gray-800">
            {row.tinggi_badan} cm
          </span>
        </div>
      ),
    },
    {
      name: "Berat Badan",
      selector: (row) => row.berat_badan,
      sortable: true,
      width: "120px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <FaWeight className="text-green-400 w-3.5 h-3.5" />
          <span className="font-semibold text-gray-800">
            {row.berat_badan} kg
          </span>
        </div>
      ),
    },
    {
      name: "Status Gizi",
      selector: (row) => row.status_gizi,
      sortable: true,
      width: "170px",
      cell: (row) => getStatusBadge(row.status_gizi),
    },
    {
      name: "Catatan",
      selector: (row) => row.catatan,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <div className="flex items-start gap-2">
          <FaStickyNote className="text-purple-400 w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <div className="text-gray-700 line-clamp-2" title={row.catatan}>
            {row.catatan || "-"}
          </div>
        </div>
      ),
    },
    {
      name: "Posyandu",
      selector: (row) => row.nama_posyandu,
      sortable: true,
      width: "150px",
      cell: (row) => (
        <div className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-red-400 w-3.5 h-3.5" />
          <span className="text-sm">{row.nama_posyandu || "–"}</span>
        </div>
      ),
    },
    {
      name: "Aksi",
      width: "150px",
      center: true,
      cell: (row) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            title="Edit Data"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id_gizi)}
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
        noDataComponent={
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <p className="text-gray-500 font-medium">Tidak ada data balita</p>
          </div>
        }
      />
      <EditPengukuranModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pengukuran={editPengukuran}
        onSave={handleUpdate}
        onChange={() => {}} // Tidak digunakan
      />
    </div>
  );
};

const Tablereport = ({ searchQuery, statusFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPengukuranList();
        const transformedData = response.map((item) => ({
          id_gizi: item.id_gizi,
          nama_balita: item.Balitum?.nama_balita,
          jenis_kelamin: item.Balitum?.jenis_kelamin,
          tanggal_ukur: item.tanggal_ukur,
          tinggi_badan: item.tinggi_badan,
          berat_badan: item.berat_badan,
          status_gizi: item.status_gizi,
          catatan: item.catatan,
          nama_posyandu: item.nama_posyandu,
          Balitum: item.Balitum,
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Gagal mengambil data pengukuran:", error);
        showCrudError("memuat data pengukuran", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Memuat data balita...</p>
          </div>
        </div>
      ) : (
        <CustomTable
          title="Tabel Gizi Balita"
          data={data}
          setData={setData} // Kirim setData ke CustomTable
          searchQuery={searchQuery}
          statusFilter={statusFilter}
        />
      )}
    </div>
  );
};

export default Tablereport;
