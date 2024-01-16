const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accounts = new Schema(
    {
        username: String,
        password: String,
        fullname: String,
        role: {
                type: String,
                default: 'USER'
            },
        phone: String,
        email: String,
        avatar: String,
        dob: String,
        gender: String,
        address: String,
        accessToken: String,
        gardenList: [
            {
                _id: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "gardens",
                },
                gardenName: String,
                gardenAddress: String,
                status: {
                    type: String,
                    default: 'requesting'   
                }
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("accounts", accounts);
