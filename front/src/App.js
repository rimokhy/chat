import React, {Component} from 'react';
import './App.css';
import MenuButton from "./components/Menu/MenuButton";
import Menu from "./components/Menu/Menu";

import {Link, Route} from 'react-router-dom';
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
                <Menu onMenuButton={this.onMenuButton}
                      menuVisibility={this.state.visible}/>
                <div>
                    <p>Can you spot the item that doesn't belong?</p>
                    <ul>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Dolor</li>
                        <li>Sit</li>
                        <li>Bumblebees</li>
                        <li>Aenean</li>
                        <li>Consectetur</li>
                    </ul>
                </div>
                <Route path="/" component={Home}/>
                <Route path="/category" component={Category}/>
                <Route path="/login" component={Products}/>
                <Route path="/products" component={Zz}/>
                <Route component={NotFound}/>
            </div>
        );
    }
}
