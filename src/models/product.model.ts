import mongoose from "mongoose";

interface Product extends mongoose.Document {
    title: string;
    description: string;
    seller: mongoose.Types.ObjectId;
    price: {
        amount: number;
        currency: "USD" | "EUR" | "GBP";
    };
    images: {
        url: string;
        altText?: string;
    }[];
    variants: {
        images: {
            url: string;
            altText?: string;
        }[];
        stock: number;
        price: {
            amount: number;
            currency: "USD" | "EUR" | "GBP";
        };
        attributes: Map<string, string>;
    }[];
}


const productSchema = new mongoose.Schema<Product>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "GBP"],
        }
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            altText: {
                type: String,
                required: false
            }
        }
    ],
    variants: [
        {
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    },
                    altText: {
                        type: String,
                        required: false
                    }
                }
            ],
            stock: {
                type: Number,
                required: true,
                default: 0
            },
            price: {
                amount: {
                    type: Number,
                    required: true
                },
                currency: {
                    type: String,
                    enum: ["USD", "EUR", "GBP"],
                }
            },
            attributes: {
                type: Map,
                of: String,
                required: true
            }
        }
    ]
})

export const ProductModel = mongoose.model<Product>("Product", productSchema);