const menuToggle = (value) => {
    return {menuOpen: value}
};

export default (...params) => {
    return {
        type: 'MENU_TOGGLE',
        callback: menuToggle,
        args: params
    }
};