import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);

      setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
      });

      setPreview(
        data.image?.startsWith("http")
          ? data.image
          : `${process.env.REACT_APP_IMAGE_URL}/${data.image}`
      );
    } catch (err) {
      console.error("Error loading product:", err);
      alert("Failed to load product details");
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) =>
        formData.append(key, form[key])
      );

      if (imageFile) formData.append("image", imageFile);

      await updateProduct(id, formData);

      alert("Product updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label>Description</label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <label>Price</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
          required
        />

        <label>Category</label>
        <input
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <label>Stock</label>
        <input
          type="number"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: Number(e.target.value) })
          }
        />

        <label>Change Image</label>
        <input
          type="file"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: 120, marginTop: 10 }}
          />
        )}

        <button className="btn" type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
