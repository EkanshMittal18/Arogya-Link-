import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import DashboardSwitcher from "../common/DashboardSwitcher";

import {
  LayoutDashboard,
  Pill,
  Package,
  ShoppingCart,
  FileText,
  AlertTriangle,
  Receipt,
  Bell,
  User,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  HeartPulse,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Phone,
  CalendarDays,
  X,
  Save,
  RefreshCw,
} from "lucide-react";

import "./PharmacyDashboard.css";

function PharmacyDashboard() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [success, setSuccess] = useState("");

  // Demo Inventory Data
  const [medicines, setMedicines] = useState([
    {
      id: "MED-101",
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      manufacturer: "Cipla",
      price: 25,
      stock: 120,
      minStock: 30,
      expiry: "2027-08-15",
      status: "In Stock",
    },
    {
      id: "MED-102",
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      manufacturer: "Sun Pharma",
      price: 65,
      stock: 18,
      minStock: 30,
      expiry: "2027-05-20",
      status: "Low Stock",
    },
    {
      id: "MED-103",
      name: "Cetirizine 10mg",
      category: "Allergy",
      manufacturer: "Dr. Reddy's",
      price: 18,
      stock: 85,
      minStock: 25,
      expiry: "2027-11-10",
      status: "In Stock",
    },
    {
      id: "MED-104",
      name: "ORS Sachets",
      category: "Hydration",
      manufacturer: "FDC",
      price: 20,
      stock: 12,
      minStock: 25,
      expiry: "2027-03-18",
      status: "Low Stock",
    },
    {
      id: "MED-105",
      name: "Vitamin C 500mg",
      category: "Supplement",
      manufacturer: "Cipla",
      price: 45,
      stock: 0,
      minStock: 20,
      expiry: "2027-09-25",
      status: "Out of Stock",
    },
    {
      id: "MED-106",
      name: "Antacid Tablets",
      category: "Digestive",
      manufacturer: "Abbott",
      price: 35,
      stock: 65,
      minStock: 20,
      expiry: "2027-12-10",
      status: "In Stock",
    },
  ]);

  // Demo Orders
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      patient: "Rahul Sharma",
      patientId: "AL-1024",
      medicine: "Paracetamol 500mg",
      quantity: 2,
      amount: 50,
      date: "12 Nov 2026",
      status: "Pending",
      phone: "9876543210",
    },
    {
      id: "ORD-1002",
      patient: "Sunita Devi",
      patientId: "AL-1025",
      medicine: "ORS Sachets",
      quantity: 5,
      amount: 100,
      date: "12 Nov 2026",
      status: "Processing",
      phone: "9876543211",
    },
    {
      id: "ORD-1003",
      patient: "Mohan Singh",
      patientId: "AL-1026",
      medicine: "Cetirizine 10mg",
      quantity: 1,
      amount: 18,
      date: "11 Nov 2026",
      status: "Completed",
      phone: "9876543212",
    },
    {
      id: "ORD-1004",
      patient: "Priya Kumari",
      patientId: "AL-1027",
      medicine: "Vitamin C 500mg",
      quantity: 2,
      amount: 90,
      date: "11 Nov 2026",
      status: "Pending",
      phone: "9876543213",
    },
  ]);

  // Demo Prescription Requests
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "PRE-201",
      patient: "Rahul Sharma",
      doctor: "Dr. Amit Sharma",
      medicine: "Paracetamol 500mg",
      date: "12 Nov 2026",
      status: "Pending",
    },
    {
      id: "PRE-202",
      patient: "Sunita Devi",
      doctor: "Dr. Neha Verma",
      medicine: "ORS Sachets",
      date: "12 Nov 2026",
      status: "Verified",
    },
    {
      id: "PRE-203",
      patient: "Mohan Singh",
      doctor: "Dr. Amit Sharma",
      medicine: "Cetirizine 10mg",
      date: "11 Nov 2026",
      status: "Completed",
    },
  ]);

  const [notifications] = useState([
    {
      id: 1,
      title: "New Medicine Request",
      message: "A new medicine request has been received from Rahul Sharma.",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "Amoxicillin 250mg stock is running low.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Prescription Received",
      message: "A new prescription has been submitted for verification.",
      time: "3 hours ago",
      unread: false,
    },
  ]);

  const [medicineForm, setMedicineForm] = useState({
    name: "",
    category: "General Medicine",
    manufacturer: "",
    price: "",
    stock: "",
    minStock: "20",
    expiry: "",
  });

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard },
    { title: "Medicine Inventory", icon: Pill },
    { title: "Orders & Requests", icon: ShoppingCart },
    { title: "Prescriptions", icon: FileText },
    { title: "Stock Alerts", icon: AlertTriangle },
    { title: "Transactions", icon: Receipt },
    { title: "Notifications", icon: Bell },
    { title: "My Profile", icon: User },
    { title: "Help & Support", icon: HelpCircle },
  ];

  const lowStockMedicines = medicines.filter(
    (medicine) =>
      medicine.stock > 0 && medicine.stock <= medicine.minStock
  );

  const outOfStockMedicines = medicines.filter(
    (medicine) => medicine.stock === 0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  );

  const pendingPrescriptions = prescriptions.filter(
    (prescription) => prescription.status === "Pending"
  );

  const totalRevenue = orders
    .filter((order) => order.status === "Completed")
    .reduce((total, order) => total + order.amount, 0);

  const stats = [
    {
      title: "Total Medicines",
      value: medicines.length,
      description: "Listed in inventory",
      change: "Inventory items",
      icon: Pill,
      color: "blue",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.length,
      description: "Require your attention",
      change: "New requests",
      icon: ShoppingCart,
      color: "orange",
    },
    {
      title: "Low Stock Items",
      value: lowStockMedicines.length,
      description: "Need restocking",
      change: "Stock warning",
      icon: AlertTriangle,
      color: "purple",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue}`,
      description: "Completed orders",
      change: "Sales overview",
      icon: TrendingUp,
      color: "green",
    },
  ];

  const handleMenuClick = (title) => {
    setActiveMenu(title);
    setSidebarOpen(false);
    setSearchTerm("");
    setActiveFilter("All");
  };

  const showMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Unable to logout. Please try again.");
    }
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );

    setSelectedOrder(null);
    showMessage(`Order status updated to ${status}.`);
  };

  const updatePrescriptionStatus = (id, status) => {
    setPrescriptions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    showMessage(`Prescription marked as ${status}.`);
  };

  const handleMedicineSubmit = (e) => {
    e.preventDefault();

    if (
      !medicineForm.name.trim() ||
      !medicineForm.price ||
      !medicineForm.stock
    ) {
      showMessage("Please fill all required fields.");
      return;
    }

    const stock = Number(medicineForm.stock);
    const minStock = Number(medicineForm.minStock);

    const newMedicine = {
      id: `MED-${Date.now()}`,
      ...medicineForm,
      price: Number(medicineForm.price),
      stock,
      minStock,
      status:
        stock === 0
          ? "Out of Stock"
          : stock <= minStock
          ? "Low Stock"
          : "In Stock",
    };

    setMedicines((prev) => [newMedicine, ...prev]);

    setMedicineForm({
      name: "",
      category: "General Medicine",
      manufacturer: "",
      price: "",
      stock: "",
      minStock: "20",
      expiry: "",
    });

    setShowMedicineModal(false);
    showMessage("Medicine added successfully.");
  };

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const matchesSearch =
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        medicine.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [medicines, searchTerm, activeFilter]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.medicine.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || order.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  // Dashboard Overview
  const renderDashboard = () => (
    <>
      <section className="ph-welcome-section">
        <div>
          <p className="ph-welcome-label">PHARMACY MANAGEMENT PORTAL</p>
          <h1>Welcome Back, Pharmacy Partner! 👋</h1>
          <p>
            Manage medicine inventory, fulfill patient requests,
            and help communities access essential medicines.
          </p>
          <button
            className="ph-primary-btn"
            onClick={() => handleMenuClick("Medicine Inventory")}
          >
            Manage Inventory <ArrowUpRight size={17} />
          </button>
        </div>

        <div className="ph-welcome-icon">
          <Pill size={58} />
        </div>
      </section>

      <section className="ph-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div className="ph-stat-card" key={index}>
              <div className="ph-stat-top">
                <div className={`ph-stat-icon ${stat.color}`}>
                  <Icon size={23} />
                </div>
                <button className="ph-more-button" type="button">
                  <MoreHorizontal size={21} />
                </button>
              </div>

              <h2>{stat.value}</h2>
              <h3>{stat.title}</h3>

              <div className="ph-stat-bottom">
                <span className={`ph-stat-change ${stat.color}`}>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="ph-dashboard-grid">
        <div className="ph-content-card ph-orders-card">
          <div className="ph-card-header">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest medicine requests from patients</p>
            </div>

            <button
              className="ph-view-all"
              onClick={() => handleMenuClick("Orders & Requests")}
            >
              View All <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="ph-table-wrapper">
            <table className="ph-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Patient</th>
                  <th>Medicine</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.patient}</td>
                    <td>{order.medicine}</td>
                    <td>₹{order.amount}</td>
                    <td>
                      <span className={`ph-status ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ph-content-card ph-stock-card">
          <div className="ph-card-header">
            <div>
              <h2>Stock Overview</h2>
              <p>Medicine availability status</p>
            </div>
            <Package size={22} />
          </div>

          <div className="ph-stock-overview">
            <div className="ph-stock-row">
              <div className="ph-stock-label">
                <span className="ph-stock-dot available"></span>
                <span>In Stock</span>
              </div>
              <strong>
                {medicines.filter((m) => m.stock > m.minStock).length}
              </strong>
            </div>

            <div className="ph-stock-bar">
              <span
                style={{
                  width: `${
                    (medicines.filter((m) => m.stock > m.minStock).length /
                      Math.max(medicines.length, 1)) *
                    100
                  }%`,
                }}
              ></span>
            </div>

            <div className="ph-stock-row">
              <div className="ph-stock-label">
                <span className="ph-stock-dot low"></span>
                <span>Low Stock</span>
              </div>
              <strong>{lowStockMedicines.length}</strong>
            </div>

            <div className="ph-stock-bar orange">
              <span
                style={{
                  width: `${
                    (lowStockMedicines.length /
                      Math.max(medicines.length, 1)) *
                    100
                  }%`,
                }}
              ></span>
            </div>

            <div className="ph-stock-row">
              <div className="ph-stock-label">
                <span className="ph-stock-dot unavailable"></span>
                <span>Out of Stock</span>
              </div>
              <strong>{outOfStockMedicines.length}</strong>
            </div>

            <div className="ph-stock-bar red">
              <span
                style={{
                  width: `${
                    (outOfStockMedicines.length /
                      Math.max(medicines.length, 1)) *
                    100
                  }%`,
                }}
              ></span>
            </div>
          </div>

          <button
            className="ph-stock-link"
            onClick={() => handleMenuClick("Stock Alerts")}
          >
            View Stock Alerts <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      <section className="ph-quick-section">
        <div className="ph-section-heading">
          <div>
            <h2>Quick Actions</h2>
            <p>Frequently used pharmacy services</p>
          </div>
        </div>

        <div className="ph-quick-grid">
          <button
            className="ph-quick-action"
            onClick={() => setShowMedicineModal(true)}
          >
            <div className="ph-quick-icon green">
              <Plus size={23} />
            </div>
            <div>
              <h3>Add Medicine</h3>
              <p>Add a new inventory item</p>
            </div>
            <ArrowUpRight size={18} />
          </button>

          <button
            className="ph-quick-action"
            onClick={() => handleMenuClick("Orders & Requests")}
          >
            <div className="ph-quick-icon blue">
              <ShoppingCart size={23} />
            </div>
            <div>
              <h3>Manage Orders</h3>
              <p>View patient requests</p>
            </div>
            <ArrowUpRight size={18} />
          </button>

          <button
            className="ph-quick-action"
            onClick={() => handleMenuClick("Prescriptions")}
          >
            <div className="ph-quick-icon purple">
              <FileText size={23} />
            </div>
            <div>
              <h3>Prescriptions</h3>
              <p>Review prescriptions</p>
            </div>
            <ArrowUpRight size={18} />
          </button>

          <button
            className="ph-quick-action"
            onClick={() => handleMenuClick("Stock Alerts")}
          >
            <div className="ph-quick-icon orange">
              <AlertTriangle size={23} />
            </div>
            <div>
              <h3>Stock Alerts</h3>
              <p>Check low stock medicines</p>
            </div>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </section>
    </>
  );

  // Medicine Inventory
  const renderInventory = () => (
    <section className="ph-content-card ph-directory">
      <div className="ph-card-header">
        <div>
          <h2>Medicine Inventory</h2>
          <p>Manage medicine availability and stock details</p>
        </div>

        <button
          className="ph-primary-btn"
          onClick={() => setShowMedicineModal(true)}
        >
          <Plus size={17} /> Add Medicine
        </button>
      </div>

      <div className="ph-toolbar">
        <div className="ph-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search medicine, ID or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="ph-filter">
          <Filter size={17} />
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="ph-table-wrapper">
        <table className="ph-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Category</th>
              <th>Manufacturer</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Expiry</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>
                  <div className="ph-medicine-info">
                    <div className="ph-medicine-avatar">
                      <Pill size={18} />
                    </div>
                    <div>
                      <strong>{medicine.name}</strong>
                      <span>{medicine.id}</span>
                    </div>
                  </div>
                </td>
                <td>{medicine.category}</td>
                <td>{medicine.manufacturer}</td>
                <td>₹{medicine.price}</td>
                <td><strong>{medicine.stock}</strong> units</td>
                <td>{medicine.expiry || "Not added"}</td>
                <td>
                  <span className={`ph-status ${getStatusClass(medicine.status)}`}>
                    {medicine.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredMedicines.length === 0 && (
              <tr>
                <td colSpan="7" className="ph-empty-table">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  // Orders
  const renderOrders = () => (
    <section className="ph-content-card ph-directory">
      <div className="ph-card-header">
        <div>
          <h2>Orders & Requests</h2>
          <p>Manage medicine orders received from patients</p>
        </div>
        <span className="ph-total-count">
          {orders.length} Total Orders
        </span>
      </div>

      <div className="ph-toolbar">
        <div className="ph-search">
          <Search size={18} />
          <input
            placeholder="Search patient, order ID or medicine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="ph-filter">
          <Filter size={17} />
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="ph-table-wrapper">
        <table className="ph-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Patient</th>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong></td>
                <td>
                  <div className="ph-patient-info">
                    <strong>{order.patient}</strong>
                    <span>{order.patientId}</span>
                  </div>
                </td>
                <td>{order.medicine}</td>
                <td>{order.quantity}</td>
                <td>₹{order.amount}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`ph-status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="ph-action-btn"
                    onClick={() => setSelectedOrder(order)}
                    title="View Order"
                  >
                    <Eye size={17} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="8" className="ph-empty-table">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  // Prescriptions
  const renderPrescriptions = () => (
    <section className="ph-content-card ph-directory">
      <div className="ph-card-header">
        <div>
          <h2>Prescription Management</h2>
          <p>Review prescriptions submitted by registered patients</p>
        </div>
        <span className="ph-total-count">
          {prescriptions.length} Prescriptions
        </span>
      </div>

      <div className="ph-prescription-list">
        {prescriptions.map((item) => (
          <div className="ph-prescription-item" key={item.id}>
            <div className="ph-prescription-icon">
              <FileText size={24} />
            </div>

            <div className="ph-prescription-details">
              <h3>{item.patient}</h3>
              <p>{item.id} · {item.medicine}</p>
              <span>Prescribed by {item.doctor}</span>
              <small>
                <CalendarDays size={13} /> {item.date}
              </small>
            </div>

            <div className="ph-prescription-actions">
              <span className={`ph-status ${getStatusClass(item.status)}`}>
                {item.status}
              </span>

              {item.status === "Pending" && (
                <button
                  className="ph-approve-btn"
                  onClick={() => updatePrescriptionStatus(item.id, "Verified")}
                >
                  <CheckCircle size={15} /> Verify
                </button>
              )}

              {item.status === "Verified" && (
                <button
                  className="ph-complete-btn"
                  onClick={() => updatePrescriptionStatus(item.id, "Completed")}
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // Stock Alerts
  const renderStockAlerts = () => (
    <section className="ph-content-card ph-directory">
      <div className="ph-card-header">
        <div>
          <h2>Stock Alerts</h2>
          <p>Monitor medicines that require restocking</p>
        </div>
        <span className="ph-alert-count">
          {lowStockMedicines.length + outOfStockMedicines.length} Alerts
        </span>
      </div>

      {lowStockMedicines.length === 0 && outOfStockMedicines.length === 0 ? (
        <div className="ph-empty-state">
          <CheckCircle size={45} />
          <h3>All Stock Levels Are Healthy!</h3>
          <p>No medicines currently require restocking.</p>
        </div>
      ) : (
        <div className="ph-alert-list">
          {[...outOfStockMedicines, ...lowStockMedicines].map((medicine) => (
            <div className="ph-alert-item" key={medicine.id}>
              <div className="ph-alert-icon">
                <AlertTriangle size={22} />
              </div>

              <div className="ph-alert-details">
                <h3>{medicine.name}</h3>
                <p>{medicine.id} · {medicine.category}</p>
                <span>
                  Available Stock: <strong>{medicine.stock} units</strong>
                </span>
              </div>

              <div className="ph-alert-right">
                <span className={`ph-status ${getStatusClass(medicine.status)}`}>
                  {medicine.status}
                </span>
                <button
                  className="ph-restock-btn"
                  onClick={() => {
                    setActiveMenu("Medicine Inventory");
                    setSearchTerm(medicine.name);
                    setActiveFilter("All");
                  }}
                >
                  Manage Stock
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  // Transactions
  const renderTransactions = () => {
    const completedOrders = orders.filter(
      (order) => order.status === "Completed"
    );

    return (
      <section className="ph-content-card ph-directory">
        <div className="ph-card-header">
          <div>
            <h2>Transactions</h2>
            <p>Overview of completed medicine sales</p>
          </div>
          <Receipt size={24} />
        </div>

        <div className="ph-revenue-banner">
          <div>
            <span>Total Completed Revenue</span>
            <h2>₹{totalRevenue}</h2>
            <p>Based on completed orders</p>
          </div>
          <div className="ph-revenue-icon">
            <TrendingUp size={32} />
          </div>
        </div>

        <div className="ph-table-wrapper">
          <table className="ph-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Patient</th>
                <th>Medicine</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {completedOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>TXN-{order.id.slice(-4)}</strong></td>
                  <td>{order.patient}</td>
                  <td>{order.medicine}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className="ph-status completed">Paid</span>
                  </td>
                </tr>
              ))}

              {completedOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="ph-empty-table">
                    No completed transactions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  // Notifications
  const renderNotifications = () => (
    <section className="ph-content-card ph-directory">
      <div className="ph-card-header">
        <div>
          <h2>Notifications</h2>
          <p>Stay updated with pharmacy activities</p>
        </div>
        <Bell size={23} />
      </div>

      <div className="ph-notification-list">
        {notifications.map((item) => (
          <div
            className={`ph-notification-item ${item.unread ? "unread" : ""}`}
            key={item.id}
          >
            <div className="ph-notification-icon">
              <Bell size={20} />
            </div>

            <div>
              <h3>{item.title}</h3>
              <p>{item.message}</p>
              <span>{item.time}</span>
            </div>

            {item.unread && <span className="ph-unread-dot"></span>}
          </div>
        ))}
      </div>
    </section>
  );

  // Profile
  const renderProfile = () => (
    <section className="ph-content-card ph-profile-card">
      <div className="ph-profile-cover">
        <div className="ph-profile-avatar-large">
          <Pill size={35} />
        </div>
      </div>

      <div className="ph-profile-body">
        <h2>Community Pharmacy</h2>
        <p className="ph-profile-role">Verified Pharmacy Partner</p>

        <div className="ph-profile-grid">
          <div>
            <span>Pharmacy ID</span>
            <strong>PH-1001</strong>
          </div>
          <div>
            <span>Pharmacy Name</span>
            <strong>Community Pharmacy</strong>
          </div>
          <div>
            <span>Contact Number</span>
            <strong>9876543210</strong>
          </div>
          <div>
            <span>Email Address</span>
            <strong>pharmacy@aarogya.in</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>Rampur, Uttar Pradesh</strong>
          </div>
          <div>
            <span>Verification Status</span>
            <strong className="ph-verified">
              <CheckCircle size={15} /> Verified
            </strong>
          </div>
        </div>
      </div>
    </section>
  );

  // Help & Support
  const renderSupport = () => (
    <section className="ph-content-card ph-support-card">
      <div className="ph-support-main-icon">
        <HelpCircle size={40} />
      </div>
      <h2>How Can We Help You?</h2>
      <p>
        Our support team is here to help you manage your pharmacy
        and resolve any issues.
      </p>

      <div className="ph-support-options">
        <div>
          <Phone size={23} />
          <h3>Call Support</h3>
          <p>Speak with our support team</p>
          <strong>1800-123-4567</strong>
        </div>

        <div>
          <FileText size={23} />
          <h3>Documentation</h3>
          <p>Learn how to use the pharmacy portal</p>
          <strong>Help Centre</strong>
        </div>

        <div>
          <MapPin size={23} />
          <h3>Working Hours</h3>
          <p>Monday to Saturday</p>
          <strong>9:00 AM - 6:00 PM</strong>
        </div>
      </div>
    </section>
  );

  const renderOtherSection = () => {
    switch (activeMenu) {
      case "Medicine Inventory":
        return renderInventory();

      case "Orders & Requests":
        return renderOrders();

      case "Prescriptions":
        return renderPrescriptions();

      case "Stock Alerts":
        return renderStockAlerts();

      case "Transactions":
        return renderTransactions();

      case "Notifications":
        return renderNotifications();

      case "My Profile":
        return renderProfile();

      case "Help & Support":
        return renderSupport();

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="ph-page">
      <DashboardSwitcher currentRole="pharmacy" />

      <div className="ph-dashboard">
        {sidebarOpen && (
          <div
            className="ph-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`ph-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="ph-logo">
            <div className="ph-logo-icon">
              <HeartPulse size={27} />
            </div>

            <div className="ph-logo-text">
              <h2>AAROGYA LINK</h2>
              <span>Healthcare for Everyone</span>
            </div>
          </div>

          <div className="ph-sidebar-profile">
            <div className="ph-profile-avatar">
              <Pill size={23} />
            </div>

            <div>
              <h3>Pharmacy Partner</h3>
              <p>Registered Pharmacy</p>
            </div>
          </div>

          <div className="ph-sidebar-heading">MAIN MENU</div>

          <nav className="ph-sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  className={`ph-nav-item ${
                    activeMenu === item.title ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(item.title)}
                  type="button"
                >
                  <Icon size={20} />
                  <span>{item.title}</span>

                  {item.title === "Notifications" && (
                    <span className="ph-notification-count">
                      {notifications.filter((n) => n.unread).length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="ph-sidebar-bottom">
            <div className="ph-support-box">
              <div className="ph-support-icon">
                <HelpCircle size={22} />
              </div>

              <h4>Need Help?</h4>
              <p>Contact our support team for assistance.</p>

              <button
                onClick={() => handleMenuClick("Help & Support")}
                type="button"
              >
                Get Support
              </button>
            </div>

            <button
              className="ph-logout-button"
              onClick={handleLogout}
              type="button"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Area */}
        <main className="ph-main">
          <header className="ph-topbar">
            <div className="ph-topbar-left">
              <button
                className="ph-menu-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                type="button"
              >
                <Menu size={23} />
              </button>

              <div>
                <h2>{activeMenu}</h2>
                <p>Welcome to your pharmacy workspace</p>
              </div>
            </div>

            <div className="ph-topbar-right">
              <div className="ph-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                className="ph-topbar-icon"
                onClick={() => handleMenuClick("Notifications")}
                type="button"
              >
                <Bell size={21} />
                <span className="ph-notification-dot"></span>
              </button>

              <button
                className="ph-topbar-profile"
                onClick={() => handleMenuClick("My Profile")}
                type="button"
              >
                <div className="ph-topbar-avatar">PH</div>

                <div>
                  <strong>Pharmacy Partner</strong>
                  <span>Verified Pharmacy</span>
                </div>
              </button>
            </div>
          </header>

          <div className="ph-content">
            {success && (
              <div className="ph-success-message">
                <CheckCircle size={18} />
                {success}
              </div>
            )}

            {activeMenu === "Dashboard"
              ? renderDashboard()
              : renderOtherSection()}
          </div>

          <footer className="ph-footer">
            <p>© 2026 AAROGYA LINK. All rights reserved.</p>
            <span>
              <HeartPulse size={15} />
              Bridging the Gap Between Care and Medicine
            </span>
          </footer>
        </main>
      </div>

      {/* Add Medicine Modal */}
      {showMedicineModal && (
        <div
          className="ph-modal-overlay"
          onClick={() => setShowMedicineModal(false)}
        >
          <div
            className="ph-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ph-modal-header">
              <div>
                <h2>Add New Medicine</h2>
                <p>Add medicine details to your inventory.</p>
              </div>

              <button
                className="ph-modal-close"
                onClick={() => setShowMedicineModal(false)}
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleMedicineSubmit}>
              <div className="ph-form-grid">
                <div className="ph-form-group ph-full">
                  <label>Medicine Name *</label>
                  <input
                    type="text"
                    placeholder="Enter medicine name"
                    value={medicineForm.name}
                    onChange={(e) =>
                      setMedicineForm({
                        ...medicineForm,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="ph-form-group">
                  <label>Category</label>
                  <select
                    value={medicineForm.category}
                    onChange={(e) =>
                      setMedicineForm({
                        ...medicineForm,
                        category: e.target.value,
                      })
                    }
                  >
                    <option>General Medicine</option>
                    <option>Pain Relief</option>
                    <option>Antibiotic</option>
                    <option>Allergy</option>
                    <option>Supplement</option>
                    <option>Digestive</option>
                    <option>Hydration</option>
                  </select>
                </div>

                <div className="ph-form-group">
                  <label>Manufacturer</label>
                  <input
                    type="text"
                    placeholder="Manufacturer name"
                    value={medicineForm.manufacturer}
                    onChange={(e) =>
                      setMedicineForm({
                        ...medicineForm,
                        manufacturer: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="ph-form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter price"
                    value={medicineForm.price}
                    onChange={(e) =>
                      setMedicineForm({
                        ...medicineForm,
                        price: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="ph-form-group">
                  <label>Available Stock *</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter quantity"
                    value={medicineForm.stock}
                    onChange={(e) =>
                      setMedicineForm({
                        ...medicineForm,
                        stock: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="ph-form-group">
                  <label>Minimum Stock Alert</label>
                  <input
                    type="number"
                    min="0"
                    value={medicineForm.minStock}
                    onChange={(e) =>
                      setMedicineForm({
                        ...medicineForm,
                        minStock: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="ph-form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    value={medicineForm.expiry}
                    onChange={(e) =>
                      setMedicineForm({
                        ...medicineForm,
                        expiry: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="ph-modal-actions">
                <button
                  type="button"
                  className="ph-cancel-btn"
                  onClick={() => setShowMedicineModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="ph-primary-btn">
                  <Save size={17} /> Save Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="ph-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="ph-modal ph-order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ph-modal-header">
              <div>
                <h2>Order Details</h2>
                <p>{selectedOrder.id}</p>
              </div>

              <button
                className="ph-modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                <X size={21} />
              </button>
            </div>

            <div className="ph-order-details">
              <div>
                <span>Patient Name</span>
                <strong>{selectedOrder.patient}</strong>
              </div>
              <div>
                <span>Patient ID</span>
                <strong>{selectedOrder.patientId}</strong>
              </div>
              <div>
                <span>Phone Number</span>
                <strong>{selectedOrder.phone}</strong>
              </div>
              <div>
                <span>Medicine</span>
                <strong>{selectedOrder.medicine}</strong>
              </div>
              <div>
                <span>Quantity</span>
                <strong>{selectedOrder.quantity}</strong>
              </div>
              <div>
                <span>Total Amount</span>
                <strong>₹{selectedOrder.amount}</strong>
              </div>
              <div>
                <span>Order Date</span>
                <strong>{selectedOrder.date}</strong>
              </div>
              <div>
                <span>Current Status</span>
                <strong>{selectedOrder.status}</strong>
              </div>
            </div>

            <div className="ph-modal-actions">
              <button
                className="ph-cancel-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>

              {selectedOrder.status === "Pending" && (
                <button
                  className="ph-primary-btn"
                  onClick={() =>
                    updateOrderStatus(selectedOrder.id, "Processing")
                  }
                >
                  Accept Order
                </button>
              )}

              {selectedOrder.status === "Processing" && (
                <button
                  className="ph-primary-btn"
                  onClick={() =>
                    updateOrderStatus(selectedOrder.id, "Completed")
                  }
                >
                  <CheckCircle size={16} /> Complete Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PharmacyDashboard;