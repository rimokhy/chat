import React, {Component} from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import {Route, Switch} from 'react-router-dom';
import {AuthGuard} from "./services/AuthGuard";
import Login from "./pages/login/Login";
import CustomAppBar from './components/Menu/AppBar/CustomAppBar';
import CustomDrawer from "./components/Menu/Drawer/CustomDrawer";
import ErrorSnackbar from "./components/ErrorSnackbar";
import Loading from "./components/Loading";

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
        <h2>Log in ? wtf...</h2>
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

class App extends Component {
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

    /*
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
    */

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>

                <CustomAppBar/>
                <CustomDrawer/>
                <ErrorSnackbar/>
                <Loading/>
                <div>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <AuthGuard exact path="/" component={Home}/>
                        <AuthGuard exact path="/category" component={Category}/>
                        <AuthGuard exact path="/products" component={Zz}/>
                        <AuthGuard component={NotFound}/>
                    </Switch>
                </div>
            </React.Fragment>

        );
    }
}

export default App;