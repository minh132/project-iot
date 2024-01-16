
const Account = require("../models/Accounts");
const Garden = require("../models/Gardens");
const Room = require("../models/Rooms");
const Device = require("../models/Devices");

const gardenController = {
    creategarden: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: tất cả thông tin của căn nhà
            const garden = req.body;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }

            // Thêm nhà mới và thêm tài khoản là chủ nhà vào danh sách thành viên
            const newGarden = new Garden({
                ...garden,
                accountList: {
                    _id: account._id,
                    fullname: account.fullname,
                    avatar: account.avatar,
                    status: "owner",
                },
            });

            await newGarden.save();

            // Thêm thông tin nhà mới vào gardenList của tài khoản này, trạng thái là chủ nhà
            await Account.findByIdAndUpdate(account._id, {
                $addToSet: {
                    gardenList: {
                        _id: newGarden._id,
                        gardenName: newGarden.name,
                        gardenAddress: newGarden.address,
                        status: "owner",
                    },
                },
            });

            //Trả về thông tin nhà mới thêm
            return res.send({
                result: "success",
                garden: newGarden,
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    deleteGarden: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: Id của căn nhà
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

            // Lấy thông tin nhà bị xóa
            const garden = await garden.findById({
                _id: gardenId,
            });

            // Xóa thông tin nhà khỏi gardenList của các tài khoản liên quan
            garden.accountList.map(
                async (item) =>
                    await Account.updateOne(
                        { _id: item._id },
                        {
                            $pull: {
                                gardenList: { _id: gardenId },
                            },
                        }
                    )
            );

            // Xóa các thiết bị trong nhà khỏi database
            garden.roomsList.map(
                async (item) => await Device.deleteMany({ roomId: item._id })
            );

            // Xóa các phòng trong nhà khỏi database
            await Room.deleteMany({ gardenId: garden._id })

            // Xóa nhà khỏi database
            await garden.findByIdAndDelete(gardenId);

            //Thông báo thành công
            return res.send({
                result: "success",
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    getOtherGardensList: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: string tìm kiếm
            const { q } = req.query;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }

            // Lọc những nhà không trong danh sách đã sở hữu hoặc đang yêu cầu của tài khoản
            const otherGardensList = await Garden.find({
                "accountList._id": { $ne: account._id },
                name: { $regex: ".*" + q + ".*" },
            });

            // Trả về danh sách các nhà không liên quan
            if (othergardensList.length > 0) {
                return res.send({
                    result: "success",
                    othergardensList: othergardensList,
                });
            } else {
                return res.send({
                    result: "failed",
                    message: "Danh sách rỗng",
                });
            }
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    getgardenData: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: id của nhà muốn lấy dữ liệu
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
            const gardenData = await garden.findById(gardenId);

            // Trả về thông tin chi tiết căn nhà
            return res.send({
                result: "success",
                gardenData: gardenData,
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    updategardenData: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: Dữ liệu mới của nhà (name, address)
            const { _id, name, address } = req.body;
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
            const newgardenData = await garden.findByIdAndUpdate(_id, {
                name: name,
                address: address,
            });

            // Sửa thông tin nhà ở gardenList của các tài khoản liên quan
            newgardenData.accountList.map(
                async (item) =>
                    await Account.updateOne(
                        { _id: item._id, "gardenList._id": _id },
                        {
                            $set: {
                                "gardenList.$.gardenName": name,
                                "gardenList.$.gardenAddress": address,
                            },
                        }
                    )
            );

            await newgardenData.save();
            // Trả về thông tin mới của căn nhà
            return res.send({
                result: "success",
                newgardenData: newgardenData,
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    requestToJoingarden: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: id nhà muốn được Join vào
            const { gardenId } = req.body;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }
            const gardenData = await garden.findById(gardenId);

            // Cập nhật thêm thông tin tài khoản vào danh sách thành viên của nhà đó,
            // trạng thái đang yêu cầu
            await garden.findByIdAndUpdate(gardenId, {
                $addToSet: {
                    accountList: {
                        _id: account._id,
                        fullname: account.fullname,
                        avatar: account.avatar,
                        status: "requesting",
                    },
                },
            });

            // Cập nhật thêm thông tin nhà vào danh sách nhà của tài khoản,
            // trạng thái đang yêu cầu
            await Account.findByIdAndUpdate(account._id, {
                $addToSet: {
                    gardenList: {
                        _id: gardenData._id,
                        gardenName: gardenData.name,
                        gardenAddress: gardenData.address,
                        status: "requesting",
                    },
                },
            });

            // Trả về
            return res.send({
                result: "success",
                message: "Gửi yêu cầu thành công!",
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    confirmJoingarden: async (req, res) => {
        try {
            // accessToken của chủ nhà
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: id nhà và id tài khoản đang yêu cầu
            const { gardenId, accountId } = req.body;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }

            const gardenData = await garden.findById(gardenId);
            const accountData = await Account.findById(accountId);

            // Chuyển trạng thái từ "requesting" sang "owner" của tài khoản mới được xác nhận
            // trong danh sách thành viên
            await garden.updateOne(
                { _id: gardenId, "accountList._id": accountId },
                {
                    $set: { "accountList.$.status": "owner" },
                }
            );

            // Chuyển trạng thái từ "requesting" sang "owner" của tài khoản mới được xác nhận
            // trong danh sách nhà của tài khoản đó
            await Account.updateOne(
                { _id: accountId, "gardenList._id": gardenId },
                {
                    $set: { "gardenList.$.status": "owner" },
                }
            );

            // Trả về
            return res.send({
                result: "success",
                message: "Xác nhận thành công!",
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    refuseJoingarden: async (req, res) => {
        try {
            // accessToken của chủ nhà
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: id nhà và id tài khoản đang bị từ chối
            const { gardenId, accountId } = req.body;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }

            // Xóa thông tin tài khoản bị từ chối khỏi accountList của căn nhà
            const gardenData = await garden.findByIdAndUpdate(gardenId, {
                $pull: {
                    accountList: { _id: accountId },
                },
            });

            // Xóa thông tin nhà khỏi gardenList của tài khoản bị từ chối
            const accountData = await Account.findByIdAndUpdate(accountId, {
                $pull: {
                    gardenList: { _id: gardenId },
                },
            });

            // Trả về
            return res.send({
                result: "success",
                req: req.body,
                message: "Hủy yêu cầu thành công!",
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },

    deleteMember: async (req, res) => {
        try {
            // accessToken của chủ nhà
            const accessToken = req.headers.authorization.split(" ")[1];

            // Đầu vào: id nhà và id tài khoản đang bị xóa
            const { gardenId, accountId } = req.query;
            const account = await Account.findOne({
                accessToken: accessToken,
            });
            if (!account) {
                return res.send({
                    result: "failed",
                    message: "Không có quyền truy cập",
                });
            }

            // Xóa thông tin tài khoản bị xóa khỏi accountList của căn nhà
            const gardenData = await garden.findByIdAndUpdate(gardenId, {
                $pull: {
                    accountList: { _id: accountId },
                },
            });

            // Xóa thông tin nhà khỏi gardenList của tài khoản bị xóa
            const accountData = await Account.findByIdAndUpdate(accountId, {
                $pull: {
                    gardenList: { _id: gardenId },
                },
            });

            // Trả về
            return res.send({
                result: "success",
                message: "Xóa thành công!",
            });
        } catch (error) {
            res.send({
                result: "failed",
                message: error,
            });
        }
    },
};

module.exports = gardenController;
