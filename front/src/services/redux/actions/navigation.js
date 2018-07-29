const navigation = (state, uri) => {
    window.location.href = uri;
    return state
};

export default (...params) => {
    return {
        type: 'NAV',
        callback: navigation,
        args: params
    }
};