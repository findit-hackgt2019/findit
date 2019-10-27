import React from 'react';
import { StyleSheet, View, FlatList, Text} from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#02063a'
    },
    flexOne: {
        flex: 1
    },
    header: {
      padding: 20,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: "600",
      color: '#fff'
    }
});

class List extends React.PureComponent {
    render() {
        const { items, addToCart, name } = this.props;

        return (
          <View style={styles.container}>
              <Text style={styles.header}>{name}</Text>
              <FlatList
                style={styles.container}
                items={items}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <ListItem
                    key={item.name}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    addToCart={addToCart}
                  />
                )}
              />
          </View>
        );
    }
}

export default List;
