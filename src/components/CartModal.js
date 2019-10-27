import React from 'react';
import {Modal, StyleSheet, ScrollView, View, Text, Alert, Button} from 'react-native';
import QRCode from 'react-qr-code';
import CartItem from "./CartItem";

const styles = StyleSheet.create({
    paragraph: {
        padding: 20,
        textAlign: 'center'
    },
    itemAttribute : {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      padding: 20
  }
});

const sumTotal = () => {
  const {modalVisible} = this.state;
  this.setState({modalVisible: !modalVisible});
}

export default class CartModal extends React.Component {
    render() {
        const {cartItems, toggleModalVisible, modalVisible, removeFromCart} = this.props;
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
          total += cartItems[i].quantity * cartItems[i].price;
        }
        console.log(cartItems);
        return (
            <Modal
              animationType = "slide"
              transparent= {false}
              visible = {modalVisible}>
              <ScrollView style={{ flex: 1 }}>
                <Text style={styles.paragraph}>
                    Shopping Cart
                </Text>
                <QRCode
                  value={JSON.stringify(cartItems)}
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
                {cartItems.map (cartItem =>
                  <CartItem
                    key={cartItem.name}
                    name={cartItem.name}
                    price={cartItem.price}
                    quantity={cartItem.quantity}
                    removeFromCart={removeFromCart}
                  />)}
                <View style={styles.itemAttribute}>
                  <Text>
                      Total Price
                  </Text>
                  <Text>
                      ${total}
                  </Text>
                </View>
                <Button
                  title= "Close Shopping Cart"
                  onPress={toggleModalVisible}
               />
              </ScrollView>
            </Modal>
        )
    }
}
