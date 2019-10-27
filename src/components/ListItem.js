import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
        color: '#fff'
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
        color: '#fff',
        fontFamily: 'Montserrat'

    }
});

class ListItem extends React.PureComponent {
    onPressButton = () => {
        const { name, price, quantity, addToCart } = this.props;
        addToCart({name, price, quantity});
        Alert.alert('Item Added');
    };

    render() {
        const { name, price } = this.props;

        const displayPrice = price.toFixed(2);

        return (
            <View style={styles.container}>
                <Text ellipsizeMode='tail' style={{ flex: 1, color: '#fff', fontFamily: 'Montserrat-Bold' }}>{name}</Text>
                <View style={styles.priceButton}>
                    <Text style={styles.price}>
                        ${displayPrice}
                    </Text>
                    <TouchableOpacity
                        onPress={this.onPressButton}
                        style={{ borderRadius: 50, backgroundColor: '#ff891e', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Montserrat-Bold' }}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default ListItem;
