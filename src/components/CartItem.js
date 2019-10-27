import React from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      padding: 20
    },
    priceButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    price: {
      marginLeft: 12,
      marginRight: 12
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

        return (
            <View style={styles.container}>
                <Text>
                    {quantity} x {name}
                </Text>
                <View style={styles.priceButton}>
                    <Text style={styles.price}>
                        ${Math.round(100 * quantity * price) / 100}
                    </Text>
                    <Button
                        title="Remove"
                        onPress={this.onPressButton}
                    />
                </View>
            </View>
        )
    }
}

export default CartItem;
