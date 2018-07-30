import Tabs from "@material-ui/core/es/Tabs/Tabs";
import React from "react";
import Tab from "@material-ui/core/es/Tab/Tab";

const friendAction = (props) => () => (
    <Tabs {props}>
        <Tab label="Friend request"/>
        <Tab label="Item Two"/>
        <Tab label="Item Three" href="#basic-tabs"/>
    </Tabs>
);

const toolbarInteractionToggle = (state, friendProps) => {
    return {friends: state === null ? false : state.friends, friendAction(friendProps) };
};

export default (...params) => {
    return {
        type: 'TOOLBAR_CLEARANCE',
        callback: toolbarInteractionToggle,
        args: params
    }
};