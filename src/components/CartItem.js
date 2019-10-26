import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

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
            </View>
        )
    }
}

export default CartItem;