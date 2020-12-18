import React, { } from 'react';
import HeaderAppBar from './HeaderAppBar';
// import { Route } from 'react-router-dom'
import ToDos from '../ToDos';

export default function Home() {

    return (
        <HeaderAppBar >
            <ToDos/>
            {/* <Route path='/Home/ToDos' component={ToDos} /> */}
            {/* <Route path='/Home/AboutUs' component={() => { return <h2 >AboutMe</h2> }} /> */}
        </HeaderAppBar>
    );

}