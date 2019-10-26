import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
    paragraph: {
        padding: 20,
        textAlign: 'center'
    }
});

class List extends React.Component {
    render() {
        const {items, addToCart} = this.props;
        return (
            <View>
                <Text style={styles.paragraph}>
                    Store Items
                </Text>
                {items.map (item => 
                <ListItem 
                  key={item.name} 
                  name={item.name} 
                  price={item.price}
                  quantity={item.quantity}
                  addToCart={addToCart}
                />)}
            </View>
        )
    }
}

export default List;