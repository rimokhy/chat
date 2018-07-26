import React, {Component} from 'react';
import './MenuButton.css'

export default class MenuButton extends Component {
    render() {
        return (
            <button className="menuButton"
                    onMouseDown={this.props.onMenuButton}>

            </button>
        )
    }
}
