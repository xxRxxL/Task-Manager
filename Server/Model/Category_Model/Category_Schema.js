import mongoose from "mongoose"

const category_schema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 15,
        default: 'New Category'
    },
    color: {
        hex: { type: String, default: "#808080" },
        rgb: { type: String, default: "rgb(128, 128, 128)" }
    },
    tasks: [
        {
            title: {type: String, default: 'New Task', maxLength: 15},
            createdAt: {type: Date, default: ()=>{new Date()}},
            note: {type: String, default: ""},
            status: { type: String, default: 'Todo' },
        },

    ],
    
})

export default category_schema;

