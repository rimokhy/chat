import {CircularProgress} from "@material-ui/core/index";
import React, {Component} from "react";
import {connect} from "react-redux";


class Loading extends Component {

    render() {
        return <div>
            {this.props.showLoading && <CircularProgress size={68}/>}
        </div>
    }
}

const mapStateToProps = state => {
    return {showLoading: state.LOADING_TOGGLE.showLoading}
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);