/*import React, { Component } from 'react';*/
import React, { useState } from 'react';
import Player from '../player'
import ImageRender from '../imagerender'
import "./popup.css"

function Popup (props){

        return(
            <div className="popup">
            <div className="card" style={{position:"absolute", width:"20rem", right:"-630px"}}>
                        <div className="card-body text-center overflow-auto">
                            <h3 className="card-title">{props.title}</h3>
                            <Player url= {props.url} />
                            <ImageRender url= {props.imgurl} />
                            <div className="card-text">{props.description}</div>
                        </div>
                        <div className="card-footer text-center">
                            <button type="button" className ="btn btn-primary btn-sm float-left" onClick={props.onClick}>{props.nextText}</button>
                            <button type="button" className ="btn btn-primary btn-sm float-right" onClick={props.onClose}>x</button>
                        </div>
            </div>
            </div>
        );
}
export default Popup;

// <div className="card" style={{position:"absolute", width:"20rem", height:"500px", right:"-630px"}}>