import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './components/Navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fc6f1d',
      main: '#E35604',
      dark: '#c94c03',
      contrastText: '#fff'
    },
    secondary: {
      light: '#03e2e2',
      main: '#03c9c9',
      dark: '#03b0b0',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar/>
            <div className='container'>
                <Switch>
                  <Route  exact path='/' component={home}/>
                  <Route  exact path='/login' component={login}/>
                  <Route  exact path='/signup' component={signup}/>
                </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
  
}

export default App;
