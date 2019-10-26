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
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    Geocoder.init("AIzaSyCAjd5RY-n2Tm0Qm4wcDFYUuEOvJkX3bqI");

    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({ latitude: latitude, longitude: longitude }, () => console.log('State: ', this.state)),
          (err) => console.warn(err);
        this.geocodeLocation2("375 18th St NW").then(res => {
          this.setState({marker: res}, () => console.log('State: ', this.state)),
            (err) => console.warn(err);
        })
      });
  }

  componentDidUpdate() {
    console.log("Update!");
  }

  async geocodeLocation2(name) {
    const json = await Geocoder.from(name);
    return json.results[0].geometry.location;
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
            {marker != null && marker != undefined && <Marker coordinate={{ latitude: marker.lat, longitude: marker.lng }} title="Target" description="Buy Stuff" />}
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
