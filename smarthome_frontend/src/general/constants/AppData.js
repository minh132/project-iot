const AppData = {
    //gender
    genderOptions: [
        { value: "Nam", text: "Nam" },
        { value: "Nữ", text: "Nữ" },
        { value: "Khác", text: "Khác" },
    ],
    //category
    categoryOptions: [
        // { value: "security", text: "An ninh gia đình" },
        // { value: "powerSwitch", text: "Công tắc nguồn điện" },
        { value: "lightEquipment", text: "Bơm nước" },
        { value: "sensor", text: "Cảm biến" },
        // { value: "electricalEquipment", text: "Thiết bị điện môi trường" },
    ],
    //channel
    channelOptions: [
        { value: "1", text: "Thiết bị 1" },
        { value: "2", text: "Thiết bị 2" },
        { value: "3", text: "Thiết bị 3" },
        { value: "4", text: "Thiết bị 4" },
        { value: "5", text: "Thiết bị 5" },
        { value: "6", text: "Thiết bị 6" },
        { value: "7", text: "Thiết bị 7" },
        { value: "8", text: "Thiết bị 8" },
    ],
    temperatureOption: [
        { value: "800", text: "16°C" },
        { value: "1250", text: "17°C" },
        { value: "1700", text: "18°C" },
        { value: "2150", text: "19°C" },
        { value: "2600", text: "20°C" },
        { value: "3050", text: "21°C" },
        { value: "3500", text: "22°C" },
        { value: "3950", text: "23°C" },
        { value: "4400", text: "24°C" },
        { value: "4850", text: "24°C" },
        { value: "5300", text: "26°C" },
        { value: "5750", text: "27°C" },
        { value: "6200", text: "28°C" },
        { value: "6650", text: "29°C" },
        { value: "7100", text: "30°C" },
        { value: "7550", text: "31°C" },
        { value: "8000", text: "32°C" },
    ],
    fanOptions: [
        { value: "800", text: "Chế độ 1" },
        { value: "4400", text: "Chế độ 2" },
        { value: "8000", text: "Chế độ 3" },
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
            text: "Bơm nước",
            image: require("../../assets/images/maybom.jpg"),
        },
        // {
        //     value: "Dải đèn",
        //     text: "Dải đèn",
        //     image: require("../../assets/images/daiden.png"),
        // },
        // {
        //     value: "Đèn bàn",
        //     text: "Đèn bàn",
        //     image: require("../../assets/images/denban.png"),
        // },
        // {
        //     value: "Đèn ngủ",
        //     text: "Đèn ngủ",
        //     image: require("../../assets/images/denngu.png"),
        // },
    ],
    sensor: [
        {
            value: "Nhiệt độ, độ ẩm",
            text: "Nhiệt độ, độ ẩm",
            image: require("../../assets/images/nhietdo.png"),
        },
        // {
        //     value: "Cảm biến ánh sáng",
        //     text: "Cảm biến ánh sáng",
        //     image: require("../../assets/images/anhsang.png"),
        // },
        // {
        //     value: "Cảm biến khói",
        //     text: "Cảm biến khói",
        //     image: require("../../assets/images/khoi.png"),
        // },
        // {
        //     value: "Cảm biến động tĩnh",
        //     text: "Cảm biến động tĩnh",
        //     image: require("../../assets/images/dongtinh.png"),
        // },
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
