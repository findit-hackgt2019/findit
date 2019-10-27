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
        alignItems: 'center'
    },
    paragraph: {
        padding: 20,
        textAlign: 'center'
    },
    price: {
        paddingBottom: 12
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
              console.log('making new order')
              await addOrder({
                created: new Date(),
                items: this.props.cartItems
              })
                  .then((order) => {
                      console.log(order)
                      this.setState({
                          orderId: order._id
                      });
                  });
          } else {
              console.log('editing existing order')
              await editOrder(this.state.orderId, {
                  items: this.props.cartItems
              });
          }
      }
  }

  render() {
        const { cartItems, toggleModalVisible, modalVisible, removeFromCart } = this.props;

        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
          total += cartItems[i].quantity * cartItems[i].price;
        }

        const data = [{
          title: 'Store Items',
          data: cartItems
        }];

        return (
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
            >
              <View style={styles.container}>
                <Text style={styles.paragraph}>
                  Shopping Cart
                </Text>
                {(modalVisible) && (
                  <QRCode value={JSON.stringify(cartItems)} />
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
                    <Text style={styles.paragraph}>{title}</Text>
                  )}
                />
                <Text styles={styles.price}>
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
