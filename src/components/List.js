import React from 'react';
import { StyleSheet, ScrollView, Text} from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '50%'
    },
    paragraph: {
        padding: 20,
        textAlign: 'center'
    }
});

class List extends React.Component {
    render() {
        const { items, addToCart } = this.props;

        return (
            <ScrollView style={styles.container}>
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
                    />
                )}
            </ScrollView>
        )
    }
}

export default List;
