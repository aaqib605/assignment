import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
  productId: {
    type: String,
  },
  productName: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productImgUrl: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "UserTable",
  },
});

export default mongoose.model("ProductTable", productSchema);
