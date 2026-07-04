
import { useState } from "react";
import "./Groceries.css";

function Groceries() {
  const [groceries, setGroceries] = useState([
    {
      id: 1,
      name: "Rice",
      place: "Kitchen cabinet",
      quantity: "2 kg",
      expiryDate: "2026-12-20",
      lastBoughtDate: "2026-07-01",
    },
    {
      id: 2,
      name: "Milk",
      place: "Fridge",
      quantity: "1 bottle",
      expiryDate: "2026-07-10",
      lastBoughtDate: "2026-07-03",
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

  const filteredGroceries = groceries.filter((grocery) =>
    Object.values(grocery)
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

  function handleAddGrocery(e) {
    e.preventDefault();

    if (!formData.name || !formData.place || !formData.quantity) {
      alert("Please fill name, place, and quantity.");
      return;
    }

    const newGrocery = {
      id: Date.now(),
      ...formData,
    };

    setGroceries([...groceries, newGrocery]);

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
      alert("Please select a grocery first.");
      return;
    }

    setGroceries(groceries.filter((grocery) => grocery.id !== selectedId));
    setSelectedId(null);
  }

  function handleEdit(grocery) {
    setEditingId(grocery.id);
    setFormData({
      name: grocery.name,
      place: grocery.place,
      quantity: grocery.quantity,
      expiryDate: grocery.expiryDate,
      lastBoughtDate: grocery.lastBoughtDate,
    });
  }

  function handleUpdateGrocery(e) {
    e.preventDefault();

    setGroceries(
      groceries.map((grocery) =>
        grocery.id === editingId
          ? {
              ...grocery,
              ...formData,
            }
          : grocery
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
    <div className="grocery-page">
      <h1>Grocery Tracker</h1>

      <div className="top-actions">
        <input
          type="text"
          placeholder="Search groceries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <button onClick={handleDeleteSelected} className="delete-btn">
          Delete Selected
        </button>
      </div>

      <form
        className="grocery-form"
        onSubmit={editingId ? handleUpdateGrocery : handleAddGrocery}
      >
        <input
          type="text"
          name="name"
          placeholder="Grocery name"
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
          {editingId ? "Update Grocery" : "Add Grocery"}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>

      <table className="grocery-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Grocery</th>
            <th>Place Kept</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Last Bought Date</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {filteredGroceries.map((grocery) => (
            <tr
              key={grocery.id}
              className={selectedId === grocery.id ? "selected-row" : ""}
            >
              <td>
                <input
                  type="radio"
                  name="selectedGrocery"
                  checked={selectedId === grocery.id}
                  onChange={() => setSelectedId(grocery.id)}
                />
              </td>

              <td>{grocery.name}</td>
              <td>{grocery.place}</td>
              <td>{grocery.quantity}</td>
              <td>{grocery.expiryDate}</td>
              <td>{grocery.lastBoughtDate}</td>

              <td>
                <button
                  onClick={() => handleEdit(grocery)}
                  className="edit-btn"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {filteredGroceries.length === 0 && (
            <tr>
              <td colSpan="7" className="empty-message">
                No groceries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Groceries;