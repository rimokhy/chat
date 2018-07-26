import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import './Menu.css'

class Menu extends Component {
    render() {
        let visibility = "hide";

        if (this.props.menuVisibility) {
            visibility = "show";
        }
        return (
            <div id="flyoutMenu"
                 onMouseDown={this.props.onMenuButton}
                 className={visibility}>
                <nav>
                    <h2>
                        <Link to='/'>Home</Link>
                    </h2>
                    <h2>
                        <Link to='/category'>Bite</Link>
                    </h2>
                    <h2>
                        <Link to='/products'>Cu</Link>
                    </h2>
                    <h2>
                        <Link to='/login'>Back</Link>
                    </h2>
                </nav>
            </div>
        )
    }
}

export default withRouter(Menu);