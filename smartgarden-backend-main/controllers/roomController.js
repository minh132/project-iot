
const Account = require("../models/Accounts");
const garden = require("../models/gardens");
const Room = require("../models/Rooms");
const Device = require("../models/Devices");

const roomController = {
    createRoom: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: gardenId và thông tin mới của phòng
            const { gardenId, newName } = req.body;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }

            // Thêm phòng mới
            const newRoom = new Room({
                gardenId: gardenId,
                roomName: newName,
            });

            await newRoom.save();

            // Thêm thông tin phòng mới vào roomsList của nhà này
            await garden.findByIdAndUpdate(gardenId, {
                $addToSet: {
                    roomsList: {
                        _id: newRoom._id,
                        roomName: newRoom.roomName,
                    },
                },
            });

            //Trả về thông tin phòng mới thêm
            return res.send({
                result: "success",
                room: newRoom,
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    deleteRoom: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: Id của phòng bị xóa
            const { roomId } = req.query;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }

            const roomData = await Room.findById(roomId);

            // Xóa thông tin phòng khỏi roomsList của nhà đó
            await garden.updateOne(
                { _id: roomData.gardenId },
                {
                    $pull: {
                        roomsList: { _id: roomId },
                    },
                }
            );

            // Xóa các thiết bị của phòng khỏi database
            await Device.deleteMany({roomId: roomId});

            // Xóa phòng khỏi database
            await Room.findByIdAndDelete(roomId);

            //Thông báo thành công
            return res.send({
                result: "success",
                message: "Xóa phòng thành công"
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    getRoomData: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: id của phòng muốn lấy dữ liệu
            const { roomId } = req.query;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }
            const roomData = await Room.findById(roomId);
            const devicesList = await Device.find({roomId: roomId});
            // roomInfo.devicesList = [...devicesList];
            // Trả về thông tin chi tiết căn phòng
            return res.send({
                result: "success",
                roomData: {
                    _id: roomData._id,
                    roomName: roomData.roomName,
                    devicesList: devicesList,
                },
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    getRoomsList: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: gardenId
            const { gardenId } = req.query;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }
            const roomsList = await Room.find({gardenId: gardenId});
            
            // Trả về danh sách phòng của căn nhà
            return res.send({
                result: "success",
                roomsList: roomsList,
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    updateRoomData: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: Dữ liệu mới của phòng
            const {  roomId, newName } = req.body;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }
            // Cập nhật thông tin mới
            const newRoomData = await Room.findByIdAndUpdate(roomId, {
                roomName: newName,
            });

            // Sửa thông tin phòng ở roomsList của nhà
                    await garden.updateOne(
                        { _id: newRoomData.gardenId, "roomsList._id": roomId },
                        {
                            $set: {
                                'roomsList.$.roomName': newName,
                            },
                        }
                    )

            await newRoomData.save();

            // Trả về thông tin mới của căn phòng
            return res.send({
                result: "success",
                // newRoomData: newRoomData,
                message : "Cập nhật thành công"
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },
};

module.exports = roomController;
