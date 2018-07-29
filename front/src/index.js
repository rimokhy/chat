import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {Provider} from 'react-redux'
import {store} from './services/redux'
import App from './App';
import './index.css';
import {ApolloProvider} from 'react-apollo'
import {client} from "./services/GQLService";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#a44336',
        },
    },
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <App/>
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

registerServiceWorker();
