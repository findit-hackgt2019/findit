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
        return (
            <View style={styles.container}>
                <Text>
                    {name}
                </Text>
                <View style={styles.priceButton}>
                  <Text style={styles.price}>
                      ${price}
                  </Text>
                  <Button
                      title="Add to Cart"
                      onPress={this.onPressButton}
                  />
                </View>
            </View>
        )
    }
}

export default ListItem;
