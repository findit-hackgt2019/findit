import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import QRCode from 'react-qr-code';
import CartItem from "./CartItem";
import { addOrder, editOrder } from "../actions/orders";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    margin: 15
  },
    heading: {
      marginVertical: 25,
      textAlign: 'center',
      fontSize: 25,
      fontFamily: 'Montserrat-Bold'    
    },
    price: {
        paddingBottom: 12,
        fontFamily: 'Montserrat-Bold'
    }
});

export default class CartModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      orderId: null
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.modalVisible !== this.props.modalVisible) {
          if (this.state.orderId == null) {
              await addOrder({
                created: new Date(),
                items: this.props.cartItems
              })
                  .then((order) => {
                      this.setState({
                          orderId: order._id
                      });
                  });
          } else {
              await editOrder(this.state.orderId, {
                  items: this.props.cartItems
              });
          }
      }
  }

  render() {
        const { cartItems, toggleModalVisible, modalVisible, removeFromCart } = this.props;
        const { orderId } = this.state;

        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
          total += cartItems[i].quantity * cartItems[i].price;
        }
        total = total.toFixed(2);

        return (
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
            >
              <View style={styles.container}>
                <Text style={styles.heading}>
                  Shopping Cart
                </Text>
                <View style={{alignItems: 'center', marginBottom: 25}}>
                {(modalVisible && (cartItems.length != 0)) && (
                  <QRCode value={orderId} />
                )}
                {(cartItems.length == 0) && (
                  <Text style={{ marginTop: 20, fontFamily: 'Montserrat' }}>
                    Your shopping list is empty.
                  </Text>
                )}
                </View>
                <FlatList
                  style={{ flex: 1 }}
                  data={cartItems}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <CartItem
                      key={item.name}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      removeFromCart={removeFromCart}
                    />
                  )}
                />
                <View style={{alignItems: 'center'}}>
                  <Text styles={{paddingBottom: 12, fontFamily: 'Montserrat-Bold'}}>
                    Total Price - ${total}
                  </Text>
                  <View style= {{ margin: 10 }}>
                  <TouchableOpacity
                    onPress={toggleModalVisible}
                    style={{ borderRadius: 50, backgroundColor: '#6934ff', paddingHorizontal: 60, paddingVertical: 15 }}>
                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Montserrat-Bold' }}>Close Shopping Cart</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
        )
    }
}
