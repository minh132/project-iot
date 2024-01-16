const mongoose = require("mongoose");

const rooms = mongoose.Schema(
    {
        gardenId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'gardens'
        },
        roomName: String,
        devicesList: [
            {
                _id: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "devices",
                },
                deviceName: String,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("rooms", rooms);
