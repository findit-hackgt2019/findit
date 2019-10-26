import React from 'react';
import {Modal, StyleSheet, View, Text, Alert, Button} from 'react-native';
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

sumTotal=() =>{
  const {modalVisible} = this.state;
  this.setState({modalVisible: !modalVisible});
}

class CartModal extends React.Component {

    render() {
        const {cartItems, toggleModalVisible, modalVisible} = this.props;
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
                    quantity={cartItem.quantity}/>)}
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
/*
export const Cart = props => {
    const totalPrice = props.selectedItems.reduce(
      (total, curr) => (total += curr.price),
      0
    );
  
    return (
      <div className="cart-wrapper">
        <h2>Cart</h2>
        {props.selectedItems.length > 0 && (
          <div className="selected-items">
            <div>Selected Items:</div>
            {props.selectedItems.map(item => (
              <CartItem
                key={item.id}
                name={item.name}
                id={item.id}
                onRemoveCartItem={props.onRemoveCartItem}
              />
            ))}
          </div>
        )}
        <div>Total: ${totalPrice}</div>
      </div>
    );
  };
  */

  export default CartModal;