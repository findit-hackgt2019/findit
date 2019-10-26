import React from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';

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

class ListItem extends React.Component {
    onPressButton=() => {
        const {name, price, quantity, addToCart} = this.props;
        addToCart({name, price, quantity});
        Alert.alert('Item Added');
    }

    render() {
        const {name, price} = this.props;
        return (
            <View style={styles.itemAttribute}> 
                <Text>
                    {name}
                </Text>
                <Text>
                    ${price}
                </Text>
                <Button
                    title="Add to Cart"
                    onPress={this.onPressButton}
                />
            </View>
        )
    }
}

export default ListItem;