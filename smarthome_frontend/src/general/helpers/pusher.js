import Pusher from "pusher-js";

const pusher = new Pusher("46febd03dc354fd5c163", {
    cluster: "ap1",
    encrypted: true,
});

export default pusher;
