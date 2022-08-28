/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { GoogleApiWrapper } from "google-maps-react";

const Map = (props) => {
  const { google, onPlaceSelected, lat, lon, placeObject } = props;
  const mapDivRef = useRef();

  useEffect(() => {
    refreshMap();
  }, []);

  function getReverseGeocodingData(map, marker, infowindow) {
    var latlng = new google.maps.LatLng(lat, lon);

    var infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);

    marker.setPosition(latlng);
    marker.setVisible(true);

    var address = "";
    if (placeObject?.address_components) {
      address = [
        (placeObject.address_components[0] &&
          placeObject.address_components[0].short_name) ||
          "",
        (placeObject.address_components[1] &&
          placeObject.address_components[1].short_name) ||
          "",
        (placeObject.address_components[2] &&
          placeObject.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    var input = document.getElementById("pac-input");

    if (
      infowindowContent.children["place-icon"] &&
      infowindowContent.children["place-name"] &&
      infowindowContent.children["place-address"]
    ) {
      infowindowContent.children["place-icon"].src = placeObject.icon;
      infowindowContent.children["place-name"].textContent = placeObject.name;
      infowindowContent.children["place-address"].textContent = address;
      infowindow.open(map, marker);
    }

    if (input) {
      input.value = placeObject.name + " - " + address;
    }
  }

  function refreshMap() {
    var map = new google.maps.Map(document.getElementById("mapDiv"), {
      center: {
        lat: lat || -33.8688,
        lng: lon || 151.2195,
      },
      zoom: 13,
    });

    var input = document.getElementById("pac-input");
    var dubaiBounds = {
      north: 25.3585607,
      east: 55.5650393,
      south: 24.7921359,
      west: 54.8904543,
    };
    map.fitBounds(dubaiBounds);

    var options = {
      bounds: dubaiBounds,
      types: ["establishment"],
      componentRestrictions: {
        country: "AE",
      },
      strictBounds: true,
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    /// show on map
    autocomplete.bindTo("bounds", map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", function () {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      onPlaceSelected(place);
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = "";
      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            "",
        ].join(" ");
      }

      infowindowContent.children["place-icon"].src = place.icon;
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent = address;
      infowindow.open(map, marker);
    });

    if (placeObject && Object.keys(placeObject).length > 0) {
      setTimeout(() => getReverseGeocodingData(map, marker, infowindow), 2000);
    }
  }

  return (
    <>
      {!props?.hideSearch && (
        <input
          id="pac-input"
          type="text"
          placeholder="Enter a location"
          className="ant-input"
          style={{ marginBottom: "20px" }}
        />
      )}
      <div className="map" id="mapDiv" ref={mapDivRef}></div>
      <div id="infowindow-content">
        <img src="" width="16" height="16" id="place-icon" alt="" />
        <span id="place-name" className="title"></span>
        <br></br>
        <span id="place-address"></span>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBtbCj3HmK-gQqO5LztvBGFthAYGnWNiL4",
})(Map);
