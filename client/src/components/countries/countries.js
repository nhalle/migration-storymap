// this component for contact page
import React, { Component } from 'react';
import Popup from '../popup'
import data from '../../data.json'
function Countries (props){

    function onNext(e){
        console.log("generate map")
    }


        return(
            <div className="countries">
                <div className="card" style={{position:"absolute", width:"30rem", left:"10px"}}>
                        <div className="card-body text-center">
                            <h3 className="card-title">Country</h3>
                            <div className="card-text">Country Description</div>
                        </div>
                        <div className="card-footer text-center">
                            <button type="button" className ="btn btn-primary btn-sm float-center" onClick={props.onNext}>View Map</button>
                        </div>
                </div>
            </div>
        );
}
export default Countries;
