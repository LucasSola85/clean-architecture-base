import mongoose, { Schema } from "mongoose";


const ProductSchema = new Schema({

    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    cost: {
        type: Number,
        require: true
    },

    tax: {
        type: Number,
        require: true
    },

    price: {
        type: Number,
        require: true
    },


});


export const ProductModel = mongoose.model('Products', ProductSchema);
