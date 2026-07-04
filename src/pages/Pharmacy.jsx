import { useState } from "react";
import "./Pharmacy.css";

function Pharmacy() {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      place: "Medicine box",
      quantity: "10 tablets",
      expiryDate: "2027-01-20",
      lastBoughtDate: "2026-06-15",
    },
    {
      id: 2,
      name: "Cough Syrup",
      place: "Bathroom cabinet",
      quantity: "1 bottle",
      expiryDate: "2026-11-10",
      lastBoughtDate: "2026-07-01",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    place: "",
    quantity: "",
    expiryDate: "",
    lastBoughtDate: "",
  });

  const filteredMedicines = medicines.filter((medicine) =>
    Object.values(medicine)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddMedicine(e) {
    e.preventDefault();

    if (!formData.name || !formData.place || !formData.quantity) {
      alert("Please fill name, place, and quantity.");
      return;
    }

    const newMedicine = {
      id: Date.now(),
      ...formData,
    };

    setMedicines([...medicines, newMedicine]);

    setFormData({
      name: "",
      place: "",
      quantity: "",
      expiryDate: "",
      lastBoughtDate: "",
    });
  }

  function handleDeleteSelected() {
    if (!selectedId) {
      alert("Please select a medicine first.");
      return;
    }

    setMedicines(medicines.filter((medicine) => medicine.id !== selectedId));
    setSelectedId(null);
  }

  function handleEdit(medicine) {
    setEditingId(medicine.id);
    setFormData({
      name: medicine.name,
      place: medicine.place,
      quantity: medicine.quantity,
      expiryDate: medicine.expiryDate,
      lastBoughtDate: medicine.lastBoughtDate,
    });
  }

  function handleUpdateMedicine(e) {
    e.preventDefault();

    setMedicines(
      medicines.map((medicine) =>
        medicine.id === editingId
          ? {
              ...medicine,
              ...formData,
            }
          : medicine
      )
    );

    setEditingId(null);
    setFormData({
      name: "",
      place: "",
      quantity: "",
      expiryDate: "",
      lastBoughtDate: "",
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setFormData({
      name: "",
      place: "",
      quantity: "",
      expiryDate: "",
      lastBoughtDate: "",
    });
  }

  return (
    <div className="pharmacy-page">
      <h1>Pharmacy Tracker</h1>

      <div className="top-actions">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <button onClick={handleDeleteSelected} className="delete-btn">
          Delete Selected
        </button>
      </div>

      <form
        className="pharmacy-form"
        onSubmit={editingId ? handleUpdateMedicine : handleAddMedicine}
      >
        <input
          type="text"
          name="name"
          placeholder="Medicine name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="place"
          placeholder="Place kept"
          value={formData.place}
          onChange={handleChange}
        />

        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
        />

        <input
          type="date"
          name="lastBoughtDate"
          value={formData.lastBoughtDate}
          onChange={handleChange}
        />

        <button type="submit" className="add-btn">
          {editingId ? "Update Medicine" : "Add Medicine"}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>

      <table className="pharmacy-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Medicine</th>
            <th>Place Kept</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Last Bought Date</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {filteredMedicines.map((medicine) => (
            <tr
              key={medicine.id}
              className={selectedId === medicine.id ? "selected-row" : ""}
            >
              <td>
                <input
                  type="radio"
                  name="selectedMedicine"
                  checked={selectedId === medicine.id}
                  onChange={() => setSelectedId(medicine.id)}
                />
              </td>

              <td>{medicine.name}</td>
              <td>{medicine.place}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.expiryDate}</td>
              <td>{medicine.lastBoughtDate}</td>

              <td>
                <button
                  onClick={() => handleEdit(medicine)}
                  className="edit-btn"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {filteredMedicines.length === 0 && (
            <tr>
              <td colSpan="7" className="empty-message">
                No medicines found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Pharmacy;