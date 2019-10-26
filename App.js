import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RetroMapStyles from './assets/MapStyles/RetroMapStyles.json';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    marker: null
  }

  renderMarkers() {
    return this.props.places.map((place, i) => (
      <Marker
        key={i}
        title={place.name}
        coordinate={place.coods}
      />
    ));
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }

    Geocoder.init("AIzaSyCAjd5RY-n2Tm0Qm4wcDFYUuEOvJkX3bqI");

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({ latitude: latitude, longitude: longitude }, () => console.log('State: ', this.state)),
          (err) => console.warn(err);
        //this.geocodeLocation(latitude, longitude);
        this.geocodeLocation2("375 18th St NW").then(res =>
          this.setState({marker: res}, () => console.log('Marker Set')),
            (err) => console.warn(err));
      })
  }

  async geocodeLocation(lat, lng) {
    Geocoder.from({
      latitude: lat,
      longitude: lng
    }).then(json => {
      let addressComponent = json.results[0].address_components;
      console.log(addressComponent);
    }).catch(err => console.warn(err));
  }

  async geocodeLocation2(name) {
    Geocoder.from(name)
      .then(json => {
        let addressComponent = json.results[0].geometry.location;
        console.log('Coords: ', addressComponent);
        return addressComponent;
      }).catch(err => console.warn(err));
  }

  render() {
    const { latitude, longitude, marker } = this.state

    if (latitude) {
      return (
        <MapView
        provider = { PROVIDER_GOOGLE }
          showsUserLocation
          style={{ flex: 1 }}
          customMapStyle={ RetroMapStyles }
          initialRegion = {{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          >
            {marker != null && <Marker coordinate={ marker.lat, marker.lng } />}
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
