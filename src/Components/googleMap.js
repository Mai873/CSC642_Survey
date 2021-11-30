
import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../../config.env" });
const mapStyles = {
  //   marginRight: "auto",
  marginTop: "-12px",
  width: "99.5%",
  height: "88.5%",
  position: "relative",
  border: "1px solid var(--light-gray-color)",
  borderRadius: "5px",
};
function GoogleMapContainer(props) {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [latLon, setLatLon] = useState({ lat: 1, lng: 1 });

  useEffect(() => {
    getCoordinates();
  }, []);

  const getCoordinates = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${props.mapAddress}&key=AIzaSyAuu3XkFNEVFKWbMgxfl62l1Gt-k3HG_V4`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response);
        setLatLon(response.data.results[0].geometry.location);
      })
      .catch((error) => console.log(error));
  };

  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const onClose = () => {
    if (showInfoWindow) {
      setShowInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const { google } = props;

  return (
    <Map
      className={`${props.isActive}`}
      google={google}
      zoom={12}
      style={mapStyles}
      initialCenter={latLon}
      center={latLon}
    >
      <Marker
        onClick={onMarkerClick}
        name={props.mapAddress}
        position={latLon}
      />
      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4 className='map-name'>{selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBjyS0gcKgo1mWe41S9Y3BJ-mxoBSldy5E",
})(GoogleMapContainer);