const AppData = {
    //gender
    genderOptions: [
        { value: "Nam", text: "Nam" },
        { value: "Nữ", text: "Nữ" },
        { value: "Khác", text: "Khác" },
    ],
    //category
    categoryOptions: [
        { value: "security", text: "An ninh gia đình" },
        { value: "powerSwitch", text: "Công tắc nguồn điện" },
        { value: "lightEquipment", text: "Thiết bị đèn" },
        { value: "sensor", text: "Cảm biến" },
        { value: "electricalEquipment", text: "Thiết bị điện môi trường" },
    ],
    security: [
        {
            value: "Camera",
            text: "Camera",
            image: require("../../assets/images/camera.png"),
        },
        {
            value: "Chuông chống trộm",
            text: "Chuông chống trộm",
            image: require("../../assets/images/chuong.png"),
        },
        {
            value: "Khóa cửa",
            text: "Khóa cửa",
            image: require("../../assets/images/khoa.png"),
        },
        {
            value: "Két sắt an toàn",
            text: "Két sắt an toàn",
            image: require("../../assets/images/ketsat.png"),
        },
    ],
    powerSwitch: [
        {
            value: "Ổ cắm",
            text: "Ổ cắm",
            image: require("../../assets/images/ocam.png"),
        },
        {
            value: "Công tắc",
            text: "Công tắc",
            image: require("../../assets/images/congtac.png"),
        },
    ],
    lightEquipment: [
        {
            value: "Bóng đèn",
            text: "Bóng đèn",
            image: require("../../assets/images/bongden.png"),
        },
        {
            value: "Dải đèn",
            text: "Dải đèn",
            image: require("../../assets/images/daiden.png"),
        },
        {
            value: "Đèn bàn",
            text: "Đèn bàn",
            image: require("../../assets/images/denban.png"),
        },
        {
            value: "Đèn ngủ",
            text: "Đèn ngủ",
            image: require("../../assets/images/denngu.png"),
        },
    ],
    sensor: [
        {
            value: "Cảm biến nhiệt độ và độ ẩm",
            text: "Nhiệt độ và độ ẩm",
            image: require("../../assets/images/nhietdo.png"),
        },
        {
            value: "Cảm biến khói",
            text: "Cảm biến khói",
            image: require("../../assets/images/khoi.png"),
        },
        {
            value: "Cảm biến độ sáng",
            text: "Cảm biến độ sáng",
            image: require("../../assets/images/anhsang.png"),
        },
        {
            value: "Cảm biến động tĩnh",
            text: "Cảm biến động tĩnh",
            image: require("../../assets/images/dongtinh.png"),
        },
    ],
    electricalEquipment: [
        {
            value: "Máy lạnh",
            text: "Máy lạnh",
            image: require("../../assets/images/maylanh.png"),
        },
        {
            value: "Quạt",
            text: "Quạt",
            image: require("../../assets/images/quat.png"),
        },
        {
            value: "Máy lọc không khí",
            text: "Máy lọc không khí",
            image: require("../../assets/images/lockhongkhi.png"),
        },
        {
            value: "Máy hút ẩm",
            text: "Máy hút ẩm",
            image: require("../../assets/images/hutam.png"),
        },
    ],
};

export default AppData;