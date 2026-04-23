import mongoose from "mongoose";

interface CartItem {
  product: mongoose.Types.ObjectId;
  variantIndex?: number;
  quantity: number;
}

interface Cart extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  items: CartItem[];
}

const cartSchema = new mongoose.Schema<Cart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      variantIndex: {
        type: Number,
        required: false
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
      }
    }
  ]
}, { timestamps: true });

export const CartModel = mongoose.model<Cart>("Cart", cartSchema);
