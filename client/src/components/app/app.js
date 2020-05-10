import React, { useState, useEffect} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Nav from '../nav'
import './app.css';
import data from '../../data.json';
import Home from '../home';
import Map from '../map';
import Countries from '../countries';
import About from '../about';
//import store from '../../store';

import {useSelector, useDispatch, useStore, connect} from 'react-redux'

import { getRegions } from "../../actions/regionActions";
import { resetMarkers } from "../../actions/markerActions";

const App = () => {

  // const [markersData, setMarkersData] = useState([
  //    store.dispatch(getRegions)
  // ]);
  const store = useStore();
  console.log("action", getRegions)
  const dispatch = useDispatch();
  dispatch(getRegions);
  //dispatch(resetMarkers);
  console.log('next state',store.getState())

  // const { regionsLoading, regions } = useSelector(state => ({
  //   regionsLoading: state.regions.regionsLoading,
  //   regions: state.regions.regions,
  // }));

  // const { regionsLoading, regions } = useSelector(state => ({
  //   regionsLoading: state.regions.regionsLoading,
  //   regions: state.regions,
  // }));
  // const dispatch = useDispatch()

  // function getCountryData(){
  //   if(store.getState().regions.regionsLoading){
  //     console.log("loading")
  //     return []
  //   }

  //   else{
  //     console.log(store.getState())
  //     return store.getState().regions.regions
  //   }
  //}
  // useEffect(() => {
  //   this.props.getRegions
  // }, [])
  //this.props.dispatch(getRegions)

  // console.log(store.getState())
  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/map">
            <div>
              {/* <Map markersData={markersData} /> */}
              <Map />
              {/* <button onClick={addMarker}>Add marker</button> */}
              {/* <ul>
                Markers data:
                {markersData.map(marker => (
                  <li key={marker.title}>
                    {marker.title}, lat: {marker.latLng.lat}, lng: {marker.latLng.lng},
                  </li>
                ))}
              </ul> */}
            </div>
          </Route> 
          <Route path="/about" >
            <div>
              <About />
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default connect()(App);

// Example for utilizing map functional component in app.js
  // function addMarker() {
  //   const lastMarker = markersData[markersData.length - 1];

  //   setMarkersData([
  //     ...markersData,
  //     {
  //       title: +lastMarker.title + 1,
  //       latLng: {
  //         lat: lastMarker.latLng.lat + 2,
  //         lng: lastMarker.latLng.lng + 2
  //       }
  //     }
  //   ]);
  // }
  
  //const currentUser = useSelector(state => state.currentUser)