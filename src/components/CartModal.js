import React from 'react';
import { Modal, StyleSheet, View, Text, Button, FlatList } from 'react-native';
import QRCode from 'react-qr-code';
import CartItem from "./CartItem";
import { addOrder, editOrder } from "../actions/orders";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    paragraph: {
        padding: 20,
        textAlign: 'center'
    },
    heading: {
        marginTop: 20,
        padding: 25,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',          
    },
    price: {
        paddingBottom: 12,
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
                {(modalVisible && orderId != null) && (
                  <QRCode value={orderId} />
                )}
              {(cartItems.length == 0) && (
                <Text>
                  Your shopping list is empty.
                </Text>)}
                <FlatList
                  style={{ flex: 1 }}
                  items={cartItems}
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
                <Text styles={styles.price}>
                  Total Price - ${total}
                </Text>
                <View style= {{margin: 20, padding: 5, borderColor: '#0c7529', borderWidth: 1}}>
                <Button
                  title= "Close Shopping Cart"
                  onPress={toggleModalVisible}
                  color ='#0c7529'
               />
                </View>
              </View>
            </Modal>
        )
    }
}
