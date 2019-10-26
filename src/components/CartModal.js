import React from 'react';
import {Modal, StyleSheet, View, Text, Alert, Button} from 'react-native';
import CartItem from "./CartItem";

const styles = StyleSheet.create({
    paragraph: {
        padding: 20,
        textAlign: 'center'
    },
    itemAttribute: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      padding: 20
    },
});

sumTotal=() =>{
  const {modalVisible} = this.state;
  this.setState({modalVisible: !modalVisible});
}

class CartModal extends React.Component {

    render() {
        const {cartItems, toggleModalVisible, modalVisible, removeFromCart} = this.props;
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
          total += cartItems[i].quantity * cartItems[i].price;
        }
        console.log(cartItems);
        return (
            <View>
              <Modal
                animationType = "slide"
                transparent= {false}
                visible = {modalVisible}>
                <Text style={styles.paragraph}>
                    Shopping Cart
                </Text>
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
              </Modal>
            </View>
        )
    }
}

  export default CartModal;