import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10
    },
    priceButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    price: {
      marginLeft: 12,
      marginRight: 12,
      fontFamily: 'Montserrat'
    }
});

class CartItem extends React.PureComponent {
    onPressButton = () => {
        const { name, removeFromCart } = this.props;
        removeFromCart(name);
        Alert.alert('Item Removed');
    };

    render() {
        const { name, price, quantity } = this.props;
        let curPrice = price * quantity;

        return (
            <View style={styles.container}>
                <Text ellipsizeMode='tail' style={{ flex: 1, fontFamily: 'Montserrat-Bold'}}>
                    {quantity} x {name}
                </Text>
                <View style={styles.priceButton}>
                    <Text style={styles.price}>
                        ${curPrice.toFixed(2)}
                    </Text>
                    <TouchableOpacity
                        onPress={this.onPressButton}
                        style={{ borderRadius: 50, backgroundColor: '#ff891e', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Montserrat-Bold' }}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default CartItem;
