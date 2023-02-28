import { Schema, model } from "mongoose";
const productSchema = new Schema(
  {
    product_name: {
      unique: "product name already exists",
      type: "string",
      required: "product_name  is required",
    },
    product_type: {
      type: "string",
      required: "product_type is required",
    },
    price: {
      type: Number,
      required: "price is required",
    },
    quality: {
      type: String,
      required: "quality is required",
    },
    description: {
      type: "string",
      required: "description is required",
    },
    image_path: {
      type: "string",
      required: "image_path filed is required",
    },
    // user_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: "user id is required",
    // },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
    versionKey: false,
  }
);

const Product = model("Product", productSchema);
export default Product;
