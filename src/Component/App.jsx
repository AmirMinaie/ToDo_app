import React, { } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import HeaderAppBar from './HeaderAppBar';
import MainForm from './MainForm';
import RTL from './RTL';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'





const theme = createMuiTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
const useStyle = makeStyles((them) => ({
    root: {
        fontFamily: 'B-NAZANIN',
    }
}));


export default function App() {
    axios.defaults.baseURL= "https://todoapp-80ddc-default-rtdb.firebaseio.com/"
    const classs = useStyle();

    return (
        <RTL>
            <ThemeProvider theme={theme}>
                <HeaderAppBar >
                    <MainForm />
                </HeaderAppBar>
            </ThemeProvider>
        </RTL>);

}