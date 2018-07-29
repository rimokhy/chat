const showError = (state, showError, errorMsg) => {
    return {showError, errorMsg}
};

export default (...params) => {
    return {
        type: 'LOGIN_FAILED',
        callback: showError,
        args: params
    }
};