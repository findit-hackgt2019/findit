import React from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';

const styles = StyleSheet.create({
    container : {
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
                <Text ellipsizeMode='tail' style={{ flex: 1, fontWeight:'600' }}>{name}</Text>
                <View style={styles.priceButton}>
                  <Text style={styles.price}>
                      ${displayPrice}
                  </Text>
                  <Button
                      title="Add to Cart"
                      onPress={this.onPressButton}
                      color= '#169038'
                  />
                </View>
            </View>
        )
    }
}

export default ListItem;
