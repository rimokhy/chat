const navigation = (state, room, channel) => {
    return {room, channel}
};

export default (...params) => {
    return {
        type: 'ON_NAV',
        callback: navigation,
        args: params
    }
};