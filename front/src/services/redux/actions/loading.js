const showLoading = (showLoading) => {
    return {showLoading: showLoading}
};

export default (...params) => {
    return {
        type: 'LOADING_TOGGLE',
        callback: showLoading,
        args: params
    }
};