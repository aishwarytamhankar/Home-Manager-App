import { useState } from "react";
import "./ToBuy.css";

function ToBuy() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Trash bags",
      quantity: "1",
    },
    {
      id: 2,
      name: "kukident",
      quantity: "1",
    },
    {
      id: 3,
      name: "blatterteig",
      quantity: "2 rolls",
    },

  ]);

  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });

  const filteredItems = items.filter((item) =>
    Object.values(item)
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

  function handleAddItem(e) {
    e.preventDefault();

    if (!formData.name || !formData.quantity) {
      alert("Please fill item name and quantity.");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...formData,
    };

    setItems([...items, newItem]);

    setFormData({
      name: "",
      quantity: "",
    });
  }

  function handleDeleteSelected() {
    if (!selectedId) {
      alert("Please select an item first.");
      return;
    }

    setItems(items.filter((item) => item.id !== selectedId));
    setSelectedId(null);
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      quantity: item.quantity,
    });
  }

  function handleUpdateItem(e) {
    e.preventDefault();

    setItems(
      items.map((item) =>
        item.id === editingId
          ? {
              ...item,
              ...formData,
            }
          : item
      )
    );

    setEditingId(null);
    setFormData({
      name: "",
      quantity: "",
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setFormData({
      name: "",
      quantity: "",
    });
  }

  return (
    <div className="tobuy-page">
      <h1>To-Buy List</h1>

      <div className="top-actions">
        <input
          type="text"
          placeholder="Search items..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <button onClick={handleDeleteSelected} className="delete-btn">
          Delete Selected
        </button>
      </div>

      <form
        className="tobuy-form"
        onSubmit={editingId ? handleUpdateItem : handleAddItem}
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
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <button type="submit" className="add-btn">
          {editingId ? "Update Item" : "Add Item"}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>

      <table className="tobuy-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Grocery</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {filteredItems.map((item) => (
            <tr
              key={item.id}
              className={selectedId === item.id ? "selected-row" : ""}
            >
              <td>
                <input
                  type="radio"
                  name="selectedItem"
                  checked={selectedId === item.id}
                  onChange={() => setSelectedId(item.id)}
                />
              </td>

              <td>{item.name}</td>
              <td>{item.quantity}</td>

              <td>
                <button onClick={() => handleEdit(item)} className="edit-btn">
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="4" className="empty-message">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ToBuy;