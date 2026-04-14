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
}


const productSchema = new mongoose.Schema<Product>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    price:{
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            enum:["USD", "EUR", "GBP"],
        }
    },
    images:[
        {
            url:{
                type:String,
                required:true
            },
            altText:{
                type:String,
                required:false
            }
        }
    ]
})

export const ProductModel = mongoose.model<Product>("Product", productSchema);