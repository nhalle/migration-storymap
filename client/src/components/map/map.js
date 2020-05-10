import React, { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import Popup from "../popup";
import {useSelector, useDispatch, useStore } from 'react-redux';
import { getStories, setStoriesLoading} from "../../actions/storyActions";
import { resetMarkers, getMarkers, getMarkersLoading} from "../../actions/markerActions";

function Map({ markerPosition, markersData }) {
  const mapRef = useRef(null);

  // on state change useSelector checks if region value has changed
  const { regionsLoading, regions } = useSelector(state => ({
    regionsLoading: state.regions.regionsLoading,
    regions: state.regions.regions,
  }));

  
  //on state change load markers
  const { markersLoading, markers } = useSelector(state => ({
    markersLoading: state.markers.markersLoading,
    markers: state.markers.markers,
  }));

  // on state change load stories
  const { storiesLoading, stories } = useSelector(state => ({
    storiesLoading: state.stories.storiesLoading,
    stories: state.stories.stories,
}));


  const dispatch = useDispatch();

  //Component for future custom popup rendering
  const [displayPopup, setdisplay] = React.useState(false);
  const [displayStories, setstories] =  React.useState(false);
  const [markerID, setmarkerID] = React.useState(null);
  const [regionIndex, setRegionIndex] = React.useState(0);
  const [markersList, setMarkersList] = React.useState({});
  
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [20, 0],
      zoom: 2,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }, []);

  // add layer
  const layerRef = useRef(null);
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  // Set region markers 
  // Option set popup on marker.bindPopup(marker.name)
  const firstUpdate = useRef(true);
  useEffect(
      () => {
        console.log("update region markers")
        if (regionsLoading)  {
          console.log("waiting")
        }
        else{
          layerRef.current.clearLayers();
          let index = 0;
          regions.forEach(marker => {
            L.marker( { lat: marker.lat, lng: marker.lng }, 
                      { name: marker.name, 
                        id: marker._id, 
                        index: index, 
                        description: marker.description, 
                        soundurl: marker.sound, 
                        imgurl: marker.img,
                        type: "region" }
                        )
            .addTo(layerRef.current)
            .on("click", onClick)
            index += 1
          });

        }
      },
      [regions]
    );

    //On Story Click render new layer with story markers
    useEffect(
      () => {
        // if storyMode render 
        console.log("update story markers")
        if (markersLoading)  {
          console.log("waiting")
        }
        else{
          layerRef.current.clearLayers();
          let markersL = [];
          let index = 0;
          markers.forEach(marker => {
            markersL[index] = L.marker( { lat: marker.lat, lng: marker.lng}, 
                                        { name: marker.name, 
                                        id: marker._id, 
                                        index: index, 
                                        description: marker.description,
                                        soundurl: marker.sound, 
                                        imgurl: marker.img,
                                        type: "marker"}
                                        )
            .addTo(layerRef.current)
            .on("click", onMarkerClick)
            index += 1
          });
          setMarkersList(markersL);
          console.log(markersL)
          if(markersL.length > 0){
            console.log("markers update")
            markersL[0].fireEvent('click',{
              latlng: markersL[0]._latlng
            });
        }

        }
      },
      [markers]
    );


  //Leaflet.JS onClick event for regions
  function onClick(e){
    mapRef.current.flyTo([e.latlng.lat, e.latlng.lng], 12);
    // set display when 
    setmarkerID(this);
    setRegionIndex(this.options.index)
    // if marker display onView button
  }

  //Leaflet.js onClick event for stories
  function onMarkerClick(e){
    mapRef.current.flyTo([e.latlng.lat, e.latlng.lng], 12);
    setmarkerID(this);
  }

  function onClose(e){
    setdisplay(false);
    setstories(false);
    setmarkerID(null);
    mapRef.current.flyTo([20,0], 2);
  }

  function onCloseStoryMarker(e){
    //go back to region
    layerRef.current.clearLayers();
          let index = 0;
          let markersL = {};
          regions.forEach(marker => {
            markersL[index] = L.marker( { lat: marker.lat, lng: marker.lng}, 
                                        { name: marker.name, 
                                          id: marker._id, index: index, 
                                          description: marker.description, 
                                          soundurl: marker.sound, 
                                          imgurl: marker.img,
                                          type: "region"})
            .addTo(layerRef.current)
            .on("click", onClick)
            index += 1
          });
          markersL[regionIndex].fireEvent('click',{
            latlng: markersL[regionIndex]._latlng
          });

    // wait for map to bind region points then go to region
  }

  // dispatches stories for popup region
  const onView = useCallback(
    (id) => {dispatch(getStories(id))
    setstories(true);
    },
    [dispatch]
  )

  // dispatches marker data for stories
  const onViewStory = useCallback(
    (id) => {dispatch(getMarkers(id))
    },
    [dispatch]
  )

  // Handle popup in marker mode
  function onNext(index){
    mapRef.current.flyTo([20,0], 2);
    let keys = Object.keys(layerRef.current._layers);

    // if last marker close story and go back to region popup
    if(index+1 >= keys.length){
      onCloseStoryMarker()
    }

    else{
      console.log(markersList[index+1]);
      markersList[index+1].fireEvent('click',{
        latlng: markersList[index+1]._latlng
      });
    }
  }

   
    let popup;
    if (markerID !== null){
      if(markerID.options.type === "region"){
        popup = <Popup title={markerID.options.name} 
        description={markerID.options.description} 
        url = {markerID.options.soundurl}
        imgurl ={markerID.options.imgurl}
        onClose = {onClose} 
        onClick = {() => onView(markerID.options.id)} 
        nextText = 'View Stories'/>

      }
      else if(markerID.options.type === "marker"){
        popup = <Popup title={markerID.options.name} 
        description={markerID.options.description} 
        url = {markerID.options.soundurl}
        imgurl ={markerID.options.imgurl}
        onClose = {onCloseStoryMarker} 
        onClick = {() => onNext(markerID.options.index)} 
        nextText = 'Next'/>
      }
    }

    else{
      popup = <div></div>
    }

    return (
    <div className="map-wrapper">
    <div id="map">
      <div className="btn-group" style={{zIndex: "1001"}}> 
      {popup}
      </div>
    </div>
    <div className="stories">
      {displayStories ? (
        <div className ="stories-scroller">
        {stories.map((story) => (
          <div className="card" key={story._id}  onClick = {() => onViewStory(story._id)}>
              <div className="card-body text-center">
                  <h5 className="card-title">{story.name}</h5>
                  <div className="card-text">{story.description}</div>
              </div>
          </div>))}
          </div>
        ) :
        (<div> </div>)}
    </div>
    </div>
    );
  }

export default Map;