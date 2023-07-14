import React, { useState } from "react";

const ItemForm = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("piece");
  const [isTotalEditable, setIsTotalEditable] = useState(false);

  const handleItemChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
    calculateTotal(e.target.value, price);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    calculateTotal(qty, e.target.value);
  };

  const calculateTotal = (qty, price) => {
    let total = 0;
    if (selectedUnit === "piece") {
      total = qty * price;
    }
    setTotal(total);
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
    calculateTotal(qty, price);
  };

  const handleAddItem = () => {
    const newItem = {
      itemName,
      qty,
      price,
      total,
      unit: selectedUnit,
    };
    setItems([...items, newItem]);
    setItemName("");
    setQty(0);
    setPrice(0);
    setTotal(0);
  };

  const handleTotalEdit = () => {
    setIsTotalEditable(true);
  };

  const handleTotalSave = (e) => {
    if (e.key === "Enter") {
      setIsTotalEditable(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="itemName" className="mr-2">
          Item Name:
        </label>
        <input
          id="itemName"
          type="text"
          value={itemName}
          onChange={handleItemChange}
          className="px-2 py-1 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="qty" className="mr-2">
          Qty:
        </label>
        <input
          id="qty"
          type="number"
          value={qty}
          onChange={handleQtyChange}
          className="px-2 py-1 border rounded"
        />
        <select
          value={selectedUnit}
          onChange={handleUnitChange}
          className="ml-2 px-2 py-1 border rounded"
        >
          <option value="piece">Piece</option>
          <option value="kg">Kg</option>
          <option value="gm">Gm</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="mr-2">
          Price:
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          className="px-2 py-1 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="total" className="mr-2">
          Total:
        </label>
        {isTotalEditable ? (
          <input
            id="total"
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            onKeyDown={handleTotalSave}
            className="px-2 py-1 border rounded"
          />
        ) : (
          <div className="flex items-center">
            <input
              type="text"
              value={total}
              readOnly
              className="px-2 py-1 border rounded bg-gray-100 cursor-pointer"
              onClick={handleTotalEdit}
            />
            <span className="ml-2 text-xs cursor-pointer">Edit</span>
          </div>
        )}
      </div>
      <button
        onClick={handleAddItem}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Item
      </button>

      {items.length > 0 && (
        <table className="mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Item Name</th>
              <th className="px-4 py-2 border">Qty</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Unit</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.itemName}</td>
                <td className="px-4 py-2 border">{item.qty}</td>
                <td className="px-4 py-2 border">{item.price}</td>
                <td className="px-4 py-2 border">{item.total}</td>
                <td className="px-4 py-2 border">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ItemForm;
