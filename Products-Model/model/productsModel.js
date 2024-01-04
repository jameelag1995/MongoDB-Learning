import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        details: {
            description: { type: String, required: true, minlength: 10 },
            price: { type: Number, required: true, min: 1 },
            discount: { type: Number, default: 0 },
            images: {
                type: [String],
                required: true,
                validate: {
                    validator: function (imagesArr) {
                        return imagesArr.length >= 2;
                    },
                    message: (props) =>
                        `${props.path} must add at least two images`,
                },
            },
            phoneNumber: {
                type: String,
                length: 10,
                required: true,
            },
            updated: { type: Date, default: Date.now },
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("products", ProductSchema);
