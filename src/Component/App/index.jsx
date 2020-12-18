import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { RTL } from '../Utils';
import axios from 'axios'
import { Notification } from '../Utils'
import { Route, BrowserRouter, withRouter, Redirect, Switch, useHistory } from 'react-router-dom'
import SignIn from '../Pages/SingIn/SignIn'
import Home from '../Pages/Home'
import { connect } from 'react-redux';
import Firebase from '../../Firebase'
import { withStyles } from '@material-ui/styles';


//     // useEffect(() => {
//     //     return (() => {
//     //         console.log('AppIndex Mount')
//     //         Firebase.onAuthStateChanged((user) => {

//     //             console.log('onAuthStateChanged', user)
//     //             if (user !== null)
//     //                 history.push("/Home")
//     //             else
//     //                 history.push('/Login')
//     //         })
//     //     })
//     // },[])



class App extends React.Component {

    constructor() {
        super()
        axios.defaults.baseURL = "https://todoapp-80ddc-default-rtdb.firebaseio.com/"
        let firebase = Firebase;
    }

    state = {
        isAuth: false
    }

    theme = createMuiTheme({
        direction: 'rtl', // Both here and <body dir="rtl">
        overrides: {
            direction: 'rtl',
            MuiFormLabel: {
                asterisk: {
                    color: '#db3131',
                    '&$error': {
                        color: '#db3131'
                    },
                }
            }
        }
    });

    MainRout = () => {
        return this.state.isAuth ? <Redirect to='/Home' /> :
            <Redirect to='/Login' />
    }


    componentDidMount() {
        Firebase.onAuthStateChanged((user) => {
            console.log("componentDidMount App onAuthStateChanged", user)
if(user===null){

}

        })
    }

    render() {
        return (
            <RTL>
                <ThemeProvider theme={this.theme}>
                    <Switch>
                        <Route exact path='/' component={this.MainRout} />
                        <Route path='/Home' component={Home} />
                        <Route path='/Login' component={SignIn} />
                    </Switch>
                </ThemeProvider>
                <Notification />
            </RTL>
        )
    }
}


const StateMapToProps = (state) => {
    return { Atur: state.Atur }
}


const useStyle = (them) => ({
    root: {
        fontFamily: 'B-NAZANIN',
    }
});

export default withStyles(useStyle)(connect(StateMapToProps)(withRouter(App)))