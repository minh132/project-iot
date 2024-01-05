import Pusher from "pusher-js";

const pusher = new Pusher("46febd03dc354fd5c163", {
    cluster: "ap1",
    encrypted: true,
});
const PusherHelper = {
    Publish: (channelName, eventName, data) => {
        pusher.trigger(channelName, eventName, data);
    },

    Subscribe: (channelName, eventName, callback) => {
        const channel = pusher.subscribe(channelName);
        channel.bind(eventName, callback);
    },
};

export default PusherHelper;
