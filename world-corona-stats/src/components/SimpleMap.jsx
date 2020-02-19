import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import dotenv from "dotenv";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
	static defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 11
	};

	render() {
		console.log("dotenv :", dotenv);
		return <div>Map here</div>;
	}
}

export default SimpleMap;
// Important! Always set the container height explicitly
// <div style={{ height: "100vh", width: "100%" }}>
//   <GoogleMapReact
//     bootstrapURLKeys={{ key: process.env.bootstrapURLKeys }}
//     defaultCenter={this.props.center}
//     defaultZoom={this.props.zoom}
//   >
//     <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
//   </GoogleMapReact>
// </div>
