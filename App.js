import React from 'react';
import { StyleSheet, Text, View, Button, Keyboard, Alert } from 'react-native';
import { Input, InputGroup } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyle from './assets/MapStyles/MapStyle.json';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';
import List from './src/components/List';
import CartModal from './src/components/CartModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAllItems } from "./src/actions/api";

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
    selectedItems: [],
    modalVisible: false,
    storeItems: [],
    filteredItems: [],
    showItems: false,
    showFiltered: false,
    query: '',
    currentStore: null
  };

  toggleModalVisible = () => {
    this.setState((prevState) => ({
      modalVisible: !prevState.modalVisible
    }));
  };

  addToCart = (item) => {
    const { selectedItems } = this.state;
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

  removeFromCart = (item_name) => {
    const { selectedItems } = this.state;

    this.setState({
      selectedItems: selectedItems.filter((item) => item.name !== item_name)
    });
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    const { status2, expires, permissions } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING);
    if (status2 !== "granted") {
        const response2 = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
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

        fetch(PLACE_API + latitude + ',' + longitude + '&radius=6000&type=store&key=' + API_KEY)
          .then(res => res.json())
          .then(data => {
            this.setState({ locations: data.results }),
            (err) => console.log(err)
        })
          .catch(console.log)
      });

    const storeItems = await getAllItems();
    if (storeItems != null && storeItems.status !== "Failed") {
      this.setState({
        storeItems
      });
    }
  }

  markerClick = (name) => {
    this.setState((prevState) => ({
      showItems: !prevState.showItems,
      currentStore: name
    }));
  };

  mapClick = () => {
    Keyboard.dismiss();
    if (this.state.showItems)
      this.setState({ showItems: false });
    if (this.state.showFiltered)
      this.setState({ showFiltered: false });
    if (this.state.currentStore)
      this.setState({ currentStore: null });
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
          onPress={() => this.markerClick(name)}
        >
            <View style={styles.callout}>
              <Text style={styles.calloutText}>{name}</Text>
            </View>
        </Marker>
      )
    });
  };

  render() {
    const { region, locations, modalVisible, storeItems, showItems, filteredItems, showFiltered, currentStore } = this.state;

    console.log('storeItems', storeItems)

    if (region.latitude) {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            style={{ flex: 1 }}
            customMapStyle={ MapStyle }
            initialRegion={ region }
            minZoomLevel={ 13 }
            maxZoomLevel={ 15 }
            zoomTapEnabled={ false }
            onPress={ this.mapClick }
          >
            {locations != null && (
              this.renderMarkers()
            )}
          </MapView>
          <View style={styles.searchBar}>
            <View style={styles.inputWrapper} >
              <InputGroup borderType='rounded' >
                <Icon name="search" size={15} color="#6732ff" />
                <Input
                  style={styles.inputSearch}
                  onChangeText={ (query) => {
                    this.setState({query});
                    if (query == '') {
                      this.setState({showFiltered: false});
                    }
                    if (!currentStore && query.length == 1) {
                      Keyboard.dismiss();
                      Alert.alert("Please Select a Store");
                      this.setState({ query: '' });
                    } else {
                      if (storeItems) {
                        if (!showFiltered) this.setState({showFiltered: true});
                        if (showItems) this.setState({showItems: false});
                        this.setState({
                          filteredItems: storeItems.filter((item) => {
                            return item.name.toLowerCase().includes(query.toLowerCase());
                          })
                        });
                      }
                    };
                  }}
                  value = { this.state.query }
                  placeholder="What can I find for you?"
                />
              </InputGroup>
            </View>
          </View>
          {(showFiltered) && (currentStore) && (
             <View style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
             <List
               addToCart={this.addToCart}
               items={filteredItems}
               name={currentStore}
             />
             <Button
               title= "View Shopping Cart"
               onPress = {this.toggleModalVisible}
             />
             <CartModal
               removeFromCart={this.removeFromCart}
               cartItems={this.state.selectedItems}
               toggleModalVisible={this.toggleModalVisible}
               modalVisible={modalVisible}
             />
           </View>
          )}

          {(showItems) && (currentStore) && (
            <View style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
              <List
                addToCart={this.addToCart}
                items={storeItems}
                name={currentStore}
              />
              <View style= {{margin: 20, padding: 5, borderColor: '#0c7529', borderWidth: 1}}>
                <Button
                  title= "View Shopping Cart"
                  onPress = {this.toggleModalVisible}
                  color ='#0c7529'
                />
              </View>
              <CartModal
                removeFromCart={this.removeFromCart}
                cartItems={this.state.selectedItems}
                toggleModalVisible={this.toggleModalVisible}
                modalVisible={modalVisible}
              />
            </View>
          )}
        </View>
      );
    }

    return (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02063a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callout: {
    backgroundColor: "#02063a",
    padding: 5,
    opacity: 0.8,
    borderRadius: 5
  },
  calloutText: {
    fontSize: 8,
    padding: 2,
    fontWeight: "bold",
    color: "#fff"
  },
  searchBar:{
    top: 0,
    position: "absolute",
    width: "100%"
  },
  inputSearch:{
      fontSize: 18
  },
  inputWrapper:{
      paddingLeft: 10,
      marginLeft:15,
      marginRight:15,
      marginTop:30,
      marginBottom:0,
      backgroundColor:"#fff",
      opacity:0.9,
      borderRadius:7
  }
});
