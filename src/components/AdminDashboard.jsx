import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', amount: '', image: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchItems = () => {
    axios.get('https://tuk-tails-node.onrender.com/api/items').then(res => setItems(res.data));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = () => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('amount', form.amount);
    if (form.image) formData.append('image', form.image);

    axios.post('https://tuk-tails-node.onrender.com/api/items', formData).then(() => {
      fetchItems();
      setForm({ name: '', description: '', amount: '', image: null });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`https://tuk-tails-node.onrender.com/api/items/${id}`).then(() => fetchItems());
  };

  const filteredItems = items
    .filter(item => item?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'amount') return parseFloat(a.amount) - parseFloat(b.amount);
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
console.log(currentItems,"current");

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="form-area">
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setForm({ ...form, image: e.target.files[0] })}
        />
        <button onClick={handleAdd}>Add Item</button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="amount">Amount</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item._id}>
              <td><img src={`https://tuk-tails-node.onrender.com/uploads/${item.image}`} alt={item.name} height="60" /></td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.amount}</td>
              <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
