import React, { useState } from "react";
import { createProduct } from "../services/productService";

const ProductForm = ({ onAdded }) => {
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", stock: 0 });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("category", form.category);
      fd.append("stock", form.stock);
      if (imageFile) fd.append("image", imageFile);
      await createProduct(fd);
      onAdded();
      setForm({ name: "", description: "", price: "", category: "", stock: 0 });
      setImageFile(null);
      setPreview(null);
      alert("Product added");
    } catch (err) {
      alert(err.message || "Add failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="cute-form" onSubmit={submit}>
      <h3 className="title">Add New Product</h3>
      <input name="name" className="cute-input" placeholder="Name" value={form.name} onChange={handleChange} required />
      <textarea name="description" className="cute-input" placeholder="Description" value={form.description} onChange={handleChange} rows="3" />
      <input name="price" className="cute-input" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input name="category" className="cute-input" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="stock" className="cute-input" placeholder="Stock" value={form.stock} onChange={handleChange} />
      <label className="file-label">
        Upload image
        <input type="file" accept="image/*" onChange={handleFile} />
      </label>
      {preview && <div className="preview-box"><img className="preview-img" src={preview} alt="preview" /></div>}
      <button className="cute-btn" type="submit" disabled={saving}>{saving ? "Adding..." : "Add Product"}</button>
    </form>
  );
};

export default ProductForm;