import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RetroMapStyles from './assets/MapStyles/RetroMapStyles.json';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';

const PLACE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
const API_KEY = 'AIzaSyCAjd5RY-n2Tm0Qm4wcDFYUuEOvJkX3bqI';

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    locations: []
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    Geocoder.init(API_KEY);

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude }}) => {
        this.setState({ latitude: latitude, longitude: longitude }),
        (err) => console.warn(err)

        fetch(PLACE_API + latitude + ',' + longitude + '&radius=3000&type=store&key=' + API_KEY)
          .then(res => res.json())
          .then(data => {
            this.setState({ locations: data.results }),
            (err) => console.log(err)
        })
        .catch(console.log)
      });
  }

  async getCoords(name) {
    const json = await Geocoder.from(name);
    return json.results[0].geometry.location;
  }

  renderMarkers = () => {
    const { locations } = this.state
    return (
      <>
        {
          locations.map((location, idx) => {
            const {
              geometry: { location: { lat, lng }},
              name
            } = location
            if (lat == null || lng == null) return null;
            return (
            <>
              <Marker
                key={idx}
                coordinate={{ latitude: lat, longitude: lng }}
                onCalloutPress={this.markerClick} >
                    <View style={styles.callout}>
                        <Text style={styles.calloutText}>{name}</Text>
                    </View>
              </Marker>
            </>
            )
          })
        }
      </>
    )
  }

  render() {
    const { latitude, longitude, locations } = this.state

    if (latitude) {
      return (
        <MapView
          provider = { PROVIDER_GOOGLE }
          showsUserLocation
          style={{ flex: 1 }}
          customMapStyle={ RetroMapStyles }
          moveOnMarkerPress={true}
          initialRegion = {{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          >
          {locations != undefined && this.renderMarkers()}
        </MapView>
      )
    }

    return (
      <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Change your location permissions!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  callout: {
    backgroundColor: "#f7fffc",
    padding: 5,
    opacity: 0.8,
    borderRadius: 5
  },
  calloutText: {
    fontSize: 8,
    padding: 2,
    fontWeight: "bold",
    color: "#000"
  }
});
