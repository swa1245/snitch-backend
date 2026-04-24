import mongoose from "mongoose";

interface Category extends mongoose.Document {
    name: string;
    imageUrl: string;
    description?: string;
    type: "category" | "vibe" | "collection";
    isActive: boolean;
}

const categorySchema = new mongoose.Schema<Category>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        enum: ["category", "vibe", "collection"],
        default: "category"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const CategoryModel = mongoose.model<Category>("Category", categorySchema);
