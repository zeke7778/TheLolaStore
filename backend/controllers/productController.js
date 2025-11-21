import Product from "../models/Product.js";

// --------------------------------------------------
// GET ALL PRODUCTS
// --------------------------------------------------
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);

  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// --------------------------------------------------
// GET PRODUCT BY ID
// --------------------------------------------------
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);

  } catch (err) {
    console.error("Get Product Error:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// --------------------------------------------------
// CREATE PRODUCT (Cloudinary)
// --------------------------------------------------
export const createProduct = async (req, res) => {
  try {
    console.log("Incoming files:", req.files);

    const { name, description, price, category, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name & Price required" });
    }

    // MAIN IMAGE (required)
    let mainImage = null;

    if (req.files?.image && req.files.image.length > 0) {
      mainImage = req.files.image[0].secure_url;
    } else {
      return res.status(400).json({ message: "Main image is required" });
    }

    // EXTRA IMAGES (optional)
    let extraImages = [];
    if (req.files?.images) {
      extraImages = req.files.images.map((file) => file.secure_url);
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: mainImage,
      images: extraImages,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// --------------------------------------------------
// UPDATE PRODUCT (Cloudinary)
// --------------------------------------------------
export const updateProduct = async (req, res) => {
  try {
    console.log("Update Files:", req.files);

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const { name, price, description, category, stock } = req.body;

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    // MAIN IMAGE
    if (req.files?.image?.length) {
      product.image = req.files.image[0].secure_url;
    }

    // EXTRA IMAGES
    if (req.files?.images?.length) {
      const newImgs = req.files.images.map((f) => f.secure_url);
      product.images = [...product.images, ...newImgs];
    }

    await product.save();
    res.json({ message: "Product updated", product });

  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// DELETE PRODUCT
// --------------------------------------------------
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed successfully" });

  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
