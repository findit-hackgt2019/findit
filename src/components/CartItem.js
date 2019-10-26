import React from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';

const styles = StyleSheet.create({
    itemAttribute : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20
    }
});

class CartItem extends React.Component {
    onPressButton=() => {
        const {name, removeFromCart} = this.props;
        removeFromCart(name);
        Alert.alert('Item Removed');
    }

    render() {
        const {name, price, quantity} = this.props;
        return (
            <View style={styles.itemAttribute}> 
                <Text>
                    {quantity} x {name}
                </Text>
                <Text>
                    ${quantity*price}
                </Text>
                <Button
                    title="Remove"
                    onPress={this.onPressButton}
                />
            </View>
        )
    }
}

export default CartItem;