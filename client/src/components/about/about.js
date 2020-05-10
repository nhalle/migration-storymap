// this component for about page
import React, { Component } from 'react';
const About = (props) =>{
        return(
        <div className = "about">
            <div className ="container">
            <div className ="mission" style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
            <div className="row" style={{marginBottom: "10px"}}>
            <div className="card border-0 shadow" style= {{width: "45rem"}}>
                        <div className="card-body text-center">
                        <h1 className="card-title">Who are we</h1>
                        <div className="card-text">We are a broad group of research contributors, advocates, and future journal and book authors that consist of a core group of students, a faculty director, faculty partners at Franklin & Marshall College and other academic institutions; and community institution collaborators in the city of Lancaster. Our principal work takes place along three lines. (1) We interview refugees and internal migrants who have moved to, and/or move through, Lancaster County. We also expect to conduct interviews with migrants in other locations in the US (i.e. Paterson, NJ and Northern VA) and abroad (i.e. Peru, Greece). (2) We map the trajectories of some of these refugees and migrants. (3) We are engaged in migrant and refugee advocacy, which entails building bridges between the Franklin & Marshall campus and our community.</div>
                        </div>
                </div>
                </div>
                </div>
            </div>

            <div className ="mission" style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
            <div className="row">
                <div className= "col">
                <div className="card border-0 shadow" style= {{width: "45rem"}}>
                        <div className="card-body text-center">
                        <h1 className="card-title">Location</h1>
                        <div className="card-text">The lab is located in Hackman P118. It is outfitted with a radio-quality digital voice recorder, two computers with sound editing software and ArcGIS, and a smart board we will use to craft our multimedia displays.</div>
                        </div>
                </div>
                </div>
            </div>
            </div>
            </div>
        );
}
export default About;