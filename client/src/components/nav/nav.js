/*import React, { Component } from 'react';*/
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getRegions } from "../../actions/regionActions";
import { resetMarkers, getMarkers, getMarkersLoading} from "../../actions/markerActions";
import {useDispatch} from 'react-redux'

const Nav = () =>{
    const dispatch = useDispatch();
    
        return(
            <nav className="navBar">
                <ul>
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/about/">About</NavLink></li>
                    <li><NavLink to="/map/" onClick={() => dispatch(getRegions)}>Map</NavLink></li>
                </ul>
            </nav>
        );
    }
export default Nav;
