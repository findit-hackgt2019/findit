import React from 'react';
import { Modal, StyleSheet, View, Text, Button, SectionList } from 'react-native';
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
    header: {
      padding: 20,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: "600"
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

        const data = [{
          title: 'Shopping Cart',
          data: cartItems
        }];

        return (
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
          >
            <View style={styles.container}>
              {(modalVisible && orderId != null) && (
                <QRCode value={orderId} />
              )}
              <SectionList
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                sections={data}
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
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{title}</Text>
                )}
              />
              <Text styles={styles.header, {fontWeight: '600'}}>
                Total Price - ${total}
              </Text>
              <Button
                title= "Close Shopping Cart"
                onPress={toggleModalVisible}
              />
            </View>
          </Modal>
        )
    }
}
