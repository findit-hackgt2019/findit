import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RetroMapStyles from './assets/MapStyles/RetroMapStyles.json';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';
import Greeting from './src/components/Greeting';
import List from './src/components/List';
import CartModal from './src/components/CartModal';
import { getAllItems, searchItems } from "./src/actions/api";

const PLACE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
const API_KEY = 'AIzaSyCAjd5RY-n2Tm0Qm4wcDFYUuEOvJkX3bqI';

export default class App extends React.Component {
  state = {
    region: {
      latitude: null,
      longitude: null,
      latitudeDelta: null,
      longitudeDelta: null
    },
    locations: [],
    latitude: null,
    longitude: null,
    marker: null,
    selectedItems: [],
    modalVisible: false,
    storeItems: []
  };

  toggleModalVisible=() =>{
    const {modalVisible} = this.state;
    this.setState({modalVisible: !modalVisible});
  };

  addToCart=(item) =>{
    const {selectedItems} = this.state;
    const items_copy = [...selectedItems];

    let found = false;
    for (let i = 0; i < items_copy.length ; i ++) {
      if (items_copy[i].name === item.name) {
        items_copy[i].quantity += 1;
        found = true;
        break;
      }
    }

    if (!found) {
      items_copy.push(item);
    }

    this.setState({
      selectedItems: items_copy
    });
  };

  removeFromCart=(item_name) =>{
    const {selectedItems} = this.state;

    this.setState({
      selectedItems: selectedItems.filter((item) => item.name !== item_name)
    });
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    Geocoder.init(API_KEY);

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude }}) => {
        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        }),
        (err) => console.warn(err)

        fetch(PLACE_API + latitude + ',' + longitude + '&radius=3000&type=store&key=' + API_KEY)
          .then(res => res.json())
          .then(data => {
            this.setState({ locations: data.results }),
            (err) => console.log(err)
        })
        .catch(console.log)
      });

    const storeItems = await getAllItems();
    if (storeItems != null) {
      this.setState({
        storeItems
      });
    }
  }

  renderMarkers = () => {
    const { locations } = this.state;

    return locations.map((location, idx) => {
      const {
        geometry: { location: { lat, lng }},
        name
      } = location;

      if (lat == null || lng == null) return null;

      return (
        <Marker
          key={idx}
          coordinate={{ latitude: lat, longitude: lng }}
          onCalloutPress={this.markerClick} >
              <View style={styles.callout}>
                  <Text style={styles.calloutText}>{name}</Text>
              </View>
        </Marker>
      )
    });
  };

  render() {
    const { region, locations, modalVisible, storeItems } = this.state;

    if (region.latitude) {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            provider = { PROVIDER_GOOGLE }
            showsUserLocation
            style={{ flex: 1 }}
            customMapStyle={ RetroMapStyles }
            moveOnMarkerPress={true}
            region = { region }
            minZoomLevel={ 10 }
            >
            {locations != null && (
              this.renderMarkers()
            )}
          </MapView>
          <Greeting />

          <List addToCart = {this.addToCart} items={storeItems}/>

          <Button
             title= "View Shopping Cart"
             onPress = {this.toggleModalVisible}
          />

          <CartModal
            removeFromCart = {this.removeFromCart}
            cartItems = {this.state.selectedItems}
            toggleModalVisible = {this.toggleModalVisible}
            modalVisible = {modalVisible} />
        </View>
      );
    }

    return (
      <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Change your location permissions!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
