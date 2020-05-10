/*import React, { Component } from 'react';*/
import React, { useState, useEffect, useCallback } from 'react';
import './stories.css'
import {useSelector, useDispatch } from 'react-redux';
import { getMarkers, setMarkersLoading} from "../../actions/markerActions";

const Stories = (props) => {

        // on state change
    const { storiesLoading, stories } = useSelector(state => ({
        storiesLoading: state.stories.storiesLoading,
        stories: state.stories.stories,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        // Update the document title using the browser API
        console.log(stories)
      },
      [stories]  
      );
    
    // const onView = (useCallback(
    //     () => {dispatch(getMarkers(e.target.dataset._id))
    //     },
    //     [dispatch]
    // )

        return(
            <div className ="topContainer">
            {stories.map((story) => (
            <div className="card" key={story._id} style={{position:"relative", width:"10rem", bottom: "5px"}} onClick = {() => dispatch(getMarkers(story._id))}>
                        <div className="card-body text-center">
                            <h5 className="card-title">{story.name}</h5>
                            <div className="card-text">{story.description}</div>
                        </div>
            </div>))}
            </div>
        );
    }
export default Stories;

// stories.map((story, index) => (
            // <div className="popup">
            //     <div className="col-md-3">
            // <div className="card" key={index} style={{position:"absolute", width:"20rem"}}>
            //             <div className="card-body text-center">
            //                 <h3 className="card-title">{story.name}</h3>
            //                 <div className="card-text">{story.description}</div>
            //             </div>
            // </div>
            // </div>
            // </div>