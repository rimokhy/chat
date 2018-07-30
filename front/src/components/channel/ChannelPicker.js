import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import './css/Room.css'

class ChannelPicker extends Component {

    render() {
        let input;
        return <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    this.props.mutation({
                        variables: {
                            channel: '12',
                            content: 'Haha'
                        }
                    }).then(data => {
                        console.log(data);
                    }).catch(err => {
                        console.log(JSON.stringify(err));
                    });
                    input.value = "";
                }}
            >
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        triggerError: (bool, msg) => {
            dispatch(Actions.loginFailed(bool, msg));
        },
        navigate: (uri, obj) => {
            dispatch(Actions.navigation(uri, obj));
        },
        loadingEvent: (bool) => {
            dispatch(Actions.loading(bool));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPicker);
