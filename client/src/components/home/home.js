// this component for home page
import React, { Component } from 'react';
class Home extends Component{
    render(){
        return(
            <div className = "home">
            <div className ="container" style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
            <div className="row">
                <div className="col">
                <div className = "card-wrapper">
                <div className="card border-0 shadow" style= {{width: "45rem"}}>
                        <div className="card-body text-center">
                        <h1 className="card-title">Mission Statement</h1>
                        <div className="card-text">Our project examines the migration journeys people make due to climate change and other environmental impacts broadly defined, from immediate crises to gradual reductions in livability. As we build a collaborative research program, we recognize that migration rarely occurs in response to a single cause. In examining environmental migration, our work is an inquiry into the way local and global environmental change factors into the difficult decision to leave home.</div>
                        </div>
                </div>
                </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}
export default Home;
