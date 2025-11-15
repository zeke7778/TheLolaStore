import Product from "../models/Product.js";

// 📦 Get all products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {};

    const products = await Product.find({
      ...keyword,
      ...categoryFilter,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➕ Add product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: req.file ? req.file.path : "", // <-- Final fix
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    if (req.file) {
      product.image = req.file.path; // <-- Updated correctly
    }

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
