import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RetroMapStyles from './assets/MapStyles/RetroMapStyles.json';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';

import Greeting from './src/components/Greeting';
//import ListItem from './src/components/ListItem.js';
import List from './src/components/List';
import CartModal from './src/components/CartModal';

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    marker: null,
    selectedItems: [],
    modalVisible: false,
  }

  toggleModalVisible=() =>{
    const {modalVisible} = this.state;
    this.setState({modalVisible: !modalVisible});
  }

  addToCart=(item) =>{
    const {selectedItems} = this.state;
    const items_copy = [...selectedItems];
    let found = false;
    for (let i = 0; i < items_copy.length ; i ++) {
      if (items_copy[i].name == item.name) {
        items_copy[i].quantity += 1;
        found = true;
        break;
      }
    }
    if (found == false) {
      items_copy.push(item);
    }
    this.setState({
      selectedItems: items_copy
    })
    console.log(this.state.selectedItems);
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
    const { latitude, longitude, marker , modalVisible} = this.state

    if (latitude) {
      return (
        <View style={{ flex: 1 }}>
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
        <Greeting />
        
        <List addToCart = {this.addToCart} items={[
          {name: 'apple', price: 3, quantity: 1},
          {name: 'orange', price: 2, quantity: 1},
          {name: 'banana', price: 1, quantity: 1}
        ]}/>

        <Button
           title= "View Shopping Cart"
           onPress = {this.toggleModalVisible}
        />

        <CartModal 
          cartItems = {this.state.selectedItems} 
          toggleModalVisible = {this.toggleModalVisible}
          modalVisible = {modalVisible} />
        </View>
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
