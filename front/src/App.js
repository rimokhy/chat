import React, {Component} from 'react';
import './App.css';
import MenuButton from "./components/Menu/MenuButton";
import Menu from "./components/Menu/Menu";

import {Link, Route, Switch} from 'react-router-dom';

/* Home component */
const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

/* Category component */
const Category = () => (
    <div>
        <h2>Category</h2>
    </div>
)

/* Products component */
const Products = () => (
    <div>
        <h2>Products</h2>
    </div>
)

/* Products component */
const Zz = () => (
    <div>
        <h2>Zz</h2>
    </div>
)

/* Products component */
const NotFound = () => (
    <div>
        <h2>NotFound</h2>
    </div>
)

export default class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.onMenuButton = this.onMenuButton.bind(this);
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        })
    }

    onMenuButton(e) {
        this.toggleMenu();

        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <MenuButton onMenuButton={this.onMenuButton}/>
                <div id="flyoutMenu"
                     className={this.state.visible ? 'show' : 'hide'}>
                    <nav>
                        <h2>
                            <Link to='/'>Home</Link>
                        </h2>
                        <h2>
                            <Link to='/category'>Category</Link>
                        </h2>
                        <h2>
                            <Link to='/products'>Products</Link>
                        </h2>
                        <h2>
                            <Link to='/login'>Login</Link>
                        </h2>
                    </nav>
                </div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/category" component={Category}/>
                    <Route exact path="/login" component={Products}/>
                    <Route exact path="/products" component={Zz}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}
