import {CircularProgress} from "@material-ui/core/index";
import React, {Component} from "react";
import {connect} from "react-redux";


class Loading extends Component {

    render() {
        {console.log(this.props)}
        return <div>
            {this.props.showLoading && <CircularProgress size={68}/>}
        </div>
    }
}

const mapStateToProps = state => {
    return {showLoading: state.showLoading}
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);