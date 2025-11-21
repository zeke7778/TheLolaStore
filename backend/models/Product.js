import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    // slug removed because slugify package is not installed
    slug: { type: String, lowercase: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },

    discountPrice: { type: Number, default: null },

    image: { type: String, required: true },   // main image

    images: [{ type: String }],                // extra images

    category: { type: String, required: true },

    brand: { type: String, default: "Unknown" },

    stock: { type: Number, default: 0 },

    rating: { type: Number, default: 0, min: 0, max: 5 },

    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Remove slugify usage — optional automatic slug
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/ /g, "-");
  }
  next();
});

export default mongoose.model("Product", productSchema);
