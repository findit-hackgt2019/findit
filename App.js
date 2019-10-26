import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RetroMapStyles from './assets/MapStyles/RetroMapStyles.json';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';

const locations = require('./assets/Locations/locations.json')

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    marker: null,
    locations: locations
  }

  renderMarkers = () => {
    const { locations } = this.state
    return (
      <View>
        {
          locations.map((location, idx) => {
            const {
              coords: { latitude, longitude }
            } = location
            return (
              <Marker
                key={idx}
                coordinate={{ latitude, longitude }}
                onPress={this.onMarkerPress(location)}
              />
            )
          })
        }
      </View>
    )
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    Geocoder.init("AIzaSyCAjd5RY-n2Tm0Qm4wcDFYUuEOvJkX3bqI");

    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude }}) =>
        this.setState({ latitude: latitude, longitude: longitude }),
        (err) => console.warn(err)
      );

      const { locations: [sampleLocation] } = this.state

      this.setState({
        desLatitude: sampleLocation.coords.latitude,
        desLongitude: sampleLocation.coords.longitude
      })
  }

  async getCoords(name) {
    const json = await Geocoder.from(name);
    return json.results[0].geometry.location;
  }

  renderMarkers = () => {
    const { locations } = this.state
    return (
      <View>
        {
          locations.map((location, idx) => {
            const {
              coords: { latitude, longitude }
            } = location
            return (
              <Marker
                key={idx}
                coordinate={{ latitude, longitude }}
              />
            )
          })
        }
      </View>
    )
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
          }}>
          {this.renderMarkers()}
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
